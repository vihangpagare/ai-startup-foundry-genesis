
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  idea: string;
  companyName?: string;
  targetAudience?: string;
  problemStatement?: string;
  solution?: string;
  uniqueValue?: string;
  analysisType: 'business-plan' | 'marketing' | 'technical' | 'financial' | 'competitive' | 'ux-design' | 'landing-page';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    const exaApiKey = Deno.env.get('EXA_API_KEY');
    
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const { idea, companyName, targetAudience, problemStatement, solution, uniqueValue, analysisType }: AnalysisRequest = await req.json();

    // First, get market research data using Exa API
    let marketData = '';
    if (exaApiKey) {
      try {
        const searchQuery = `${idea} market size trends competition 2024`;
        const exaResponse = await fetch('https://api.exa.ai/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${exaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: searchQuery,
            num_results: 5,
            include_text: true,
            text_length_threshold: 200
          }),
        });
        
        if (exaResponse.ok) {
          const exaData = await exaResponse.json();
          marketData = exaData.results?.map((result: any) => 
            `${result.title}: ${result.text}`
          ).join('\n\n') || '';
        }
      } catch (error) {
        console.log('Exa search failed, continuing without market data:', error);
      }
    }

    // Generate analysis using Claude
    const systemPrompt = getSystemPrompt(analysisType);
    const userPrompt = getUserPrompt(idea, companyName, targetAudience, problemStatement, solution, uniqueValue, marketData, analysisType);

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
        temperature: 0.7,
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
    const analysis = data.content[0].text;

    return new Response(JSON.stringify({ 
      success: true, 
      analysis,
      marketData: marketData ? 'Market research included' : 'No market research available'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-startup-analysis:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getSystemPrompt(analysisType: string): string {
  const basePrompt = `You are an expert startup advisor with 20+ years of experience in building successful SaaS companies. You provide detailed, actionable, and personalized analysis based on specific startup ideas.`;

  switch (analysisType) {
    case 'business-plan':
      return `${basePrompt} Create a comprehensive business plan analysis including market opportunity, business model, competitive landscape, revenue projections, and strategic roadmap. Be specific and data-driven.`;
    
    case 'marketing':
      return `${basePrompt} Create a detailed marketing and growth strategy including target audience analysis, positioning, go-to-market strategy, customer acquisition channels, pricing strategy, and growth tactics. Focus on practical, actionable recommendations.`;
    
    case 'technical':
      return `${basePrompt} Create detailed technical specifications including system architecture, technology stack recommendations, MVP feature set, development roadmap, security considerations, and scalability planning. Be specific about technologies and implementation approaches.`;
    
    case 'financial':
      return `${basePrompt} Create comprehensive financial projections including revenue models, cost structure, funding requirements, key metrics (CAC, LTV, churn), break-even analysis, and 3-year financial forecasts. Use realistic assumptions based on the specific business model.`;
    
    case 'competitive':
      return `${basePrompt} Create a thorough competitive analysis including direct and indirect competitors, market positioning, competitive advantages, threats, opportunities, and differentiation strategies. Include specific company names and market insights.`;
    
    case 'ux-design':
      return `${basePrompt} Create detailed UX design specifications including user personas, user journey mapping, wireframes description, interaction design principles, accessibility considerations, and mobile responsiveness requirements.`;
    
    case 'landing-page':
      return `${basePrompt} Create a high-converting landing page strategy including headline and copy recommendations, value proposition clarity, call-to-action optimization, social proof elements, and conversion optimization tactics.`;
    
    default:
      return basePrompt;
  }
}

function getUserPrompt(
  idea: string, 
  companyName: string = '', 
  targetAudience: string = '', 
  problemStatement: string = '', 
  solution: string = '', 
  uniqueValue: string = '',
  marketData: string = '',
  analysisType: string
): string {
  return `
STARTUP IDEA: ${idea}

COMPANY NAME: ${companyName || 'Not specified'}

TARGET AUDIENCE: ${targetAudience || 'Not specified'}

PROBLEM STATEMENT: ${problemStatement || 'Not specified'}

PROPOSED SOLUTION: ${solution || 'Not specified'}

UNIQUE VALUE PROPOSITION: ${uniqueValue || 'Not specified'}

MARKET RESEARCH DATA:
${marketData || 'No external market data available'}

Please provide a detailed ${analysisType.replace('-', ' ')} analysis for this specific startup idea. Be:
1. Specific to this exact business concept
2. Data-driven and realistic
3. Actionable with concrete next steps
4. Comprehensive yet focused
5. Include specific examples, numbers, and recommendations

Format your response in clear sections with headers and bullet points for readability.
`;
}
