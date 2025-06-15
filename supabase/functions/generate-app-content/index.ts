
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AppContentGenerationRequest {
  startupData: any;
  reports: Record<string, string>;
  templates: any[];
  targetTemplateId?: string;
}

interface GeneratedAppContent {
  templateId: string;
  reasoning: string;
  confidence: number;
  appName: string;
  appDescription: string;
  fields: Record<string, string>;
  companyData: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
  };
  mockData: Record<string, any[]>;
  features: string[];
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const extractJsonFromResponse = (text: string): any => {
  // Find JSON in the response, handling cases where Claude adds extra text
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('No JSON found in response');
  }
  
  const jsonText = text.substring(jsonStart, jsonEnd + 1);
  return JSON.parse(jsonText);
};

const generateAppAnalysisPrompt = (startupData: any, reports: Record<string, string>, templates: any[]) => {
  return `You are an expert app developer and UX designer. Analyze this startup and select the best app template with AI-generated content for a 3-page web application.

STARTUP DATA:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Audience: ${startupData?.targetAudience || 'Not specified'}
- Problem Statement: ${startupData?.problemStatement || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}
- Unique Value: ${startupData?.uniqueValue || 'Not specified'}

BUSINESS ANALYSIS REPORTS:
${Object.entries(reports).slice(0, 3).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 1000)}...`
).join('\n\n')}

AVAILABLE APP TEMPLATES:
${templates.map(t => `- ${t.id}: ${t.name} (${t.category}) - ${t.description}`).join('\n')}

CRITICAL: You must respond with ONLY a valid JSON object, no additional text or explanation.

Analyze the startup data and reports to select the most appropriate app template and generate personalized content for a functional 3-page application.

Return this exact structure:
{
  "templateId": "selected_template_id",
  "reasoning": "Why this app template is perfect for this startup's core functionality",
  "confidence": 0.95,
  "appName": "${startupData?.companyName || 'Your App'} Dashboard",
  "appDescription": "Brief description of what this app does for users",
  "fields": {
    "appName": "Personalized app name based on the startup",
    "primaryMetric": "Main KPI this startup should track",
    "featureTitle": "Core feature that solves the main problem",
    "storeName": "Brand name for the marketplace/store",
    "productCategory": "Main product/service category",
    "platformName": "Platform name for service marketplace",
    "serviceType": "Primary service offering"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your Company'}",
    "tagline": "Compelling tagline that captures the essence",
    "description": "One-sentence description of what the app does",
    "industry": "Primary industry vertical"
  },
  "mockData": {
    "users": [
      {"name": "Realistic user based on target audience", "role": "User role", "status": "Active"},
      {"name": "Another realistic user", "role": "Different role", "status": "Pending"}
    ],
    "products": [
      {"name": "Product/service relevant to the startup", "price": "$XX.XX", "category": "Relevant category"},
      {"name": "Another relevant offering", "price": "$XX.XX", "category": "Another category"}
    ],
    "metrics": [
      {"name": "Key metric for this business", "value": "Realistic value", "change": "+X%"},
      {"name": "Important KPI", "value": "Realistic value", "change": "+X%"}
    ]
  },
  "features": [
    "Core feature that solves main problem",
    "Secondary feature for user engagement",
    "Additional feature for business growth"
  ],
  "colorScheme": {
    "primary": "#3B82F6",
    "secondary": "#1E40AF",
    "accent": "#10B981"
  }
}`;
};

const generateSpecificAppContentPrompt = (startupData: any, reports: Record<string, string>, template: any) => {
  return `You are an expert app developer specializing in ${template.category} applications. Generate highly personalized content for this specific 3-page app template.

STARTUP DETAILS:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Audience: ${startupData?.targetAudience || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}
- Unique Value: ${startupData?.uniqueValue || 'Not specified'}

BUSINESS REPORTS:
${Object.entries(reports).slice(0, 2).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 800)}...`
).join('\n\n')}

APP TEMPLATE: ${template.name} (${template.category})
PAGES: 3-page application with interactive functionality

CRITICAL: You must respond with ONLY a valid JSON object, no additional text or explanation.

Return this exact structure:
{
  "appName": "Personalized app name that reflects the startup's core functionality",
  "appDescription": "Clear description of what this 3-page app does for users",
  "fields": {
    "appName": "App name tailored to the startup",
    "primaryMetric": "Most important KPI this startup should track",
    "featureTitle": "Core feature that solves the main customer problem",
    "storeName": "Brand name if applicable",
    "productCategory": "Main category of products/services",
    "platformName": "Platform name if marketplace",
    "serviceType": "Primary service type if service platform"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your Company'}",
    "tagline": "Compelling tagline that captures the startup's value",
    "description": "One sentence about what the app accomplishes",
    "industry": "Primary industry/market"
  },
  "mockData": {
    "users": [
      {"name": "Realistic user name for target audience", "role": "User type", "status": "Active"},
      {"name": "Another target user", "role": "Different role", "status": "Pending"}
    ],
    "products": [
      {"name": "Product/service relevant to startup", "price": "Realistic price", "category": "Relevant category"},
      {"name": "Secondary offering", "price": "Realistic price", "category": "Related category"}
    ],
    "metrics": [
      {"name": "Key business metric", "value": "Realistic value", "change": "+X%"},
      {"name": "Important KPI", "value": "Realistic value", "change": "+X%"}
    ]
  },
  "features": [
    "Primary feature that addresses main problem",
    "Secondary feature for user engagement",
    "Additional feature for business growth"
  ]
}`;
};

