
import { AppCustomization } from '@/types/appTemplate';

export interface BusinessFunction {
  id: string;
  name: string;
  description: string;
  userRole: string;
  workflow: string[];
  importance: 'critical' | 'high' | 'medium' | 'low';
}

export interface BusinessAnalysis {
  industry: string;
  businessType: string;
  coreFeatures: BusinessFunction[];
  userPersonas: UserPersona[];
  businessWorkflows: BusinessWorkflow[];
  keyMetrics: BusinessMetric[];
  brandIdentity: BrandIdentity;
  competitiveDifferentiators: string[];
}

export interface UserPersona {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
  painPoints: string[];
  goals: string[];
  techSavviness: 'low' | 'medium' | 'high';
  primaryActions: string[];
}

export interface BusinessWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  userRoles: string[];
  frequency: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  userAction: string;
  systemResponse: string;
  dataInvolved: string[];
}

export interface BusinessMetric {
  id: string;
  name: string;
  description: string;
  type: 'kpi' | 'operational' | 'financial' | 'engagement';
  format: 'percentage' | 'number' | 'currency' | 'time' | 'rating';
  importance: 'critical' | 'high' | 'medium' | 'low';
}

export interface BrandIdentity {
  tone: 'professional' | 'friendly' | 'innovative' | 'trustworthy' | 'educational' | 'therapeutic';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: 'modern' | 'classic' | 'playful' | 'technical' | 'accessible';
  terminology: Record<string, string>; // Custom terms specific to the business
}

class BusinessAnalysisEngine {
  analyzeStartupData(startupData: any, reports: Record<string, string>): BusinessAnalysis {
    // Extract business insights from the startup data and reports
    const businessType = this.detectBusinessType(startupData, reports);
    const industry = this.detectIndustry(startupData, reports);
    
    return {
      industry,
      businessType,
      coreFeatures: this.extractCoreFeatures(startupData, reports, businessType),
      userPersonas: this.generateUserPersonas(startupData, reports, businessType),
      businessWorkflows: this.generateBusinessWorkflows(startupData, reports, businessType),
      keyMetrics: this.generateKeyMetrics(startupData, reports, businessType),
      brandIdentity: this.generateBrandIdentity(startupData, reports, businessType),
      competitiveDifferentiators: this.extractDifferentiators(startupData, reports)
    };
  }

  private detectBusinessType(startupData: any, reports: Record<string, string>): string {
    const idea = (startupData?.idea || '').toLowerCase();
    const businessPlan = (reports['business-plan'] || '').toLowerCase();
    const combined = `${idea} ${businessPlan}`;

    if (combined.includes('learning') || combined.includes('education') || combined.includes('student')) {
      return 'edtech-platform';
    }
    if (combined.includes('health') || combined.includes('medical') || combined.includes('therapy')) {
      return 'healthcare-platform';
    }
    if (combined.includes('ecommerce') || combined.includes('marketplace') || combined.includes('selling')) {
      return 'ecommerce-platform';
    }
    if (combined.includes('saas') || combined.includes('software') || combined.includes('tool')) {
      return 'saas-platform';
    }
    return 'business-platform';
  }

  private detectIndustry(startupData: any, reports: Record<string, string>): string {
    const combined = `${startupData?.idea || ''} ${reports['market-analysis'] || ''}`.toLowerCase();
    
    if (combined.includes('education') || combined.includes('school') || combined.includes('learning')) {
      return 'Education Technology';
    }
    if (combined.includes('health') || combined.includes('medical')) {
      return 'Healthcare';
    }
    if (combined.includes('finance') || combined.includes('payment')) {
      return 'Financial Technology';
    }
    return 'Technology';
  }

