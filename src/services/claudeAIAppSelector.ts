
import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { supabase } from '@/integrations/supabase/client';
import { businessAnalysisEngine, BusinessAnalysis } from './businessAnalysisEngine';
import { dynamicTemplateGenerator } from './dynamicTemplateGenerator';
import { appTemplateManager } from './appTemplateManager';

interface AIGeneratedAppContent {
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

class ClaudeAIAppSelector {
  async generateAppContentWithAI(
    startupData: any, 
    reports: Record<string, string>,
    targetTemplateId?: string
  ): Promise<{
    template: AppTemplate | null;
    customization: AppCustomization | null;
    reasoning: string;
    confidence: number;
  }> {
    try {
      console.log('Generating business-specific SaaS app with enhanced AI analysis...', {
        company: startupData?.companyName,
        idea: startupData?.idea?.substring(0, 100),
        targetTemplate: targetTemplateId,
        reportsAvailable: Object.keys(reports || {})
      });

      // Step 1: Analyze the business comprehensively
      const businessAnalysis = businessAnalysisEngine.analyzeStartupData(startupData, reports || {});
      console.log('Business analysis completed:', businessAnalysis);

      // Step 2: Generate dynamic template based on analysis
      const dynamicTemplate = dynamicTemplateGenerator.generateTemplate({
        businessAnalysis,
        startupData,
        reports: reports || {}
      });

      // Step 3: Validate and register the dynamic template
      if (!appTemplateManager.validateTemplate(dynamicTemplate)) {
        console.error('Dynamic template validation failed, falling back to static template');
        return this.createFallbackBusinessApp(startupData, targetTemplateId, 'Dynamic template validation failed');
      }

      // Register the dynamic template
      appTemplateManager.registerDynamicTemplate(dynamicTemplate);
      console.log(`Successfully registered dynamic template: ${dynamicTemplate.id}`);

      // Step 4: Generate customization with business-specific content
      const customization = dynamicTemplateGenerator.generateCustomization({
        businessAnalysis,
        startupData,
        reports: reports || {}
      });

      // Step 5: Enhance with Claude AI for even more specificity
      const enhancedCustomization = await this.enhanceWithClaudeAI(
        customization,
        businessAnalysis,
        startupData,
        reports || {}
      );

      // Step 6: Verify template exists before returning
      const verifiedTemplate = appTemplateManager.getTemplate(dynamicTemplate.id);
      if (!verifiedTemplate) {
        console.error(`Template verification failed for: ${dynamicTemplate.id}`);
        return this.createFallbackBusinessApp(startupData, targetTemplateId, 'Template verification failed');
      }

      return {
        template: verifiedTemplate,
        customization: enhancedCustomization,
        reasoning: this.generateEnhancedReasoning(businessAnalysis, startupData),
        confidence: 0.95
      };

    } catch (error) {
      console.error('Enhanced business analysis error:', error);
      return this.createFallbackBusinessApp(startupData, targetTemplateId, error.message);
    }
  }

