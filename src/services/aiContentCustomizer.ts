
import { AppCustomization } from '@/types/appTemplate';
import { supabase } from '@/integrations/supabase/client';

interface BusinessSpecificContent {
  appName: string;
  dashboardTitle: string;
  primaryEntityName: string;
  actionVerbs: string[];
  metricNames: string[];
  pageLabels: Record<string, string>;
  buttonTexts: Record<string, string>;
  mockData: Record<string, any[]>;
  industryTerminology: Record<string, string>;
}

class AIContentCustomizer {
  async generateBusinessSpecificContent(
    templateId: string,
    startupData: any,
    businessAnalysis: any,
    reports: Record<string, string>
  ): Promise<BusinessSpecificContent> {
    try {
      console.log('Generating business-specific content with AI...', {
        template: templateId,
        company: startupData?.companyName,
        industry: businessAnalysis?.industry
      });

      const { data, error } = await supabase.functions.invoke('generate-app-content', {
        body: {
          startupData,
          reports,
          businessAnalysis,
          templateId,
          contentRequest: 'business-specific-terminology-and-data'
        }
      });

      if (error || !data?.success) {
        console.warn('AI content generation failed, using intelligent fallback');
        return this.generateIntelligentFallbackContent(templateId, startupData, businessAnalysis);
      }

      return this.parseAIGeneratedContent(data.content, templateId, startupData, businessAnalysis);

    } catch (error) {
      console.error('AI content customization error:', error);
      return this.generateIntelligentFallbackContent(templateId, startupData, businessAnalysis);
    }
  }

  private parseAIGeneratedContent(aiContent: any, templateId: string, startupData: any, businessAnalysis: any): BusinessSpecificContent {
    return {
      appName: aiContent.appName || `${startupData?.companyName || 'Business'} Platform`,
      dashboardTitle: aiContent.dashboardTitle || this.generateDashboardTitle(businessAnalysis),
      primaryEntityName: aiContent.primaryEntityName || this.getPrimaryEntityName(businessAnalysis),
      actionVerbs: aiContent.actionVerbs || this.getActionVerbs(businessAnalysis),
      metricNames: aiContent.metricNames || this.getMetricNames(businessAnalysis),
      pageLabels: aiContent.pageLabels || this.getPageLabels(businessAnalysis),
      buttonTexts: aiContent.buttonTexts || this.getButtonTexts(businessAnalysis),
      mockData: aiContent.mockData || this.generateMockData(businessAnalysis, startupData),
      industryTerminology: aiContent.industryTerminology || this.getIndustryTerminology(businessAnalysis)
    };
  }

  private generateIntelligentFallbackContent(templateId: string, startupData: any, businessAnalysis: any): BusinessSpecificContent {
    return {
      appName: `${startupData?.companyName || 'Your Business'} Platform`,
      dashboardTitle: this.generateDashboardTitle(businessAnalysis),
      primaryEntityName: this.getPrimaryEntityName(businessAnalysis),
      actionVerbs: this.getActionVerbs(businessAnalysis),
      metricNames: this.getMetricNames(businessAnalysis),
      pageLabels: this.getPageLabels(businessAnalysis),
      buttonTexts: this.getButtonTexts(businessAnalysis),
      mockData: this.generateMockData(businessAnalysis, startupData),
      industryTerminology: this.getIndustryTerminology(businessAnalysis)
    };
  }

  private generateDashboardTitle(businessAnalysis: any): string {
    const industry = businessAnalysis?.industry || 'Business';
    const businessType = businessAnalysis?.businessType || 'platform';
    
    if (industry === 'Education') {
      return 'Learning Analytics Dashboard';
    } else if (industry === 'Healthcare') {
      return 'Patient Care Dashboard';
    } else if (businessType === 'ecommerce') {
      return 'Sales & Inventory Dashboard';
    } else {
      return 'Business Intelligence Dashboard';
    }
  }

  private getPrimaryEntityName(businessAnalysis: any): string {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') return 'Students';
    if (industry === 'Healthcare') return 'Patients';
    if (businessAnalysis?.businessType === 'ecommerce') return 'Products';
    return 'Users';
  }