  private extractCoreFeatures(startupData: any, reports: Record<string, string>, businessType: string): BusinessFunction[] {
    const idea = startupData?.idea || '';
    const features: BusinessFunction[] = [];

    // Extract features based on business type and idea content
    if (businessType === 'edtech-platform') {
      if (idea.includes('adaptive') || idea.includes('personalized')) {
        features.push({
          id: 'adaptive-learning',
          name: 'Adaptive Learning Engine',
          description: 'Personalized learning paths that adapt to individual student needs and learning styles',
          userRole: 'student',
          workflow: ['Assessment', 'Content Delivery', 'Progress Tracking', 'Adaptation'],
          importance: 'critical'
        });
      }
      if (idea.includes('assessment') || idea.includes('progress')) {
        features.push({
          id: 'progress-tracking',
          name: 'Progress Tracking & Analytics',
          description: 'Real-time monitoring of student progress with detailed analytics for educators and parents',
          userRole: 'educator',
          workflow: ['Data Collection', 'Analysis', 'Report Generation', 'Intervention Planning'],
          importance: 'high'
        });
      }
      if (idea.includes('neurodiverse') || idea.includes('special needs')) {
        features.push({
          id: 'accessibility-tools',
          name: 'Accessibility & Accommodation Tools',
          description: 'Specialized tools and features designed for neurodiverse and special needs students',
          userRole: 'student',
          workflow: ['Need Assessment', 'Tool Configuration', 'Content Adaptation', 'Support Delivery'],
          importance: 'critical'
        });
      }
    }

    return features.length > 0 ? features : this.getDefaultFeatures(businessType);
  }

  private generateUserPersonas(startupData: any, reports: Record<string, string>, businessType: string): UserPersona[] {
    const targetAudience = startupData?.targetAudience || '';
    
    if (businessType === 'edtech-platform') {
      return [
        {
          id: 'student',
          name: 'Student Learner',
          role: 'Primary User',
          responsibilities: ['Complete learning activities', 'Track progress', 'Access resources'],
          painPoints: ['Difficulty focusing', 'Need for personalized pace', 'Accessibility challenges'],
          goals: ['Improve learning outcomes', 'Build confidence', 'Develop skills'],
          techSavviness: 'medium',
          primaryActions: ['Access lessons', 'Complete assessments', 'View progress', 'Get help']
        },
        {
          id: 'educator',
          name: 'Educator/Teacher',
          role: 'Content Manager',
          responsibilities: ['Create lesson plans', 'Monitor student progress', 'Provide support'],
          painPoints: ['Time constraints', 'Individual student needs', 'Progress tracking'],
          goals: ['Improve student outcomes', 'Save time', 'Personalize instruction'],
          techSavviness: 'medium',
          primaryActions: ['Review analytics', 'Adjust content', 'Support students', 'Generate reports']
        },
        {
          id: 'parent',
          name: 'Parent/Guardian',
          role: 'Support System',
          responsibilities: ['Monitor child progress', 'Support learning at home', 'Communicate with educators'],
          painPoints: ['Understanding progress', 'Supporting special needs', 'Time management'],
          goals: ['Support child success', 'Stay informed', 'Collaborate with school'],
          techSavviness: 'low',
          primaryActions: ['View progress reports', 'Communicate with teachers', 'Access resources']
        }
      ];
    }

    return this.getDefaultPersonas(businessType);
  }

  private generateBusinessWorkflows(startupData: any, reports: Record<string, string>, businessType: string): BusinessWorkflow[] {
    if (businessType === 'edtech-platform') {
      return [
        {
          id: 'learning-session',
          name: 'Interactive Learning Session',
          description: 'Student engages with adaptive learning content',
          steps: [
            {
              id: 'login',
              name: 'Student Login',
              description: 'Student accesses their personalized dashboard',
              userAction: 'Login with credentials',
              systemResponse: 'Display personalized dashboard',
              dataInvolved: ['user profile', 'progress data']
            },
            {
              id: 'content-delivery',
              name: 'Adaptive Content Delivery',
              description: 'System presents personalized learning content',
              userAction: 'Start learning activity',
              systemResponse: 'Deliver adaptive content based on learning profile',
              dataInvolved: ['learning path', 'content library', 'assessment data']
            },
            {
              id: 'progress-tracking',
              name: 'Real-time Progress Tracking',
              description: 'System monitors and records learning progress',
              userAction: 'Complete learning activities',
              systemResponse: 'Track progress and update learning path',
              dataInvolved: ['completion data', 'performance metrics', 'time spent']
            }
          ],
          userRoles: ['student', 'educator'],
          frequency: 'daily',
          importance: 'critical'
        }
      ];
    }

    return this.getDefaultWorkflows(businessType);
  }

