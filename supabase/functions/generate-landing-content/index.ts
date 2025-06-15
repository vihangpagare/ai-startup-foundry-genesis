
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContentGenerationRequest {
  startupData: any;
  reports: Record<string, string>;
  templates: any[];
  targetTemplateId?: string;
}

interface GeneratedContent {
  templateId: string;
  reasoning: string;
  confidence: number;
  fields: Record<string, string>;
  companyData: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
  };
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const extractJsonFromResponse = (text: string): any => {
  // Try to find JSON in the response, handling cases where Claude adds extra text
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('No JSON found in response');
  }
  
  const jsonText = text.substring(jsonStart, jsonEnd + 1);
  return JSON.parse(jsonText);
};

const generateTemplateAnalysisPrompt = (startupData: any, reports: Record<string, string>, templates: any[]) => {
  return `You are an expert marketing consultant and web designer. Analyze this startup and select the best landing page template with AI-generated content.

STARTUP DATA:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Audience: ${startupData?.targetAudience || 'Not specified'}
- Problem Statement: ${startupData?.problemStatement || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}
- Unique Value: ${startupData?.uniqueValue || 'Not specified'}

GENERATED REPORTS:
${Object.entries(reports).slice(0, 3).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 800)}...`
).join('\n\n')}

AVAILABLE TEMPLATES:
${templates.map(t => `- ${t.id}: ${t.name} (${t.category}) - ${t.description}`).join('\n')}

CRITICAL: You must respond with ONLY a valid JSON object, no additional text or explanation. 

Return this exact structure:
{
  "templateId": "selected_template_id",
  "reasoning": "Why this template is perfect for this startup",
  "confidence": 0.95,
  "fields": {
    "heroTitle": "Compelling headline specific to this startup",
    "heroSubtitle": "Clear value proposition that resonates with target audience",
    "ctaText": "Action-oriented CTA button text",
    "feature1Title": "First key feature/benefit",
    "feature1Description": "Detailed description of first feature",
    "feature2Title": "Second key feature/benefit", 
    "feature2Description": "Detailed description of second feature",
    "feature3Title": "Third key feature/benefit",
    "feature3Description": "Detailed description of third feature"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your Company'}",
    "tagline": "Brief, memorable tagline",
    "description": "One-sentence company description",
    "industry": "Primary industry"
  },
  "colorScheme": {
    "primary": "#3B82F6",
    "secondary": "#1E40AF", 
    "accent": "#10B981"
  }
}`;
};

const generateSpecificContentPrompt = (startupData: any, reports: Record<string, string>, template: any) => {
  return `You are an expert copywriter specializing in ${template.category} landing pages. Generate highly personalized content for this specific template and startup.

STARTUP DETAILS:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Audience: ${startupData?.targetAudience || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}
- Unique Value: ${startupData?.uniqueValue || 'Not specified'}

BUSINESS REPORTS:
${Object.entries(reports).slice(0, 2).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 600)}...`
).join('\n\n')}

TEMPLATE: ${template.name} (${template.category})

CRITICAL: You must respond with ONLY a valid JSON object, no additional text or explanation.

Return this exact structure:
{
  "fields": {
    "heroTitle": "Unique, compelling headline for this specific startup",
    "heroSubtitle": "Value proposition that speaks directly to target audience pain points",
    "ctaText": "Conversion-optimized CTA for their business model",
    "feature1Title": "Primary capability/benefit",
    "feature1Description": "How this feature solves customer problems specifically",
    "feature2Title": "Secondary capability/benefit",
    "feature2Description": "Technical or business benefit explained clearly", 
    "feature3Title": "Competitive advantage/differentiator",
    "feature3Description": "What makes this startup unique in their market"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your Company'}",
    "tagline": "Memorable tagline that captures the essence",
    "description": "One compelling sentence about what the company does",
    "industry": "Primary industry/vertical"
  }
}`;
};

