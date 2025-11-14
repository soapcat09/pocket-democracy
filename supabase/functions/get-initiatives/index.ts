import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse query parameters
    const url = new URL(req.url);
    const countyId = url.searchParams.get('countyId');
    const category = url.searchParams.get('category');
    const status = url.searchParams.get('status') || 'active';

    // Create Supabase client (no auth required for viewing public initiatives)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Build query
    let query = supabase
      .from('initiatives')
      .select(`
        *,
        counties:county_id (
          id,
          name,
          cnp_code
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });

    // Apply filters
    if (countyId) {
      query = query.eq('county_id', countyId);
    }

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    // Execute query
    const { data: initiatives, error: queryError } = await query;

    if (queryError) {
      console.error('Error fetching initiatives:', queryError);
      return new Response(
        JSON.stringify({ error: queryError.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Get vote counts for each initiative
    const initiativesWithVotes = await Promise.all(
      initiatives.map(async (initiative) => {
        const { data: voteCounts, error: voteError } = await supabase
          .rpc('get_initiative_vote_counts', { initiative_uuid: initiative.id });

        if (voteError) {
          console.error('Error fetching vote counts:', voteError);
          return {
            ...initiative,
            votes_for: 0,
            votes_against: 0,
            votes_abstain: 0,
          };
        }

        return {
          ...initiative,
          votes_for: voteCounts[0]?.votes_for || 0,
          votes_against: voteCounts[0]?.votes_against || 0,
          votes_abstain: voteCounts[0]?.votes_abstain || 0,
        };
      })
    );

    console.log(`Fetched ${initiativesWithVotes.length} initiatives`);

    return new Response(
      JSON.stringify({ success: true, initiatives: initiativesWithVotes }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in get-initiatives function:', error);
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
