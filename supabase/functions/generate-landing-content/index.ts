
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
${Object.entries(reports).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 1000)}...`
).join('\n\n')}

AVAILABLE TEMPLATES:
${templates.map(t => `- ${t.id}: ${t.name} (${t.category}) - ${t.description}`).join('\n')}

TASK: 
1. Analyze the startup's business model, industry, and target audience
2. Select the BEST template that matches their needs
3. Generate compelling, personalized content for ALL template fields
4. Provide reasoning for your template selection
5. Suggest appropriate brand colors based on industry and positioning

REQUIREMENTS:
- Hero title should be compelling and unique to this startup
- Hero subtitle should clearly communicate the value proposition
- Features should be based on actual capabilities mentioned in reports
- All content should match the target audience's language and needs
- CTA text should be conversion-optimized for their business model
- Content length should fit typical template constraints

Return your response as a JSON object with this structure:
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
    "name": "Company name",
    "tagline": "Brief, memorable tagline",
    "description": "One-sentence company description",
    "industry": "Primary industry"
  },
  "colorScheme": {
    "primary": "#hex_color",
    "secondary": "#hex_color", 
    "accent": "#hex_color"
  }
}

Focus on making the content highly specific to this startup, not generic template text.`;
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
${Object.entries(reports).slice(0, 3).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 800)}...`
).join('\n\n')}

TEMPLATE: ${template.name} (${template.category})
DESCRIPTION: ${template.description}
FEATURES: ${template.features?.join(', ') || 'Standard features'}

REQUIREMENTS:
- Generate content that specifically reflects this startup's unique value proposition
- Use industry-appropriate language for "${startupData?.targetAudience}"
- Create compelling headlines that differentiate from competitors
- Write feature descriptions based on actual capabilities mentioned in reports
- Ensure all content works together to tell a cohesive story
- Optimize for conversion in the ${template.category} space

Return ONLY a JSON object:
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const { startupData, reports, templates, targetTemplateId }: ContentGenerationRequest = await req.json();
    
    console.log('Generating content for:', {
      company: startupData?.companyName,
      targetTemplate: targetTemplateId,
      reportsCount: Object.keys(reports).length
    });

    let generatedContent: GeneratedContent;

    if (targetTemplateId) {
      // Generate content for specific template
      const template = templates.find(t => t.id === targetTemplateId);
      if (!template) {
        throw new Error(`Template ${targetTemplateId} not found`);
      }

      const prompt = generateSpecificContentPrompt(startupData, reports, template);
      
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Claude API error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = JSON.parse(data.content[0].text);
      
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

    } else {
      // AI template selection + content generation
      const prompt = generateTemplateAnalysisPrompt(startupData, reports, templates);
      
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Claude API error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      generatedContent = JSON.parse(data.content[0].text);
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
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
