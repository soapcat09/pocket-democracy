import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const birthDate = formData.get('birthDate') as string;
    const county = formData.get('county') as string;
    const city = formData.get('city') as string;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Uploading document to storage...');
    
    // Upload to storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('id-documents')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(JSON.stringify({ error: 'Failed to upload document' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Document uploaded successfully, starting OCR...');

    // Convert file to base64 for AI processing
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const imageUrl = `data:${file.type};base64,${base64}`;

    // Use Lovable AI for OCR
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `Ești un asistent care verifică buletinele de identitate românești. 
            Extrage următoarele informații din buletin:
            - Data nașterii (format: YYYY-MM-DD)
            - Județul
            - Localitatea/Orașul
            
            Returnează datele în format JSON exact astfel:
            {
              "birthDate": "YYYY-MM-DD",
              "county": "numele județului",
              "city": "numele orașului",
              "confidence": "high/medium/low"
            }
            
            Dacă nu poți extrage toate datele sau dacă buletinul nu este valid, returnează confidence: "low".`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Te rog analizează acest buletin și extrage datele solicitate.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ]
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      return new Response(JSON.stringify({ error: 'Failed to process document with AI' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    
    console.log('AI Response:', aiContent);
    
    // Parse the AI response
    let extractedData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in AI response');
      }
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      extractedData = {
        birthDate: null,
        county: null,
        city: null,
        confidence: 'low'
      };
    }

    // Verify extracted data matches provided data
    const isVerified = extractedData.confidence === 'high' &&
      extractedData.birthDate === birthDate &&
      extractedData.county?.toLowerCase() === county.toLowerCase() &&
      extractedData.city?.toLowerCase() === city.toLowerCase();

    console.log('Verification result:', {
      extracted: extractedData,
      provided: { birthDate, county, city },
      isVerified
    });

    // Update profile with document info
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({
        id_document_url: fileName,
        id_verified: isVerified,
        id_verification_data: {
          extractedData,
          providedData: { birthDate, county, city },
          verifiedAt: new Date().toISOString()
        }
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return new Response(JSON.stringify({ error: 'Failed to update profile' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      verified: isVerified,
      extractedData,
      message: isVerified 
        ? 'Buletin verificat cu succes!' 
        : 'Datele din buletin nu corespund cu cele introduse. Verificarea manuală este necesară.'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in verify-id-document:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});