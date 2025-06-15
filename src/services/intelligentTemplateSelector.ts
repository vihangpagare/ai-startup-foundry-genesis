
import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { appTemplateManager } from './appTemplateManager';

interface BusinessAnalysis {
  businessType: string;
  industry: string;
  targetAudience: string;
  coreFeatures: string[];
  userPersonas: any[];
  keyTerms: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  primaryFocus: string;
}

interface TemplateMatch {
  templateId: string;
  score: number;
  reasoning: string;
  confidence: number;
}

class IntelligentTemplateSelector {
  analyzeStartupForTemplateSelection(startupData: any, reports: Record<string, string>): BusinessAnalysis {
    console.log('Analyzing startup for template selection...', {
      companyName: startupData?.companyName,
      hasBusinessPlan: !!reports['business-plan']
    });

    const idea = (startupData?.idea || '').toLowerCase();
    const businessPlan = (reports['business-plan'] || '').toLowerCase();
    const combined = `${idea} ${businessPlan}`;

    // Extract business type with improved detection
    let businessType = 'saas';
    if (this.containsKeywords(combined, ['ecommerce', 'marketplace', 'product', 'store', 'retail', 'shopping'])) {
      businessType = 'ecommerce';
    } else if (this.containsKeywords(combined, ['service', 'consulting', 'agency', 'professional', 'freelance'])) {
      businessType = 'service';
    } else if (this.containsKeywords(combined, ['platform', 'software', 'saas', 'app', 'dashboard', 'analytics'])) {
      businessType = 'saas';
    }

    // Extract industry with comprehensive categories
    let industry = 'Technology';
    if (this.containsKeywords(combined, ['education', 'learning', 'student', 'school', 'course', 'training'])) {
      industry = 'Education';
    } else if (this.containsKeywords(combined, ['health', 'medical', 'wellness', 'healthcare', 'patient'])) {
      industry = 'Healthcare';
    } else if (this.containsKeywords(combined, ['finance', 'fintech', 'banking', 'payment', 'investment'])) {
      industry = 'Finance';
    } else if (this.containsKeywords(combined, ['retail', 'shopping', 'fashion', 'consumer', 'brand'])) {
      industry = 'Retail';
    } else if (this.containsKeywords(combined, ['real estate', 'property', 'housing', 'rental'])) {
      industry = 'Real Estate';
    } else if (this.containsKeywords(combined, ['travel', 'tourism', 'booking', 'vacation'])) {
      industry = 'Travel';
    }

    // Extract core features with enhanced detection
    const coreFeatures: string[] = [];
    if (this.containsKeywords(combined, ['analytics', 'dashboard', 'metrics', 'reporting', 'insights'])) {
      coreFeatures.push('Analytics Dashboard');
    }
    if (this.containsKeywords(combined, ['user', 'student', 'customer', 'member', 'profile'])) {
      coreFeatures.push('User Management');
    }
    if (this.containsKeywords(combined, ['assessment', 'quiz', 'test', 'evaluation', 'survey'])) {
      coreFeatures.push('Assessment Tools');
    }
    if (this.containsKeywords(combined, ['adaptive', 'personalized', 'ai', 'intelligent', 'smart'])) {
      coreFeatures.push('AI-Powered Features');
    }
    if (this.containsKeywords(combined, ['progress', 'tracking', 'monitor', 'status', 'milestone'])) {
      coreFeatures.push('Progress Tracking');
    }
    if (this.containsKeywords(combined, ['collaboration', 'team', 'communication', 'sharing'])) {
      coreFeatures.push('Collaboration Tools');
    }
    if (this.containsKeywords(combined, ['automation', 'workflow', 'process', 'integration'])) {
      coreFeatures.push('Workflow Automation');
    }

    // If no features detected, add default ones
    if (coreFeatures.length === 0) {
      coreFeatures.push('User Management', 'Analytics Dashboard', 'Feature Library');
    }

    // Determine complexity
    let complexity: 'simple' | 'moderate' | 'complex' = 'moderate';
    if (coreFeatures.length <= 2) {
      complexity = 'simple';
    } else if (coreFeatures.length >= 5) {
      complexity = 'complex';
    }

    // Determine primary focus
    let primaryFocus = 'General Business';
    if (industry === 'Education') {
      primaryFocus = 'Learning and Development';
    } else if (industry === 'Healthcare') {
      primaryFocus = 'Patient Care and Management';
    } else if (businessType === 'ecommerce') {
      primaryFocus = 'Sales and Commerce';
    } else if (businessType === 'service') {
      primaryFocus = 'Service Delivery';
    }

    const analysis = {
      businessType,
      industry,
      targetAudience: startupData?.targetAudience || 'Professionals',
      coreFeatures,
      userPersonas: this.extractUserPersonas(combined, industry),
      keyTerms: this.extractKeyTerms(combined, industry),
      complexity,
      primaryFocus
    };

    console.log('Business analysis completed:', analysis);
    return analysis;
  }

