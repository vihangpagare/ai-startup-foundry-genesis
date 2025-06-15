
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';
import { templateManager } from './templateManager';

interface StartupAnalysis {
  businessModel: string;
  industry: string;
  targetAudience: string;
  valueProposition: string;
  keyFeatures: string[];
  competitiveAdvantages: string[];
  marketSize: string;
  pricingStrategy: string;
}

interface TemplateScore {
  templateId: string;
  score: number;
  reasoning: string;
  confidence: number;
}

interface AIGeneratedContent {
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  features: {
    title: string;
    description: string;
  }[];
  valueProposition: string;
  testimonials: {
    name: string;
    role: string;
    company: string;
    content: string;
  }[];
}

class AITemplateSelector {
  analyzeStartupFromReports(ideaData: any, reports: Record<string, string>): StartupAnalysis {
    // Extract key information from the startup idea and generated reports
    const businessModel = this.detectBusinessModel(ideaData, reports);
    const industry = this.extractIndustry(ideaData, reports);
    const targetAudience = ideaData?.targetAudience || 'Technology professionals';
    const valueProposition = ideaData?.uniqueValue || ideaData?.solution || '';
    
    return {
      businessModel,
      industry,
      targetAudience,
      valueProposition,
      keyFeatures: this.extractKeyFeatures(ideaData, reports),
      competitiveAdvantages: this.extractCompetitiveAdvantages(reports),
      marketSize: this.extractMarketSize(reports),
      pricingStrategy: this.extractPricingStrategy(reports)
    };
  }

  selectBestTemplate(analysis: StartupAnalysis): { template: LandingPageTemplate | null, reasoning: string } {
    const templates = templateManager.getTemplates();
    const scores: TemplateScore[] = [];

    templates.forEach(template => {
      const score = this.calculateTemplateScore(template, analysis);
      scores.push(score);
    });

    // Sort by score and get the best match
    scores.sort((a, b) => b.score - a.score);
    const bestScore = scores[0];

    if (bestScore && bestScore.score > 0.6) {
      const template = templateManager.getTemplate(bestScore.templateId);
      return {
        template,
        reasoning: `Selected ${template?.name} (${Math.round(bestScore.confidence * 100)}% confidence): ${bestScore.reasoning}`
      };
    }

    return {
      template: null,
      reasoning: "No template achieved sufficient confidence score. Manual selection recommended."
    };
  }

  generateContentForTemplate(template: LandingPageTemplate, analysis: StartupAnalysis, ideaData: any): AIGeneratedContent {
    const heroTitle = this.generateHeroTitle(analysis, ideaData);
    const heroSubtitle = this.generateHeroSubtitle(analysis, ideaData);
    const ctaText = this.generateCTAText(analysis);
    const features = this.generateFeatures(analysis, template);
    const valueProposition = this.enhanceValueProposition(analysis);
    const testimonials = this.generateTestimonials(analysis);

    return {
      heroTitle,
      heroSubtitle,
      ctaText,
      features,
      valueProposition,
      testimonials
    };
  }

  createCustomization(template: LandingPageTemplate, analysis: StartupAnalysis, ideaData: any): TemplateCustomization {
    const content = this.generateContentForTemplate(template, analysis, ideaData);
    const colorScheme = this.selectColorScheme(analysis);

    const fields: Record<string, any> = {
      heroTitle: content.heroTitle,
      heroSubtitle: content.heroSubtitle,
      ctaText: content.ctaText,
    };

    // Populate feature fields
    content.features.forEach((feature, index) => {
      fields[`feature${index + 1}Title`] = feature.title;
      fields[`feature${index + 1}Description`] = feature.description;
    });

    return {
      templateId: template.id,
      fields,
      colorScheme: { ...template.config.colorScheme, ...colorScheme },
      typography: template.config.typography,
      enabledSections: template.config.sections.filter(s => s.required).map(s => s.id),
      sectionVariants: this.selectSectionVariants(analysis, template),
      animations: template.config.animations,
      companyData: {
        name: ideaData?.companyName || 'Your Company',
        tagline: content.heroSubtitle,
        description: content.valueProposition,
        industry: analysis.industry,
        website: ideaData?.website || ''
      },
      integrations: {}
    };
  }

