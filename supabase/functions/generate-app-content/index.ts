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
  businessAnalysis?: any;
  baseCustomization?: any;
  enhancementRequest?: string;
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

const detectAdvancedBusinessModelTemplate = (startupData: any, reports: Record<string, string>): string => {
  const idea = (startupData?.idea || '').toLowerCase();
  const businessPlan = (reports['business-plan'] || '').toLowerCase();
  const combined = `${idea} ${businessPlan}`;

  // Advanced template mapping based on business complexity and features
  if (combined.includes('saas') || combined.includes('software') || combined.includes('platform') || 
      combined.includes('analytics') || combined.includes('dashboard') || combined.includes('data') ||
      combined.includes('metrics') || combined.includes('tracking') || combined.includes('management')) {
    return 'advanced-saas-dashboard';
  }
  
  if (combined.includes('ecommerce') || combined.includes('shopping') || combined.includes('retail') || 
      combined.includes('products') || combined.includes('store') || combined.includes('marketplace') ||
      combined.includes('inventory') || combined.includes('catalog') || combined.includes('orders')) {
    return 'modern-ecommerce-platform';
  }
  
  if (combined.includes('service') || combined.includes('consulting') || combined.includes('agency') || 
      combined.includes('professional') || combined.includes('clients') || combined.includes('projects') ||
      combined.includes('crm') || combined.includes('business') || combined.includes('freelance')) {
    return 'business-service-platform';
  }
  
  // Default to advanced SaaS for most business applications
  return 'advanced-saas-dashboard';
};

const generateAdvancedBusinessAnalysisPrompt = (startupData: any, reports: Record<string, string>, businessAnalysis?: any) => {
  // If we have business analysis, use it for more targeted generation
  if (businessAnalysis) {
    return `You are an expert application architect specializing in ${businessAnalysis.industry} business software. 

BUSINESS ANALYSIS PROVIDED:
- Business Type: ${businessAnalysis.businessType}
- Industry: ${businessAnalysis.industry}
- Core Features: ${businessAnalysis.coreFeatures.map(f => f.name).join(', ')}
- User Personas: ${businessAnalysis.userPersonas.map(p => `${p.name} (${p.role})`).join(', ')}
- Brand Tone: ${businessAnalysis.brandIdentity.tone}
- Key Differentiators: ${businessAnalysis.competitiveDifferentiators.join(', ')}

STARTUP INFORMATION:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Market: ${startupData?.targetAudience || 'Not specified'}
- Problem: ${startupData?.problemStatement || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}

TASK: Enhance the provided business analysis with even more specific, realistic business content and mock data that perfectly represents ${startupData?.companyName || 'this business'}.

Focus on creating:
1. Ultra-realistic mock data that reflects actual business operations
2. Industry-specific terminology and workflows
3. Detailed user interfaces for each persona type
4. Business processes that demonstrate real value proposition

CRITICAL: Respond with ONLY a valid JSON object with enhancements.

Required JSON structure:
{
  "fields": {
    "appName": "Enhanced business-specific name that reflects actual functionality",
    "primaryFeature": "Most important business capability with industry terminology",
    "userTypes": "Specific user roles relevant to this business model",
    "businessTerminology": "Industry-specific terms that should replace generic ones"
  },
  "mockData": {
    "businessEntities": [
      {"name": "Highly specific business entity relevant to ${businessAnalysis.businessType}", "status": "Industry-appropriate status", "metrics": "Business-relevant numbers", "details": "Realistic business context"},
      {"name": "Another specific entity", "status": "Different status", "metrics": "Different metrics", "details": "More context"}
    ],
    "userInteractions": [
      {"user": "Realistic ${businessAnalysis.industry} professional name", "action": "Specific business action for ${businessAnalysis.businessType}", "result": "Meaningful business outcome", "timestamp": "recent", "context": "Why this action matters"},
      {"user": "Another industry professional", "action": "Different business-critical action", "result": "Important result", "timestamp": "recent", "context": "Business impact"}
    ],
    "businessMetrics": [
      {"name": "Critical KPI for ${businessAnalysis.industry}", "value": "Realistic industry number", "trend": "up", "significance": "Why this metric matters for this business"},
      {"name": "Operational metric specific to ${businessAnalysis.businessType}", "value": "Another realistic value", "trend": "up", "significance": "Business impact"}
    ]
  },
  "appDescription": "Compelling description that specifically explains how this application serves ${startupData?.companyName || 'the business'}'s unique value proposition in ${businessAnalysis.industry}",
  "companyData": {
    "tagline": "Powerful tagline that captures ${startupData?.companyName || 'the business'}'s mission in ${businessAnalysis.industry}",
    "description": "Detailed description of what this application actually does for ${businessAnalysis.industry} professionals"
  }
}`;
  }

  // Fallback to original prompt if no business analysis
  return generateOriginalPrompt(startupData, reports);
};

