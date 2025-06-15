
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
    console.log('Generating business-specific content...', {
      template: templateId,
      company: startupData?.companyName,
      industry: businessAnalysis?.industry
    });

    try {
      // Always attempt AI generation first
      const { data, error } = await supabase.functions.invoke('generate-app-content', {
        body: {
          startupData,
          reports,
          businessAnalysis,
          templateId,
          contentRequest: 'business-specific-terminology-and-data'
        }
      });

      if (error) {
        console.warn('AI content generation failed:', error);
        throw new Error(`AI generation failed: ${error.message}`);
      }

      if (data?.success && data?.content) {
        console.log('✓ AI content generation successful');
        return this.parseAIGeneratedContent(data.content, templateId, startupData, businessAnalysis);
      } else {
        console.warn('AI generation returned invalid response');
        throw new Error('Invalid AI response');
      }

    } catch (error) {
      console.warn('AI content generation failed, using intelligent fallback:', error.message);
      return this.generateIntelligentFallbackContent(templateId, startupData, businessAnalysis);
    }
  }

  private parseAIGeneratedContent(aiContent: any, templateId: string, startupData: any, businessAnalysis: any): BusinessSpecificContent {
    try {
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
    } catch (error) {
      console.error('Error parsing AI content, using fallback:', error);
      return this.generateIntelligentFallbackContent(templateId, startupData, businessAnalysis);
    }
  }

  private generateIntelligentFallbackContent(templateId: string, startupData: any, businessAnalysis: any): BusinessSpecificContent {
    console.log('Generating intelligent fallback content...');
    
    return {
      appName: `${startupData?.companyName || 'Feature'} Platform`,
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
      return 'Commerce & Analytics Dashboard';
    } else {
      return 'Feature Management Dashboard';
    }
  }

  private getPrimaryEntityName(businessAnalysis: any): string {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') return 'Students';
    if (industry === 'Healthcare') return 'Patients';
    if (businessAnalysis?.businessType === 'ecommerce') return 'Products';
    return 'Features';
  }

  private getActionVerbs(businessAnalysis: any): string[] {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return ['Assess', 'Track Progress', 'Personalize', 'Engage', 'Monitor'];
    } else if (industry === 'Healthcare') {
      return ['Monitor', 'Diagnose', 'Treat', 'Care', 'Track'];
    } else if (businessAnalysis?.businessType === 'ecommerce') {
      return ['Sell', 'Manage Inventory', 'Ship', 'Analyze', 'Optimize'];
    }
    return ['Manage', 'Analyze', 'Optimize', 'Track', 'Enhance'];
  }

  private getMetricNames(businessAnalysis: any): string[] {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return ['Learning Progress', 'Assessment Scores', 'Engagement Rate', 'Feature Usage', 'Completion Rate'];
    } else if (industry === 'Healthcare') {
      return ['Patient Outcomes', 'Treatment Success', 'Care Quality', 'Feature Adoption', 'Recovery Rate'];
    } else if (businessAnalysis?.businessType === 'ecommerce') {
      return ['Sales Volume', 'Inventory Turnover', 'Customer Satisfaction', 'Feature Usage', 'Order Fulfillment'];
    }
    return ['Feature Usage', 'User Engagement', 'Success Rate', 'Adoption Rate', 'Performance Score'];
  }

  private getPageLabels(businessAnalysis: any): Record<string, string> {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return {
        overview: 'Learning Overview',
        library: 'Learning Library',
        management: 'Course Management',
        roadmap: 'Learning Roadmap',
        settings: 'Learning Settings'
      };
    } else if (industry === 'Healthcare') {
      return {
        overview: 'Care Overview',
        library: 'Treatment Library',
        management: 'Patient Management',
        roadmap: 'Care Roadmap',
        settings: 'Care Settings'
      };
    }
    
    return {
      overview: 'Feature Overview',
      library: 'Feature Library',
      management: 'Feature Management',
      roadmap: 'Feature Roadmap',
      settings: 'Platform Settings'
    };
  }

  private getButtonTexts(businessAnalysis: any): Record<string, string> {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return {
        primary: 'Start Learning',
        secondary: 'View Progress',
        action: 'Explore Features'
      };
    } else if (industry === 'Healthcare') {
      return {
        primary: 'Manage Care',
        secondary: 'View Records',
        action: 'Explore Features'
      };
    }
    
    return {
      primary: 'Get Started',
      secondary: 'View Features',
      action: 'Explore Platform'
    };
  }

  private generateMockData(businessAnalysis: any, startupData: any): Record<string, any[]> {
    const industry = businessAnalysis?.industry || 'Business';
    
    if (industry === 'Education') {
      return {
        users: [
          { name: 'Alex Rivera', level: 'Advanced', progress: 85, engagement: 'High', lastActive: '2 hours ago', features: 12 },
          { name: 'Morgan Chen', level: 'Intermediate', progress: 67, engagement: 'Medium', lastActive: '1 day ago', features: 8 },
          { name: 'Jordan Taylor', level: 'Beginner', progress: 23, engagement: 'Learning', lastActive: '3 hours ago', features: 4 }
        ],
        features: [
          { name: 'Adaptive Learning Engine', usage: '95%', status: 'Active', users: 247, satisfaction: 4.8 },
          { name: 'Progress Analytics', usage: '87%', status: 'Active', users: 189, satisfaction: 4.6 },
          { name: 'Assessment Tools', usage: '76%', status: 'Active', users: 156, satisfaction: 4.7 }
        ],
        activities: [
          { user: 'Alex Rivera', action: 'Completed adaptive assessment', time: '2 minutes ago', feature: 'Assessment Engine' },
          { user: 'Morgan Chen', action: 'Accessed learning analytics', time: '15 minutes ago', feature: 'Progress Analytics' },
          { user: 'Jordan Taylor', action: 'Started personalized path', time: '1 hour ago', feature: 'Adaptive Learning' }
        ]
      };
    } else if (industry === 'Healthcare') {
      return {
        users: [
          { name: 'Dr. Sarah Johnson', role: 'Physician', patients: 45, features: 8, efficiency: '94%' },
          { name: 'Nurse Michael Brown', role: 'Care Coordinator', patients: 67, features: 6, efficiency: '87%' },
          { name: 'Dr. Emma Davis', role: 'Specialist', patients: 32, features: 10, efficiency: '91%' }
        ],
        features: [
          { name: 'Patient Analytics', usage: '94%', status: 'Active', users: 89, satisfaction: 4.9 },
          { name: 'Care Coordination', usage: '87%', status: 'Active', users: 76, satisfaction: 4.7 },
          { name: 'Treatment Planning', usage: '91%', status: 'Active', users: 67, satisfaction: 4.8 }
        ],
        activities: [
          { user: 'Dr. Sarah Johnson', action: 'Reviewed patient analytics', time: '1 hour ago', feature: 'Patient Analytics' },
          { user: 'Nurse Michael Brown', action: 'Updated care plan', time: '2 hours ago', feature: 'Care Coordination' },
          { user: 'Dr. Emma Davis', action: 'Created treatment plan', time: '3 hours ago', feature: 'Treatment Planning' }
        ]
      };
    }
    
    // Default business/technology focused data
    return {
      users: [
        { name: 'Alex Chen', role: 'Manager', features: 12, performance: 'Excellent', engagement: '95%' },
        { name: 'Sarah Wilson', role: 'Analyst', features: 8, performance: 'Good', engagement: '87%' },
        { name: 'Mike Rodriguez', role: 'Specialist', features: 10, performance: 'Very Good', engagement: '91%' }
      ],
      features: [
        { name: 'Analytics Dashboard', usage: '95%', status: 'Active', users: 247, satisfaction: 4.8 },
        { name: 'User Management', usage: '87%', status: 'Active', users: 189, satisfaction: 4.6 },
        { name: 'Feature Library', usage: '76%', status: 'Active', users: 156, satisfaction: 4.7 },
        { name: 'Workflow Automation', usage: '68%', status: 'Beta', users: 89, satisfaction: 4.5 }
      ],
      activities: [
        { user: 'Alex Chen', action: 'Activated new analytics feature', time: '2 minutes ago', feature: 'Analytics Dashboard' },
        { user: 'Sarah Wilson', action: 'Completed feature onboarding', time: '15 minutes ago', feature: 'User Management' },
        { user: 'Mike Rodriguez', action: 'Explored feature library', time: '1 hour ago', feature: 'Feature Library' }
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
        'Management': 'Student Management',
        'Features': 'Learning Features'
      };
    } else if (industry === 'Healthcare') {
      return {
        'Users': 'Patients',
        'Items': 'Treatment Plans',
        'Performance': 'Health Outcomes',
        'Analytics': 'Health Analytics',
        'Management': 'Patient Care',
        'Features': 'Care Features'
      };
    }
    
    return {
      'Items': 'Business Assets',
      'Performance': 'Business Performance',
      'Analytics': 'Business Intelligence',
      'Features': 'Platform Features'
    };
  }

  createCustomizedAppCustomization(
    template: any,
    businessContent: BusinessSpecificContent,
    startupData: any,
    businessAnalysis: any
  ): AppCustomization {
    console.log('Creating customized app customization...');
    
    try {
      const customization: AppCustomization = {
        templateId: template.id,
        fields: {
          appName: businessContent.appName,
          dashboardTitle: businessContent.dashboardTitle,
          primaryEntity: businessContent.primaryEntityName,
          actionVerb: businessContent.actionVerbs[0] || 'Manage',
          metricName: businessContent.metricNames[0] || 'Feature Usage',
          pageTitle: businessContent.pageLabels.overview || 'Feature Overview',
          buttonText: businessContent.buttonTexts.primary || 'Get Started'
        },
        colorScheme: this.selectIndustryColorScheme(businessAnalysis),
        typography: template.config?.typography || { fontFamily: 'Inter', fontSize: 'medium' },
        enabledFeatures: template.config?.features?.map((f: any) => f.id) || [],
        mockData: businessContent.mockData,
        companyData: {
          name: startupData?.companyName || businessContent.appName,
          tagline: this.generateIndustryTagline(businessAnalysis, startupData),
          description: startupData?.idea || 'A comprehensive feature-centric platform designed for modern businesses',
          industry: businessAnalysis?.industry || 'Technology'
        },
        routing: template.config?.routing || { defaultPath: '/overview', paths: ['/overview', '/features'] },
        appName: businessContent.appName,
        appDescription: this.generateAppDescription(businessAnalysis, startupData)
      };

      console.log('✓ App customization created successfully');
      return customization;

    } catch (error) {
      console.error('Error creating app customization:', error);
      throw new Error(`Failed to create app customization: ${error.message}`);
    }
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
    } else if (industry === 'Finance') {
      return {
        primary: '#1E40AF',   // Deep blue for trust
        secondary: '#059669',  // Green for growth
        accent: '#DC2626'     // Red for attention
      };
    }
    
    return {
      primary: '#2563EB',   // Default blue
      secondary: '#8B5CF6', // Purple
      accent: '#F59E0B'     // Orange
    };
  }

  private generateIndustryTagline(businessAnalysis: any, startupData: any): string {
    const industry = businessAnalysis?.industry || 'Business';
    const companyName = startupData?.companyName || 'Your Platform';
    
    if (industry === 'Education') {
      return `Empowering personalized learning with ${companyName}`;
    } else if (industry === 'Healthcare') {
      return `Advancing patient care through intelligent technology`;
    } else if (industry === 'Finance') {
      return `Transforming financial services with smart features`;
    }
    
    return `Transforming business with intelligent feature platform`;
  }

  private generateAppDescription(businessAnalysis: any, startupData: any): string {
    const industry = businessAnalysis?.industry || 'Business';
    const idea = startupData?.idea || '';
    
    if (industry === 'Education' && idea.toLowerCase().includes('neurodivergent')) {
      return 'An adaptive learning platform specifically designed for neurodivergent students, providing personalized educational experiences that accommodate different learning styles and needs.';
    } else if (industry === 'Education') {
      return 'A comprehensive educational platform that personalizes learning experiences and provides detailed analytics for both students and educators through intelligent feature management.';
    } else if (industry === 'Healthcare') {
      return 'A patient-centered healthcare platform that improves care coordination and outcomes through intelligent data analysis, feature-driven workflow optimization, and comprehensive care management.';
    } else if (industry === 'Finance') {
      return 'A powerful financial platform that streamlines operations, enhances user experience, and drives growth through intelligent automation, analytics, and feature-centric design.';
    }
    
    return idea || 'A powerful feature-centric business platform designed to optimize operations and drive growth through intelligent automation, comprehensive analytics, and user-focused functionality.';
  }
}

export const aiContentCustomizer = new AIContentCustomizer();
