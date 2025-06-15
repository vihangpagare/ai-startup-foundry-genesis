
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';

interface BusinessAnalysis {
  businessModel: string;
  targetAudience: string;
  keyFeatures: string[];
  competitiveAdvantages: string[];
  industryTrends: string[];
}

interface AIGeneratedContent {
  heroTitle: string;
  heroSubtitle: string;
  valueProposition: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
  }>;
  ctaTexts: string[];
  competitorComparison: Array<{
    feature: string;
    us: string;
    competitor: string;
    advantage: boolean;
  }>;
}

class AITemplateIntelligence {
  analyzeBusinessModel(startupIdea: string, targetAudience: string): BusinessAnalysis {
    // AI business model analysis
    const keywords = startupIdea.toLowerCase();
    
    let businessModel = 'subscription';
    if (keywords.includes('marketplace') || keywords.includes('platform')) {
      businessModel = 'marketplace';
    } else if (keywords.includes('service') || keywords.includes('consulting')) {
      businessModel = 'service';
    } else if (keywords.includes('product') || keywords.includes('hardware')) {
      businessModel = 'product';
    } else if (keywords.includes('ecommerce') || keywords.includes('store')) {
      businessModel = 'ecommerce';
    }

    return {
      businessModel,
      targetAudience: targetAudience || 'Technology professionals',
      keyFeatures: this.extractKeyFeatures(startupIdea),
      competitiveAdvantages: this.generateCompetitiveAdvantages(startupIdea),
      industryTrends: this.getIndustryTrends(businessModel)
    };
  }

  generateContent(analysis: BusinessAnalysis, companyName: string): AIGeneratedContent {
    const industry = this.detectIndustry(analysis.targetAudience);
    
    return {
      heroTitle: this.generateHeroTitle(companyName, analysis.businessModel),
      heroSubtitle: this.generateHeroSubtitle(analysis),
      valueProposition: this.generateValueProposition(analysis),
      features: this.generateFeatures(analysis),
      testimonials: this.generateTestimonials(industry),
      ctaTexts: this.generateCTATexts(analysis.businessModel),
      competitorComparison: this.generateCompetitorComparison(analysis)
    };
  }

  suggestTemplateModifications(template: LandingPageTemplate, analysis: BusinessAnalysis): Partial<TemplateCustomization> {
    const modifications: Partial<TemplateCustomization> = {
      enabledSections: [...template.config.sections.filter(s => s.required).map(s => s.id)],
      sectionVariants: {},
      colorScheme: { ...template.config.colorScheme }
    };

    // Business model specific modifications
    if (analysis.businessModel === 'saas' || analysis.businessModel === 'subscription') {
      modifications.enabledSections?.push('pricing', 'testimonials');
      modifications.sectionVariants = {
        pricing: 'comparison',
        hero: 'split'
      };
    } else if (analysis.businessModel === 'ecommerce') {
      modifications.enabledSections?.push('products', 'categories');
      modifications.sectionVariants = {
        hero: 'product-focus',
        products: 'interactive'
      };
    } else if (analysis.businessModel === 'service') {
      modifications.enabledSections?.push('testimonials', 'contact');
      modifications.sectionVariants = {
        testimonials: 'video',
        hero: 'centered'
      };
    }

    // Industry-specific color adjustments
    const industryColors = this.getIndustryColors(analysis.targetAudience);
    if (industryColors) {
      modifications.colorScheme = {
        ...modifications.colorScheme,
        ...industryColors
      };
    }

    return modifications;
  }

  private extractKeyFeatures(idea: string): string[] {
    const features = [];
    const keywords = idea.toLowerCase();
    
    if (keywords.includes('ai') || keywords.includes('artificial intelligence')) {
      features.push('AI-Powered Analytics');
    }
    if (keywords.includes('real-time') || keywords.includes('live')) {
      features.push('Real-Time Updates');
    }
    if (keywords.includes('secure') || keywords.includes('security')) {
      features.push('Enterprise Security');
    }
    if (keywords.includes('mobile') || keywords.includes('app')) {
      features.push('Mobile-First Design');
    }
    if (keywords.includes('integration') || keywords.includes('api')) {
      features.push('Seamless Integrations');
    }
    
    return features.length > 0 ? features : ['Advanced Analytics', 'Easy Integration', 'Secure & Reliable'];
  }

  private generateCompetitiveAdvantages(idea: string): string[] {
    return [
      '10x faster than competitors',
      'Industry-leading security',
      'No setup fees',
      '24/7 support included',
      'Advanced AI capabilities'
    ];
  }

  private getIndustryTrends(businessModel: string): string[] {
    const trends: Record<string, string[]> = {
      saas: ['AI integration', 'No-code solutions', 'API-first architecture'],
      ecommerce: ['Headless commerce', 'Personalization', 'Sustainable practices'],
      service: ['Digital transformation', 'Remote collaboration', 'Automation'],
      marketplace: ['Creator economy', 'NFT integration', 'Decentralized platforms']
    };
    
    return trends[businessModel] || ['Digital innovation', 'User experience', 'Scalability'];
  }