const generateOriginalPrompt = (startupData: any, reports: Record<string, string>) => {
  const templateContext = {
    'advanced-saas-dashboard': 'an advanced SaaS dashboard with real-time analytics, team management, project tracking, and comprehensive business intelligence',
    'modern-ecommerce-platform': 'a modern e-commerce platform with advanced product management, customer analytics, inventory tracking, and sales optimization',
    'business-service-platform': 'a business service platform with CRM, project management, client portal, invoicing, and professional service delivery tools'
  };

  return `You are an expert application architect specializing in modern business software. Create a comprehensive business-specific application using the ${templateId} template.

STARTUP INFORMATION:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Market: ${startupData?.targetAudience || 'Not specified'}
- Problem: ${startupData?.problemStatement || 'Not specified'}
- Solution: ${startupData?.solution || 'Not specified'}

BUSINESS ANALYSIS REPORTS:
${Object.entries(reports).slice(0, 4).map(([type, content]) => 
  `${type.toUpperCase()}: ${content.substring(0, 1500)}...`
).join('\n\n')}

TEMPLATE ARCHITECTURE: ${templateContext[templateId]}

TASK: Design a production-ready business application that perfectly embodies this startup's vision using the ${templateId} template structure.

CRITICAL: Respond with ONLY a valid JSON object, no additional text.

Required JSON structure:
{
  "templateId": "${templateId}",
  "reasoning": "Detailed explanation of why this ${templateId} template is ideal for this specific business, including how the advanced features align with business needs",
  "confidence": 0.95,
  "appName": "${startupData?.companyName || 'Business App'}",
  "appDescription": "Clear, compelling description of what this business application accomplishes for end users and how it solves their problems",
  "businessModel": "Comprehensive explanation of the business model, revenue streams, and value proposition",
  "coreFeatures": [
    "Primary feature that leverages ${templateId} capabilities to solve core business problem",
    "Secondary feature that provides competitive advantage using template's advanced functionality",
    "Third feature that completes the core value proposition with template's professional tools"
  ],
  "userPersonas": [
    {
      "name": "Primary Business User",
      "role": "Specific job title/role in target market",
      "needs": "What they need from this business application",
      "painPoints": "Current challenges in their workflow that this app solves",
      "workflow": "How they would use this app in their daily business operations"
    },
    {
      "name": "Secondary User Type",
      "role": "Another key user type for this business",
      "needs": "Their specific requirements from the application",
      "painPoints": "Different challenges they face",
      "workflow": "Their usage pattern and interaction with the app"
    }
  ],
  "workflows": [
    {
      "name": "Core Business Process",
      "steps": ["Step 1 using template features", "Step 2 with business logic", "Step 3 delivering value"],
      "outcome": "What users achieve through this workflow"
    },
    {
      "name": "Secondary Business Process",
      "steps": ["Another important workflow", "Using template capabilities", "Business value creation"],
      "outcome": "Additional value delivered"
    }
  ],
  "pages": [
    {
      "name": "Main Business Interface",
      "purpose": "Core functionality leveraging ${templateId} features",
      "features": ["Business Feature 1", "Business Feature 2", "Business Feature 3"],
      "userActions": ["Primary Action", "Secondary Action", "Management Action"]
    },
    {
      "name": "Analytics & Insights",
      "purpose": "Business intelligence and performance tracking",
      "features": ["Advanced Analytics", "Custom Reports", "KPI Tracking"],
      "userActions": ["View metrics", "Generate reports", "Track performance"]
    },
    {
      "name": "Management Center",
      "purpose": "Administrative and configuration interface",
      "features": ["User Management", "Settings", "Billing"],
      "userActions": ["Manage users", "Configure settings", "Handle billing"]
    }
  ],
  "fields": {
    "appName": "Business-specific application name that reflects the value proposition",
    "primaryFeature": "Main business capability name",
    "userType": "Primary business user designation",
    "dataType": "Main business data/content managed (Projects/Clients/Products/Orders)",
    "actionVerb": "Primary business action (Manage/Track/Optimize/Analyze)",
    "metricName": "Key business success indicator"
  },
  "companyData": {
    "name": "${startupData?.companyName || 'Business Name'}",
    "tagline": "Compelling value proposition that captures the business essence",
    "description": "What this business application accomplishes and why it matters",
    "industry": "Specific industry vertical or market segment"
  },
  "mockData": {
    "primaryEntities": [
      {"name": "Realistic business entity for this industry", "status": "Active", "metric": "Relevant number", "category": "Business category"},
      {"name": "Another business entity", "status": "Processing", "metric": "Another metric", "category": "Different category"},
      {"name": "Third business entity", "status": "Completed", "metric": "Success metric", "category": "Important category"}
    ],
    "users": [
      {"name": "Realistic business user name", "role": "Industry-appropriate role", "status": "Active", "joined": "2024-01-15", "activity": "Recent business action"},
      {"name": "Another business user", "role": "Different business role", "status": "Active", "joined": "2024-02-20", "activity": "Business interaction"},
      {"name": "Third team member", "role": "Supporting role", "status": "Active", "joined": "2024-01-10", "activity": "Team collaboration"}
    ],
    "activities": [
      {"action": "Business-specific action relevant to this industry", "user": "Business user", "timestamp": "2 hours ago", "result": "Business outcome", "type": "success"},
      {"action": "Another important business process", "user": "Different user", "timestamp": "1 day ago", "result": "Positive result", "type": "info"},
      {"action": "Third business activity", "user": "Team member", "timestamp": "3 hours ago", "result": "Achievement", "type": "milestone"}
    ],
    "metrics": [
      {"name": "Core business KPI for this industry", "value": "Industry-realistic value", "change": "+X%", "trend": "up", "importance": "critical"},
      {"name": "Important operational metric", "value": "Business-relevant number", "change": "+Y%", "trend": "up", "importance": "high"},
      {"name": "Growth indicator", "value": "Performance metric", "change": "+Z%", "trend": "up", "importance": "moderate"}
    ],
    "projects": [
      {"name": "Business project relevant to this industry", "status": "In Progress", "progress": 75, "team": 4, "deadline": "2024-02-15", "priority": "High"},
      {"name": "Another business initiative", "status": "Planning", "progress": 25, "team": 3, "deadline": "2024-03-01", "priority": "Medium"},
      {"name": "Completed business project", "status": "Completed", "progress": 100, "team": 5, "deadline": "2024-01-20", "priority": "High"}
    ]
  },
  "features": [
    "Advanced feature that differentiates this business application",
    "Core capability that drives business value",
    "Essential functionality for this industry",
    "Competitive advantage feature"
  ],
  "colorScheme": {
    "primary": "#2563EB",
    "secondary": "#1E40AF", 
    "accent": "#10B981"
  }
}`;
};

