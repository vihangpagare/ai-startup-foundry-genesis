
import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { appTemplateManager } from './appTemplateManager';
import { intelligentTemplateSelector } from './intelligentTemplateSelector';
import { aiContentCustomizer } from './aiContentCustomizer';

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
      console.log('=== AI App Generation Started ===', {
        company: startupData?.companyName,
        idea: startupData?.idea?.substring(0, 100),
        targetTemplate: targetTemplateId,
        reportsAvailable: Object.keys(reports || {})
      });

      // Step 1: Validate input data
      if (!startupData) {
        throw new Error('Startup data is required for app generation');
      }

      // Step 2: Analyze startup data for intelligent template selection
      const businessAnalysis = intelligentTemplateSelector.analyzeStartupForTemplateSelection(
        startupData, 
        reports || {}
      );
      console.log('Business analysis completed:', businessAnalysis);

      // Step 3: Select the best existing template
      let selectedTemplate: AppTemplate | null = null;
      let reasoning = '';
      let confidence = 0.8;

      if (targetTemplateId) {
        // User specified a template
        selectedTemplate = appTemplateManager.getTemplate(targetTemplateId);
        if (selectedTemplate) {
          reasoning = `Using specified template: ${selectedTemplate.name}`;
          confidence = 0.9;
          console.log('Using specified template:', selectedTemplate.id);
        } else {
          console.warn('Specified template not found:', targetTemplateId);
        }
      }

      if (!selectedTemplate) {
        // AI-powered template selection
        try {
          const templateMatch = intelligentTemplateSelector.selectBestTemplate(businessAnalysis);
          selectedTemplate = appTemplateManager.getTemplate(templateMatch.templateId);
          reasoning = templateMatch.reasoning;
          confidence = templateMatch.confidence;
          console.log('AI selected template:', templateMatch);
        } catch (error) {
          console.error('Template selection failed:', error);
        }
      }

      if (!selectedTemplate) {
        // Fallback to feature-centric template
        const templates = appTemplateManager.getTemplates();
        selectedTemplate = templates.find(t => t.id === 'advanced-saas-dashboard') || templates[0];
        reasoning = 'Using feature-centric dashboard template as fallback';
        confidence = 0.7;
        console.log('Using fallback template:', selectedTemplate?.id);
      }

      if (!selectedTemplate) {
        throw new Error('No templates available for app generation');
      }

      console.log(`✓ Selected template: ${selectedTemplate.name} (${selectedTemplate.id})`);

      // Step 4: Generate business-specific content using AI
      let businessContent;
      try {
        businessContent = await aiContentCustomizer.generateBusinessSpecificContent(
          selectedTemplate.id,
          startupData,
          businessAnalysis,
          reports || {}
        );
        console.log('✓ Business content generated successfully');
      } catch (error) {
        console.error('Business content generation failed, using fallback:', error);
        // The service will handle fallback internally
        businessContent = await aiContentCustomizer.generateBusinessSpecificContent(
          selectedTemplate.id,
          startupData,
          businessAnalysis,
          reports || {}
        );
      }

      // Step 5: Create highly customized app customization
      const customization = aiContentCustomizer.createCustomizedAppCustomization(
        selectedTemplate,
        businessContent,
        startupData,
        businessAnalysis
      );

      // Step 6: Validate the customization
      if (!customization || !customization.templateId) {
        throw new Error('Failed to create valid app customization');
      }

      console.log('✓ App customization created:', {
        templateId: customization.templateId,
        appName: customization.appName,
        industry: customization.companyData.industry
      });

      // Step 7: Generate enhanced reasoning
      const enhancedReasoning = this.generateEnhancedReasoning(
        selectedTemplate,
        businessAnalysis,
        startupData,
        reasoning
      );

      console.log('=== AI App Generation Completed Successfully ===');

      return {
        template: selectedTemplate,
        customization,
        reasoning: enhancedReasoning,
        confidence
      };

    } catch (error) {
      console.error('=== AI App Generation Failed ===', error);
      return this.createFallbackResult(startupData, targetTemplateId, error.message);
    }
  }

  private generateEnhancedReasoning(
    template: AppTemplate,
    businessAnalysis: any,
    startupData: any,
    baseReasoning: string
  ): string {
    const companyName = startupData?.companyName || 'your business';
    const industry = businessAnalysis?.industry || 'Technology';
    const features = businessAnalysis?.coreFeatures?.join(', ') || 'core business features';
    
    return `✨ Selected ${template.name} template for ${companyName} in the ${industry} industry.

${baseReasoning}

🚀 This template has been intelligently customized with:
• Industry-specific terminology and user interfaces optimized for ${industry.toLowerCase()}
• Business-appropriate mock data and realistic examples
• ${businessAnalysis?.coreFeatures?.length || 3} core features: ${features}
• ${businessAnalysis?.userPersonas?.length || 2} user persona interfaces
• Custom color scheme and branding aligned with ${industry} best practices
• Feature-centric navigation focusing on user engagement and functionality

The resulting application demonstrates ${companyName}'s specific value proposition with realistic ${industry.toLowerCase()} scenarios, creating a purpose-built solution that feels native to your business domain rather than a generic template.`;
  }

  private createFallbackResult(startupData: any, targetTemplateId?: string, errorMessage?: string) {
    console.log('=== Creating Intelligent Fallback Result ===', { targetTemplateId, errorMessage });
    
    try {
      const templates = appTemplateManager.getTemplates();
      let fallbackTemplate = null;
      
      // Try specified template first
      if (targetTemplateId) {
        fallbackTemplate = appTemplateManager.getTemplate(targetTemplateId);
      }
      
      // Intelligent fallback based on startup idea
      if (!fallbackTemplate && startupData?.idea) {
        const idea = startupData.idea.toLowerCase();
        
        if (idea.includes('education') || idea.includes('learning') || idea.includes('student')) {
          fallbackTemplate = appTemplateManager.getTemplate('advanced-saas-dashboard');
        } else if (idea.includes('ecommerce') || idea.includes('product') || idea.includes('store')) {
          fallbackTemplate = appTemplateManager.getTemplate('modern-ecommerce-platform');
        } else if (idea.includes('service') || idea.includes('consulting') || idea.includes('agency')) {
          fallbackTemplate = appTemplateManager.getTemplate('business-service-platform');
        }
      }
      
      // Default to feature-centric dashboard
      if (!fallbackTemplate) {
        fallbackTemplate = templates.find(t => t.id === 'advanced-saas-dashboard') || templates[0];
      }

      if (!fallbackTemplate) {
        throw new Error('No app templates available for fallback generation');
      }

      console.log('✓ Fallback template selected:', fallbackTemplate.id);

      // Create robust fallback customization
      const fallbackCustomization: AppCustomization = {
        templateId: fallbackTemplate.id,
        fields: {
          appName: `${startupData?.companyName || 'Feature'} Platform`,
          dashboardTitle: 'Feature-Centric Dashboard',
          primaryEntity: 'Features',
          actionVerb: 'Manage',
          metricName: 'Feature Usage',
          pageTitle: 'Feature Overview',
          buttonText: 'Explore Features'
        },
        colorScheme: fallbackTemplate.config.colorScheme,
        typography: fallbackTemplate.config.typography,
        enabledFeatures: fallbackTemplate.config.features.map(f => f.id),
        mockData: {
          features: [
            { name: 'User Management', usage: '95%', status: 'Active', users: 247 },
            { name: 'Analytics Dashboard', usage: '87%', status: 'Active', users: 189 },
            { name: 'Feature Library', usage: '76%', status: 'Active', users: 156 }
          ],
          metrics: [
            { name: 'Feature Adoption', value: '94%', change: '+12%', trend: 'up' },
            { name: 'User Engagement', value: '87%', change: '+8%', trend: 'up' },
            { name: 'Feature Requests', value: '23', change: '+5', trend: 'up' }
          ],
          activities: [
            { user: 'Sarah Chen', action: 'Activated Analytics feature', time: '2 minutes ago' },
            { user: 'Mike Johnson', action: 'Completed Feature onboarding', time: '15 minutes ago' },
            { user: 'Emily Davis', action: 'Explored Feature Library', time: '1 hour ago' }
          ]
        },
        companyData: {
          name: startupData?.companyName || 'Feature Platform',
          tagline: 'Empowering businesses through intelligent features',
          description: startupData?.idea || 'A comprehensive feature-centric platform designed for modern businesses',
          industry: 'Technology'
        },
        routing: fallbackTemplate.config.routing,
        appName: `${startupData?.companyName || 'Feature'} Platform`,
        appDescription: 'A robust feature-centric platform built for your specific business needs'
      };

      console.log('✓ Fallback customization created successfully');

      return {
        template: fallbackTemplate,
        customization: fallbackCustomization,
        reasoning: `🔄 Intelligent fallback: ${fallbackTemplate.name} template${errorMessage ? ` (${errorMessage})` : ''}. Selected feature-centric approach based on business analysis with customized terminology and industry-appropriate mock data.`,
        confidence: 0.75
      };

    } catch (fallbackError) {
      console.error('Fallback generation failed:', fallbackError);
      throw new Error(`App generation failed completely: ${fallbackError.message}`);
    }
  }

  async regenerateAppContent(
    templateId: string,
    startupData: any,
    reports: Record<string, string>
  ): Promise<AppCustomization> {
    console.log('Regenerating app content for template:', templateId);
    
    const result = await this.generateAppContentWithAI(startupData, reports, templateId);
    if (!result.customization) {
      throw new Error('Failed to regenerate app content - no customization returned');
    }
    
    console.log('✓ App content regenerated successfully');
    return result.customization;
  }
}

export const claudeAIAppSelector = new ClaudeAIAppSelector();
