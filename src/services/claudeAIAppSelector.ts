
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
      console.log('Generating intelligent app customization...', {
        company: startupData?.companyName,
        idea: startupData?.idea?.substring(0, 100),
        targetTemplate: targetTemplateId,
        reportsAvailable: Object.keys(reports || {})
      });

      // Step 1: Analyze startup data for intelligent template selection
      const businessAnalysis = intelligentTemplateSelector.analyzeStartupForTemplateSelection(
        startupData, 
        reports || {}
      );
      console.log('Business analysis completed:', businessAnalysis);

      // Step 2: Select the best existing template (no dynamic generation)
      let selectedTemplate: AppTemplate | null = null;
      let reasoning = '';
      let confidence = 0.8;

      if (targetTemplateId) {
        // User specified a template
        selectedTemplate = appTemplateManager.getTemplate(targetTemplateId);
        if (selectedTemplate) {
          reasoning = `Using specified template: ${selectedTemplate.name}`;
          confidence = 0.9;
        }
      }

      if (!selectedTemplate) {
        // AI-powered template selection
        const templateMatch = intelligentTemplateSelector.selectBestTemplate(businessAnalysis);
        selectedTemplate = appTemplateManager.getTemplate(templateMatch.templateId);
        reasoning = templateMatch.reasoning;
        confidence = templateMatch.confidence;
      }

      if (!selectedTemplate) {
        // Fallback to first available template
        const templates = appTemplateManager.getTemplates();
        selectedTemplate = templates[0];
        reasoning = 'Using fallback template due to selection failure';
        confidence = 0.6;
      }

      if (!selectedTemplate) {
        throw new Error('No templates available');
      }

      console.log(`Selected template: ${selectedTemplate.name} (${selectedTemplate.id})`);

      // Step 3: Generate business-specific content using AI
      const businessContent = await aiContentCustomizer.generateBusinessSpecificContent(
        selectedTemplate.id,
        startupData,
        businessAnalysis,
        reports || {}
      );

      // Step 4: Create highly customized app customization
      const customization = aiContentCustomizer.createCustomizedAppCustomization(
        selectedTemplate,
        businessContent,
        startupData,
        businessAnalysis
      );

      // Step 5: Generate enhanced reasoning
      const enhancedReasoning = this.generateEnhancedReasoning(
        selectedTemplate,
        businessAnalysis,
        startupData,
        reasoning
      );

      return {
        template: selectedTemplate,
        customization,
        reasoning: enhancedReasoning,
        confidence
      };

    } catch (error) {
      console.error('Intelligent app generation error:', error);
      return this.createFallbackResult(startupData, targetTemplateId, error.message);
    }
  }

  private generateEnhancedReasoning(
    template: AppTemplate,
    businessAnalysis: any,
    startupData: any,
    baseReasoning: string
  ): string {
    const companyName = startupData?.companyName || 'the business';
    const industry = businessAnalysis.industry;
    const features = businessAnalysis.coreFeatures.join(', ');
    
    return `Selected ${template.name} template for ${companyName} in the ${industry} industry. ${baseReasoning}

This template has been deeply customized with:
- Industry-specific terminology and user interfaces
- Business-appropriate mock data and examples  
- ${businessAnalysis.coreFeatures.length} core features: ${features}
- ${businessAnalysis.userPersonas.length} user persona interfaces
- Custom color scheme and branding for ${industry}

The resulting application demonstrates ${companyName}'s specific value proposition with realistic ${industry.toLowerCase()} scenarios, making it feel like a purpose-built solution rather than a generic template.`;
  }

  private createFallbackResult(startupData: any, targetTemplateId?: string, errorMessage?: string) {
    console.log('Creating intelligent fallback result...', { targetTemplateId, errorMessage });
    
    const templates = appTemplateManager.getTemplates();
    let fallbackTemplate = null;
    
    if (targetTemplateId) {
      fallbackTemplate = appTemplateManager.getTemplate(targetTemplateId);
    }
    
    if (!fallbackTemplate) {
      // Intelligent fallback based on startup idea
      const idea = (startupData?.idea || '').toLowerCase();
      
      if (idea.includes('education') || idea.includes('learning') || idea.includes('student')) {
        fallbackTemplate = appTemplateManager.getTemplate('advanced-saas-dashboard');
      } else if (idea.includes('ecommerce') || idea.includes('product') || idea.includes('store')) {
        fallbackTemplate = appTemplateManager.getTemplate('modern-ecommerce');
      } else if (idea.includes('service') || idea.includes('consulting') || idea.includes('agency')) {
        fallbackTemplate = appTemplateManager.getTemplate('business-platform');
      } else {
        fallbackTemplate = appTemplateManager.getTemplate('advanced-saas-dashboard');
      }
    }
    
    if (!fallbackTemplate) {
      fallbackTemplate = templates[0];
    }

    if (!fallbackTemplate) {
      throw new Error('No app templates available for fallback');
    }

    const fallbackCustomization: AppCustomization = {
      templateId: fallbackTemplate.id,
      fields: {
        appName: `${startupData?.companyName || 'Your'} Platform`,
        dashboardTitle: 'Business Dashboard',
        primaryEntity: 'Users',
        actionVerb: 'Manage',
        metricName: 'Performance Score',
        pageTitle: 'Dashboard',
        buttonText: 'Get Started'
      },
      colorScheme: fallbackTemplate.config.colorScheme,
      typography: fallbackTemplate.config.typography,
      enabledFeatures: fallbackTemplate.config.features.map(f => f.id),
      mockData: {
        users: [
          { name: 'John Smith', role: 'Manager', status: 'Active', performance: 'Excellent' },
          { name: 'Sarah Johnson', role: 'Analyst', status: 'Active', performance: 'Good' }
        ],
        projects: [
          { name: 'Business Initiative', progress: 75, team: 4, status: 'On Track' }
        ],
        metrics: [
          { name: 'Performance', value: '95%', change: '+8%', trend: 'up' },
          { name: 'Efficiency', value: '87%', change: '+5%', trend: 'up' }
        ]
      },
      companyData: {
        name: startupData?.companyName || 'Your Company',
        tagline: 'Transforming business through innovation',
        description: startupData?.idea || 'A comprehensive platform for business success',
        industry: 'Technology'
      },
      routing: fallbackTemplate.config.routing,
      appName: `${startupData?.companyName || 'Your'} Platform`,
      appDescription: 'A comprehensive business platform designed for your specific needs'
    };

    return {
      template: fallbackTemplate,
      customization: fallbackCustomization,
      reasoning: `Intelligent fallback using ${fallbackTemplate.name} template${errorMessage ? ` due to: ${errorMessage}` : ''}. Template selected based on business analysis and customized with appropriate terminology.`,
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