  private getActionVerbs(businessAnalysis: any): string[] {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return ['Assess', 'Track Progress', 'Personalize', 'Engage'];
    } else if (industry === 'Healthcare') {
      return ['Monitor', 'Diagnose', 'Treat', 'Care'];
    } else if (businessAnalysis?.businessType === 'ecommerce') {
      return ['Sell', 'Inventory', 'Ship', 'Analyze'];
    }
    return ['Manage', 'Analyze', 'Optimize', 'Track'];
  }

  private getMetricNames(businessAnalysis: any): string[] {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return ['Learning Progress', 'Assessment Scores', 'Engagement Rate', 'Completion Rate'];
    } else if (industry === 'Healthcare') {
      return ['Patient Outcomes', 'Treatment Success', 'Care Quality', 'Recovery Rate'];
    } else if (businessAnalysis?.businessType === 'ecommerce') {
      return ['Sales Volume', 'Inventory Turnover', 'Customer Satisfaction', 'Order Fulfillment'];
    }
    return ['Performance Score', 'User Engagement', 'Success Rate', 'Growth Rate'];
  }

  private getPageLabels(businessAnalysis: any): Record<string, string> {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return {
        dashboard: 'Learning Dashboard',
        users: 'Student Management',
        analytics: 'Learning Analytics',
        settings: 'Course Settings'
      };
    } else if (industry === 'Healthcare') {
      return {
        dashboard: 'Patient Dashboard',
        users: 'Patient Records',
        analytics: 'Health Analytics',
        settings: 'Care Settings'
      };
    }
    
    return {
      dashboard: 'Main Dashboard',
      users: 'User Management',
      analytics: 'Business Analytics',
      settings: 'System Settings'
    };
  }

  private getButtonTexts(businessAnalysis: any): Record<string, string> {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return {
        primary: 'Start Learning',
        secondary: 'View Progress',
        action: 'Take Assessment'
      };
    } else if (industry === 'Healthcare') {
      return {
        primary: 'Schedule Care',
        secondary: 'View Records',
        action: 'Update Treatment'
      };
    }
    
    return {
      primary: 'Get Started',
      secondary: 'View Details',
      action: 'Take Action'
    };
  }

  private generateMockData(businessAnalysis: any, startupData: any): Record<string, any[]> {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return {
        students: [
          { name: 'Alex Rivera', level: 'Advanced', progress: 85, engagement: 'High', lastActive: '2 hours ago' },
          { name: 'Morgan Chen', level: 'Intermediate', progress: 67, engagement: 'Medium', lastActive: '1 day ago' },
          { name: 'Jordan Taylor', level: 'Beginner', progress: 23, engagement: 'Learning', lastActive: '3 hours ago' }
        ],
        courses: [
          { title: 'Adaptive Math Fundamentals', enrolled: 150, completion: '78%', rating: 4.8 },
          { title: 'Reading Comprehension Plus', enrolled: 89, completion: '65%', rating: 4.6 },
          { title: 'Science Discovery Lab', enrolled: 112, completion: '82%', rating: 4.9 }
        ],
        assessments: [
          { type: 'Mathematical Reasoning', completed: 145, avgScore: 87, adaptations: 23 },
          { type: 'Language Processing', completed: 98, avgScore: 79, adaptations: 31 },
          { type: 'Problem Solving', completed: 156, avgScore: 84, adaptations: 18 }
        ]
      };
    } else if (industry === 'Healthcare') {
      return {
        patients: [
          { name: 'Sarah Johnson', condition: 'Diabetes Management', status: 'Stable', lastVisit: '1 week ago' },
          { name: 'Michael Brown', condition: 'Hypertension', status: 'Improving', lastVisit: '3 days ago' },
          { name: 'Emma Davis', condition: 'Cardiac Care', status: 'Monitoring', lastVisit: '2 days ago' }
        ],
        treatments: [
          { name: 'Medication Adherence', success: '94%', patients: 45, effectiveness: 'High' },
          { name: 'Lifestyle Coaching', success: '87%', patients: 32, effectiveness: 'Very High' },
          { name: 'Regular Monitoring', success: '91%', patients: 67, effectiveness: 'High' }
        ]
      };
    }
    
    // Default business data
    return {
      users: [
        { name: 'Alex Chen', role: 'Manager', status: 'Active', performance: 'Excellent' },
        { name: 'Sarah Wilson', role: 'Analyst', status: 'Active', performance: 'Good' },
        { name: 'Mike Rodriguez', role: 'Specialist', status: 'Active', performance: 'Very Good' }
      ],
      projects: [
        { name: 'Platform Enhancement', progress: 78, team: 5, status: 'On Track' },
        { name: 'User Experience Update', progress: 45, team: 3, status: 'In Progress' },
        { name: 'Analytics Integration', progress: 92, team: 4, status: 'Nearly Complete' }
      ]
    };
  }

  private getIndustryTerminology(businessAnalysis: any): Record<string, string> {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return {
        'Users': 'Students',
        'Items': 'Learning Modules',
        'Performance': 'Academic Progress',
        'Analytics': 'Learning Analytics',
        'Management': 'Student Management'
      };
    } else if (industry === 'Healthcare') {
      return {
        'Users': 'Patients',
        'Items': 'Treatment Plans',
        'Performance': 'Health Outcomes',
        'Analytics': 'Health Analytics',
        'Management': 'Patient Care'
      };
    }
    
    return {
      'Items': 'Business Assets',
      'Performance': 'Business Performance',
      'Analytics': 'Business Intelligence'
    };
  }

  createCustomizedAppCustomization(
    template: any,
    businessContent: BusinessSpecificContent,
    startupData: any,
    businessAnalysis: any
  ): AppCustomization {
    return {
      templateId: template.id,
      fields: {
        appName: businessContent.appName,
        dashboardTitle: businessContent.dashboardTitle,
        primaryEntity: businessContent.primaryEntityName,
        actionVerb: businessContent.actionVerbs[0] || 'Manage',
        metricName: businessContent.metricNames[0] || 'Performance',
        pageTitle: businessContent.pageLabels.dashboard || 'Dashboard',
        buttonText: businessContent.buttonTexts.primary || 'Get Started'
      },
      colorScheme: this.selectIndustryColorScheme(businessAnalysis),
      typography: template.config.typography,
      enabledFeatures: template.config.features.map((f: any) => f.id),
      mockData: businessContent.mockData,
      companyData: {
        name: startupData?.companyName || businessContent.appName,
        tagline: this.generateIndustryTagline(businessAnalysis, startupData),
        description: startupData?.idea || 'Transforming business through intelligent solutions',
        industry: businessAnalysis?.industry || 'Technology'
      },
      routing: template.config.routing,
      appName: businessContent.appName,
      appDescription: this.generateAppDescription(businessAnalysis, startupData)
    };
  }

  private selectIndustryColorScheme(businessAnalysis: any): any {
    const industry = businessAnalysis?.industry || 'Technology';
    
    if (industry === 'Education') {
      return {
        primary: '#3B82F6',  // Blue for trust and learning
        secondary: '#8B5CF6', // Purple for creativity
        accent: '#10B981'     // Green for growth
      };
    } else if (industry === 'Healthcare') {
      return {
        primary: '#059669',   // Green for health
        secondary: '#0EA5E9', // Blue for trust
        accent: '#F59E0B'     // Orange for energy
      };
    }
    
    return {
      primary: '#2563EB',
      secondary: '#8B5CF6',
      accent: '#F59E0B'
    };
  }

  private generateIndustryTagline(businessAnalysis: any, startupData: any): string {
    const industry = businessAnalysis?.industry || 'Business';
    const companyName = startupData?.companyName || 'Your Company';
    
    if (industry === 'Education') {
      return `Empowering personalized learning with ${companyName}`;
    } else if (industry === 'Healthcare') {
      return `Advancing patient care through intelligent technology`;
    }
    
    return `Transforming business with intelligent solutions`;
  }

  private generateAppDescription(businessAnalysis: any, startupData: any): string {
    const industry = businessAnalysis?.industry || 'Business';
    const idea = startupData?.idea || '';
    
    if (industry === 'Education' && idea.toLowerCase().includes('neurodivergent')) {
      return 'An adaptive learning platform specifically designed for neurodivergent students, providing personalized educational experiences that accommodate different learning styles and needs.';
    } else if (industry === 'Education') {
      return 'A comprehensive educational platform that personalizes learning experiences and provides detailed analytics for both students and educators.';
    } else if (industry === 'Healthcare') {
      return 'A patient-centered healthcare platform that improves care coordination and outcomes through intelligent data analysis and workflow optimization.';
    }
    
    return idea || 'A powerful business platform designed to optimize operations and drive growth through intelligent automation and analytics.';
  }
}

export const aiContentCustomizer = new AIContentCustomizer();
