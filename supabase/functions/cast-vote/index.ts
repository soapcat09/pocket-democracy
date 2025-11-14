import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CastVoteRequest {
  initiativeId: string;
  voteType: 'for' | 'against' | 'abstain';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header');
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Verify user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User authentication failed:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Parse request body
    const { initiativeId, voteType }: CastVoteRequest = await req.json();

    // Validate required fields
    if (!initiativeId || !voteType) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Validate vote type
    if (!['for', 'against', 'abstain'].includes(voteType)) {
      console.error('Invalid vote type:', voteType);
      return new Response(
        JSON.stringify({ error: 'Invalid vote type' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id, vote_type')
      .eq('user_id', user.id)
      .eq('initiative_id', initiativeId)
      .maybeSingle();

    let vote;
    let action = 'created';

    if (existingVote) {
      // Update existing vote
      const { data: updatedVote, error: updateError } = await supabase
        .from('votes')
        .update({ vote_type: voteType })
        .eq('id', existingVote.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating vote:', updateError);
        return new Response(
          JSON.stringify({ error: updateError.message }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      vote = updatedVote;
      action = 'updated';
      console.log('Vote updated successfully:', vote.id);
    } else {
      // Create new vote
      const { data: newVote, error: insertError } = await supabase
        .from('votes')
        .insert({
          user_id: user.id,
          initiative_id: initiativeId,
          vote_type: voteType
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating vote:', insertError);
        return new Response(
          JSON.stringify({ error: insertError.message }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }

      vote = newVote;
      console.log('Vote created successfully:', vote.id);
    }

    return new Response(
      JSON.stringify({ success: true, vote, action }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in cast-vote function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
