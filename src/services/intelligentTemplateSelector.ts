
import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { appTemplateManager } from './appTemplateManager';

interface BusinessAnalysis {
  businessType: string;
  industry: string;
  targetAudience: string;
  coreFeatures: string[];
  userPersonas: any[];
  keyTerms: string[];
}

interface TemplateMatch {
  templateId: string;
  score: number;
  reasoning: string;
  confidence: number;
}

class IntelligentTemplateSelector {
  analyzeStartupForTemplateSelection(startupData: any, reports: Record<string, string>): BusinessAnalysis {
    const idea = (startupData?.idea || '').toLowerCase();
    const businessPlan = (reports['business-plan'] || '').toLowerCase();
    const combined = `${idea} ${businessPlan}`;

    // Extract business type
    let businessType = 'saas';
    if (combined.includes('ecommerce') || combined.includes('marketplace') || combined.includes('product') || combined.includes('store')) {
      businessType = 'ecommerce';
    } else if (combined.includes('service') || combined.includes('consulting') || combined.includes('agency') || combined.includes('professional')) {
      businessType = 'service';
    }

    // Extract industry
    let industry = 'Technology';
    if (combined.includes('education') || combined.includes('learning') || combined.includes('student')) {
      industry = 'Education';
    } else if (combined.includes('health') || combined.includes('medical') || combined.includes('wellness')) {
      industry = 'Healthcare';
    } else if (combined.includes('finance') || combined.includes('fintech') || combined.includes('banking')) {
      industry = 'Finance';
    } else if (combined.includes('retail') || combined.includes('shopping') || combined.includes('fashion')) {
      industry = 'Retail';
    }

    // Extract core features
    const coreFeatures: string[] = [];
    if (combined.includes('analytics') || combined.includes('dashboard') || combined.includes('metrics')) {
      coreFeatures.push('Analytics Dashboard');
    }
    if (combined.includes('user') || combined.includes('student') || combined.includes('customer')) {
      coreFeatures.push('User Management');
    }
    if (combined.includes('assessment') || combined.includes('quiz') || combined.includes('test')) {
      coreFeatures.push('Assessment Tools');
    }
    if (combined.includes('adaptive') || combined.includes('personalized') || combined.includes('ai')) {
      coreFeatures.push('AI-Powered Features');
    }
    if (combined.includes('progress') || combined.includes('tracking') || combined.includes('monitor')) {
      coreFeatures.push('Progress Tracking');
    }

    return {
      businessType,
      industry,
      targetAudience: startupData?.targetAudience || 'Professionals',
      coreFeatures,
      userPersonas: this.extractUserPersonas(combined, industry),
      keyTerms: this.extractKeyTerms(combined, industry)
    };
  }

  selectBestTemplate(analysis: BusinessAnalysis): TemplateMatch {
    const templates = appTemplateManager.getTemplates();
    const scores: TemplateMatch[] = [];

    templates.forEach(template => {
      const score = this.calculateTemplateScore(template, analysis);
      scores.push({
        templateId: template.id,
        score: score.score,
        reasoning: score.reasoning,
        confidence: score.confidence
      });
    });

    // Sort by score and return the best match
    scores.sort((a, b) => b.score - a.score);
    return scores[0];
  }