  private calculateTemplateScore(template: LandingPageTemplate, analysis: StartupAnalysis): TemplateScore {
    let score = 0;
    let reasoning = '';
    
    // Business model compatibility (40% weight)
    const businessModelScore = this.scoreBusinessModelMatch(template, analysis.businessModel);
    score += businessModelScore * 0.4;
    
    // Industry fit (30% weight)
    const industryScore = this.scoreIndustryMatch(template, analysis.industry);
    score += industryScore * 0.3;
    
    // Feature requirements (20% weight)
    const featureScore = this.scoreFeatureMatch(template, analysis);
    score += featureScore * 0.2;
    
    // Complexity match (10% weight)
    const complexityScore = this.scoreComplexityMatch(template, analysis);
    score += complexityScore * 0.1;

    reasoning = this.generateScoreReasoning(template, businessModelScore, industryScore, featureScore, complexityScore);

    return {
      templateId: template.id,
      score,
      reasoning,
      confidence: Math.min(score, 1.0)
    };
  }

  private scoreBusinessModelMatch(template: LandingPageTemplate, businessModel: string): number {
    const templateCategory = template.category.toLowerCase();
    const model = businessModel.toLowerCase();

    if ((model.includes('saas') || model.includes('software')) && templateCategory === 'saas') return 1.0;
    if ((model.includes('service') || model.includes('consulting')) && templateCategory === 'service') return 1.0;
    if ((model.includes('ecommerce') || model.includes('product')) && templateCategory === 'ecommerce') return 1.0;
    if ((model.includes('portfolio') || model.includes('creative')) && templateCategory === 'portfolio') return 1.0;
    if (templateCategory === 'corporate') return 0.7; // Corporate works for most business models
    
    return 0.3; // Low but not zero for mismatches
  }

  private scoreIndustryMatch(template: LandingPageTemplate, industry: string): number {
    // Simple industry scoring - can be enhanced based on template features
    const techIndustries = ['technology', 'software', 'fintech', 'healthtech'];
    const serviceIndustries = ['consulting', 'professional services', 'marketing'];
    
    if (techIndustries.some(tech => industry.toLowerCase().includes(tech))) {
      return template.category === 'saas' ? 1.0 : 0.7;
    }
    
    if (serviceIndustries.some(service => industry.toLowerCase().includes(service))) {
      return template.category === 'service' ? 1.0 : 0.6;
    }
    
    return 0.8; // Neutral score for unknown industries
  }

  private scoreFeatureMatch(template: LandingPageTemplate, analysis: StartupAnalysis): number {
    const requiredFeatures = analysis.keyFeatures.length;
    const templateFeatures = template.features.length;
    
    // Score based on feature coverage
    if (templateFeatures >= requiredFeatures) return 1.0;
    return templateFeatures / requiredFeatures;
  }

  private scoreComplexityMatch(template: LandingPageTemplate, analysis: StartupAnalysis): number {
    const featureCount = analysis.keyFeatures.length;
    const complexity = template.complexity;
    
    if (featureCount <= 3 && complexity === 'simple') return 1.0;
    if (featureCount <= 6 && complexity === 'moderate') return 1.0;
    if (featureCount > 6 && complexity === 'advanced') return 1.0;
    
    return 0.7; // Partial match
  }

  private generateScoreReasoning(template: LandingPageTemplate, businessScore: number, industryScore: number, featureScore: number, complexityScore: number): string {
    const reasons = [];
    
    if (businessScore > 0.8) reasons.push('excellent business model fit');
    if (industryScore > 0.8) reasons.push('strong industry alignment');
    if (featureScore > 0.8) reasons.push('comprehensive feature coverage');
    if (complexityScore > 0.8) reasons.push('appropriate complexity level');
    
    return reasons.length > 0 ? reasons.join(', ') : 'basic compatibility';
  }