const generateBusinessSpecificContentPrompt = (startupData: any, businessAnalysis: any, templateId: string) => {
  return `You are an expert application content creator specializing in ${businessAnalysis?.industry || 'business'} software customization.

STARTUP INFORMATION:
- Company: ${startupData?.companyName || 'Not specified'}
- Business Idea: ${startupData?.idea || 'Not specified'}
- Target Market: ${startupData?.targetAudience || 'Not specified'}
- Industry: ${businessAnalysis?.industry || 'Technology'}

BUSINESS ANALYSIS:
- Business Type: ${businessAnalysis?.businessType || 'SaaS'}
- Core Features: ${businessAnalysis?.coreFeatures?.join(', ') || 'Standard features'}
- User Personas: ${businessAnalysis?.userPersonas?.map(p => p.name).join(', ') || 'Business users'}
- Key Terms: ${businessAnalysis?.keyTerms?.join(', ') || 'Standard terminology'}

TEMPLATE: ${templateId}

TASK: Generate business-specific content and terminology that transforms the generic ${templateId} template into a specialized ${businessAnalysis?.industry || 'business'} application.

CRITICAL: Respond with ONLY a valid JSON object, no additional text.

Required JSON structure:
{
  "appName": "Business-specific application name that reflects actual functionality",
  "dashboardTitle": "Industry-appropriate dashboard title",
  "primaryEntityName": "Main business entity (Students/Patients/Customers/etc)",
  "actionVerbs": ["Primary action", "Secondary action", "Management action"],
  "metricNames": ["Key performance indicator", "Important metric", "Success measure"],
  "pageLabels": {
    "dashboard": "Industry-specific dashboard name",
    "users": "User management page name",
    "analytics": "Analytics page name",
    "settings": "Settings page name"
  },
  "buttonTexts": {
    "primary": "Main action button text",
    "secondary": "Secondary button text", 
    "action": "Call-to-action text"
  },
  "mockData": {
    "${businessAnalysis?.keyTerms?.[0]?.toLowerCase() || 'entities'}": [
      {"name": "Realistic ${businessAnalysis?.industry || 'business'} entity", "status": "Appropriate status", "metric": "Relevant number", "details": "Industry context"},
      {"name": "Another specific entity", "status": "Different status", "metric": "Different metric", "details": "More context"}
    ],
    "activities": [
      {"action": "Business-specific action", "user": "Industry professional", "result": "Meaningful outcome", "timestamp": "recent"},
      {"action": "Important business process", "user": "Different role", "result": "Positive impact", "timestamp": "recent"}
    ]
  },
  "industryTerminology": {
    "Users": "Industry-specific term for users",
    "Items": "Business-specific term for main entities",
    "Performance": "Industry-appropriate performance term",
    "Analytics": "Sector-specific analytics term"
  }
}`;
};