const createFallbackContent = (startupData: any, templateId: string): GeneratedContent => {
  return {
    templateId: templateId || 'modern-saas',
    reasoning: 'Using fallback content due to AI generation failure',
    confidence: 0.7,
    fields: {
      heroTitle: `Transform Your Business with ${startupData?.companyName || 'Our Solution'}`,
      heroSubtitle: startupData?.solution || 'Innovative solutions that drive growth and success',
      ctaText: 'Get Started Today',
      feature1Title: 'Easy to Use',
      feature1Description: 'Intuitive interface designed for maximum productivity',
      feature2Title: 'Powerful Features',
      feature2Description: 'Advanced capabilities to meet your business needs',
      feature3Title: 'Reliable Support',
      feature3Description: '24/7 customer support to help you succeed'
    },
    companyData: {
      name: startupData?.companyName || 'Your Company',
      tagline: 'Innovation that drives results',
      description: startupData?.idea || 'Transforming businesses with cutting-edge solutions',
      industry: startupData?.targetAudience || 'Technology'
    },
    colorScheme: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#10B981'
    }
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!anthropicApiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const { startupData, reports, templates, targetTemplateId }: ContentGenerationRequest = await req.json();
    
    console.log('Generating content for:', {
      company: startupData?.companyName,
      targetTemplate: targetTemplateId,
      reportsCount: Object.keys(reports || {}).length,
      templatesCount: templates?.length || 0
    });

    let generatedContent: GeneratedContent;

    if (targetTemplateId) {
      // Generate content for specific template
      const template = templates.find(t => t.id === targetTemplateId);
      if (!template) {
        console.error(`Template ${targetTemplateId} not found`);
        throw new Error(`Template ${targetTemplateId} not found`);
      }

      const prompt = generateSpecificContentPrompt(startupData, reports || {}, template);
      
      console.log('Calling Claude API for specific template content...');
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      console.log('Claude API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API error response:', errorText);
        throw new Error(`Claude API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Claude API response received, parsing content...');
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        console.error('Invalid Claude API response structure:', data);
        throw new Error('Invalid response structure from Claude API');
      }

      let content;
      try {
        content = extractJsonFromResponse(data.content[0].text);
        console.log('Successfully parsed JSON from Claude response');
      } catch (parseError) {
        console.error('JSON parsing failed:', parseError.message);
        console.error('Raw response:', data.content[0].text);
        
        // Use fallback content
        console.log('Using fallback content due to JSON parsing failure');
        generatedContent = createFallbackContent(startupData, targetTemplateId);
      }
      
      if (content) {
        generatedContent = {
          templateId: targetTemplateId,
          reasoning: `Generated content specifically for ${template.name} template`,
          confidence: 0.9,
          ...content,
          colorScheme: {
            primary: '#3B82F6',
            secondary: '#1E40AF', 
            accent: '#10B981'
          }
        };
      }

    } else {
      // AI template selection + content generation
      const prompt = generateTemplateAnalysisPrompt(startupData, reports || {}, templates || []);
      
      console.log('Calling Claude API for template selection and content generation...');
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 3000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      console.log('Claude API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API error response:', errorText);
        throw new Error(`Claude API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Claude API response received, parsing content...');
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        console.error('Invalid Claude API response structure:', data);
        throw new Error('Invalid response structure from Claude API');
      }

      try {
        generatedContent = extractJsonFromResponse(data.content[0].text);
        console.log('Successfully parsed JSON from Claude response');
      } catch (parseError) {
        console.error('JSON parsing failed:', parseError.message);
        console.error('Raw response:', data.content[0].text);
        
        // Use fallback content with first available template
        const fallbackTemplateId = templates?.[0]?.id || 'modern-saas';
        console.log('Using fallback content due to JSON parsing failure');
        generatedContent = createFallbackContent(startupData, fallbackTemplateId);
      }
    }

    // Validate generated content has required fields
    if (!generatedContent.fields || !generatedContent.companyData) {
      console.error('Generated content missing required fields:', generatedContent);
      generatedContent = createFallbackContent(startupData, generatedContent.templateId);
    }

    console.log('Successfully generated content:', {
      templateId: generatedContent.templateId,
      confidence: generatedContent.confidence,
      fieldsCount: Object.keys(generatedContent.fields).length
    });

    return new Response(JSON.stringify({
      success: true,
      content: generatedContent
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Content generation error:', error);
    
    // Try to provide fallback content even on complete failure
    try {
      const { startupData, targetTemplateId } = await req.json().catch(() => ({}));
      const fallbackContent = createFallbackContent(startupData || {}, targetTemplateId || 'modern-saas');
      
      return new Response(JSON.stringify({
        success: true,
        content: fallbackContent,
        warning: 'Used fallback content due to AI generation failure'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (fallbackError) {
      console.error('Fallback content generation failed:', fallbackError);
      
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Content generation failed'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
});
