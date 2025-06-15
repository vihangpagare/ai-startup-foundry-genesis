
import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { appTemplateManager } from './appTemplateManager';
import { supabase } from '@/integrations/supabase/client';

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
      console.log('Generating business-specific SaaS app with Claude...', {
        company: startupData?.companyName,
        idea: startupData?.idea?.substring(0, 100),
        targetTemplate: targetTemplateId,
        reportsAvailable: Object.keys(reports || {})
      });

      const templates = appTemplateManager.getTemplates();
      
      // Call our enhanced Claude-powered edge function
      let response;
      let attempt = 0;
      const maxAttempts = 2;
      
      while (attempt < maxAttempts) {
        try {
          const { data, error } = await supabase.functions.invoke('generate-app-content', {
            body: {
              startupData,
              reports: reports || {},
              templates: templates.map(t => ({
                id: t.id,
                name: t.name,
                category: t.category,
                description: t.description,
                features: t.features
              })),
              targetTemplateId
            }
          });

          if (error) {
            console.error(`Edge function error (attempt ${attempt + 1}):`, error);
            if (attempt === maxAttempts - 1) {
              throw new Error(`Business-specific app generation failed: ${error.message}`);
            }
          } else {
            response = data;
            break;
          }
        } catch (invokeError) {
          console.error(`Invoke error (attempt ${attempt + 1}):`, invokeError);
          if (attempt === maxAttempts - 1) {
            throw invokeError;
          }
        }
        attempt++;
        
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (!response) {
        throw new Error('Failed to get response from AI service after retries');
      }

      if (!response.success) {
        if (response.content && response.warning) {
          console.warn('Using fallback business-specific content:', response.warning);
        } else {
          throw new Error(response.error || 'Business-specific app generation failed');
        }
      }

      const aiContent: AIGeneratedAppContent = response.content;
      console.log('AI generated business-specific content:', aiContent);

      // Get the existing template that the AI selected
      const selectedTemplate = appTemplateManager.getTemplate(aiContent.templateId);
      if (!selectedTemplate) {
        throw new Error(`Template ${aiContent.templateId} not found in available templates`);
      }
      
      return this.createAppCustomizationFromAIContent(selectedTemplate, aiContent, startupData);

    } catch (error) {
      console.error('Claude AI business-specific app error:', error);
      
      return this.createFallbackBusinessApp(startupData, targetTemplateId, error.message);
    }
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
    const templates = appTemplateManager.getTemplates();
    
    // Smart fallback template selection
    let fallbackTemplate: AppTemplate | null = null;
    
    if (targetTemplateId) {
      fallbackTemplate = appTemplateManager.getTemplate(targetTemplateId);
    }
    
    if (!fallbackTemplate) {
      // Intelligent fallback based on business type
      const idea = (startupData?.idea || '').toLowerCase();
      
      if (idea.includes('inventory') || idea.includes('stock') || idea.includes('product')) {
        fallbackTemplate = appTemplateManager.getTemplate('ecommerce-store');
      } else if (idea.includes('service') || idea.includes('consulting') || idea.includes('agency')) {
        fallbackTemplate = appTemplateManager.getTemplate('service-platform');
      } else {
        fallbackTemplate = appTemplateManager.getTemplate('saas-dashboard');
      }
    }
    
    if (!fallbackTemplate) {
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
