import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { BusinessAnalysis, BusinessFunction, UserPersona, BusinessWorkflow } from './businessAnalysisEngine';

export interface DynamicTemplateConfig {
  businessAnalysis: BusinessAnalysis;
  startupData: any;
  reports: Record<string, string>;
}

class DynamicTemplateGenerator {
  generateTemplate(config: DynamicTemplateConfig): AppTemplate {
    const { businessAnalysis, startupData } = config;
    
    return {
      id: `dynamic-${businessAnalysis.businessType}`,
      name: `${startupData?.companyName || 'Business'} Application`,
      description: this.generateDescription(businessAnalysis, startupData),
      category: this.mapBusinessTypeToCategory(businessAnalysis.businessType),
      complexity: 'advanced',
      features: this.generateFeatureList(businessAnalysis),
      previewImage: `/preview-${businessAnalysis.businessType}.jpg`,
      tags: this.generateTags(businessAnalysis),
      pages: this.generatePages(businessAnalysis),
      config: this.generateConfig(businessAnalysis, startupData),
      version: '1.0.0',
      popularity: 95,
      lastUpdated: new Date().toISOString().split('T')[0],
      author: 'AI Template Generator',
      premium: false
    };
  }

  generateCustomization(config: DynamicTemplateConfig): AppCustomization {
    const { businessAnalysis, startupData } = config;
    
    return {
      templateId: `dynamic-${businessAnalysis.businessType}`,
      fields: this.generateCustomFields(businessAnalysis, startupData),
      colorScheme: this.generateCompleteColorScheme(businessAnalysis.brandIdentity.colors),
      typography: {
        fontFamily: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif',
          mono: 'JetBrains Mono, monospace'
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem'
        },
        fontWeight: {
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700'
        }
      },
      enabledFeatures: businessAnalysis.coreFeatures.map(f => f.id),
      mockData: this.generateBusinessMockData(businessAnalysis, startupData),
      companyData: {
        name: startupData?.companyName || 'Your Business',
        tagline: this.generateTagline(businessAnalysis, startupData),
        description: startupData?.idea || 'A comprehensive business solution',
        industry: businessAnalysis.industry
      },
      routing: this.generateRouting(businessAnalysis),
      appName: startupData?.companyName || 'Business App',
      appDescription: this.generateDescription(businessAnalysis, startupData)
    };
  }

  private mapBusinessTypeToCategory(businessType: string): 'saas-dashboard' | 'ecommerce' | 'service-platform' | 'analytics' | 'portfolio' {
    const typeMap: Record<string, 'saas-dashboard' | 'ecommerce' | 'service-platform' | 'analytics' | 'portfolio'> = {
      'edtech-platform': 'saas-dashboard',
      'marketplace': 'ecommerce',
      'analytics-platform': 'analytics',
      'service-platform': 'service-platform',
      'portfolio-platform': 'portfolio',
      'saas-dashboard': 'saas-dashboard'
    };
    
    return typeMap[businessType] || 'saas-dashboard';
  }

  private generateCompleteColorScheme(partialColors: any): any {
    return {
      primary: partialColors.primary || '#3b82f6',
      secondary: partialColors.secondary || '#64748b',
      accent: partialColors.accent || '#8b5cf6',
      background: partialColors.background || '#ffffff',
      text: '#1f2937',
      muted: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };
  }

  private generateDescription(businessAnalysis: BusinessAnalysis, startupData: any): string {
    const features = businessAnalysis.coreFeatures.slice(0, 3).map(f => f.name).join(', ');
    return `A comprehensive ${businessAnalysis.businessType.replace('-', ' ')} solution featuring ${features} and more, designed specifically for ${businessAnalysis.industry.toLowerCase()}.`;
  }

  private generateFeatureList(businessAnalysis: BusinessAnalysis): string[] {
    return businessAnalysis.coreFeatures.map(feature => feature.name);
  }

  private generateTags(businessAnalysis: BusinessAnalysis): string[] {
    const baseTags = [businessAnalysis.businessType, businessAnalysis.industry.toLowerCase()];
    const featureTags = businessAnalysis.coreFeatures
      .filter(f => f.importance === 'critical')
      .map(f => f.name.toLowerCase().replace(/\s+/g, '-'));
    
    return [...baseTags, ...featureTags.slice(0, 3)];
  }

  private generatePages(businessAnalysis: BusinessAnalysis): any[] {
    const pages = [];
    
    // Always include a main dashboard
    pages.push({
      id: 'dashboard',
      name: this.getTerminology(businessAnalysis, 'dashboard'),
      route: '/',
      description: `Main ${this.getTerminology(businessAnalysis, 'dashboard').toLowerCase()} with key insights and metrics`,
      components: [
        { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true },
        { id: 'metrics', type: 'card', name: 'Key Metrics', props: {}, customizable: true, required: true },
        { id: 'charts', type: 'chart', name: 'Analytics Charts', props: {}, customizable: false, required: true }
      ],
      layout: 'sidebar',
      navigation: this.generateNavigation(businessAnalysis)
    });

    // Generate pages based on core features
    businessAnalysis.coreFeatures.forEach((feature, index) => {
      if (feature.importance === 'critical' || feature.importance === 'high') {
        pages.push({
          id: feature.id,
          name: feature.name,
          route: `/${feature.id}`,
          description: feature.description,
          components: this.generatePageComponents(feature),
          layout: 'sidebar',
          navigation: this.generateNavigation(businessAnalysis)
        });
      }
    });

    // Generate persona-specific pages
    businessAnalysis.userPersonas.forEach(persona => {
      if (persona.role !== 'Primary User') {
        pages.push({
          id: `${persona.id}-portal`,
          name: `${persona.name} Portal`,
          route: `/${persona.id}`,
          description: `Dedicated interface for ${persona.role.toLowerCase()}s`,
          components: this.generatePersonaComponents(persona),
          layout: 'sidebar',
          navigation: this.generateNavigation(businessAnalysis)
        });
      }
    });

    return pages.slice(0, 6); // Limit to 6 pages for performance
  }

  private generatePageComponents(feature: BusinessFunction): any[] {
    const components = [
      { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true }
    ];

    // Add components based on feature type
    if (feature.workflow.includes('Assessment') || feature.workflow.includes('Analysis')) {
      components.push(
        { id: 'analytics', type: 'chart', name: `${feature.name} Analytics`, props: {}, customizable: false, required: true }
      );
    }

    if (feature.workflow.includes('Tracking') || feature.workflow.includes('Progress')) {
      components.push(
        { id: 'progress-table', type: 'table', name: 'Progress Overview', props: {}, customizable: false, required: true }
      );
    }

    if (feature.workflow.includes('Content') || feature.workflow.includes('Management')) {
      components.push(
        { id: 'content-cards', type: 'card', name: 'Content Management', props: {}, customizable: true, required: true }
      );
    }

    // Always add an action area
    components.push(
      { id: 'actions', type: 'form', name: `${feature.name} Actions`, props: {}, customizable: true, required: true }
    );

    return components;
  }

  private generatePersonaComponents(persona: UserPersona): any[] {
    return [
      { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true },
      { id: 'persona-dashboard', type: 'card', name: `${persona.name} Dashboard`, props: {}, customizable: true, required: true },
      { id: 'actions-table', type: 'table', name: 'Available Actions', props: {}, customizable: false, required: true },
      { id: 'persona-tools', type: 'form', name: `${persona.role} Tools`, props: {}, customizable: true, required: true }
    ];
  }

  private generateNavigation(businessAnalysis: BusinessAnalysis): any {
    const navItems = [
      { label: this.getTerminology(businessAnalysis, 'dashboard'), href: '/', icon: 'BarChart3' }
    ];

    // Add navigation for critical features
    businessAnalysis.coreFeatures
      .filter(f => f.importance === 'critical' || f.importance === 'high')
      .slice(0, 4)
      .forEach(feature => {
        navItems.push({
          label: feature.name,
          href: `/${feature.id}`,
          icon: this.getIconForFeature(feature)
        });
      });

    return {
      type: 'sidebar',
      items: navItems,
      position: 'left'
    };
  }

  private generateConfig(businessAnalysis: BusinessAnalysis, startupData: any): any {
    return {
      customizableFields: this.generateCustomizableFields(businessAnalysis, startupData),
      colorScheme: this.generateCompleteColorScheme(businessAnalysis.brandIdentity.colors),
      typography: {
        fontFamily: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif',
          mono: 'JetBrains Mono, monospace'
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem'
        },
        fontWeight: {
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700'
        }
      },
      routing: this.generateRouting(businessAnalysis),
      dataStructure: this.generateDataStructure(businessAnalysis),
      mockData: {
        enabled: true,
        realistic: true,
        industrySpecific: true,
        dataSize: 'medium'
      },
      features: businessAnalysis.coreFeatures.map(feature => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        enabled: true,
        page: feature.id,
        component: `${feature.id}-component`,
        dependencies: []
      }))
    };
  }

  private generateCustomFields(businessAnalysis: BusinessAnalysis, startupData: any): Record<string, string> {
    const fields: Record<string, string> = {
      appName: startupData?.companyName || 'Business App',
      businessType: businessAnalysis.businessType,
      industry: businessAnalysis.industry
    };

    // Add feature-specific fields
    businessAnalysis.coreFeatures.forEach(feature => {
      fields[`${feature.id}Title`] = feature.name;
      fields[`${feature.id}Description`] = feature.description;
    });

    // Add persona-specific fields
    businessAnalysis.userPersonas.forEach(persona => {
      fields[`${persona.id}Label`] = persona.name;
      fields[`${persona.id}Role`] = persona.role;
    });

    return fields;
  }

  private generateBusinessMockData(businessAnalysis: BusinessAnalysis, startupData: any): Record<string, any[]> {
    const mockData: Record<string, any[]> = {};

    // Generate data for each user persona
    businessAnalysis.userPersonas.forEach(persona => {
      mockData[persona.id + 's'] = this.generatePersonaMockData(persona, businessAnalysis);
    });

    // Generate data for each business function
    businessAnalysis.coreFeatures.forEach(feature => {
      mockData[feature.id + 'Data'] = this.generateFeatureMockData(feature, businessAnalysis);
    });

    // Generate metrics data
    mockData.metrics = businessAnalysis.keyMetrics.map(metric => ({
      name: metric.name,
      value: this.generateMetricValue(metric),
      change: this.generateMetricChange(),
      trend: Math.random() > 0.3 ? 'up' : 'down',
      importance: metric.importance
    }));

    // Generate activities data
    mockData.activities = this.generateActivityData(businessAnalysis);

    return mockData;
  }

  private generatePersonaMockData(persona: UserPersona, businessAnalysis: BusinessAnalysis): any[] {
    const data = [];
    const count = persona.role === 'Primary User' ? 25 : 15;

    for (let i = 0; i < count; i++) {
      data.push({
        id: `${persona.id}-${i + 1}`,
        name: this.generatePersonaName(persona, i),
        role: persona.role,
        status: this.generateStatus(),
        lastActive: this.generateRecentDate(),
        primaryAction: persona.primaryActions[i % persona.primaryActions.length],
        techLevel: persona.techSavviness,
        progress: Math.floor(Math.random() * 100)
      });
    }

    return data;
  }

  private generateFeatureMockData(feature: BusinessFunction, businessAnalysis: BusinessAnalysis): any[] {
    const data = [];
    const count = feature.importance === 'critical' ? 20 : 10;

    for (let i = 0; i < count; i++) {
      data.push({
        id: `${feature.id}-item-${i + 1}`,
        name: this.generateFeatureItemName(feature, i),
        status: this.generateFeatureStatus(feature),
        progress: Math.floor(Math.random() * 100),
        userRole: feature.userRole,
        importance: feature.importance,
        lastUpdated: this.generateRecentDate(),
        workflow: feature.workflow[i % feature.workflow.length]
      });
    }

    return data;
  }

  private generateCustomizableFields(businessAnalysis: BusinessAnalysis, startupData: any): any[] {
    return [
      {
        id: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: startupData?.companyName || 'Your Company',
        required: true,
        page: 'dashboard',
        component: 'header',
        validation: { minLength: 2, maxLength: 50 }
      },
      {
        id: 'tagline',
        label: 'Business Tagline',
        type: 'text',
        placeholder: this.generateTagline(businessAnalysis, startupData),
        required: false,
        page: 'dashboard',
        component: 'header'
      }
    ];
  }

  private generateRouting(businessAnalysis: BusinessAnalysis): any {
    const routes = [
      { path: '/', name: this.getTerminology(businessAnalysis, 'dashboard'), component: 'Dashboard', protected: true, exact: true }
    ];

    businessAnalysis.coreFeatures.forEach(feature => {
      routes.push({
        path: `/${feature.id}`,
        name: feature.name,
        component: this.capitalizeFirst(feature.id),
        protected: true,
        exact: true
      });
    });

    return {
      pages: routes,
      navigation: routes.map(route => ({
        label: route.name,
        href: route.path,
        icon: this.getIconForRoute(route.path)
      })),
      defaultRoute: '/'
    };
  }

  private generateDataStructure(businessAnalysis: BusinessAnalysis): any {
    const entities = businessAnalysis.userPersonas.map(persona => ({
      name: this.capitalizeFirst(persona.id),
      fields: [
        { name: 'id', type: 'string', required: true, mockStrategy: 'random' },
        { name: 'name', type: 'string', required: true, mockStrategy: 'realistic' },
        { name: 'role', type: 'string', required: true, mockStrategy: 'industry-specific' },
        { name: 'status', type: 'string', required: true, mockStrategy: 'industry-specific' },
        { name: 'lastActive', type: 'date', required: true, mockStrategy: 'realistic' }
      ],
      mockCount: 20
    }));

    return {
      entities,
      relationships: [],
      apiEndpoints: entities.map(entity => ({
        path: `/api/${entity.name.toLowerCase()}s`,
        method: 'GET',
        entity: entity.name,
        mockResponse: []
      }))
    };
  }

  // Helper methods
  private generateTagline(businessAnalysis: BusinessAnalysis, startupData: any): string {
    const differentiators = businessAnalysis.competitiveDifferentiators.slice(0, 2);
    return `Transforming ${businessAnalysis.industry.toLowerCase()} with ${differentiators.join(' and ').toLowerCase()}`;
  }

  private getTerminology(businessAnalysis: BusinessAnalysis, term: string): string {
    return businessAnalysis.brandIdentity.terminology[term] || 
           this.capitalizeFirst(term);
  }

  private getIconForFeature(feature: BusinessFunction): string {
    if (feature.name.toLowerCase().includes('learning')) return 'Users';
    if (feature.name.toLowerCase().includes('progress')) return 'TrendingUp';
    if (feature.name.toLowerCase().includes('analytics')) return 'BarChart3';
    if (feature.name.toLowerCase().includes('assessment')) return 'CheckCircle';
    return 'Settings';
  }

  private getIconForRoute(path: string): string {
    if (path === '/') return 'Home';
    if (path.includes('user') || path.includes('student')) return 'Users';
    if (path.includes('progress') || path.includes('analytics')) return 'TrendingUp';
    return 'Settings';
  }

  private generatePersonaName(persona: UserPersona, index: number): string {
    const names = {
      student: ['Alex Chen', 'Maya Patel', 'Jordan Smith', 'Sam Johnson', 'Riley Garcia'],
      educator: ['Dr. Sarah Wilson', 'Michael Rodriguez', 'Jennifer Lee', 'David Brown', 'Lisa Zhang'],
      parent: ['Maria Santos', 'John Thompson', 'Rachel Kim', 'Carlos Hernandez', 'Emily Taylor']
    };
    
    const roleNames = names[persona.id] || names.student;
    return roleNames[index % roleNames.length];
  }

  private generateFeatureItemName(feature: BusinessFunction, index: number): string {
    if (feature.id.includes('learning')) {
      return ['Introduction to Math', 'Science Fundamentals', 'Reading Comprehension', 'Creative Writing'][index % 4];
    }
    if (feature.id.includes('assessment')) {
      return ['Weekly Progress Check', 'Monthly Evaluation', 'Skill Assessment', 'Learning Style Analysis'][index % 4];
    }
    return `${feature.name} Item ${index + 1}`;
  }

  private generateStatus(): string {
    const statuses = ['Active', 'Pending', 'Completed', 'In Progress'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  private generateFeatureStatus(feature: BusinessFunction): string {
    if (feature.importance === 'critical') {
      return ['Active', 'Processing', 'Live'][Math.floor(Math.random() * 3)];
    }
    return ['Scheduled', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)];
  }

  private generateRecentDate(): string {
    const days = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

  private generateMetricValue(metric: any): string {
    switch (metric.format) {
      case 'percentage':
        return `${Math.floor(Math.random() * 40 + 60)}%`;
      case 'currency':
        return `$${(Math.random() * 100000).toLocaleString()}`;
      case 'time':
        return `${Math.floor(Math.random() * 120 + 30)} min`;
      case 'rating':
        return `${(Math.random() * 2 + 3).toFixed(1)}/5`;
      default:
        return Math.floor(Math.random() * 10000).toLocaleString();
    }
  }

  private generateMetricChange(): string {
    const isPositive = Math.random() > 0.2;
    const change = Math.floor(Math.random() * 20 + 1);
    return `${isPositive ? '+' : '-'}${change}%`;
  }

  private generateActivityData(businessAnalysis: BusinessAnalysis): any[] {
    const activities = [];
    const users = ['Alex Chen', 'Sarah Wilson', 'Maria Santos', 'Dr. Johnson', 'Emily Taylor'];
    
    for (let i = 0; i < 10; i++) {
      const feature = businessAnalysis.coreFeatures[i % businessAnalysis.coreFeatures.length];
      activities.push({
        action: `${feature.workflow[0]} completed`,
        user: users[i % users.length],
        timestamp: this.generateTimeAgo(i),
        result: ['Success', 'Completed', 'In Progress'][i % 3],
        type: ['success', 'info', 'milestone'][i % 3],
        feature: feature.name
      });
    }
    
    return activities;
  }

  private generateTimeAgo(index: number): string {
    const times = ['2 hours ago', '1 day ago', '3 hours ago', '5 hours ago', '2 days ago'];
    return times[index % times.length];
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export const dynamicTemplateGenerator = new DynamicTemplateGenerator();
