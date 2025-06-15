
import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { appTemplateManager } from './appTemplateManager';
import { supabase } from '@/integrations/supabase/client';

interface AIGeneratedAppContent {
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
      console.log('Generating AI app content with Claude...', {
        company: startupData?.companyName,
        targetTemplate: targetTemplateId,
        reportsAvailable: Object.keys(reports || {})
      });

      const templates = appTemplateManager.getTemplates();
      
      // Call our Claude-powered edge function with retry logic
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
              throw new Error(`AI app generation failed: ${error.message}`);
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
        
        // Wait before retry
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (!response) {
        throw new Error('Failed to get response from AI service after retries');
      }

      if (!response.success) {
        // If AI failed but we have fallback content, use it
        if (response.content && response.warning) {
          console.warn('Using fallback app content:', response.warning);
        } else {
          throw new Error(response.error || 'AI app content generation failed');
        }
      }

      const aiContent: AIGeneratedAppContent = response.content;
      console.log('AI generated app content:', aiContent);

      // Get the selected template
      const selectedTemplate = appTemplateManager.getTemplate(aiContent.templateId);
      if (!selectedTemplate) {
        // Fallback to first available template if AI selected invalid template
        const fallbackTemplate = templates[0];
        console.warn(`App template ${aiContent.templateId} not found, using fallback: ${fallbackTemplate.id}`);
        aiContent.templateId = fallbackTemplate.id;
        return this.createAppCustomizationFromAIContent(fallbackTemplate, aiContent, startupData);
      }

      return this.createAppCustomizationFromAIContent(selectedTemplate, aiContent, startupData);

    } catch (error) {
      console.error('Claude AI app selection error:', error);
      
      // Create fallback content if AI completely fails
      return this.createFallbackAppResult(startupData, targetTemplateId, error.message);
    }
  }

  private createAppCustomizationFromAIContent(
    template: AppTemplate,
    aiContent: AIGeneratedAppContent,
    startupData: any
  ) {
    // Create customization object
    const customization: AppCustomization = {
      templateId: aiContent.templateId,
      fields: aiContent.fields || {},
      colorScheme: {
        ...template.config.colorScheme,
        ...(aiContent.colorScheme || {})
      },
      typography: template.config.typography,
      enabledFeatures: aiContent.features || [],
      mockData: aiContent.mockData || {},
      companyData: aiContent.companyData || {
        name: startupData?.companyName || 'Your Company',
        tagline: 'Innovation that drives results',
        description: startupData?.idea || 'A powerful application for business success',
        industry: startupData?.targetAudience || 'Technology'
      },
      routing: template.config.routing,
      appName: aiContent.appName || `${startupData?.companyName || 'Your'} App`,
      appDescription: aiContent.appDescription || 'A comprehensive business application'
    };

    return {
      template,
      customization,
      reasoning: aiContent.reasoning || 'AI-generated app with personalized content and functionality',
      confidence: aiContent.confidence || 0.8
    };
  }

  private createFallbackAppResult(startupData: any, targetTemplateId?: string, errorMessage?: string) {
    const templates = appTemplateManager.getTemplates();
    const fallbackTemplate = targetTemplateId 
      ? appTemplateManager.getTemplate(targetTemplateId) || templates[0]
      : templates[0];

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
      reasoning: `Using fallback app content${errorMessage ? ` due to: ${errorMessage}` : ''}. Template selected based on business type and industry.`,
      confidence: 0.6
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