  private detectBusinessModel(ideaData: any, reports: Record<string, string>): string {
    const idea = (ideaData?.idea || '').toLowerCase();
    const businessPlan = (reports['business-plan'] || '').toLowerCase();
    const combined = `${idea} ${businessPlan}`;

    if (combined.includes('subscription') || combined.includes('saas') || combined.includes('software as a service')) return 'saas';
    if (combined.includes('marketplace') || combined.includes('platform')) return 'marketplace';
    if (combined.includes('ecommerce') || combined.includes('online store') || combined.includes('selling products')) return 'ecommerce';
    if (combined.includes('consulting') || combined.includes('service') || combined.includes('agency')) return 'service';
    if (combined.includes('portfolio') || combined.includes('creative') || combined.includes('design')) return 'portfolio';
    
    return 'saas'; // Default fallback
  }

  private extractIndustry(ideaData: any, reports: Record<string, string>): string {
    return ideaData?.targetAudience || ideaData?.industry || 'Technology';
  }

  private extractKeyFeatures(ideaData: any, reports: Record<string, string>): string[] {
    const features = [];
    const techSpecs = reports['technical'] || '';
    const businessPlan = reports['business-plan'] || '';
    
    // Extract features from technical specifications and business plan
    if (techSpecs.includes('analytics') || businessPlan.includes('analytics')) features.push('Advanced Analytics');
    if (techSpecs.includes('ai') || techSpecs.includes('artificial intelligence')) features.push('AI-Powered Features');
    if (techSpecs.includes('real-time') || techSpecs.includes('live')) features.push('Real-Time Updates');
    if (techSpecs.includes('integration') || techSpecs.includes('api')) features.push('Seamless Integrations');
    if (techSpecs.includes('mobile') || techSpecs.includes('responsive')) features.push('Mobile-First Design');
    if (techSpecs.includes('security') || techSpecs.includes('secure')) features.push('Enterprise Security');
    
    return features.length > 0 ? features : ['Innovative Solutions', 'User-Friendly Interface', 'Reliable Performance'];
  }

  private extractCompetitiveAdvantages(reports: Record<string, string>): string[] {
    const competitive = reports['competitive'] || '';
    // Simple keyword extraction - can be enhanced with more sophisticated NLP
    return ['Industry-leading innovation', 'Superior user experience', 'Competitive pricing', 'Expert support'];
  }

  private extractMarketSize(reports: Record<string, string>): string {
    const marketing = reports['marketing'] || '';
    // Extract market size information
    return 'Growing market opportunity';
  }

  private extractPricingStrategy(reports: Record<string, string>): string {
    const financial = reports['financial'] || '';
    // Extract pricing strategy
    return 'Competitive pricing';
  }

  private generateHeroTitle(analysis: StartupAnalysis, ideaData: any): string {
    const companyName = ideaData?.companyName || 'Your Company';
    const businessModel = analysis.businessModel;
    
    const templates: Record<string, string[]> = {
      saas: [
        `Transform Your Business with ${companyName}`,
        `The Future of ${analysis.industry} Technology`,
        `${companyName}: Where Innovation Meets Efficiency`
      ],
      ecommerce: [
        `Discover Premium ${analysis.industry} Products`,
        `Your One-Stop ${analysis.industry} Destination`,
        `Quality ${analysis.industry} Solutions at ${companyName}`
      ],
      service: [
        `Professional ${analysis.industry} Excellence`,
        `Expert ${analysis.industry} Solutions`,
        `Your Trusted ${analysis.industry} Partner`
      ],
      marketplace: [
        `Connect, Trade, Grow with ${companyName}`,
        `The ${analysis.industry} Marketplace Revolution`,
        `Where ${analysis.industry} Meets Innovation`
      ]
    };

    const options = templates[businessModel] || templates.saas;
    return options[0]; // Return first option for consistency
  }

