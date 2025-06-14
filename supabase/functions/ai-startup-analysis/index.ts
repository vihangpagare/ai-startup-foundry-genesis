
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { AnalysisRequest, AnalysisResponse } from './types.ts';
import { fetchMarketResearch, fetchCompetitorAnalysis, fetchIndustryInsights } from './research.ts';
import { generateAnalysis } from './ai-service.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get API keys from environment variables (Supabase secrets)
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    const exaApiKey = Deno.env.get('EXA_API_KEY');
    
    console.log('API Keys check:', {
      anthropic: anthropicApiKey ? 'Present' : 'Missing',
      exa: exaApiKey ? 'Present' : 'Missing',
      anthropicKeyLength: anthropicApiKey?.length || 0,
      exaKeyLength: exaApiKey?.length || 0
    });

    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const request: AnalysisRequest = await req.json();
    console.log('Analysis request:', { idea: request.idea?.substring(0, 100), analysisType: request.analysisType });

    // Get comprehensive market research data using Exa API if available
    let comprehensiveResearch = '';
    if (exaApiKey && request.analysisType !== 'landing-page') {
      console.log('Fetching comprehensive market research...');
      
      // Fetch different types of research based on analysis type
      const marketResearch = await fetchMarketResearch(request.idea, exaApiKey);
      
      if (request.analysisType === 'competitive') {
        const competitorAnalysis = await fetchCompetitorAnalysis(request.idea, exaApiKey);
        comprehensiveResearch = `${marketResearch}\n\n${competitorAnalysis}`;
      } else if (request.analysisType === 'business-plan' || request.analysisType === 'marketing') {
        const industryInsights = await fetchIndustryInsights(request.idea, exaApiKey);
        comprehensiveResearch = `${marketResearch}\n\n${industryInsights}`;
      } else {
        comprehensiveResearch = marketResearch;
      }
      
      console.log('Total research data length:', comprehensiveResearch.length);
    } else {
      console.log('Exa API not available or landing page generation - proceeding without research');
    }

    // Generate AI analysis using Claude with enhanced research
    const analysis = await generateAnalysis(request, comprehensiveResearch, anthropicApiKey);

    const response: AnalysisResponse = {
      success: true,
      analysis,
      marketData: comprehensiveResearch ? `Enhanced research included (${comprehensiveResearch.length} chars)` : 'Not available'
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-startup-analysis:', error);
    
    const errorResponse: AnalysisResponse = {
      success: false,
      error: error.message
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
