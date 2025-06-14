
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

// Helper function to clean API keys by removing surrounding quotes and whitespace
const cleanApiKey = (key: string | undefined): string | undefined => {
  if (!key) return undefined;
  // Remove single or double quotes from the beginning and end, and trim whitespace
  return key.replace(/^['"\s]+|['"\s]+$/g, '').trim();
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawAnthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    const rawExaApiKey = Deno.env.get('EXA_API_KEY');
    
    // Clean the API keys by removing quotes and whitespace
    const anthropicApiKey = cleanApiKey(rawAnthropicApiKey);
    const exaApiKey = cleanApiKey(rawExaApiKey);
    
    console.log('API Keys check:', {
      anthropic: anthropicApiKey ? 'Present (cleaned)' : 'Missing',
      exa: exaApiKey ? 'Present (cleaned)' : 'Missing',
      rawAnthropicLength: rawAnthropicApiKey?.length,
      cleanedAnthropicLength: anthropicApiKey?.length,
      rawAnthropicSample: rawAnthropicApiKey?.substring(0, 10),
      cleanedAnthropicSample: anthropicApiKey?.substring(0, 10)
    });

    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured in Supabase secrets');
    }

    const { idea, companyName, targetAudience, problemStatement, solution, uniqueValue, analysisType }: AnalysisRequest = await req.json();

    console.log('Analysis request:', { idea: idea?.substring(0, 100), analysisType });

    // Get market research data using Exa API if available
    let marketResearch = '';
    if (exaApiKey) {
      try {
        console.log('Fetching market research with Exa API...');
        const searchQuery = `${idea} market analysis trends competition 2024`;
        const exaResponse = await fetch('https://api.exa.ai/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${exaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: searchQuery,
            num_results: 3,
            include_text: true,
            text_length_threshold: 300
          }),
        });
        
        if (exaResponse.ok) {
          const exaData = await exaResponse.json();
          marketResearch = exaData.results?.map((result: any) => 
            `Source: ${result.title}\nInsight: ${result.text}\n`
          ).join('\n') || '';
          console.log('Market research fetched successfully');
        } else {
          const errorText = await exaResponse.text();
          console.log('Exa API call failed:', exaResponse.status, errorText);
        }
      } catch (error) {
        console.log('Exa search failed:', error);
      }
    }

    // Generate AI analysis using Claude
    const systemPrompt = getSystemPrompt(analysisType);
    const userPrompt = buildUserPrompt(idea, companyName, targetAudience, problemStatement, solution, uniqueValue, marketResearch, analysisType);

    console.log('Calling Anthropic API...');
    console.log('Using API key starting with:', anthropicApiKey.substring(0, 10));
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anthropicApiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
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

    console.log('Anthropic API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error details:', errorText);
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const analysis = data.content[0].text;

    console.log('Analysis generated successfully, length:', analysis?.length);

    return new Response(JSON.stringify({ 
      success: true, 
      analysis,
      marketData: marketResearch ? 'Included' : 'Not available'
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
  const basePrompt = `You are an expert startup advisor with 20+ years of experience building successful SaaS companies. You provide detailed, actionable, and highly personalized analysis based on specific startup ideas. Your analysis must be:

1. SPECIFIC to the exact business concept provided
2. DATA-DRIVEN with realistic assumptions and projections
3. ACTIONABLE with concrete next steps and recommendations
4. COMPREHENSIVE yet focused on the most critical aspects
5. PERSONALIZED based on the target audience and market context

Always provide analysis that could only apply to this specific startup idea - never give generic advice.`;

  switch (analysisType) {
    case 'business-plan':
      return `${basePrompt}

Create a comprehensive business plan analysis including:
- Executive summary with key value propositions
- Market opportunity analysis with TAM/SAM/SOM
- Business model and revenue streams
- Competitive landscape and positioning
- Strategic roadmap with 12-18 month milestones
- Risk assessment and mitigation strategies
- Key success metrics and KPIs

Focus on actionable insights specific to this exact business concept.`;
    
    case 'marketing':
      return `${basePrompt}

Create a detailed marketing and growth strategy including:
- Target customer personas with specific demographics
- Go-to-market strategy and launch plan
- Customer acquisition channels and tactics
- Content marketing and brand positioning
- Pricing strategy and value communication
- Growth hacking opportunities
- Customer retention and lifecycle marketing
- Performance metrics and optimization

Provide specific tactics that would work for this exact business and target market.`;
    
    case 'technical':
      return `${basePrompt}

Create detailed technical specifications including:
- System architecture recommendations
- Technology stack selection with justification
- MVP feature prioritization and development roadmap
- Scalability planning and infrastructure requirements
- Security considerations and compliance needs
- Third-party integrations and APIs
- Development team structure and timeline
- Technical risks and mitigation strategies

Be specific about technologies and implementation approaches for this exact product.`;
    
    case 'financial':
      return `${basePrompt}

Create comprehensive financial projections including:
- Revenue model analysis and pricing strategy
- Customer acquisition cost (CAC) and lifetime value (LTV) projections
- Unit economics and contribution margins
- 3-year financial forecasts with monthly breakdown for Year 1
- Funding requirements and use of funds
- Break-even analysis and path to profitability
- Key financial metrics and benchmarks
- Scenario planning (conservative, realistic, optimistic)

Use realistic assumptions based on comparable businesses and market data.`;
    
    case 'competitive':
      return `${basePrompt}

Create a thorough competitive analysis including:
- Direct and indirect competitor identification
- Competitive positioning matrix
- Feature comparison and differentiation opportunities
- Pricing analysis and market positioning
- SWOT analysis for this specific business
- Competitive threats and defensive strategies
- Market share opportunity assessment
- Unique value proposition refinement

Focus on real competitors and specific differentiation strategies.`;
    
    case 'ux-design':
      return `${basePrompt}

Create detailed UX design specifications including:
- User persona development with specific use cases
- User journey mapping and pain point identification
- Information architecture and site mapping
- Wireframe descriptions for key user flows
- Interaction design principles and patterns
- Mobile responsiveness and accessibility requirements
- Usability testing recommendations
- Design system foundations

Provide specific design guidance tailored to this product and user base.`;
    
    case 'landing-page':
      return `${basePrompt}

Create a high-converting landing page strategy including:
- Compelling headline and value proposition copy
- Page structure and conversion flow optimization
- Social proof and trust signal recommendations
- Call-to-action placement and copy
- A/B testing opportunities
- Mobile optimization strategies
- SEO and performance considerations
- Conversion rate optimization tactics

Focus on messaging and positioning specific to this product and target audience.`;
    
    default:
      return basePrompt;
  }
}

function buildUserPrompt(
  idea: string, 
  companyName: string = '', 
  targetAudience: string = '', 
  problemStatement: string = '', 
  solution: string = '', 
  uniqueValue: string = '',
  marketResearch: string = '',
  analysisType: string
): string {
  return `
STARTUP CONCEPT ANALYSIS REQUEST

BUSINESS IDEA: ${idea}

COMPANY NAME: ${companyName || 'Not specified'}

TARGET AUDIENCE: ${targetAudience || 'Not specified - please make recommendations'}

PROBLEM STATEMENT: ${problemStatement || 'Not specified - analyze based on the idea'}

PROPOSED SOLUTION: ${solution || 'Not specified - analyze based on the idea'}

UNIQUE VALUE PROPOSITION: ${uniqueValue || 'Not specified - help define this'}

MARKET RESEARCH DATA:
${marketResearch || 'No external market data available - use your knowledge of similar markets'}

ANALYSIS TYPE: ${analysisType.replace('-', ' ').toUpperCase()}

Please provide a detailed ${analysisType.replace('-', ' ')} analysis for this specific startup concept. Make your analysis:

1. HIGHLY SPECIFIC to this exact business idea (not generic advice)
2. ACTIONABLE with concrete steps and recommendations
3. DATA-DRIVEN with realistic projections and assumptions
4. STRUCTURED with clear sections and bullet points
5. PROFESSIONAL yet accessible in tone

Include specific examples, numbers, timelines, and recommendations that apply uniquely to this business concept. Avoid generic startup advice - focus on insights that could only apply to this particular idea and market.

Format your response with clear headers and organized sections for maximum readability.
`;
}
