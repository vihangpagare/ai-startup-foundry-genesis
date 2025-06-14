
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LandingPageRequest {
  idea: string;
  companyName?: string;
  targetAudience?: string;
  uniqueValue?: string;
  analysisData?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const { idea, companyName, targetAudience, uniqueValue, analysisData }: LandingPageRequest = await req.json();

    const systemPrompt = `You are an expert React developer and conversion optimization specialist. Create a complete, production-ready React landing page component that converts visitors into customers. The code should be modern, responsive, and optimized for conversions.`;

    const userPrompt = `
Create a complete React landing page component for this SaaS startup:

IDEA: ${idea}
COMPANY: ${companyName || 'SaaS Startup'}
TARGET AUDIENCE: ${targetAudience || 'Business professionals'}
UNIQUE VALUE: ${uniqueValue || 'Innovative solution'}

Requirements:
1. Use TypeScript and Tailwind CSS
2. Include hero section, features, pricing, testimonials, CTA sections
3. Make it fully responsive and accessible
4. Use lucide-react icons
5. Include proper TypeScript interfaces
6. Add hover effects and smooth animations
7. Optimize for conversion with clear CTAs
8. Include realistic content specific to this business idea
9. Use gradient backgrounds and modern design
10. Export as default component

Return ONLY the complete React component code, no explanations.
`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anthropicApiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4000,
        temperature: 0.3,
        messages: [
          {
            role: 'user',
            content: `${systemPrompt}\n\n${userPrompt}`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const landingPageCode = data.content[0].text;

    return new Response(JSON.stringify({ 
      success: true, 
      code: landingPageCode
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-landing-page:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
