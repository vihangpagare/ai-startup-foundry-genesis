
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

const generateDeepBusinessAnalysisPrompt = (startupData: any, reports: Record<string, string>) => {
  return `You are an expert SaaS architect and business analyst. Analyze this startup deeply and design a complete SaaS application prototype that embodies their specific business model.

STARTUP DETAILS:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Audience: ${startupData?.targetAudience || 'Not specified'}
- Problem Statement: ${startupData?.problemStatement || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}
- Unique Value: ${startupData?.uniqueValue || 'Not specified'}

BUSINESS ANALYSIS REPORTS:
${Object.entries(reports).slice(0, 4).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 1200)}...`
).join('\n\n')}

YOUR TASK: Design a complete SaaS application that IS the startup's product, not a dashboard to manage the startup.

For example:
- If it's "EcoStock" (sustainable inventory management), create the actual inventory management SaaS platform
- If it's a marketplace, create the actual marketplace interface
- If it's an analytics tool, create the actual analytics application

CRITICAL: You must respond with ONLY a valid JSON object, no additional text.

Return this exact structure:
{
  "templateId": "custom-saas-app",
  "reasoning": "Why this specific app design perfectly embodies the startup's core business model",
  "confidence": 0.95,
  "appName": "${startupData?.companyName || 'Your SaaS'}",
  "appDescription": "Clear description of what this SaaS application does for end users",
  "businessModel": "Detailed explanation of how this SaaS operates (B2B, B2C, marketplace, etc.)",
  "coreFeatures": [
    "Primary feature that solves the main customer problem",
    "Secondary feature that adds unique value",
    "Third feature that completes the core offering"
  ],
  "userPersonas": [
    {
      "name": "Primary User Type",
      "role": "Their role/job title",
      "needs": "What they need from this SaaS",
      "painPoints": "Current problems they face",
      "workflow": "How they would use this app daily"
    }
  ],
  "workflows": [
    {
      "name": "Core User Journey",
      "steps": ["Step 1", "Step 2", "Step 3"],
      "outcome": "What user achieves"
    }
  ],
  "pages": [
    {
      "name": "Main Interface",
      "purpose": "Core product functionality",
      "features": ["Feature 1", "Feature 2"],
      "userActions": ["Action 1", "Action 2"]
    },
    {
      "name": "Dashboard/Analytics",
      "purpose": "User insights and management",
      "features": ["Analytics", "Settings"],
      "userActions": ["View data", "Configure"]
    },
    {
      "name": "User Management",
      "purpose": "Account and preferences",
      "features": ["Profile", "Billing"],
      "userActions": ["Update profile", "Manage subscription"]
    }
  ],
  "fields": {
    "appName": "SaaS application name",
    "primaryFeature": "Main feature name",
    "userType": "Primary user type",
    "dataType": "Main data/content type",
    "actionVerb": "Primary user action",
    "metricName": "Key success metric"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Your SaaS'}",
    "tagline": "Value proposition in one compelling line",
    "description": "What the SaaS application accomplishes for users",
    "industry": "Primary industry/market vertical"
  },
  "mockData": {
    "primaryEntities": [
      {"name": "Entity relevant to the business", "status": "Active", "metric": "100", "category": "Relevant category"},
      {"name": "Another entity", "status": "Pending", "metric": "85", "category": "Different category"}
    ],
    "users": [
      {"name": "Realistic user for target audience", "role": "Relevant role", "status": "Active", "joined": "2024-01-15"},
      {"name": "Another target user", "role": "Different role", "status": "Active", "joined": "2024-02-20"}
    ],
    "activities": [
      {"action": "Relevant action for this business", "user": "User name", "timestamp": "2 hours ago", "result": "Positive outcome"},
      {"action": "Another business action", "user": "Another user", "timestamp": "1 day ago", "result": "Success"}
    ],
    "metrics": [
      {"name": "Core business metric", "value": "Realistic value", "change": "+X%", "trend": "up"},
      {"name": "Important KPI", "value": "Realistic value", "change": "+X%", "trend": "up"}
    ]
  },
  "features": [
    "Core feature that defines the SaaS",
    "Unique differentiator feature",
    "Essential user management feature"
  ],
  "colorScheme": {
    "primary": "#2563EB",
    "secondary": "#1E40AF",
    "accent": "#10B981"
  }
}`;
};

const createBusinessSpecificFallback = (startupData: any): GeneratedAppContent => {
  const companyName = startupData?.companyName || 'Your SaaS';
  const idea = startupData?.idea || '';
  
  // Determine business type from idea
  let businessType = 'platform';
  let features = ['User Management', 'Analytics Dashboard', 'Settings'];
  let mockEntities = [
    { name: 'Sample Item', status: 'Active', metric: '100', category: 'General' },
    { name: 'Another Item', status: 'Pending', metric: '85', category: 'Important' }
  ];

  if (idea.toLowerCase().includes('inventory') || idea.toLowerCase().includes('stock')) {
    businessType = 'inventory-management';
    features = ['Inventory Tracking', 'Supplier Management', 'Stock Analytics'];
    mockEntities = [
      { name: 'Product A', status: 'In Stock', metric: '250', category: 'Electronics' },
      { name: 'Product B', status: 'Low Stock', metric: '45', category: 'Accessories' }
    ];
  } else if (idea.toLowerCase().includes('marketplace') || idea.toLowerCase().includes('platform')) {
    businessType = 'marketplace';
    features = ['Product Listings', 'User Matching', 'Transaction Management'];
    mockEntities = [
      { name: 'Seller Profile A', status: 'Verified', metric: '4.8', category: 'Premium' },
      { name: 'Seller Profile B', status: 'Active', metric: '4.2', category: 'Standard' }
    ];
  } else if (idea.toLowerCase().includes('analytics') || idea.toLowerCase().includes('data')) {
    businessType = 'analytics-platform';
    features = ['Data Visualization', 'Report Generation', 'Custom Dashboards'];
    mockEntities = [
      { name: 'Dataset A', status: 'Updated', metric: '1.2M', category: 'Real-time' },
      { name: 'Dataset B', status: 'Processing', metric: '850K', category: 'Batch' }
    ];
  }

  return {
    templateId: 'custom-saas-app',
    reasoning: `Generated business-specific SaaS application for ${companyName} based on their ${businessType} business model`,
    confidence: 0.8,
    appName: companyName,
    appDescription: `A comprehensive ${businessType} solution that ${idea}`,
    businessModel: `${businessType} SaaS serving ${startupData?.targetAudience || 'businesses'}`,
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
      dataType: 'Business Data',
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

    const { startupData, reports }: AppContentGenerationRequest = await req.json();
    
    console.log('Generating business-specific SaaS app content for:', {
      company: startupData?.companyName,
      idea: startupData?.idea?.substring(0, 100),
      reportsCount: Object.keys(reports || {}).length
    });

    let generatedContent: GeneratedAppContent;

    const prompt = generateDeepBusinessAnalysisPrompt(startupData, reports || {});
    
    console.log('Calling Claude API for deep business analysis...');
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
      
      console.log('Using business-specific fallback content');
      generatedContent = createBusinessSpecificFallback(startupData);
    }

    // Validate and enhance generated content
    if (!generatedContent.fields || !generatedContent.companyData || !generatedContent.mockData) {
      console.error('Generated content missing required fields:', generatedContent);
      generatedContent = createBusinessSpecificFallback(startupData);
    }

    console.log('Successfully generated business-specific SaaS app content:', {
      appName: generatedContent.appName,
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
    console.error('SaaS app content generation error:', error);
    
    try {
      const { startupData } = await req.json().catch(() => ({}));
      const fallbackContent = createBusinessSpecificFallback(startupData || {});
      
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
        error: error.message || 'SaaS app content generation failed'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
});
