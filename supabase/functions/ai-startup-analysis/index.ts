import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { AnalysisRequest, AnalysisResponse } from './types.ts';
import { fetchMarketResearch, fetchCompetitorAnalysis, fetchIndustryInsights } from './research.ts';
import { generateAnalysis } from './ai-service.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting state
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 3000; // 3 seconds between requests
let requestCount = 0;
const MAX_REQUESTS_PER_MINUTE = 15;

// Simple in-memory cache for research data
const researchCache = new Map<string, { data: string; timestamp: number }>();
const CACHE_TTL = 1800000; // 30 minutes

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getRateLimitDelay = (): number => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    return MIN_REQUEST_INTERVAL - timeSinceLastRequest;
  }
  
  // Exponential backoff based on request count
  if (requestCount > 10) {
    return 5000 + (requestCount - 10) * 1000; // Start with 5s, add 1s per extra request
  }
  
  return 0;
};

const summarizeResearchData = (data: string, maxLength: number = 8000): string => {
  if (data.length <= maxLength) return data;
  
  // Split into paragraphs and keep the most relevant ones
  const paragraphs = data.split('\n\n');
  let result = '';
  let currentLength = 0;
  
  // Prioritize paragraphs with key business terms
  const keyTerms = ['market', 'revenue', 'growth', 'competitor', 'trend', 'analysis', 'opportunity'];
  const prioritizedParagraphs = paragraphs.sort((a, b) => {
    const aScore = keyTerms.reduce((score, term) => 
      score + (a.toLowerCase().includes(term) ? 1 : 0), 0);
    const bScore = keyTerms.reduce((score, term) => 
      score + (b.toLowerCase().includes(term) ? 1 : 0), 0);
    return bScore - aScore;
  });
  
  for (const paragraph of prioritizedParagraphs) {
    if (currentLength + paragraph.length <= maxLength) {
      result += paragraph + '\n\n';
      currentLength += paragraph.length;
    } else {
      // Add partial paragraph if there's space
      const remainingSpace = maxLength - currentLength;
      if (remainingSpace > 100) {
        result += paragraph.substring(0, remainingSpace - 3) + '...';
      }
      break;
    }
  }
  
  return result.trim();
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Implement rate limiting
    const delayMs = getRateLimitDelay();
    if (delayMs > 0) {
      console.log(`Rate limiting: waiting ${delayMs}ms before processing request`);
      await delay(delayMs);
    }
    
    lastRequestTime = Date.now();
    requestCount = Math.min(requestCount + 1, MAX_REQUESTS_PER_MINUTE);
    
    // Reset request count every minute
    setTimeout(() => {
      requestCount = Math.max(0, requestCount - 1);
    }, 60000);

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    const exaApiKey = Deno.env.get('EXA_API_KEY');
    
    console.log('API Keys check:', {
      anthropic: anthropicApiKey ? 'Present' : 'Missing',
      exa: exaApiKey ? 'Present' : 'Missing'
    });

    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const request: AnalysisRequest = await req.json();
    console.log('Analysis request:', { 
      idea: request.idea?.substring(0, 50) + '...', 
      analysisType: request.analysisType 
    });

    // Check cache first
    const cacheKey = `${request.idea}-${request.analysisType}`;
    const cached = researchCache.get(cacheKey);
    let comprehensiveResearch = '';
    
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      console.log('Using cached research data');
      comprehensiveResearch = cached.data;
    } else if (exaApiKey && request.analysisType !== 'landing-page') {
      console.log('Fetching fresh market research...');
      
      try {
        // Limit research data to prevent token overflow
        const marketResearch = await fetchMarketResearch(request.idea, exaApiKey);
        let researchData = marketResearch;
        
        if (request.analysisType === 'competitive') {
          const competitorAnalysis = await fetchCompetitorAnalysis(request.idea, exaApiKey);
          researchData = `${marketResearch}\n\n${competitorAnalysis}`;
        } else if (request.analysisType === 'business-plan' || request.analysisType === 'marketing') {
          const industryInsights = await fetchIndustryInsights(request.idea, exaApiKey);
          researchData = `${marketResearch}\n\n${industryInsights}`;
        }
        
        // Summarize to manageable size
        comprehensiveResearch = summarizeResearchData(researchData, 8000);
        
        // Cache the summarized data
        researchCache.set(cacheKey, {
          data: comprehensiveResearch,
          timestamp: Date.now()
        });
        
        console.log('Research data summarized:', {
          original: researchData.length,
          summarized: comprehensiveResearch.length
        });
        
      } catch (researchError) {
        console.warn('Research fetch failed, proceeding without:', researchError.message);
        comprehensiveResearch = '';
      }
    }

    // Generate AI analysis with retry logic
    let analysis;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        analysis = await generateAnalysis(request, comprehensiveResearch, anthropicApiKey);
        break;
      } catch (error) {
        attempts++;
        console.error(`Analysis attempt ${attempts} failed:`, error.message);
        
        if (error.message.includes('rate limit') || error.message.includes('429')) {
          if (attempts < maxAttempts) {
            const backoffDelay = Math.min(2000 * Math.pow(2, attempts), 30000); // Exponential backoff, max 30s
            console.log(`Rate limit hit, waiting ${backoffDelay}ms before retry ${attempts + 1}`);
            await delay(backoffDelay);
            continue;
          } else {
            // Final attempt with minimal context
            console.log('Final attempt with reduced context');
            analysis = await generateAnalysis(request, '', anthropicApiKey);
            break;
          }
        } else if (attempts >= maxAttempts) {
          throw error;
        }
        
        // For other errors, wait briefly before retry
        await delay(1000 * attempts);
      }
    }

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
      status: error.message.includes('rate limit') ? 429 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