const createFallbackAppContent = (startupData: any, templateId: string): GeneratedAppContent => {
  return {
    templateId: templateId || 'saas-dashboard',
    reasoning: 'Using fallback content due to AI generation failure',
    confidence: 0.7,
    appName: `${startupData?.companyName || 'Your'} Dashboard`,
    appDescription: 'A comprehensive dashboard application for managing your business',
    fields: {
      appName: `${startupData?.companyName || 'Your Company'} Dashboard`,
      primaryMetric: 'Total Users',
      featureTitle: 'Core Features',
      storeName: startupData?.companyName || 'Your Store',
      productCategory: 'Products',
      platformName: startupData?.companyName || 'Your Platform',
      serviceType: 'Services'
    },
    companyData: {
      name: startupData?.companyName || 'Your Company',
      tagline: 'Driving innovation and growth',
      description: startupData?.idea || 'A powerful application for business success',
      industry: startupData?.targetAudience || 'Technology'
    },
    mockData: {
      users: [
        { name: 'John Smith', role: 'Admin', status: 'Active' },
        { name: 'Sarah Johnson', role: 'User', status: 'Active' }
      ],
      products: [
        { name: 'Premium Service', price: '$99.99', category: 'Professional' },
        { name: 'Basic Service', price: '$49.99', category: 'Standard' }
      ],
      metrics: [
        { name: 'Total Users', value: '1,234', change: '+12%' },
        { name: 'Revenue', value: '$45,678', change: '+8%' }
      ]
    },
    features: [
      'User Management',
      'Analytics Dashboard',
      'Settings & Configuration'
    ],
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

    const { startupData, reports, templates, targetTemplateId }: AppContentGenerationRequest = await req.json();
    
    console.log('Generating app content for:', {
      company: startupData?.companyName,
      targetTemplate: targetTemplateId,
      reportsCount: Object.keys(reports || {}).length,
      templatesCount: templates?.length || 0
    });

    let generatedContent: GeneratedAppContent;

    if (targetTemplateId) {
      // Generate content for specific template
      const template = templates.find(t => t.id === targetTemplateId);
      if (!template) {
        console.error(`App template ${targetTemplateId} not found`);
        throw new Error(`App template ${targetTemplateId} not found`);
      }

      const prompt = generateSpecificAppContentPrompt(startupData, reports || {}, template);
      
      console.log('Calling Claude API for specific app template content...');
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

      let content;
      try {
        content = extractJsonFromResponse(data.content[0].text);
        console.log('Successfully parsed JSON from Claude response');
      } catch (parseError) {
        console.error('JSON parsing failed:', parseError.message);
        console.error('Raw response:', data.content[0].text);
        
        // Use fallback content
        console.log('Using fallback app content due to JSON parsing failure');
        generatedContent = createFallbackAppContent(startupData, targetTemplateId);
      }
      
      if (content) {
        generatedContent = {
          templateId: targetTemplateId,
          reasoning: `Generated app content specifically for ${template.name} template`,
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
      const prompt = generateAppAnalysisPrompt(startupData, reports || {}, templates || []);
      
      console.log('Calling Claude API for app template selection and content generation...');
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
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
        const fallbackTemplateId = templates?.[0]?.id || 'saas-dashboard';
        console.log('Using fallback app content due to JSON parsing failure');
        generatedContent = createFallbackAppContent(startupData, fallbackTemplateId);
      }
    }

    // Validate generated content has required fields
    if (!generatedContent.fields || !generatedContent.companyData || !generatedContent.mockData) {
      console.error('Generated app content missing required fields:', generatedContent);
      generatedContent = createFallbackAppContent(startupData, generatedContent.templateId);
    }

    console.log('Successfully generated app content:', {
      templateId: generatedContent.templateId,
      confidence: generatedContent.confidence,
      appName: generatedContent.appName,
      featuresCount: generatedContent.features?.length || 0
    });

    return new Response(JSON.stringify({
      success: true,
      content: generatedContent
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('App content generation error:', error);
    
    // Try to provide fallback content even on complete failure
    try {
      const { startupData, targetTemplateId } = await req.json().catch(() => ({}));
      const fallbackContent = createFallbackAppContent(startupData || {}, targetTemplateId || 'saas-dashboard');
      
      return new Response(JSON.stringify({
        success: true,
        content: fallbackContent,
        warning: 'Used fallback app content due to AI generation failure'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (fallbackError) {
      console.error('Fallback app content generation failed:', fallbackError);
      
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'App content generation failed'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
});
