
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
        reportsAvailable: Object.keys(reports)
      });

      const templates = templateManager.getTemplates();
      
      // Call our Claude-powered edge function
      const { data, error } = await supabase.functions.invoke('generate-landing-content', {
        body: {
          startupData,
          reports,
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
        console.error('Edge function error:', error);
        throw new Error(`AI generation failed: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'AI content generation failed');
      }

      const aiContent: AIGeneratedContent = data.content;
      console.log('AI generated content:', aiContent);

      // Get the selected template
      const selectedTemplate = templateManager.getTemplate(aiContent.templateId);
      if (!selectedTemplate) {
        throw new Error(`Template ${aiContent.templateId} not found`);
      }

      // Create customization object
      const customization: TemplateCustomization = {
        templateId: aiContent.templateId,
        fields: aiContent.fields,
        colorScheme: {
          ...selectedTemplate.config.colorScheme,
          ...(aiContent.colorScheme || {})
        },
        typography: selectedTemplate.config.typography,
        enabledSections: selectedTemplate.config.sections
          .filter(s => s.required)
          .map(s => s.id),
        sectionVariants: this.generateSectionVariants(selectedTemplate, startupData),
        animations: selectedTemplate.config.animations,
        companyData: aiContent.companyData,
        integrations: {}
      };

      return {
        template: selectedTemplate,
        customization,
        reasoning: aiContent.reasoning,
        confidence: aiContent.confidence
      };

    } catch (error) {
      console.error('Claude AI selection error:', error);
      throw new Error(`AI template selection failed: ${error.message}`);
    }
  }

  async regenerateContent(
    templateId: string,
    startupData: any,
    reports: Record<string, string>
  ): Promise<TemplateCustomization> {
    const result = await this.generateContentWithAI(startupData, reports, templateId);
    if (!result.customization) {
      throw new Error('Failed to regenerate content');
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