  selectBestTemplate(analysis: BusinessAnalysis): TemplateMatch {
    console.log('Selecting best template for analysis:', analysis);
    
    try {
      const templates = appTemplateManager.getTemplates();
      
      if (!templates || templates.length === 0) {
        throw new Error('No templates available for selection');
      }

      const scores: TemplateMatch[] = [];

      templates.forEach(template => {
        try {
          const score = this.calculateTemplateScore(template, analysis);
          scores.push({
            templateId: template.id,
            score: score.score,
            reasoning: score.reasoning,
            confidence: score.confidence
          });
          console.log(`Template ${template.id} scored: ${score.score.toFixed(2)}`);
        } catch (error) {
          console.error(`Error scoring template ${template.id}:`, error);
        }
      });

      if (scores.length === 0) {
        throw new Error('No templates could be scored');
      }

      // Sort by score and return the best match
      scores.sort((a, b) => b.score - a.score);
      const bestMatch = scores[0];
      
      console.log('Best template match:', bestMatch);
      return bestMatch;

    } catch (error) {
      console.error('Template selection failed:', error);
      // Return fallback to advanced-saas-dashboard
      return {
        templateId: 'advanced-saas-dashboard',
        score: 0.7,
        reasoning: 'Fallback to feature-centric dashboard due to selection error',
        confidence: 0.7
      };
    }
  }

  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private calculateTemplateScore(template: AppTemplate, analysis: BusinessAnalysis): { score: number; reasoning: string; confidence: number } {
    let score = 0;
    let reasoning = '';

    try {
      // Business type matching (40% weight)
      if (analysis.businessType === 'ecommerce' && template.id.includes('ecommerce')) {
        score += 0.4;
        reasoning += 'Perfect match for e-commerce business model. ';
      } else if (analysis.businessType === 'service' && template.id.includes('business')) {
        score += 0.4;
        reasoning += 'Ideal for service-based business operations. ';
      } else if (analysis.businessType === 'saas' && template.id.includes('saas')) {
        score += 0.4;
        reasoning += 'Excellent fit for SaaS/technology platform. ';
      } else {
        // Default scoring for mismatches - favor feature-centric dashboard
        if (template.id === 'advanced-saas-dashboard') {
          score += 0.35; // High score for versatile dashboard
          reasoning += 'Versatile feature-centric dashboard suitable for most business types. ';
        } else {
          score += 0.15;
          reasoning += 'Partial compatibility with business model. ';
        }
      }

      // Industry alignment (25% weight)
      if (analysis.industry === 'Education' || analysis.industry === 'Healthcare') {
        if (template.id === 'advanced-saas-dashboard') {
          score += 0.25;
          reasoning += 'Feature-centric dashboard excellent for data-driven industries. ';
        }
      } else if (analysis.industry === 'Retail' || analysis.industry === 'Finance') {
        if (template.id.includes('ecommerce')) {
          score += 0.25;
          reasoning += 'Commerce template perfect for retail/finance industry. ';
        } else if (template.id === 'advanced-saas-dashboard') {
          score += 0.2;
          reasoning += 'Dashboard suitable for financial/retail analytics. ';
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
      } else if (featureScore > 0.4) {
        reasoning += 'Moderate feature alignment. ';
      }

      // Complexity match (10% weight)
      if (analysis.complexity === 'complex' && template.id === 'advanced-saas-dashboard') {
        score += 0.1;
        reasoning += 'Advanced template suitable for complex requirements. ';
      } else if (analysis.complexity === 'simple' && template.id !== 'advanced-saas-dashboard') {
        score += 0.1;
        reasoning += 'Template complexity matches business needs. ';
      } else {
        score += 0.05;
      }

      // Target audience fit (5% weight)
      score += 0.05; // Base score for audience compatibility

      return {
        score: Math.min(score, 1.0),
        reasoning: reasoning.trim(),
        confidence: Math.min(score * 1.1, 1.0)
      };

    } catch (error) {
      console.error('Error calculating template score:', error);
      return {
        score: 0.5,
        reasoning: 'Default scoring due to calculation error',
        confidence: 0.5
      };
    }
  }

  private calculateFeatureAlignment(template: AppTemplate, features: string[]): number {
    if (!features || features.length === 0) return 0.5;
    
    let matches = 0;
    const totalFeatures = features.length;
    
    features.forEach(feature => {
      // More sophisticated feature matching
      if (feature.toLowerCase().includes('dashboard') || feature.toLowerCase().includes('analytics')) {
        matches += 1;
      }
      if (feature.toLowerCase().includes('user') || feature.toLowerCase().includes('management')) {
        matches += 1;
      }
      if (feature.toLowerCase().includes('ai') || feature.toLowerCase().includes('tracking')) {
        matches += 1;
      }
      if (feature.toLowerCase().includes('collaboration') || feature.toLowerCase().includes('workflow')) {
        matches += 0.8; // Slightly lower weight
      }
    });
    
    return Math.min(matches / totalFeatures, 1.0);
  }

  private extractUserPersonas(combined: string, industry: string): any[] {
    const personas = [];
    
    try {
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
        personas.push({
          name: 'Administrator',
          role: 'Education Manager',
          needs: 'System-wide analytics and feature management',
          painPoints: 'Difficulty coordinating multiple educational tools'
        });
      } else if (industry === 'Healthcare') {
        personas.push({
          name: 'Healthcare Provider',
          role: 'Medical Professional',
          needs: 'Patient management and health analytics',
          painPoints: 'Fragmented patient data and workflow inefficiencies'
        });
        personas.push({
          name: 'Administrator',
          role: 'Healthcare Manager',
          needs: 'System oversight and feature coordination',
          painPoints: 'Managing multiple healthcare systems'
        });
      } else {
        personas.push({
          name: 'Business User',
          role: 'Professional',
          needs: 'Efficient workflow and data insights',
          painPoints: 'Manual processes and lack of visibility'
        });
        personas.push({
          name: 'Manager',
          role: 'Team Lead',
          needs: 'Team analytics and feature management',
          painPoints: 'Coordinating team activities and tracking progress'
        });
      }
    } catch (error) {
      console.error('Error extracting user personas:', error);
    }
    
    return personas;
  }

  private extractKeyTerms(combined: string, industry: string): string[] {
    const terms = [];
    
    try {
      if (industry === 'Education') {
        terms.push('Students', 'Learning Modules', 'Assessments', 'Progress', 'Adaptive Learning', 'Features');
      } else if (industry === 'Healthcare') {
        terms.push('Patients', 'Health Records', 'Treatments', 'Outcomes', 'Care Plans', 'Features');
      } else {
        terms.push('Users', 'Projects', 'Analytics', 'Performance', 'Insights', 'Features');
      }
    } catch (error) {
      console.error('Error extracting key terms:', error);
      terms.push('Features', 'Users', 'Analytics'); // Fallback terms
    }
    
    return terms;
  }
}

export const intelligentTemplateSelector = new IntelligentTemplateSelector();