  private calculateTemplateScore(template: AppTemplate, analysis: BusinessAnalysis): { score: number; reasoning: string; confidence: number } {
    let score = 0;
    let reasoning = '';

    // Business type matching (40% weight)
    if (analysis.businessType === 'ecommerce' && template.id === 'modern-ecommerce') {
      score += 0.4;
      reasoning += 'Perfect match for e-commerce business model. ';
    } else if (analysis.businessType === 'service' && template.id === 'business-platform') {
      score += 0.4;
      reasoning += 'Ideal for service-based business operations. ';
    } else if (analysis.businessType === 'saas' && template.id === 'advanced-saas-dashboard') {
      score += 0.4;
      reasoning += 'Excellent fit for SaaS/technology platform. ';
    } else {
      // Default scoring for mismatches
      if (template.id === 'advanced-saas-dashboard') {
        score += 0.25; // SaaS dashboard is versatile
        reasoning += 'Versatile dashboard suitable for most business types. ';
      } else {
        score += 0.1;
        reasoning += 'Partial compatibility with business model. ';
      }
    }

    // Industry alignment (30% weight)
    if (analysis.industry === 'Education' || analysis.industry === 'Healthcare') {
      if (template.id === 'advanced-saas-dashboard') {
        score += 0.3;
        reasoning += 'Dashboard template excellent for data-driven industries like education/healthcare. ';
      }
    } else if (analysis.industry === 'Retail' || analysis.industry === 'Fashion') {
      if (template.id === 'modern-ecommerce') {
        score += 0.3;
        reasoning += 'E-commerce template perfect for retail industry. ';
      }
    } else {
      score += 0.2; // Neutral industry score
      reasoning += 'Good industry compatibility. ';
    }

    // Feature requirements (20% weight)
    const featureScore = this.calculateFeatureAlignment(template, analysis.coreFeatures);
    score += featureScore * 0.2;
    if (featureScore > 0.7) {
      reasoning += 'Strong feature alignment with business requirements. ';
    }

    // Complexity match (10% weight)
    if (analysis.coreFeatures.length > 4 && template.id === 'advanced-saas-dashboard') {
      score += 0.1;
      reasoning += 'Advanced template suitable for complex feature requirements. ';
    } else if (analysis.coreFeatures.length <= 3 && template.id !== 'advanced-saas-dashboard') {
      score += 0.1;
      reasoning += 'Template complexity matches business needs. ';
    }

    return {
      score: Math.min(score, 1.0),
      reasoning: reasoning.trim(),
      confidence: Math.min(score * 1.2, 1.0)
    };
  }

  private calculateFeatureAlignment(template: AppTemplate, features: string[]): number {
    if (features.length === 0) return 0.5;
    
    let matches = 0;
    features.forEach(feature => {
      if (feature.includes('Dashboard') || feature.includes('Analytics')) matches += 1;
      if (feature.includes('User') || feature.includes('Management')) matches += 1;
      if (feature.includes('AI') || feature.includes('Tracking')) matches += 1;
    });
    
    return Math.min(matches / features.length, 1.0);
  }

  private extractUserPersonas(combined: string, industry: string): any[] {
    const personas = [];
    
    if (industry === 'Education') {
      personas.push({
        name: 'Student',
        role: 'Learner',
        needs: 'Personalized learning experience and progress tracking',
        painPoints: 'One-size-fits-all education approaches'
      });
      personas.push({
        name: 'Educator',
        role: 'Teacher/Instructor',
        needs: 'Student analytics and adaptive assessment tools',
        painPoints: 'Limited insights into individual student needs'
      });
    } else if (industry === 'Healthcare') {
      personas.push({
        name: 'Healthcare Provider',
        role: 'Medical Professional',
        needs: 'Patient management and health analytics',
        painPoints: 'Fragmented patient data and workflow inefficiencies'
      });
    } else {
      personas.push({
        name: 'Business User',
        role: 'Professional',
        needs: 'Efficient workflow and data insights',
        painPoints: 'Manual processes and lack of visibility'
      });
    }
    
    return personas;
  }

  private extractKeyTerms(combined: string, industry: string): string[] {
    const terms = [];
    
    if (industry === 'Education') {
      terms.push('Students', 'Learning Modules', 'Assessments', 'Progress', 'Adaptive Learning');
    } else if (industry === 'Healthcare') {
      terms.push('Patients', 'Health Records', 'Treatments', 'Outcomes', 'Care Plans');
    } else {
      terms.push('Users', 'Projects', 'Analytics', 'Performance', 'Insights');
    }
    
    return terms;
  }
}

export const intelligentTemplateSelector = new IntelligentTemplateSelector();