const createAdvancedBusinessSpecificFallback = (startupData: any, templateId: string): GeneratedAppContent => {
  const companyName = startupData?.companyName || 'Your Business';
  const idea = startupData?.idea || '';
  
  // Advanced template specific customization
  let businessType = 'platform';
  let features = ['Advanced Analytics', 'Team Management', 'Real-time Updates'];
  let mockEntities = [
    { name: 'Business Entity A', status: 'Active', metric: '150', category: 'Priority' },
    { name: 'Business Entity B', status: 'Processing', metric: '89', category: 'Standard' },
    { name: 'Business Entity C', status: 'Completed', metric: '200', category: 'Premium' }
  ];

  if (templateId === 'modern-ecommerce-platform') {
    businessType = 'e-commerce-platform';
    features = ['Product Management', 'Order Processing', 'Customer Analytics', 'Inventory Tracking'];
    mockEntities = [
      { name: 'Premium Product Line', status: 'In Stock', metric: '350', category: 'Electronics' },
      { name: 'Bestseller Collection', status: 'Low Stock', metric: '75', category: 'Fashion' },
      { name: 'New Arrivals', status: 'Available', metric: '120', category: 'Home & Garden' }
    ];
  } else if (templateId === 'business-service-platform') {
    businessType = 'service-platform';
    features = ['Client Management', 'Project Tracking', 'Invoice Generation', 'Calendar Scheduling'];
    mockEntities = [
      { name: 'Enterprise Client A', status: 'Active', metric: '4.9', category: 'Enterprise' },
      { name: 'Growing Business B', status: 'Engaged', metric: '4.6', category: 'SMB' },
      { name: 'Startup Client C', status: 'New', metric: '4.2', category: 'Startup' }
    ];
  } else {
    businessType = 'saas-dashboard';
    features = ['Real-time Dashboard', 'Advanced Analytics', 'Team Collaboration', 'API Integration'];
    mockEntities = [
      { name: 'Data Stream Alpha', status: 'Live', metric: '2.3M', category: 'Real-time' },
      { name: 'Analytics Pipeline', status: 'Processing', metric: '1.8M', category: 'Batch' },
      { name: 'User Insights', status: 'Updated', metric: '950K', category: 'Insights' }
    ];
  }

  return {
    templateId,
    reasoning: `Advanced ${templateId} template selected for ${companyName}'s ${businessType} business model with comprehensive features and modern architecture`,
    confidence: 0.85,
    appName: companyName,
    appDescription: `A comprehensive ${businessType} solution that ${idea} with advanced features and professional-grade functionality`,
    businessModel: `Advanced ${businessType} serving ${startupData?.targetAudience || 'businesses'} with enterprise-grade capabilities`,
    coreFeatures: features,
    userPersonas: [
      {
        name: 'Business Manager',
        role: startupData?.targetAudience || 'Business Professional',
        needs: 'Advanced analytics and comprehensive management capabilities',
        painPoints: 'Limited visibility and complex manual processes',
        workflow: 'Daily monitoring, analysis, and strategic decision making'
      },
      {
        name: 'Team Lead',
        role: 'Department Head',
        needs: 'Team coordination and performance tracking',
        painPoints: 'Communication gaps and progress visibility',
        workflow: 'Team management and project oversight'
      }
    ],
    workflows: [
      {
        name: 'Primary Business Process',
        steps: ['Access dashboard', 'Analyze metrics', 'Take strategic action', 'Monitor results'],
        outcome: 'Improved business performance and efficiency'
      },
      {
        name: 'Team Collaboration Flow',
        steps: ['Assign tasks', 'Track progress', 'Communicate updates', 'Achieve goals'],
        outcome: 'Enhanced team productivity and coordination'
      }
    ],
    pages: [
      {
        name: 'Advanced Dashboard',
        purpose: 'Comprehensive business overview with real-time insights',
        features: features,
        userActions: ['Monitor', 'Analyze', 'Optimize']
      },
      {
        name: 'Management Interface',
        purpose: 'Core business functionality and operations',
        features: ['Management Tools', 'Configuration', 'Reporting'],
        userActions: ['Manage', 'Configure', 'Report']
      }
    ],
    fields: {
      appName: companyName,
      primaryFeature: features[0],
      userType: startupData?.targetAudience || 'Professional',
      dataType: templateId === 'modern-ecommerce-platform' ? 'Products' : templateId === 'business-service-platform' ? 'Clients' : 'Analytics',
      actionVerb: 'Optimize',
      metricName: 'Performance Score'
    },
    companyData: {
      name: companyName,
      tagline: `Advanced ${businessType} transformation`,
      description: idea || `A powerful ${businessType} solution with enterprise features`,
      industry: startupData?.targetAudience || 'Technology'
    },
    mockData: {
      primaryEntities: mockEntities,
      users: [
        { name: 'Sarah Chen', role: 'Senior Manager', status: 'Active', joined: '2024-01-15', activity: 'Generated monthly report' },
        { name: 'Mike Rodriguez', role: 'Team Lead', status: 'Active', joined: '2024-02-20', activity: 'Updated project status' },
        { name: 'Emily Wang', role: 'Analyst', status: 'Active', joined: '2024-01-25', activity: 'Analyzed performance metrics' }
      ],
      activities: [
        { action: 'Performance optimization completed', user: 'Sarah Chen', timestamp: '2 hours ago', result: 'Success', type: 'success' },
        { action: 'Team collaboration session', user: 'Mike Rodriguez', timestamp: '1 day ago', result: 'Productive', type: 'info' },
        { action: 'Analytics report generated', user: 'Emily Wang', timestamp: '4 hours ago', result: 'Insights gained', type: 'milestone' }
      ],
      metrics: [
        { name: 'Performance Score', value: '96%', change: '+12%', trend: 'up', importance: 'critical' },
        { name: 'User Satisfaction', value: '4.8/5', change: '+0.4', trend: 'up', importance: 'high' },
        { name: 'Growth Rate', value: '28%', change: '+5%', trend: 'up', importance: 'moderate' }
      ],
      projects: [
        { name: 'Platform Enhancement', status: 'In Progress', progress: 78, team: 5, deadline: '2024-02-15', priority: 'High' },
        { name: 'User Experience Optimization', status: 'Planning', progress: 25, team: 3, deadline: '2024-03-01', priority: 'Medium' },
        { name: 'Analytics Integration', status: 'Completed', progress: 100, team: 4, deadline: '2024-01-20', priority: 'High' }
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

    const { startupData, reports, businessAnalysis, templateId, contentRequest } = await req.json();
    
    console.log('Enhanced app content generation:', {
      company: startupData?.companyName,
      templateId,
      contentRequest,
      hasBusinessAnalysis: !!businessAnalysis,
      reportsCount: Object.keys(reports || {}).length
    });

    // Handle business-specific content requests
    if (contentRequest === 'business-specific-terminology-and-data') {
      const prompt = generateBusinessSpecificContentPrompt(startupData, businessAnalysis, templateId);
      
      console.log('Generating business-specific content...');
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
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data = await response.json();
      const businessContent = extractJsonFromResponse(data.content[0].text);
      
      return new Response(JSON.stringify({
        success: true,
        content: businessContent
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Advanced template selection - always use new advanced templates
    const selectedTemplateId = templateId || detectAdvancedBusinessModelTemplate(startupData, reports || {});
    console.log('Selected advanced template:', selectedTemplateId);

    let generatedContent: GeneratedAppContent;

    const prompt = generateAdvancedBusinessAnalysisPrompt(startupData, reports || {}, businessAnalysis);
    
    console.log('Calling Claude API for advanced business-specific customization...');
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
    console.log('Claude API response received, parsing advanced content...');
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error('Invalid Claude API response structure:', data);
      throw new Error('Invalid response structure from Claude API');
    }

    try {
      generatedContent = extractJsonFromResponse(data.content[0].text);
      
      // Ensure we always use the selected advanced template ID
      generatedContent.templateId = selectedTemplateId;
      
      console.log('Successfully parsed advanced JSON from Claude response');
    } catch (parseError) {
      console.error('Advanced JSON parsing failed:', parseError.message);
      console.error('Raw response:', data.content[0].text);
      
      console.log('Using advanced business-specific fallback content');
      generatedContent = createAdvancedBusinessSpecificFallback(startupData, selectedTemplateId);
    }

    // Validate and enhance generated content for advanced templates
    if (!generatedContent.fields || !generatedContent.companyData || !generatedContent.mockData) {
      console.error('Generated content missing required fields:', generatedContent);
      generatedContent = createAdvancedBusinessSpecificFallback(startupData, selectedTemplateId);
    }

    // Final validation - ensure template ID is from advanced templates
    const validAdvancedTemplateIds = ['advanced-saas-dashboard', 'modern-ecommerce-platform', 'business-service-platform'];
    if (!validAdvancedTemplateIds.includes(generatedContent.templateId)) {
      console.warn('Invalid advanced template ID generated, using fallback:', generatedContent.templateId);
      generatedContent.templateId = selectedTemplateId;
    }

    console.log('Successfully generated advanced business-specific app content:', {
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
    console.error('Enhanced app content generation error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Enhanced app content generation failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
