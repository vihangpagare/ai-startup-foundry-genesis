
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';

class TemplateManager {
  private templates: LandingPageTemplate[] = [
    {
      id: 'modern-saas',
      name: 'Modern SaaS',
      description: 'Clean and modern design perfect for SaaS companies',
      category: 'saas',
      complexity: 'moderate',
      features: ['Hero Section', 'Features Grid', 'Call to Action', 'Responsive Design'],
      previewImage: '/preview-modern-saas.jpg',
      tags: ['saas', 'modern', 'clean'],
      version: '1.0.0',
      popularity: 95,
      lastUpdated: '2024-01-15',
      author: 'Template Studio',
      premium: false,
      component: 'ModernSaaSTemplate',
      config: {
        customizableFields: [
          {
            id: 'heroTitle',
            label: 'Hero Title',
            type: 'text',
            placeholder: 'Your Company Name',
            required: true,
            section: 'hero'
          },
          {
            id: 'heroSubtitle',
            label: 'Hero Subtitle',
            type: 'textarea',
            placeholder: 'Brief description of your service',
            required: true,
            section: 'hero'
          },
          {
            id: 'ctaText',
            label: 'Call to Action Button',
            type: 'text',
            placeholder: 'Get Started',
            required: true,
            section: 'hero'
          },
          {
            id: 'feature1Title',
            label: 'Feature 1 Title',
            type: 'text',
            placeholder: 'Amazing Feature',
            required: true,
            section: 'features'
          },
          {
            id: 'feature1Description',
            label: 'Feature 1 Description',
            type: 'textarea',
            placeholder: 'Description of your first feature',
            required: true,
            section: 'features'
          },
          {
            id: 'feature2Title',
            label: 'Feature 2 Title',
            type: 'text',
            placeholder: 'Great Integration',
            required: true,
            section: 'features'
          },
          {
            id: 'feature2Description',
            label: 'Feature 2 Description',
            type: 'textarea',
            placeholder: 'Description of your second feature',
            required: true,
            section: 'features'
          },
          {
            id: 'feature3Title',
            label: 'Feature 3 Title',
            type: 'text',
            placeholder: 'Secure Platform',
            required: true,
            section: 'features'
          },
          {
            id: 'feature3Description',
            label: 'Feature 3 Description',
            type: 'textarea',
            placeholder: 'Description of your third feature',
            required: true,
            section: 'features'
          }
        ],
        colorScheme: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
          background: '#F8FAFC',
          text: '#1F2937',
          muted: '#6B7280',
          border: '#E5E7EB',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444'
        },
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
        sections: [
          { id: 'hero', name: 'Hero Section', description: 'Main banner area', required: true, customizable: true, fields: ['heroTitle', 'heroSubtitle', 'ctaText'], variants: [], position: 1 },
          { id: 'features', name: 'Features', description: 'Features showcase', required: true, customizable: true, fields: ['feature1Title', 'feature1Description', 'feature2Title', 'feature2Description', 'feature3Title', 'feature3Description'], variants: [], position: 2 }
        ],
        layout: {
          header: { enabled: false, variant: 'minimal', sticky: false, transparent: false },
          navigation: { enabled: false, type: 'horizontal', items: [] },
          hero: { enabled: true, variant: 'centered', backgroundType: 'gradient', height: 'large' },
          features: true,
          testimonials: false,
          pricing: false,
          footer: { enabled: true, variant: 'minimal', columns: 1 }
        },
        animations: {
          enabled: true,
          type: 'subtle',
          transitions: [],
          parallax: false,
          scrollAnimations: true
        },
        responsiveness: {
          breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
          },
          mobileFirst: true,
          adaptiveImages: true,
          touchOptimized: true
        },
        integrations: []
      }
    },
    {
      id: 'minimal-portfolio',
      name: 'Minimal Portfolio',
      description: 'Clean portfolio design for creatives and professionals',
      category: 'portfolio',
      complexity: 'simple',
      features: ['Clean Design', 'Portfolio Grid', 'Contact Section', 'Mobile Friendly'],
      previewImage: '/preview-minimal-portfolio.jpg',
      tags: ['portfolio', 'minimal', 'creative'],
      version: '1.0.0',
      popularity: 88,
      lastUpdated: '2024-01-15',
      author: 'Template Studio',
      premium: false,
      component: 'MinimalPortfolioTemplate',
      config: {
        customizableFields: [
          {
            id: 'heroTitle',
            label: 'Main Headline',
            type: 'text',
            placeholder: 'Creative Solutions',
            required: true,
            section: 'hero'
          },
          {
            id: 'heroSubtitle',
            label: 'Subtitle',
            type: 'textarea',
            placeholder: 'Brief description of your work',
            required: true,
            section: 'hero'
          },
          {
            id: 'ctaText',
            label: 'Action Button Text',
            type: 'text',
            placeholder: 'View Work',
            required: true,
            section: 'hero'
          },
          {
            id: 'feature1Title',
            label: 'Project 1 Title',
            type: 'text',
            placeholder: 'Project Name',
            required: true,
            section: 'portfolio'
          },
          {
            id: 'feature1Description',
            label: 'Project 1 Description',
            type: 'textarea',
            placeholder: 'Brief project description',
            required: true,
            section: 'portfolio'
          },
          {
            id: 'feature2Title',
            label: 'Project 2 Title',
            type: 'text',
            placeholder: 'Project Name',
            required: true,
            section: 'portfolio'
          },
          {
            id: 'feature2Description',
            label: 'Project 2 Description',
            type: 'textarea',
            placeholder: 'Brief project description',
            required: true,
            section: 'portfolio'
          },
          {
            id: 'feature3Title',
            label: 'Project 3 Title',
            type: 'text',
            placeholder: 'Project Name',
            required: true,
            section: 'portfolio'
          },
          {
            id: 'feature3Description',
            label: 'Project 3 Description',
            type: 'textarea',
            placeholder: 'Brief project description',
            required: true,
            section: 'portfolio'
          }
        ],
        colorScheme: {
          primary: '#2563EB',
          secondary: '#64748B',
          accent: '#7C3AED',
          background: '#F8FAFC',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          success: '#059669',
          warning: '#D97706',
          error: '#DC2626'
        },
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
        sections: [
          { id: 'hero', name: 'Hero Section', description: 'Main intro area', required: true, customizable: true, fields: ['heroTitle', 'heroSubtitle', 'ctaText'], variants: [], position: 1 },
          { id: 'portfolio', name: 'Portfolio', description: 'Work showcase', required: true, customizable: true, fields: ['feature1Title', 'feature1Description', 'feature2Title', 'feature2Description', 'feature3Title', 'feature3Description'], variants: [], position: 2 }
        ],
        layout: {
          header: { enabled: true, variant: 'minimal', sticky: false, transparent: false },
          navigation: { enabled: false, type: 'horizontal', items: [] },
          hero: { enabled: true, variant: 'centered', backgroundType: 'solid', height: 'medium' },
          features: true,
          testimonials: false,
          pricing: false,
          footer: { enabled: false, variant: 'minimal', columns: 1 }
        },
        animations: {
          enabled: true,
          type: 'subtle',
          transitions: [],
          parallax: false,
          scrollAnimations: false
        },
        responsiveness: {
          breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
          },
          mobileFirst: true,
          adaptiveImages: true,
          touchOptimized: true
        },
        integrations: []
      }
    },
    {
      id: 'business-service',
      name: 'Business Service',
      description: 'Professional layout for service-based businesses',
      category: 'service',
      complexity: 'moderate',
      features: ['Professional Layout', 'Services Section', 'Contact Forms', 'Trust Indicators'],
      previewImage: '/preview-business-service.jpg',
      tags: ['business', 'professional', 'services'],
      version: '1.0.0',
      popularity: 92,
      lastUpdated: '2024-01-15',
      author: 'Template Studio',
      premium: false,
      component: 'BusinessServiceTemplate',
      config: {
        customizableFields: [
          {
            id: 'heroTitle',
            label: 'Main Headline',
            type: 'text',
            placeholder: 'Professional Services',
            required: true,
            section: 'hero'
          },
          {
            id: 'heroSubtitle',
            label: 'Service Description',
            type: 'textarea',
            placeholder: 'How your service helps clients',
            required: true,
            section: 'hero'
          },
          {
            id: 'ctaText',
            label: 'Main Call to Action',
            type: 'text',
            placeholder: 'Get Started',
            required: true,
            section: 'hero'
          },
          {
            id: 'feature1Title',
            label: 'Service 1 Title',
            type: 'text',
            placeholder: 'Service Name',
            required: true,
            section: 'services'
          },
          {
            id: 'feature1Description',
            label: 'Service 1 Description',
            type: 'textarea',
            placeholder: 'Detailed service description',
            required: true,
            section: 'services'
          },
          {
            id: 'feature2Title',
            label: 'Service 2 Title',
            type: 'text',
            placeholder: 'Service Name',
            required: true,
            section: 'services'
          },
          {
            id: 'feature2Description',
            label: 'Service 2 Description',
            type: 'textarea',
            placeholder: 'Detailed service description',
            required: true,
            section: 'services'
          },
          {
            id: 'feature3Title',
            label: 'Service 3 Title',
            type: 'text',
            placeholder: 'Service Name',
            required: true,
            section: 'services'
          },
          {
            id: 'feature3Description',
            label: 'Service 3 Description',
            type: 'textarea',
            placeholder: 'Detailed service description',
            required: true,
            section: 'services'
          }
        ],
        colorScheme: {
          primary: '#1E40AF',
          secondary: '#374151',
          accent: '#059669',
          background: '#F9FAFB',
          text: '#111827',
          muted: '#6B7280',
          border: '#D1D5DB',
          success: '#059669',
          warning: '#D97706',
          error: '#DC2626'
        },
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
        sections: [
          { id: 'hero', name: 'Hero Section', description: 'Main service intro', required: true, customizable: true, fields: ['heroTitle', 'heroSubtitle', 'ctaText'], variants: [], position: 1 },
          { id: 'services', name: 'Services', description: 'Service offerings', required: true, customizable: true, fields: ['feature1Title', 'feature1Description', 'feature2Title', 'feature2Description', 'feature3Title', 'feature3Description'], variants: [], position: 2 }
        ],
        layout: {
          header: { enabled: true, variant: 'standard', sticky: true, transparent: false },
          navigation: { enabled: true, type: 'horizontal', items: [] },
          hero: { enabled: true, variant: 'split', backgroundType: 'solid', height: 'large' },
          features: true,
          testimonials: false,
          pricing: false,
          footer: { enabled: true, variant: 'standard', columns: 1 }
        },
        animations: {
          enabled: true,
          type: 'moderate',
          transitions: [],
          parallax: false,
          scrollAnimations: true
        },
        responsiveness: {
          breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
          },
          mobileFirst: true,
          adaptiveImages: true,
          touchOptimized: true
        },
        integrations: []
      }
    }
  ];

  getTemplates(): LandingPageTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): LandingPageTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  getTemplatesByCategory(category: string): LandingPageTemplate[] {
    return this.templates.filter(template => template.category === category);
  }

  searchTemplates(query: string): LandingPageTemplate[] {
    const lowercaseQuery = query.toLowerCase();
    return this.templates.filter(template => 
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      template.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    );
  }

  recommendTemplates(businessType: string, industry: string): LandingPageTemplate[] {
    // Simple recommendation logic based on business type and industry
    if (businessType.toLowerCase().includes('saas') || industry.toLowerCase().includes('technology')) {
      return this.templates.filter(t => t.category === 'saas' || t.category === 'service');
    }
    
    if (businessType.toLowerCase().includes('portfolio') || industry.toLowerCase().includes('creative')) {
      return this.templates.filter(t => t.category === 'portfolio');
    }
    
    if (businessType.toLowerCase().includes('service') || industry.toLowerCase().includes('consulting')) {
      return this.templates.filter(t => t.category === 'service');
    }
    
    // Default recommendations
    return this.templates.slice(0, 3);
  }

  generateCustomizedCode(customization: TemplateCustomization): string {
    try {
      const template = this.getTemplate(customization.templateId);
      if (!template) {
        throw new Error(`Template not found: ${customization.templateId}`);
      }

      // Import the appropriate template component and render it with customization
      let componentName = '';
      let importPath = '';
      
      switch (template.component) {
        case 'ModernSaaSTemplate':
          componentName = 'ModernSaaSTemplate';
          importPath = '@/components/templates/ModernSaaSTemplate';
          break;
        case 'MinimalPortfolioTemplate':
          componentName = 'MinimalPortfolioTemplate';
          importPath = '@/components/templates/MinimalPortfolioTemplate';
          break;
        case 'BusinessServiceTemplate':
          componentName = 'BusinessServiceTemplate';
          importPath = '@/components/templates/BusinessServiceTemplate';
          break;
        default:
          throw new Error(`Unknown template component: ${template.component}`);
      }

      const code = `import React from 'react';
import ${componentName} from '${importPath}';

const LandingPage = () => {
  const customization = ${JSON.stringify(customization, null, 2)};

  return <${componentName} customization={customization} />;
};

export default LandingPage;`;

      return code;
    } catch (error) {
      console.error('Error generating customized code:', error);
      throw error;
    }
  }
}

export const templateManager = new TemplateManager();