  private generateHeroSubtitle(analysis: StartupAnalysis, ideaData: any): string {
    const valueProposition = analysis.valueProposition;
    if (valueProposition) return valueProposition;
    
    return `Empowering ${analysis.targetAudience.toLowerCase()} with innovative ${analysis.industry.toLowerCase()} solutions that drive growth and success.`;
  }

  private generateCTAText(analysis: StartupAnalysis): string {
    const businessModel = analysis.businessModel;
    
    const ctas: Record<string, string> = {
      saas: 'Start Free Trial',
      ecommerce: 'Shop Now',
      service: 'Get Quote',
      marketplace: 'Join Platform',
      portfolio: 'View Work'
    };
    
    return ctas[businessModel] || 'Get Started';
  }

  private generateFeatures(analysis: StartupAnalysis, template: LandingPageTemplate): { title: string; description: string }[] {
    const keyFeatures = analysis.keyFeatures;
    const features = [];
    
    // Use extracted key features
    keyFeatures.forEach((feature, index) => {
      if (index < 3) { // Limit to 3 features for most templates
        features.push({
          title: feature,
          description: `Advanced ${feature.toLowerCase()} capabilities designed to enhance your ${analysis.industry.toLowerCase()} operations and drive measurable results.`
        });
      }
    });
    
    // Fill remaining slots if needed
    while (features.length < 3) {
      const fallbackFeatures = [
        { title: 'Easy Integration', description: 'Seamlessly connect with your existing tools and workflows in minutes, not hours.' },
        { title: 'Scalable Solution', description: 'Grow confidently with a platform that scales with your business needs and ambitions.' },
        { title: '24/7 Support', description: 'Get expert help whenever you need it with our dedicated customer success team.' }
      ];
      
      const missingIndex = features.length;
      if (missingIndex < fallbackFeatures.length) {
        features.push(fallbackFeatures[missingIndex]);
      } else {
        break;
      }
    }
    
    return features;
  }

  private enhanceValueProposition(analysis: StartupAnalysis): string {
    return analysis.valueProposition || `Transform your ${analysis.industry.toLowerCase()} operations with our innovative ${analysis.businessModel} solution.`;
  }

  private generateTestimonials(analysis: StartupAnalysis): { name: string; role: string; company: string; content: string }[] {
    const industry = analysis.industry;
    return [
      {
        name: "Sarah Johnson",
        role: "Director of Operations",
        company: `${industry} Corp`,
        content: `This solution has completely transformed how we operate. The efficiency gains are remarkable and the ROI is clear.`
      }
    ];
  }

  private selectColorScheme(analysis: StartupAnalysis): Partial<{primary: string; secondary: string; accent: string}> {
    const industry = analysis.industry.toLowerCase();
    
    if (industry.includes('healthcare') || industry.includes('medical')) {
      return { primary: '#0EA5E9', secondary: '#0284C7', accent: '#10B981' };
    } else if (industry.includes('finance') || industry.includes('fintech')) {
      return { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#F59E0B' };
    } else if (industry.includes('education') || industry.includes('learning')) {
      return { primary: '#7C3AED', secondary: '#6D28D9', accent: '#EC4899' };
    } else if (industry.includes('retail') || industry.includes('ecommerce')) {
      return { primary: '#EC4899', secondary: '#DB2777', accent: '#F97316' };
    }
    
    return {}; // Use template defaults
  }

  private selectSectionVariants(analysis: StartupAnalysis, template: LandingPageTemplate): Record<string, string> {
    const businessModel = analysis.businessModel;
    
    if (businessModel === 'saas') {
      return { pricing: 'comparison', hero: 'split' };
    } else if (businessModel === 'ecommerce') {
      return { hero: 'product-focus', products: 'grid' };
    } else if (businessModel === 'service') {
      return { testimonials: 'carousel', hero: 'centered' };
    }
    
    return {};
  }
}

export const aiTemplateSelector = new AITemplateSelector();
