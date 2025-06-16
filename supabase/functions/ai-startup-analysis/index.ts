
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'
import { generateAnalysis } from './ai-service.ts'
import { AnalysisRequest } from './types.ts'
import { getMarketResearch } from './market-research.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      console.error('OPENAI_API_KEY not configured')
      throw new Error('OpenAI API key not configured')
    }

    const request: AnalysisRequest = await req.json()
    console.log('Analysis request received:', {
      analysisType: request.analysisType,
      companyName: request.companyName,
      ideaLength: request.idea?.length
    })

    // Validate required fields
    if (!request.idea || !request.analysisType) {
      throw new Error('Missing required fields: idea and analysisType')
    }

    // Get market research data with error handling
    let marketResearch = ''
    try {
      const exaApiKey = Deno.env.get('EXA_API_KEY')
      if (exaApiKey) {
        console.log('Fetching market research...')
        marketResearch = await getMarketResearch(request, exaApiKey)
        console.log('Market research completed, length:', marketResearch.length)
      } else {
        console.log('EXA_API_KEY not available, proceeding without market research')
      }
    } catch (error) {
      console.warn('Market research failed, proceeding without it:', error.message)
      marketResearch = 'Market research data temporarily unavailable. Analysis based on provided startup data.'
    }

    // Generate analysis using OpenAI
    console.log('Starting analysis generation with OpenAI...')
    const analysis = await generateAnalysis(request, marketResearch, openaiApiKey)
    
    if (!analysis || analysis.trim().length === 0) {
      throw new Error('Generated analysis is empty')
    }

    console.log('Analysis generation completed successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis,
        marketResearchLength: marketResearch.length
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in ai-startup-analysis function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Analysis generation failed',
        details: error.stack
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
