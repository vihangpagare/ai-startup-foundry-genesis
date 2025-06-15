
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
  businessModel: string;
  coreFeatures: string[];
  userPersonas: any[];
  workflows: any[];
  fields: Record<string, string>;
  companyData: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
  };
  mockData: Record<string, any[]>;
  features: string[];
  pages: any[];
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
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

const detectBusinessModelTemplate = (startupData: any, reports: Record<string, string>): string => {
  const idea = (startupData?.idea || '').toLowerCase();
  const businessPlan = (reports['business-plan'] || '').toLowerCase();
  const combined = `${idea} ${businessPlan}`;

  // Smart business model detection with existing template mapping
  if (combined.includes('inventory') || combined.includes('stock') || combined.includes('supply') || combined.includes('warehouse')) {
    return 'ecommerce-store'; // Inventory management maps to ecommerce
  }
  
  if (combined.includes('marketplace') || combined.includes('platform') || combined.includes('connect') || combined.includes('match')) {
    return 'service-platform'; // Marketplace/platform maps to service platform
  }
  
  if (combined.includes('consulting') || combined.includes('service') || combined.includes('agency') || combined.includes('professional')) {
    return 'service-platform'; // Service business maps to service platform
  }
  
  // Default to SaaS dashboard for software, analytics, tools, etc.
  return 'saas-dashboard';
};

const generateEnhancedBusinessAnalysisPrompt = (startupData: any, reports: Record<string, string>, templateId: string) => {
  const templateContext = {
    'saas-dashboard': 'a SaaS dashboard application with analytics, user management, and core business tools',
    'ecommerce-store': 'an ecommerce platform with product management, inventory tracking, and sales features',
    'service-platform': 'a service platform with client management, project tracking, and professional tools'
  };

  return `You are an expert SaaS architect. Create a business-specific application using the ${templateId} template structure.

STARTUP DETAILS:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Audience: ${startupData?.targetAudience || 'Not specified'}
- Problem Statement: ${startupData?.problemStatement || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}

BUSINESS ANALYSIS REPORTS:
${Object.entries(reports).slice(0, 4).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 1200)}...`
).join('\n\n')}

TEMPLATE STRUCTURE: ${templateContext[templateId]}

YOUR TASK: Customize ${templateContext[templateId]} to perfectly embody this startup's business model.

CRITICAL: You must respond with ONLY a valid JSON object, no additional text.

