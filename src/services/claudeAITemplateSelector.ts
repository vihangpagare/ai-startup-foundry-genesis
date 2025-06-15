
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';
import { templateManager } from './templateManager';
import { supabase } from '@/integrations/supabase/client';

interface AIGeneratedContent {
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

class ClaudeAITemplateSelector {
  async generateContentWithAI(
    startupData: any, 
    reports: Record<string, string>,
    targetTemplateId?: string
  ): Promise<{
    template: LandingPageTemplate | null;
    customization: TemplateCustomization | null;
    reasoning: string;
    confidence: number;
  }> {
    try {
      console.log('Generating AI content with Claude...', {
        company: startupData?.companyName,
        targetTemplate: targetTemplateId,
        reportsAvailable: Object.keys(reports || {})
      });

      const templates = templateManager.getTemplates();
      
      // Call our Claude-powered edge function with retry logic
      let response;
      let attempt = 0;
      const maxAttempts = 2;
      
      while (attempt < maxAttempts) {
        try {
          const { data, error } = await supabase.functions.invoke('generate-landing-content', {
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
              throw new Error(`AI generation failed: ${error.message}`);
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
          console.warn('Using fallback content:', response.warning);
        } else {
          throw new Error(response.error || 'AI content generation failed');
        }
      }

      const aiContent: AIGeneratedContent = response.content;
      console.log('AI generated content:', aiContent);

      // Get the selected template
      const selectedTemplate = templateManager.getTemplate(aiContent.templateId);
      if (!selectedTemplate) {
        // Fallback to first available template if AI selected invalid template
        const fallbackTemplate = templates[0];
        console.warn(`Template ${aiContent.templateId} not found, using fallback: ${fallbackTemplate.id}`);
        aiContent.templateId = fallbackTemplate.id;
        return this.createCustomizationFromAIContent(fallbackTemplate, aiContent, startupData);
      }

      return this.createCustomizationFromAIContent(selectedTemplate, aiContent, startupData);

    } catch (error) {
      console.error('Claude AI selection error:', error);
      
      // Create fallback content if AI completely fails
      return this.createFallbackResult(startupData, targetTemplateId, error.message);
    }
  }

  private createCustomizationFromAIContent(
    template: LandingPageTemplate,
    aiContent: AIGeneratedContent,
    startupData: any
  ) {
    // Create customization object
    const customization: TemplateCustomization = {
      templateId: aiContent.templateId,
      fields: aiContent.fields || {},
      colorScheme: {
        ...template.config.colorScheme,
        ...(aiContent.colorScheme || {})
      },
      typography: template.config.typography,
      enabledSections: template.config.sections
        .filter(s => s.required)
        .map(s => s.id),
      sectionVariants: this.generateSectionVariants(template, startupData),
      animations: template.config.animations,
      companyData: aiContent.companyData || {
        name: startupData?.companyName || 'Your Company',
        tagline: aiContent.fields?.heroSubtitle || 'Innovation that drives results',
        description: startupData?.idea || 'Transforming businesses with cutting-edge solutions',
        industry: startupData?.targetAudience || 'Technology'
      },
      integrations: {}
    };

    return {
      template,
      customization,
      reasoning: aiContent.reasoning || 'AI-generated content with personalized messaging',
      confidence: aiContent.confidence || 0.8
    };
  }

  private createFallbackResult(startupData: any, targetTemplateId?: string, errorMessage?: string) {
    const templates = templateManager.getTemplates();
    const fallbackTemplate = targetTemplateId 
      ? templateManager.getTemplate(targetTemplateId) || templates[0]
      : templates[0];

    if (!fallbackTemplate) {
      throw new Error('No templates available for fallback');
    }

    const fallbackCustomization: TemplateCustomization = {
      templateId: fallbackTemplate.id,
      fields: {
        heroTitle: `Transform Your Business with ${startupData?.companyName || 'Our Solution'}`,
        heroSubtitle: startupData?.solution || startupData?.idea || 'Innovative solutions that drive growth and success',
        ctaText: 'Get Started Today',
        feature1Title: 'Easy to Use',
        feature1Description: 'Intuitive interface designed for maximum productivity',
        feature2Title: 'Powerful Features',
        feature2Description: 'Advanced capabilities to meet your business needs',
        feature3Title: 'Reliable Support',
        feature3Description: '24/7 customer support to help you succeed'
      },
      colorScheme: fallbackTemplate.config.colorScheme,
      typography: fallbackTemplate.config.typography,
      enabledSections: fallbackTemplate.config.sections
        .filter(s => s.required)
        .map(s => s.id),
      sectionVariants: this.generateSectionVariants(fallbackTemplate, startupData),
      animations: fallbackTemplate.config.animations,
      companyData: {
        name: startupData?.companyName || 'Your Company',
        tagline: 'Innovation that drives results',
        description: startupData?.idea || 'Transforming businesses with cutting-edge solutions',
        industry: startupData?.targetAudience || 'Technology'
      },
      integrations: {}
    };

    return {
      template: fallbackTemplate,
      customization: fallbackCustomization,
      reasoning: `Using fallback content${errorMessage ? ` due to: ${errorMessage}` : ''}. Template selected based on business type and industry.`,
      confidence: 0.6
    };
  }

  async regenerateContent(
    templateId: string,
    startupData: any,
    reports: Record<string, string>
  ): Promise<TemplateCustomization> {
    const result = await this.generateContentWithAI(startupData, reports, templateId);
    if (!result.customization) {
      throw new Error('Failed to regenerate content - using fallback');
    }
    return result.customization;
  }

  private generateSectionVariants(template: LandingPageTemplate, startupData: any): Record<string, string> {
    const businessModel = this.detectBusinessModel(startupData);
    
    const variants: Record<string, string> = {};
    
    if (template.category === 'saas') {
      variants.pricing = 'comparison';
      variants.hero = 'split';
    } else if (template.category === 'ecommerce') {
      variants.hero = 'product-focus';
      variants.products = 'grid';
    } else if (template.category === 'service') {
      variants.testimonials = 'carousel';
      variants.hero = 'centered';
    }
    
    return variants;
  }

  private detectBusinessModel(startupData: any): string {
    const idea = (startupData?.idea || '').toLowerCase();
    
    if (idea.includes('subscription') || idea.includes('saas') || idea.includes('software')) return 'saas';
    if (idea.includes('marketplace') || idea.includes('platform')) return 'marketplace';
    if (idea.includes('ecommerce') || idea.includes('online store')) return 'ecommerce';
    if (idea.includes('consulting') || idea.includes('service')) return 'service';
    
    return 'saas';
  }
}

export const claudeAITemplateSelector = new ClaudeAITemplateSelector();
