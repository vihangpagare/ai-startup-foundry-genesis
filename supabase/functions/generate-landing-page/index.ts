
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
    
    console.log('Landing page generator - API key check:', anthropicApiKey ? 'Present' : 'Missing');

    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured in Supabase secrets');
    }

    const { idea, companyName, targetAudience, uniqueValue, analysisData }: LandingPageRequest = await req.json();

    console.log('Landing page request for:', companyName || 'startup');

    const systemPrompt = `You are an expert React developer and conversion optimization specialist. Create a complete, production-ready React landing page component that converts visitors into customers. 

Requirements:
- Use TypeScript and Tailwind CSS exclusively
- Include ALL necessary imports
- Create a complete, self-contained component
- Use modern React patterns (functional components, hooks)
- Include proper TypeScript interfaces
- Make it fully responsive and accessible
- Use lucide-react for all icons
- Include realistic, specific content for this business
- Optimize for conversion with clear CTAs
- Use gradient backgrounds and modern design
- Export as default component

The code should be production-ready and deployable immediately.`;

    const userPrompt = `
Create a complete React landing page component for this specific SaaS startup:

BUSINESS IDEA: ${idea}
COMPANY NAME: ${companyName || 'SaaS Startup'}
TARGET AUDIENCE: ${targetAudience || 'Business professionals'}
UNIQUE VALUE PROPOSITION: ${uniqueValue || 'Innovative solution'}

BUSINESS ANALYSIS CONTEXT:
${analysisData ? analysisData.substring(0, 1000) : 'Use the business idea to create compelling content'}

Create a landing page with these sections:
1. Hero section with compelling headline and CTA
2. Problem/solution section
3. Key features (3-4 specific to this business)
4. Benefits section
5. Pricing plans (3 tiers)
6. Testimonials (realistic for this industry)
7. FAQ section
8. Final CTA section
9. Footer

Make the content SPECIFIC to this business idea - not generic. Include:
- Industry-specific terminology
- Realistic features for this type of product
- Appropriate pricing for the market
- Relevant testimonials and use cases
- Compelling value propositions

Return ONLY the complete React component code with proper TypeScript typing. No explanations, just the code.
`;

    console.log('Calling Anthropic API for landing page generation...');

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

    console.log('Anthropic API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const landingPageCode = data.content[0].text;

    console.log('Landing page code generated successfully, length:', landingPageCode?.length);

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