Return this exact structure:
{
  "templateId": "${templateId}",
  "reasoning": "Why this ${templateId} template perfectly suits the startup's business model with specific customizations",
  "confidence": 0.95,
  "appName": "${startupData?.companyName || 'Your SaaS'}",
  "appDescription": "Clear description of what this business-specific application does for end users",
  "businessModel": "Detailed explanation of how this business operates and generates value",
  "coreFeatures": [
    "Primary feature that solves the main customer problem using ${templateId} structure",
    "Secondary feature that adds unique business value",
    "Third feature that completes the core offering"
  ],
  "userPersonas": [
    {
      "name": "Primary User Type",
      "role": "Their role/job title in this business context",
      "needs": "What they need from this business application",
      "painPoints": "Current problems they face in this industry",
      "workflow": "How they would use this business app daily"
    }
  ],
  "workflows": [
    {
      "name": "Core Business Journey",
      "steps": ["Business-specific step 1", "Step 2", "Step 3"],
      "outcome": "What user achieves in this business context"
    }
  ],
  "pages": [
    {
      "name": "Main Business Interface",
      "purpose": "Core business functionality adapted to ${templateId}",
      "features": ["Business Feature 1", "Business Feature 2"],
      "userActions": ["Business Action 1", "Business Action 2"]
    },
    {
      "name": "Business Analytics",
      "purpose": "Industry-specific insights and metrics",
      "features": ["Business Analytics", "Custom Reports"],
      "userActions": ["View business data", "Generate industry reports"]
    },
    {
      "name": "Account Management",
      "purpose": "Business account and preferences",
      "features": ["Business Profile", "Business Settings"],
      "userActions": ["Update business profile", "Manage business preferences"]
    }
  ],
  "fields": {
    "appName": "Business-specific application name",
    "primaryFeature": "Main business feature name",
    "userType": "Primary business user type",
    "dataType": "Main business data/content type (Products/Users/Projects/Items)",
    "actionVerb": "Primary business action (Manage/Track/Analyze/Connect)",
    "metricName": "Key business success metric"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your Business'}",
    "tagline": "Business value proposition in one compelling line",
    "description": "What this business application accomplishes for users",
    "industry": "Primary industry/market vertical"
  },
  "mockData": {
    "primaryEntities": [
      {"name": "Business entity relevant to this industry", "status": "Active", "metric": "100", "category": "Business category"},
      {"name": "Another business entity", "status": "Processing", "metric": "85", "category": "Different business category"}
    ],
    "users": [
      {"name": "Realistic business user for this industry", "role": "Industry-relevant role", "status": "Active", "joined": "2024-01-15"},
      {"name": "Another business user", "role": "Different industry role", "status": "Active", "joined": "2024-02-20"}
    ],
    "activities": [
      {"action": "Industry-specific business action", "user": "Business user", "timestamp": "2 hours ago", "result": "Business outcome"},
      {"action": "Another business process", "user": "Another user", "timestamp": "1 day ago", "result": "Success"}
    ],
    "metrics": [
      {"name": "Core business metric for this industry", "value": "Industry-realistic value", "change": "+X%", "trend": "up"},
      {"name": "Important business KPI", "value": "Business value", "change": "+X%", "trend": "up"}
    ]
  },
  "features": [
    "Core business feature that defines this application",
    "Unique business differentiator feature",
    "Essential business management feature"
  ],
  "colorScheme": {
    "primary": "#2563EB",
    "secondary": "#1E40AF", 
    "accent": "#10B981"
  }
}`;
};

const createBusinessSpecificFallback = (startupData: any, templateId: string): GeneratedAppContent => {
  const companyName = startupData?.companyName || 'Your Business';
  const idea = startupData?.idea || '';
  
  // Business type specific customization based on template
  let businessType = 'platform';
  let features = ['User Management', 'Analytics Dashboard', 'Settings'];
  let mockEntities = [
    { name: 'Sample Item', status: 'Active', metric: '100', category: 'General' },
    { name: 'Another Item', status: 'Pending', metric: '85', category: 'Important' }
  ];

  if (templateId === 'ecommerce-store') {
    businessType = 'inventory-management';
    features = ['Inventory Tracking', 'Product Management', 'Sales Analytics'];
    mockEntities = [
      { name: 'Product A', status: 'In Stock', metric: '250', category: 'Electronics' },
      { name: 'Product B', status: 'Low Stock', metric: '45', category: 'Accessories' }
    ];
  } else if (templateId === 'service-platform') {
    businessType = 'service-platform';
    features = ['Client Management', 'Project Tracking', 'Service Analytics'];
    mockEntities = [
      { name: 'Client A', status: 'Active', metric: '4.8', category: 'Premium' },
      { name: 'Client B', status: 'Pending', metric: '4.2', category: 'Standard' }
    ];
  } else {
    businessType = 'saas-dashboard';
    features = ['Dashboard Analytics', 'Data Management', 'User Insights'];
    mockEntities = [
      { name: 'Dataset A', status: 'Updated', metric: '1.2M', category: 'Real-time' },
      { name: 'Dataset B', status: 'Processing', metric: '850K', category: 'Batch' }
    ];
  }

  return {
    templateId,
    reasoning: `Using ${templateId} template customized for ${companyName}'s ${businessType} business model`,
    confidence: 0.8,
    appName: companyName,
    appDescription: `A comprehensive ${businessType} solution that ${idea}`,
    businessModel: `${businessType} serving ${startupData?.targetAudience || 'businesses'}`,
    coreFeatures: features,
    userPersonas: [
      {
        name: 'Primary User',
        role: startupData?.targetAudience || 'Business User',
        needs: 'Efficient management and insights',
        painPoints: 'Manual processes and lack of visibility',
        workflow: 'Daily monitoring and management tasks'
      }
    ],
    workflows: [
      {
        name: 'Core Workflow',
        steps: ['Access platform', 'View dashboard', 'Take action', 'Monitor results'],
        outcome: 'Improved efficiency and insights'
      }
    ],
    pages: [
      {
        name: 'Main Interface',
        purpose: 'Core functionality',
        features: features,
        userActions: ['View', 'Manage', 'Analyze']
      }
    ],
    fields: {
      appName: companyName,
      primaryFeature: features[0],
      userType: startupData?.targetAudience || 'User',
      dataType: templateId === 'ecommerce-store' ? 'Products' : templateId === 'service-platform' ? 'Clients' : 'Data',
      actionVerb: 'Manage',
      metricName: 'Success Rate'
    },
    companyData: {
      name: companyName,
      tagline: `Transforming ${businessType} operations`,
      description: idea || `A powerful ${businessType} solution`,
      industry: startupData?.targetAudience || 'Technology'
    },
    mockData: {
      primaryEntities: mockEntities,
      users: [
        { name: 'Alex Chen', role: 'Manager', status: 'Active', joined: '2024-01-15' },
        { name: 'Sarah Wilson', role: 'Analyst', status: 'Active', joined: '2024-02-20' }
      ],
      activities: [
        { action: 'Updated records', user: 'Alex Chen', timestamp: '2 hours ago', result: 'Success' },
        { action: 'Generated report', user: 'Sarah Wilson', timestamp: '1 day ago', result: 'Completed' }
      ],
      metrics: [
        { name: 'Success Rate', value: '94%', change: '+8%', trend: 'up' },
        { name: 'User Satisfaction', value: '4.7/5', change: '+0.3', trend: 'up' }
      ]
    },
    features: features,
    colorScheme: {
      primary: '#2563EB',
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

    const { startupData, reports, targetTemplateId }: AppContentGenerationRequest = await req.json();
    
    console.log('Generating business-specific app content for:', {
      company: startupData?.companyName,
      idea: startupData?.idea?.substring(0, 100),
      reportsCount: Object.keys(reports || {}).length
    });

    // Smart template selection - always use existing templates
    const selectedTemplateId = targetTemplateId || detectBusinessModelTemplate(startupData, reports || {});
    console.log('Selected template:', selectedTemplateId);

    let generatedContent: GeneratedAppContent;

    const prompt = generateEnhancedBusinessAnalysisPrompt(startupData, reports || {}, selectedTemplateId);
    
    console.log('Calling Claude API for business-specific customization...');
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
      
      // Ensure we always use the selected template ID
      generatedContent.templateId = selectedTemplateId;
      
      console.log('Successfully parsed JSON from Claude response');
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError.message);
      console.error('Raw response:', data.content[0].text);
      
      console.log('Using business-specific fallback content');
      generatedContent = createBusinessSpecificFallback(startupData, selectedTemplateId);
    }

    // Validate and enhance generated content
    if (!generatedContent.fields || !generatedContent.companyData || !generatedContent.mockData) {
      console.error('Generated content missing required fields:', generatedContent);
      generatedContent = createBusinessSpecificFallback(startupData, selectedTemplateId);
    }

    // Final validation - ensure template ID is always from existing templates
    const validTemplateIds = ['saas-dashboard', 'ecommerce-store', 'service-platform'];
    if (!validTemplateIds.includes(generatedContent.templateId)) {
      console.warn('Invalid template ID generated, using fallback:', generatedContent.templateId);
      generatedContent.templateId = selectedTemplateId;
    }

    console.log('Successfully generated business-specific app content:', {
      appName: generatedContent.appName,
      templateId: generatedContent.templateId,
      businessModel: generatedContent.businessModel,
      coreFeatures: generatedContent.coreFeatures?.length || 0,
      confidence: generatedContent.confidence
    });

    return new Response(JSON.stringify({
      success: true,
      content: generatedContent
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('App content generation error:', error);
    
    try {
      const { startupData, targetTemplateId } = await req.json().catch(() => ({}));
      const fallbackTemplateId = targetTemplateId || 'saas-dashboard';
      const fallbackContent = createBusinessSpecificFallback(startupData || {}, fallbackTemplateId);
      
      return new Response(JSON.stringify({
        success: true,
        content: fallbackContent,
        warning: 'Used business-specific fallback content due to AI generation failure'
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