  private async enhanceWithClaudeAI(
    baseCustomization: AppCustomization,
    businessAnalysis: BusinessAnalysis,
    startupData: any,
    reports: Record<string, string>
  ): Promise<AppCustomization> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-app-content', {
        body: {
          startupData,
          reports,
          businessAnalysis,
          baseCustomization,
          enhancementRequest: 'business-specific-content'
        }
      });

      if (error || !data?.success) {
        console.warn('Claude enhancement failed, using base customization');
        return baseCustomization;
      }

      // Merge Claude enhancements with base customization
      return this.mergeCustomizations(baseCustomization, data.content);

    } catch (error) {
      console.error('Claude AI enhancement error:', error);
      return baseCustomization;
    }
  }

  private mergeCustomizations(base: AppCustomization, enhanced: any): AppCustomization {
    return {
      ...base,
      fields: { ...base.fields, ...enhanced.fields },
      mockData: {
        ...base.mockData,
        // Prefer enhanced mock data if available
        ...(enhanced.mockData || {})
      },
      companyData: { ...base.companyData, ...enhanced.companyData },
      appDescription: enhanced.appDescription || base.appDescription
    };
  }

  private generateEnhancedReasoning(businessAnalysis: BusinessAnalysis, startupData: any): string {
    const features = businessAnalysis.coreFeatures.map(f => f.name).join(', ');
    const personas = businessAnalysis.userPersonas.map(p => p.role).join(', ');
    
    return `Generated a highly customized ${businessAnalysis.businessType} application for ${startupData?.companyName || 'the business'} in the ${businessAnalysis.industry} industry. 

The application features ${features} specifically designed for ${personas}. 

Key customizations include:
- ${businessAnalysis.coreFeatures.length} business-specific core features
- ${businessAnalysis.userPersonas.length} user persona interfaces  
- ${businessAnalysis.businessWorkflows.length} automated business workflows
- ${businessAnalysis.keyMetrics.length} industry-relevant metrics
- Custom terminology and branding aligned with ${businessAnalysis.brandIdentity.tone} tone

This template goes beyond generic SaaS dashboards to create a truly business-specific application that demonstrates the actual value proposition and functionality of ${startupData?.companyName || 'the startup'}.`;
  }

  private createAppCustomizationFromAIContent(
    template: AppTemplate,
    aiContent: AIGeneratedAppContent,
    startupData: any
  ) {
    const customization: AppCustomization = {
      templateId: template.id,
      fields: {
        ...aiContent.fields,
        businessModel: aiContent.businessModel || 'Custom SaaS Platform',
        primaryFeature: aiContent.fields?.primaryFeature || aiContent.coreFeatures?.[0] || 'Dashboard',
        userType: aiContent.userPersonas?.[0]?.name || startupData?.targetAudience || 'Business User',
        dataType: this.extractDataType(aiContent.businessModel, startupData?.idea),
        actionVerb: this.extractActionVerb(aiContent.businessModel, startupData?.idea),
        metricName: this.extractMetricName(aiContent.businessModel, startupData?.idea)
      },
      colorScheme: {
        ...template.config.colorScheme,
        ...(aiContent.colorScheme || {})
      },
      typography: template.config.typography,
      enabledFeatures: aiContent.features || [],
      mockData: {
        ...aiContent.mockData,
        // Ensure we have fallback data
        primaryEntities: aiContent.mockData?.primaryEntities || this.generateFallbackEntities(aiContent.businessModel),
        users: aiContent.mockData?.users || [
          { name: 'Alex Chen', role: 'Manager', status: 'Active', joined: '2024-01-15' },
          { name: 'Sarah Wilson', role: 'Analyst', status: 'Active', joined: '2024-02-20' }
        ],
        activities: aiContent.mockData?.activities || [
          { action: 'Updated system', user: 'Alex Chen', timestamp: '2 hours ago', result: 'Success' },
          { action: 'Generated report', user: 'Sarah Wilson', timestamp: '1 day ago', result: 'Completed' }
        ],
        metrics: aiContent.mockData?.metrics || [
          { name: 'Success Rate', value: '94%', change: '+8%', trend: 'up' },
          { name: 'User Satisfaction', value: '4.7/5', change: '+0.3', trend: 'up' }
        ]
      },
      companyData: aiContent.companyData || {
        name: startupData?.companyName || 'Your SaaS',
        tagline: 'Transforming business operations',
        description: startupData?.idea || 'A powerful SaaS solution',
        industry: startupData?.targetAudience || 'Technology'
      },
      routing: template.config.routing,
      appName: aiContent.appName || `${startupData?.companyName || 'Your'} SaaS`,
      appDescription: aiContent.appDescription || 'A comprehensive business application designed for your specific needs'
    };

    return {
      template,
      customization,
      reasoning: aiContent.reasoning || 'Business-specific SaaS application generated using AI analysis of startup data and reports',
      confidence: aiContent.confidence || 0.85
    };
  }

  private extractDataType(businessModel: string = '', idea: string = ''): string {
    const combined = `${businessModel} ${idea}`.toLowerCase();
    
    if (combined.includes('inventory') || combined.includes('stock')) return 'Products';
    if (combined.includes('user') || combined.includes('customer')) return 'Users';
    if (combined.includes('marketplace') || combined.includes('seller')) return 'Sellers';
    if (combined.includes('analytics') || combined.includes('data')) return 'Datasets';
    if (combined.includes('project') || combined.includes('task')) return 'Projects';
    
    return 'Items';
  }

  private extractActionVerb(businessModel: string = '', idea: string = ''): string {
    const combined = `${businessModel} ${idea}`.toLowerCase();
    
    if (combined.includes('track') || combined.includes('monitor')) return 'Track';
    if (combined.includes('manage') || combined.includes('organize')) return 'Manage';
    if (combined.includes('analyze') || combined.includes('analyze')) return 'Analyze';
    if (combined.includes('connect') || combined.includes('match')) return 'Connect';
    
    return 'Manage';
  }

  private extractMetricName(businessModel: string = '', idea: string = ''): string {
    const combined = `${businessModel} ${idea}`.toLowerCase();
    
    if (combined.includes('inventory') || combined.includes('stock')) return 'Stock Levels';
    if (combined.includes('marketplace')) return 'Transaction Volume';
    if (combined.includes('analytics')) return 'Data Processing';
    if (combined.includes('user') || combined.includes('customer')) return 'User Engagement';
    
    return 'Performance Score';
  }

  private generateFallbackEntities(businessModel: string = ''): any[] {
    if (businessModel.includes('inventory')) {
      return [
        { name: 'Eco-Friendly Widget A', status: 'In Stock', metric: '250', category: 'Sustainable' },
        { name: 'Recycled Component B', status: 'Low Stock', metric: '45', category: 'Green' }
      ];
    }
    
    if (businessModel.includes('marketplace')) {
      return [
        { name: 'Premium Seller', status: 'Verified', metric: '4.8', category: 'Top Rated' },
        { name: 'Growing Business', status: 'Active', metric: '4.2', category: 'Standard' }
      ];
    }
    
    return [
      { name: 'Sample Entity A', status: 'Active', metric: '100', category: 'Primary' },
      { name: 'Sample Entity B', status: 'Pending', metric: '85', category: 'Secondary' }
    ];
  }

  private createFallbackBusinessApp(startupData: any, targetTemplateId?: string, errorMessage?: string) {
    console.log('Creating fallback business app...', { targetTemplateId, errorMessage });
    
    // Smart fallback template selection
    let fallbackTemplate: AppTemplate | null = null;
    
    if (targetTemplateId) {
      fallbackTemplate = appTemplateManager.getTemplate(targetTemplateId);
    }
    
    if (!fallbackTemplate) {
      // Intelligent fallback based on business type
      const idea = (startupData?.idea || '').toLowerCase();
      
      if (idea.includes('inventory') || idea.includes('stock') || idea.includes('product')) {
        fallbackTemplate = appTemplateManager.getTemplate('modern-ecommerce');
      } else if (idea.includes('service') || idea.includes('consulting') || idea.includes('agency')) {
        fallbackTemplate = appTemplateManager.getTemplate('business-platform');
      } else {
        fallbackTemplate = appTemplateManager.getTemplate('advanced-saas-dashboard');
      }
    }
    
    if (!fallbackTemplate) {
      const templates = appTemplateManager.getTemplates();
      fallbackTemplate = templates[0]; // Final fallback to first available template
    }

    if (!fallbackTemplate) {
      throw new Error('No app templates available for fallback');
    }

    const fallbackCustomization: AppCustomization = {
      templateId: fallbackTemplate.id,
      fields: {
        appName: `${startupData?.companyName || 'Your'} Dashboard`,
        primaryMetric: 'Total Users',
        featureTitle: 'Core Features',
        storeName: startupData?.companyName || 'Your Store',
        productCategory: 'Products',
        platformName: startupData?.companyName || 'Your Platform',
        serviceType: 'Services'
      },
      colorScheme: fallbackTemplate.config.colorScheme,
      typography: fallbackTemplate.config.typography,
      enabledFeatures: fallbackTemplate.config.features.map(f => f.id),
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
      companyData: {
        name: startupData?.companyName || 'Your Company',
        tagline: 'Innovation that drives results',
        description: startupData?.idea || 'A powerful application for business success',
        industry: startupData?.targetAudience || 'Technology'
      },
      routing: fallbackTemplate.config.routing,
      appName: `${startupData?.companyName || 'Your'} Dashboard`,
      appDescription: 'A comprehensive dashboard application for managing your business'
    };

    return {
      template: fallbackTemplate,
      customization: fallbackCustomization,
      reasoning: `Generated business-specific fallback app using ${fallbackTemplate.name} template${errorMessage ? ` due to: ${errorMessage}` : ''}. Application designed based on startup idea and target audience.`,
      confidence: 0.7
    };
  }

  async regenerateAppContent(
    templateId: string,
    startupData: any,
    reports: Record<string, string>
  ): Promise<AppCustomization> {
    const result = await this.generateAppContentWithAI(startupData, reports, templateId);
    if (!result.customization) {
      throw new Error('Failed to regenerate app content - using fallback');
    }
    return result.customization;
  }
}

export const claudeAIAppSelector = new ClaudeAIAppSelector();
