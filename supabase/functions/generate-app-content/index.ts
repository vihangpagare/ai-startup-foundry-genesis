
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AppContentRequest {
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
  features: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
  mockData: {
    users: Array<{
      name: string;
      role: string;
      status: string;
      lastActive: string;
    }>;
    metrics: Array<{
      name: string;
      value: string;
      change: string;
      trend: 'up' | 'down' | 'stable';
    }>;
    activities: Array<{
      user: string;
      action: string;
      time: string;
    }>;
  };
  companyData: {
    name: string;
    industry: string;
    description: string;
  };
}

const extractJsonFromResponse = (text: string): any => {
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('No JSON found in response');
  }
  
  const jsonText = text.substring(jsonStart, jsonEnd + 1);
  return JSON.parse(jsonText);
};

const generateAppContentPrompt = (startupData: any, reports: Record<string, string>, templates: any[]) => {
  return `You are an expert SaaS application designer and developer. Analyze this startup and generate comprehensive app content for a feature-rich web application.

STARTUP DATA:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Audience: ${startupData?.targetAudience || 'Not specified'}
- Problem Statement: ${startupData?.problemStatement || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}
- Unique Value: ${startupData?.uniqueValue || 'Not specified'}

BUSINESS REPORTS:
${Object.entries(reports).slice(0, 3).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 600)}...`
).join('\n\n')}

AVAILABLE APP TEMPLATES:
${templates.map(t => `- ${t.id}: ${t.name} (${t.category}) - ${t.description}`).join('\n')}

CRITICAL: You must respond with ONLY a valid JSON object, no additional text or explanation.

Generate business-specific app content that includes:
- Industry-appropriate feature set
- Realistic mock data for the business domain
- Business-specific metrics and KPIs
- Industry-relevant user roles and activities
- Technical capabilities aligned with business needs

Return this exact structure:
{
  "templateId": "best_matching_template_id",
  "reasoning": "Why this template and configuration is perfect for this business",
  "confidence": 0.9,
  "appName": "${startupData?.companyName || 'Business'} Platform",
  "features": [
    {
      "name": "Primary business feature",
      "description": "Core capability that solves main business problem",
      "icon": "appropriate_lucide_icon_name"
    },
    {
      "name": "Secondary business feature", 
      "description": "Supporting capability for business operations",
      "icon": "appropriate_lucide_icon_name"
    },
    {
      "name": "Analytics/Reporting feature",
      "description": "Business intelligence and reporting capability",
      "icon": "appropriate_lucide_icon_name"
    }
  ],
  "mockData": {
    "users": [
      {
        "name": "Realistic business user name",
        "role": "Business-appropriate role",
        "status": "Active",
        "lastActive": "2 minutes ago"
      },
      {
        "name": "Another business user",
        "role": "Different business role",
        "status": "Active", 
        "lastActive": "15 minutes ago"
      }
    ],
    "metrics": [
      {
        "name": "Key business metric",
        "value": "realistic_percentage_or_number",
        "change": "+percentage_change",
        "trend": "up"
      },
      {
        "name": "Secondary business KPI",
        "value": "realistic_value",
        "change": "+change_value",
        "trend": "up"
      }
    ],
    "activities": [
      {
        "user": "Business user name",
        "action": "Business-relevant action",
        "time": "few minutes ago"
      },
      {
        "user": "Another user",
        "action": "Different business action",
        "time": "hour ago"
      }
    ]
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your Company'}",
    "industry": "Primary business industry",
    "description": "Brief company description focusing on business value"
  }
}`;
};

const createFallbackAppContent = (startupData: any, templateId?: string): GeneratedAppContent => {
  return {
    templateId: templateId || 'advanced-saas-dashboard',
    reasoning: 'Using fallback app content due to AI generation failure',
    confidence: 0.7,
    appName: `${startupData?.companyName || 'Business'} Platform`,
    features: [
      {
        name: 'Dashboard Analytics',
        description: 'Comprehensive business metrics and performance tracking',
        icon: 'BarChart3'
      },
      {
        name: 'User Management',
        description: 'Complete user administration and access control',
        icon: 'Users'
      },
      {
        name: 'Reporting System',
        description: 'Advanced reporting and data visualization tools',
        icon: 'FileText'
      }
    ],
    mockData: {
      users: [
        {
          name: 'Sarah Johnson',
          role: 'Administrator',
          status: 'Active',
          lastActive: '2 minutes ago'
        },
        {
          name: 'Mike Chen',
          role: 'Manager',
          status: 'Active',
          lastActive: '15 minutes ago'
        }
      ],
      metrics: [
        {
          name: 'Active Users',
          value: '94%',
          change: '+12%',
          trend: 'up'
        },
        {
          name: 'Performance',
          value: '87%',
          change: '+8%',
          trend: 'up'
        }
      ],
      activities: [
        {
          user: 'Sarah Johnson',
          action: 'Updated system settings',
          time: '2 minutes ago'
        },
        {
          user: 'Mike Chen',
          action: 'Generated monthly report',
          time: '1 hour ago'
        }
      ]
    },
    companyData: {
      name: startupData?.companyName || 'Your Company',
      industry: 'Technology',
      description: startupData?.idea || 'Innovative business platform solution'
    }
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OPENAI_API_KEY not configured');
      throw new Error('OPENAI_API_KEY not configured');
    }

    const { startupData, reports, templates, targetTemplateId }: AppContentRequest = await req.json();
    
    console.log('Generating app content for:', {
      company: startupData?.companyName,
      targetTemplate: targetTemplateId,
      reportsCount: Object.keys(reports || {}).length,
      templatesCount: templates?.length || 0
    });

    const prompt = generateAppContentPrompt(startupData, reports || {}, templates || []);
    
    console.log('Calling OpenAI API for app content generation...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 3000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received, parsing content...');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Invalid OpenAI API response structure:', data);
      throw new Error('Invalid response structure from OpenAI API');
    }

    let generatedContent: GeneratedAppContent;
    try {
      generatedContent = extractJsonFromResponse(data.choices[0].message.content);
      console.log('Successfully parsed JSON from OpenAI response');
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError.message);
      console.error('Raw response:', data.choices[0].message.content);
      
      // Use fallback content
      console.log('Using fallback content due to JSON parsing failure');
      generatedContent = createFallbackAppContent(startupData, targetTemplateId);
    }

    // Validate generated content has required fields
    if (!generatedContent.features || !generatedContent.mockData || !generatedContent.companyData) {
      console.error('Generated content missing required fields:', generatedContent);
      generatedContent = createFallbackAppContent(startupData, generatedContent.templateId);
    }

    console.log('Successfully generated app content:', {
      templateId: generatedContent.templateId,
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
      const fallbackContent = createFallbackAppContent(startupData || {}, targetTemplateId);
      
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
        error: error.message || 'App content generation failed'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
});