  private detectIndustry(targetAudience: string): string {
    const audience = targetAudience.toLowerCase();
    if (audience.includes('healthcare') || audience.includes('medical')) return 'healthcare';
    if (audience.includes('finance') || audience.includes('fintech')) return 'finance';
    if (audience.includes('education') || audience.includes('learning')) return 'education';
    if (audience.includes('retail') || audience.includes('commerce')) return 'retail';
    return 'technology';
  }

  private generateHeroTitle(companyName: string, businessModel: string): string {
    const templates: Record<string, string[]> = {
      saas: [
        `Transform Your Business with ${companyName}`,
        `The Future of Business Intelligence`,
        `${companyName}: Where Innovation Meets Efficiency`
      ],
      ecommerce: [
        `Discover Your Perfect Style`,
        `Premium Quality, Exceptional Value`,
        `Your One-Stop Shopping Destination`
      ],
      service: [
        `Professional Excellence Delivered`,
        `Expert Solutions for Modern Challenges`,
        `Your Trusted Partner for Success`
      ]
    };
    
    const options = templates[businessModel] || templates.saas;
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateHeroSubtitle(analysis: BusinessAnalysis): string {
    return `Empowering ${analysis.targetAudience.toLowerCase()} with cutting-edge solutions that drive growth and innovation in today's competitive landscape.`;
  }

  private generateValueProposition(analysis: BusinessAnalysis): string {
    return `Join thousands of satisfied customers who have transformed their business with our ${analysis.businessModel} solution.`;
  }

  private generateFeatures(analysis: BusinessAnalysis): Array<{title: string; description: string; icon: string}> {
    return analysis.keyFeatures.map((feature, index) => ({
      title: feature,
      description: `Advanced ${feature.toLowerCase()} capabilities designed to accelerate your business growth and improve operational efficiency.`,
      icon: ['BarChart3', 'Zap', 'Shield', 'Smartphone', 'Link'][index] || 'Star'
    }));
  }

  private generateTestimonials(industry: string): Array<{name: string; role: string; company: string; content: string; rating: number}> {
    const testimonials: Record<string, Array<{name: string; role: string; company: string; content: string; rating: number}>> = {
      technology: [
        {
          name: "Sarah Johnson",
          role: "CTO",
          company: "TechCorp",
          content: "This platform has revolutionized how we handle our technology stack. The efficiency gains are remarkable.",
          rating: 5
        },
        {
          name: "Mike Chen",
          role: "Lead Developer",
          company: "InnovateLab",
          content: "Integration was seamless and the performance improvements were immediate. Highly recommended!",
          rating: 5
        }
      ],
      healthcare: [
        {
          name: "Dr. Emily Rodriguez",
          role: "Chief Medical Officer",
          company: "HealthSystem Plus",
          content: "Patient outcomes have improved significantly since implementing this solution. Outstanding results.",
          rating: 5
        }
      ],
      finance: [
        {
          name: "David Park",
          role: "Financial Director",
          company: "SecureBank",
          content: "The security features and compliance tools are exactly what we needed for our financial operations.",
          rating: 5
        }
      ]
    };
    
    return testimonials[industry] || testimonials.technology;
  }

  private generateCTATexts(businessModel: string): string[] {
    const ctas: Record<string, string[]> = {
      saas: ['Start Free Trial', 'Get Started Free', 'Try It Now', 'Book a Demo'],
      ecommerce: ['Shop Now', 'Browse Collection', 'Discover Products', 'Start Shopping'],
      service: ['Get Quote', 'Contact Us', 'Schedule Consultation', 'Learn More']
    };
    
    return ctas[businessModel] || ctas.saas;
  }

  private generateCompetitorComparison(analysis: BusinessAnalysis): Array<{feature: string; us: string; competitor: string; advantage: boolean}> {
    return [
      { feature: 'Setup Time', us: '5 minutes', competitor: '2-3 hours', advantage: true },
      { feature: 'Pricing', us: 'Transparent', competitor: 'Hidden fees', advantage: true },
      { feature: 'Support', us: '24/7 Live Chat', competitor: 'Email only', advantage: true },
      { feature: 'Security', us: 'SOC 2 Compliant', competitor: 'Basic SSL', advantage: true },
      { feature: 'Integrations', us: '500+ Apps', competitor: '50+ Apps', advantage: true }
    ];
  }

  private getIndustryColors(targetAudience: string): Partial<{primary: string; secondary: string; accent: string}> | null {
    const audience = targetAudience.toLowerCase();
    
    if (audience.includes('healthcare')) {
      return { primary: '#0EA5E9', secondary: '#0284C7', accent: '#10B981' };
    } else if (audience.includes('finance')) {
      return { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#F59E0B' };
    } else if (audience.includes('education')) {
      return { primary: '#7C3AED', secondary: '#6D28D9', accent: '#EC4899' };
    } else if (audience.includes('retail')) {
      return { primary: '#EC4899', secondary: '#DB2777', accent: '#F97316' };
    }
    
    return null;
  }
}

export const aiTemplateIntelligence = new AITemplateIntelligence();