  private generateKeyMetrics(startupData: any, reports: Record<string, string>, businessType: string): BusinessMetric[] {
    if (businessType === 'edtech-platform') {
      return [
        {
          id: 'learning-progress',
          name: 'Learning Progress Rate',
          description: 'Average progress rate across all students',
          type: 'kpi',
          format: 'percentage',
          importance: 'critical'
        },
        {
          id: 'engagement-time',
          name: 'Daily Engagement Time',
          description: 'Average time students spend actively learning',
          type: 'engagement',
          format: 'time',
          importance: 'high'
        },
        {
          id: 'accessibility-usage',
          name: 'Accessibility Tool Usage',
          description: 'Percentage of students using accessibility features',
          type: 'operational',
          format: 'percentage',
          importance: 'high'
        }
      ];
    }

    return this.getDefaultMetrics(businessType);
  }

  private generateBrandIdentity(startupData: any, reports: Record<string, string>, businessType: string): BrandIdentity {
    const companyName = startupData?.companyName || 'Your Business';
    
    if (businessType === 'edtech-platform') {
      return {
        tone: 'educational',
        colors: {
          primary: '#4F46E5', // Indigo for trust and learning
          secondary: '#06B6D4', // Cyan for innovation
          accent: '#10B981', // Green for growth and success
          background: '#F8FAFC'
        },
        typography: 'accessible',
        terminology: {
          'users': 'learners',
          'content': 'learning materials',
          'dashboard': 'learning hub',
          'analytics': 'progress insights',
          'settings': 'learning preferences'
        }
      };
    }

    return this.getDefaultBrandIdentity(businessType);
  }

  private extractDifferentiators(startupData: any, reports: Record<string, string>): string[] {
    const solution = startupData?.solution || '';
    const uniqueValue = startupData?.uniqueValue || '';
    const competitive = reports['competitive-analysis'] || '';
    
    const differentiators: string[] = [];
    
    if (solution.includes('adaptive') || solution.includes('personalized')) {
      differentiators.push('Adaptive learning technology');
    }
    if (solution.includes('neurodiverse') || solution.includes('accessibility')) {
      differentiators.push('Specialized accessibility features');
    }
    if (uniqueValue.includes('ai') || uniqueValue.includes('artificial intelligence')) {
      differentiators.push('AI-powered personalization');
    }
    
    return differentiators.length > 0 ? differentiators : ['Innovative approach', 'User-focused design'];
  }

  private getDefaultFeatures(businessType: string): BusinessFunction[] {
    return [
      {
        id: 'dashboard',
        name: 'Main Dashboard',
        description: 'Central hub for all business activities',
        userRole: 'user',
        workflow: ['Login', 'View Overview', 'Navigate to Features'],
        importance: 'critical'
      }
    ];
  }

  private getDefaultPersonas(businessType: string): UserPersona[] {
    return [
      {
        id: 'primary-user',
        name: 'Primary User',
        role: 'Main User',
        responsibilities: ['Use core features', 'Manage data'],
        painPoints: ['Efficiency', 'Ease of use'],
        goals: ['Achieve objectives', 'Save time'],
        techSavviness: 'medium',
        primaryActions: ['Access features', 'Manage content']
      }
    ];
  }

  private getDefaultWorkflows(businessType: string): BusinessWorkflow[] {
    return [
      {
        id: 'main-workflow',
        name: 'Main Business Process',
        description: 'Primary business workflow',
        steps: [
          {
            id: 'start',
            name: 'Initialize',
            description: 'Start the process',
            userAction: 'Begin workflow',
            systemResponse: 'Present options',
            dataInvolved: ['user data']
          }
        ],
        userRoles: ['user'],
        frequency: 'regular',
        importance: 'high'
      }
    ];
  }

  private getDefaultMetrics(businessType: string): BusinessMetric[] {
    return [
      {
        id: 'user-engagement',
        name: 'User Engagement',
        description: 'Overall user engagement rate',
        type: 'engagement',
        format: 'percentage',
        importance: 'high'
      }
    ];
  }

  private getDefaultBrandIdentity(businessType: string): BrandIdentity {
    return {
      tone: 'professional',
      colors: {
        primary: '#3B82F6',
        secondary: '#6B7280',
        accent: '#10B981',
        background: '#F9FAFB'
      },
      typography: 'modern',
      terminology: {}
    };
  }
}

export const businessAnalysisEngine = new BusinessAnalysisEngine();
