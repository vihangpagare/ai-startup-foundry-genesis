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
  return `You are an expert SaaS marketing consultant and web designer. Analyze this startup and select the best SaaS-focused landing page template with AI-generated content.

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

AVAILABLE SaaS TEMPLATES:
${templates.map(t => `- ${t.id}: ${t.name} (${t.category}) - ${t.description} [Complexity: ${t.complexity}]`).join('\n')}

CRITICAL: You must respond with ONLY a valid JSON object, no additional text or explanation. 

Focus on SaaS-specific content that emphasizes:
- Technical capabilities and features
- Business benefits and ROI
- Scalability and performance
- Security and compliance
- Integration capabilities
- Data analytics and insights
- Team collaboration features
- Enterprise-grade solutions

Return this exact structure:
{
  "templateId": "selected_template_id",
  "reasoning": "Why this template is perfect for this SaaS startup, focusing on technical and business alignment",
  "confidence": 0.95,
  "fields": {
    "heroTitle": "Compelling SaaS headline that emphasizes transformation and business value",
    "heroSubtitle": "Clear value proposition highlighting technical capabilities, business benefits, and competitive advantages",
    "ctaText": "Action-oriented CTA specific to SaaS (e.g., 'Start Free Trial', 'Get Demo', 'Scale Your Business')",
    "feature1Title": "Primary technical capability or core feature",
    "feature1Description": "Detailed description emphasizing business impact and technical superiority",
    "feature2Title": "Secondary key feature or integration capability", 
    "feature2Description": "Technical feature with clear business benefits and competitive advantages",
    "feature3Title": "Enterprise or scalability feature",
    "feature3Description": "Security, compliance, or enterprise-grade capability description"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your Company'}",
    "tagline": "Brief, memorable SaaS tagline emphasizing transformation or efficiency",
    "description": "One-sentence company description highlighting SaaS value proposition",
    "industry": "Primary SaaS vertical or industry focus"
  },
  "colorScheme": {
    "primary": "#3B82F6",
    "secondary": "#1E40AF", 
    "accent": "#10B981"
  }
}`;
};

const generateSpecificContentPrompt = (startupData: any, reports: Record<string, string>, template: any) => {
  return `You are an expert SaaS copywriter specializing in ${template.category} landing pages. Generate highly personalized, conversion-optimized content for this specific SaaS template and startup.

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

TEMPLATE: ${template.name} (${template.category}) - ${template.description}
Template Complexity: ${template.complexity}
Template Features: ${template.features?.join(', ') || 'Standard SaaS features'}

CRITICAL: You must respond with ONLY a valid JSON object, no additional text or explanation.

Create SaaS-focused content that includes:
- Technical differentiation and competitive advantages
- Specific business metrics and ROI implications
- Industry-specific use cases and benefits
- Integration and scalability messaging
- Security and compliance assurances
- Team productivity and collaboration benefits

Return this exact structure:
{
  "fields": {
    "heroTitle": "Powerful SaaS headline specific to this startup's value proposition and industry",
    "heroSubtitle": "Compelling value proposition that addresses target audience pain points with specific business benefits and technical capabilities",
    "ctaText": "Conversion-optimized CTA tailored to their SaaS business model and user journey",
    "feature1Title": "Primary SaaS capability that drives core business value",
    "feature1Description": "How this feature solves specific customer problems with measurable business impact",
    "feature2Title": "Secondary technical or business capability",
    "feature2Description": "Technical or business benefit with specific industry applications", 
    "feature3Title": "Enterprise, security, or scalability differentiator",
    "feature3Description": "What makes this SaaS solution unique in their market with competitive advantages"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your Company'}",
    "tagline": "Memorable SaaS tagline that captures the transformation or efficiency promise",
    "description": "One compelling sentence about what the SaaS company does and its primary value",
    "industry": "Primary SaaS industry vertical or market segment"
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
