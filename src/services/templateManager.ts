
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';

class TemplateManager {
  private templates: LandingPageTemplate[] = [
    {
      id: 'saas-modern',
      name: 'Modern SaaS',
      description: 'Clean, conversion-focused design perfect for SaaS products',
      category: 'saas',
      complexity: 'moderate',
      features: ['Hero Section', 'Feature Grid', 'Testimonials', 'Pricing', 'CTA'],
      previewImage: '/templates/saas-modern.png',
      tags: ['modern', 'clean', 'conversion', 'responsive'],
      config: {
        customizableFields: [
          { id: 'heroTitle', label: 'Hero Title', type: 'text', required: true, section: 'hero', placeholder: 'Transform Your Business' },
          { id: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', required: true, section: 'hero', placeholder: 'Powerful tools to grow your business faster' },
          { id: 'ctaText', label: 'CTA Button Text', type: 'text', required: true, section: 'hero', placeholder: 'Get Started Free' },
          { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', required: true, section: 'features', placeholder: 'Powerful Analytics' },
          { id: 'feature1Description', label: 'Feature 1 Description', type: 'textarea', required: true, section: 'features', placeholder: 'Get insights that matter' },
          { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', required: true, section: 'features', placeholder: 'Easy Integration' },
          { id: 'feature2Description', label: 'Feature 2 Description', type: 'textarea', required: true, section: 'features', placeholder: 'Connect with your existing tools' },
          { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', required: true, section: 'features', placeholder: 'Secure & Reliable' },
          { id: 'feature3Description', label: 'Feature 3 Description', type: 'textarea', required: true, section: 'features', placeholder: 'Enterprise-grade security' }
        ],
        colorScheme: {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          accent: '#F59E0B',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        sections: [
          { id: 'hero', name: 'Hero Section', required: true, customizable: true, fields: ['heroTitle', 'heroSubtitle', 'ctaText'] },
          { id: 'features', name: 'Features', required: true, customizable: true, fields: ['feature1Title', 'feature1Description', 'feature2Title', 'feature2Description', 'feature3Title', 'feature3Description'] },
          { id: 'testimonials', name: 'Testimonials', required: false, customizable: true, fields: [] },
          { id: 'pricing', name: 'Pricing', required: false, customizable: true, fields: [] }
        ],
        layout: {
          header: true,
          navigation: true,
          hero: true,
          features: true,
          testimonials: true,
          pricing: true,
          footer: true
        }
      },
      component: `import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';

interface ModernSaaSProps {
  customization: any;
}

const ModernSaaS = ({ customization }: ModernSaaSProps) => {
  const { fields, colorScheme, companyData } = customization;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <span className="text-xl font-bold text-gray-900">{companyData.name}</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <Button variant="outline">Sign In</Button>
            <Button>{fields.ctaText || 'Get Started'}</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          🚀 New: Advanced Analytics Dashboard
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {fields.heroTitle || 'Transform Your Business'}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          {fields.heroSubtitle || 'Powerful tools to grow your business faster than ever before'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="px-8 py-3">
            {fields.ctaText || 'Get Started Free'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3">
            Watch Demo
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed to accelerate your growth
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>{fields.feature1Title || 'Powerful Analytics'}</CardTitle>
              <CardDescription className="text-base">
                {fields.feature1Description || 'Get insights that matter with our advanced analytics dashboard'}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>{fields.feature2Title || 'Easy Integration'}</CardTitle>
              <CardDescription className="text-base">
                {fields.feature2Description || 'Connect seamlessly with your existing tools and workflows'}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>{fields.feature3Title || 'Secure & Reliable'}</CardTitle>
              <CardDescription className="text-base">
                {fields.feature3Description || 'Enterprise-grade security with 99.9% uptime guarantee'}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by thousands of companies
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "This platform has completely transformed how we manage our business. The analytics are incredible!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  <div className="ml-3">
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">CEO, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The integration capabilities are amazing. We were up and running in minutes, not hours."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <div className="ml-3">
                    <p className="font-semibold">Mike Chen</p>
                    <p className="text-sm text-gray-500">CTO, DataFlow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Outstanding support and reliability. Our team productivity has increased by 40%."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <div className="ml-3">
                    <p className="font-semibold">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500">Director, InnovateLab</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Ready to get started?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of companies already using {companyData.name}
        </p>
        <Button size="lg" className="px-8 py-3">
          {fields.ctaText || 'Start Your Free Trial'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <span className="text-xl font-bold">{companyData.name}</span>
              </div>
              <p className="text-gray-400">
                {companyData.description || 'Building the future of business automation'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {companyData.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernSaaS;`
    },
    {
      id: 'service-agency',
      name: 'Service Agency',
      description: 'Professional design for service-based businesses and agencies',
      category: 'service',
      complexity: 'simple',
      features: ['Hero Section', 'Services Grid', 'About', 'Contact'],
      previewImage: '/templates/service-agency.png',
      tags: ['professional', 'services', 'agency', 'clean'],
      config: {
        customizableFields: [
          { id: 'heroTitle', label: 'Hero Title', type: 'text', required: true, section: 'hero', placeholder: 'Professional Services' },
          { id: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', required: true, section: 'hero', placeholder: 'Expert solutions for your business' },
          { id: 'service1', label: 'Service 1', type: 'text', required: true, section: 'services', placeholder: 'Consulting' },
          { id: 'service2', label: 'Service 2', type: 'text', required: true, section: 'services', placeholder: 'Development' },
          { id: 'service3', label: 'Service 3', type: 'text', required: true, section: 'services', placeholder: 'Support' }
        ],
        colorScheme: {
          primary: '#059669',
          secondary: '#047857',
          accent: '#F59E0B',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        sections: [
          { id: 'hero', name: 'Hero Section', required: true, customizable: true, fields: ['heroTitle', 'heroSubtitle'] },
          { id: 'services', name: 'Services', required: true, customizable: true, fields: ['service1', 'service2', 'service3'] },
          { id: 'about', name: 'About', required: false, customizable: true, fields: [] },
          { id: 'contact', name: 'Contact', required: true, customizable: false, fields: [] }
        ],
        layout: {
          header: true,
          navigation: true,
          hero: true,
          features: false,
          testimonials: false,
          pricing: false,
          footer: true
        }
      },
      component: `// Service Agency template component would go here`
    }
  ];

  getTemplates(): LandingPageTemplate[] {
    return this.templates;
  }

  getTemplateById(id: string): LandingPageTemplate | undefined {
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
      template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  generateCustomizedCode(templateId: string, customization: TemplateCustomization): string {
    const template = this.getTemplateById(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    // Replace placeholders in the template component with actual values
    let customizedCode = template.component;
    
    // Replace customization values
    Object.entries(customization.fields).forEach(([key, value]) => {
      const placeholder = `{fields.${key}`;
      customizedCode = customizedCode.replace(new RegExp(placeholder, 'g'), `"${this.escapeString(value)}"`);
    });

    // Replace company data
    Object.entries(customization.companyData).forEach(([key, value]) => {
      const placeholder = `{companyData.${key}`;
      customizedCode = customizedCode.replace(new RegExp(placeholder, 'g'), `"${this.escapeString(value)}"`);
    });

    return customizedCode;
  }

  private escapeString(str: string): string {
    if (typeof str !== 'string') return String(str);
    
    // Escape quotes and special characters
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }

  recommendTemplates(businessType: string, industry: string): LandingPageTemplate[] {
    // Simple recommendation logic based on business type and industry
    const recommendations: LandingPageTemplate[] = [];
    
    if (businessType.toLowerCase().includes('saas') || businessType.toLowerCase().includes('software')) {
      recommendations.push(...this.getTemplatesByCategory('saas'));
    }
    
    if (businessType.toLowerCase().includes('service') || businessType.toLowerCase().includes('agency')) {
      recommendations.push(...this.getTemplatesByCategory('service'));
    }

    if (businessType.toLowerCase().includes('ecommerce') || businessType.toLowerCase().includes('shop')) {
      recommendations.push(...this.getTemplatesByCategory('ecommerce'));
    }

    // If no specific matches, return most popular templates
    if (recommendations.length === 0) {
      return this.templates.slice(0, 3);
    }

    return recommendations;
  }
}

export const templateManager = new TemplateManager();
