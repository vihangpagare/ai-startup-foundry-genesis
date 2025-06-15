import { LandingPageTemplate, TemplateCustomization } from '@/types/template';

class TemplateManager {
  private templates: LandingPageTemplate[] = [
    {
      id: 'advanced-saas',
      name: 'Advanced SaaS Platform',
      description: 'Enterprise-grade SaaS template with advanced analytics, interactive demos, and conversion optimization',
      category: 'saas',
      complexity: 'advanced',
      features: ['Interactive Hero', 'Mega Navigation', 'Advanced Analytics', 'Video Testimonials', 'Live Chat', 'A/B Testing', 'API Documentation'],
      previewImage: '/templates/advanced-saas.png',
      tags: ['enterprise', 'analytics', 'interactive', 'conversion', 'ai-powered'],
      version: '2.0.0',
      popularity: 95,
      lastUpdated: '2024-12-15',
      author: 'Lovable AI',
      premium: true,
      config: {
        customizableFields: [
          { id: 'heroTitle', label: 'Hero Title', type: 'text', required: true, section: 'hero', placeholder: 'Transform Your Business with AI' },
          { id: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', required: true, section: 'hero', placeholder: 'Advanced analytics platform trusted by 50,000+ companies worldwide' },
          { id: 'ctaText', label: 'CTA Button Text', type: 'text', required: true, section: 'hero', placeholder: 'Start Free Trial' },
          { id: 'feature1Title', label: 'Feature 1 Title', type: 'text', required: true, section: 'features', placeholder: 'Advanced Analytics' },
          { id: 'feature1Description', label: 'Feature 1 Description', type: 'textarea', required: true, section: 'features', placeholder: 'Real-time insights with predictive analytics and custom dashboards' },
          { id: 'feature2Title', label: 'Feature 2 Title', type: 'text', required: true, section: 'features', placeholder: 'Lightning Fast' },
          { id: 'feature2Description', label: 'Feature 2 Description', type: 'textarea', required: true, section: 'features', placeholder: 'Sub-second query responses with enterprise-grade performance' },
          { id: 'feature3Title', label: 'Feature 3 Title', type: 'text', required: true, section: 'features', placeholder: 'Enterprise Security' },
          { id: 'feature3Description', label: 'Feature 3 Description', type: 'textarea', required: true, section: 'features', placeholder: 'Bank-level security with SOC 2 compliance and encryption' }
        ],
        colorScheme: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
          background: '#FFFFFF',
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
          { 
            id: 'hero', 
            name: 'Hero Section', 
            description: 'Main landing section with CTA',
            required: true, 
            customizable: true, 
            fields: ['heroTitle', 'heroSubtitle', 'ctaText'],
            variants: [
              { id: 'centered', name: 'Centered', description: 'Center-aligned hero', preview: '', complexity: 'simple' },
              { id: 'split', name: 'Split Layout', description: 'Text and visual split', preview: '', complexity: 'moderate' },
              { id: 'video', name: 'Video Background', description: 'Hero with video background', preview: '', complexity: 'advanced' }
            ],
            position: 1
          },
          { 
            id: 'features', 
            name: 'Features Section', 
            description: 'Product features and benefits',
            required: true, 
            customizable: true, 
            fields: ['feature1Title', 'feature1Description', 'feature2Title', 'feature2Description', 'feature3Title', 'feature3Description'],
            variants: [
              { id: 'grid', name: 'Grid Layout', description: 'Features in grid format', preview: '', complexity: 'simple' },
              { id: 'cards', name: 'Card Layout', description: 'Features as cards', preview: '', complexity: 'moderate' },
              { id: 'interactive', name: 'Interactive Cards', description: 'Hover effects and animations', preview: '', complexity: 'advanced' }
            ],
            position: 2
          },
          { 
            id: 'testimonials', 
            name: 'Testimonials', 
            description: 'Customer testimonials and reviews',
            required: false, 
            customizable: true, 
            fields: [],
            variants: [
              { id: 'carousel', name: 'Carousel', description: 'Sliding testimonials', preview: '', complexity: 'moderate' },
              { id: 'grid', name: 'Grid', description: 'Static grid layout', preview: '', complexity: 'simple' },
              { id: 'video', name: 'Video Testimonials', description: 'Video customer stories', preview: '', complexity: 'advanced' }
            ],
            position: 3
          },
          { 
            id: 'pricing', 
            name: 'Pricing Section', 
            description: 'Pricing plans and packages',
            required: false, 
            customizable: true, 
            fields: [],
            variants: [
              { id: 'simple', name: 'Simple', description: 'Basic pricing cards', preview: '', complexity: 'simple' },
              { id: 'comparison', name: 'Comparison Table', description: 'Detailed feature comparison', preview: '', complexity: 'moderate' },
              { id: 'calculator', name: 'Price Calculator', description: 'Interactive pricing calculator', preview: '', complexity: 'advanced' }
            ],
            position: 4
          }
        ],
        layout: {
          header: {
            enabled: true,
            variant: 'mega',
            sticky: true,
            transparent: false
          },
          navigation: {
            enabled: true,
            type: 'horizontal',
            items: [
              { label: 'Product', href: '#product' },
              { label: 'Solutions', href: '#solutions' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Resources', href: '#resources' }
            ]
          },
          hero: {
            enabled: true,
            variant: 'split',
            backgroundType: 'gradient',
            height: 'large'
          },
          features: true,
          testimonials: true,
          pricing: true,
          footer: {
            enabled: true,
            variant: 'extended',
            columns: 4
          }
        },
        animations: {
          enabled: true,
          type: 'rich',
          transitions: [
            { element: '.hero-title', animation: 'fadeInUp', duration: 800, delay: 0, easing: 'easeOutCubic' },
            { element: '.feature-card', animation: 'fadeInUp', duration: 600, delay: 200, easing: 'easeOutCubic' }
          ],
          parallax: true,
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
        integrations: [
          { id: 'google-analytics', name: 'Google Analytics', type: 'analytics', enabled: false, config: {} },
          { id: 'stripe', name: 'Stripe Payments', type: 'payments', enabled: false, config: {} },
          { id: 'mailchimp', name: 'Mailchimp', type: 'email', enabled: false, config: {} },
          { id: 'intercom', name: 'Intercom Chat', type: 'chat', enabled: false, config: {} }
        ]
      },
      component: `// Advanced SaaS template component code will be loaded dynamically`
    },
    {
      id: 'advanced-ecommerce',
      name: 'Advanced E-commerce Store',
      description: 'Premium e-commerce template with product showcase, shopping cart, and checkout flow',
      category: 'ecommerce',
      complexity: 'advanced',
      features: ['Product Catalog', 'Shopping Cart', 'User Reviews', 'Wishlist', 'Search & Filter', 'Payment Integration', 'Inventory Management'],
      previewImage: '/templates/advanced-ecommerce.png',
      tags: ['shopping', 'products', 'cart', 'payments', 'reviews'],
      version: '2.0.0',
      popularity: 88,
      lastUpdated: '2024-12-15',
      author: 'Lovable AI',
      premium: true,
      config: {
        customizableFields: [
          { id: 'heroTitle', label: 'Hero Title', type: 'text', required: true, section: 'hero', placeholder: 'Discover Your Perfect Style' },
          { id: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea', required: true, section: 'hero', placeholder: 'Curated collection of premium fashion for the modern individual' },
          { id: 'ctaText', label: 'CTA Button Text', type: 'text', required: true, section: 'hero', placeholder: 'Shop Collection' },
          { id: 'featuredCategory1', label: 'Featured Category 1', type: 'text', required: true, section: 'categories', placeholder: 'Women\'s Fashion' },
          { id: 'featuredCategory2', label: 'Featured Category 2', type: 'text', required: true, section: 'categories', placeholder: 'Men\'s Fashion' },
          { id: 'featuredCategory3', label: 'Featured Category 3', type: 'text', required: true, section: 'categories', placeholder: 'Accessories' }
        ],
        colorScheme: {
          primary: '#8B5CF6',
          secondary: '#EC4899',
          accent: '#F59E0B',
          background: '#FFFFFF',
          text: '#1F2937',
          muted: '#6B7280',
          border: '#E5E7EB',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444'
        },
        typography: {
          fontFamily: {
            heading: 'Playfair Display, serif',
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
          { 
            id: 'hero', 
            name: 'Hero Section', 
            description: 'Main product showcase',
            required: true, 
            customizable: true, 
            fields: ['heroTitle', 'heroSubtitle', 'ctaText'],
            variants: [
              { id: 'product-focus', name: 'Product Focus', description: 'Highlight featured products', preview: '', complexity: 'moderate' },
              { id: 'lifestyle', name: 'Lifestyle', description: 'Lifestyle imagery with products', preview: '', complexity: 'advanced' }
            ],
            position: 1
          },
          { 
            id: 'categories', 
            name: 'Product Categories', 
            description: 'Product category showcase',
            required: true, 
            customizable: true, 
            fields: ['featuredCategory1', 'featuredCategory2', 'featuredCategory3'],
            variants: [
              { id: 'grid', name: 'Grid Layout', description: 'Categories in grid', preview: '', complexity: 'simple' },
              { id: 'masonry', name: 'Masonry Layout', description: 'Dynamic masonry layout', preview: '', complexity: 'advanced' }
            ],
            position: 2
          },
          { 
            id: 'products', 
            name: 'Featured Products', 
            description: 'Product showcase and listings',
            required: true, 
            customizable: true, 
            fields: [],
            variants: [
              { id: 'grid', name: 'Product Grid', description: 'Standard product grid', preview: '', complexity: 'simple' },
              { id: 'carousel', name: 'Product Carousel', description: 'Sliding product showcase', preview: '', complexity: 'moderate' },
              { id: 'interactive', name: 'Interactive Showcase', description: 'Hover effects and quick view', preview: '', complexity: 'advanced' }
            ],
            position: 3
          }
        ],
        layout: {
          header: {
            enabled: true,
            variant: 'standard',
            sticky: true,
            transparent: false
          },
          navigation: {
            enabled: true,
            type: 'horizontal',
            items: [
              { label: 'New Arrivals', href: '#new' },
              { label: 'Women', href: '#women' },
              { label: 'Men', href: '#men' },
              { label: 'Accessories', href: '#accessories' },
              { label: 'Sale', href: '#sale' }
            ]
          },
          hero: {
            enabled: true,
            variant: 'split',
            backgroundType: 'gradient',
            height: 'large'
          },
          features: false,
          testimonials: true,
          pricing: false,
          footer: {
            enabled: true,
            variant: 'extended',
            columns: 4
          }
        },
        animations: {
          enabled: true,
          type: 'moderate',
          transitions: [
            { element: '.product-card', animation: 'fadeInUp', duration: 600, delay: 100, easing: 'easeOutCubic' },
            { element: '.category-card', animation: 'scaleIn', duration: 500, delay: 0, easing: 'easeOutBack' }
          ],
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
        integrations: [
          { id: 'stripe', name: 'Stripe Payments', type: 'payments', enabled: true, config: {} },
          { id: 'reviews', name: 'Product Reviews', type: 'social', enabled: true, config: {} },
          { id: 'analytics', name: 'E-commerce Analytics', type: 'analytics', enabled: false, config: {} }
        ]
      },
      component: `// Advanced E-commerce template component code will be loaded dynamically`
    },
    {
      id: 'saas-modern',
      name: 'Modern SaaS',
      description: 'Clean, conversion-focused design perfect for SaaS products',
      category: 'saas',
      complexity: 'moderate',
      features: ['Hero Section', 'Feature Grid', 'Testimonials', 'Pricing', 'CTA'],
      previewImage: '/templates/saas-modern.png',
      tags: ['modern', 'clean', 'conversion', 'responsive'],
      version: '1.0.0',
      popularity: 75,
      lastUpdated: '2024-11-15',
      author: 'Lovable AI',
      premium: false,
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
          { 
            id: 'hero', 
            name: 'Hero Section', 
            description: 'Main landing section',
            required: true, 
            customizable: true, 
            fields: ['heroTitle', 'heroSubtitle', 'ctaText'],
            variants: [
              { id: 'centered', name: 'Centered', description: 'Center-aligned hero', preview: '', complexity: 'simple' }
            ],
            position: 1
          },
          { 
            id: 'features', 
            name: 'Features', 
            description: 'Product features section',
            required: true, 
            customizable: true, 
            fields: ['feature1Title', 'feature1Description', 'feature2Title', 'feature2Description', 'feature3Title', 'feature3Description'],
            variants: [
              { id: 'grid', name: 'Grid Layout', description: 'Features in grid', preview: '', complexity: 'simple' }
            ],
            position: 2
          },
          { 
            id: 'testimonials', 
            name: 'Testimonials', 
            description: 'Customer testimonials',
            required: false, 
            customizable: true, 
            fields: [],
            variants: [
              { id: 'cards', name: 'Card Layout', description: 'Testimonial cards', preview: '', complexity: 'simple' }
            ],
            position: 3
          },
          { 
            id: 'pricing', 
            name: 'Pricing', 
            description: 'Pricing section',
            required: false, 
            customizable: true, 
            fields: [],
            variants: [
              { id: 'simple', name: 'Simple', description: 'Basic pricing', preview: '', complexity: 'simple' }
            ],
            position: 4
          }
        ],
        layout: {
          header: {
            enabled: true,
            variant: 'standard',
            sticky: false,
            transparent: false
          },
          navigation: {
            enabled: true,
            type: 'horizontal',
            items: [
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'About', href: '#about' }
            ]
          },
          hero: {
            enabled: true,
            variant: 'centered',
            backgroundType: 'gradient',
            height: 'large'
          },
          features: true,
          testimonials: true,
          pricing: true,
          footer: {
            enabled: true,
            variant: 'standard',
            columns: 4
          }
        },
        animations: {
          enabled: false,
          type: 'none',
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
      version: '1.0.0',
      popularity: 68,
      lastUpdated: '2024-11-15',
      author: 'Lovable AI',
      premium: false,
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
          { 
            id: 'hero', 
            name: 'Hero Section', 
            description: 'Main landing section',
            required: true, 
            customizable: true, 
            fields: ['heroTitle', 'heroSubtitle'],
            variants: [
              { id: 'centered', name: 'Centered', description: 'Center-aligned hero', preview: '', complexity: 'simple' }
            ],
            position: 1
          },
          { 
            id: 'services', 
            name: 'Services', 
            description: 'Services showcase',
            required: true, 
            customizable: true, 
            fields: ['service1', 'service2', 'service3'],
            variants: [
              { id: 'grid', name: 'Grid Layout', description: 'Services in grid', preview: '', complexity: 'simple' }
            ],
            position: 2
          },
          { 
            id: 'about', 
            name: 'About', 
            description: 'About section',
            required: false, 
            customizable: true, 
            fields: [],
            variants: [
              { id: 'simple', name: 'Simple', description: 'Basic about section', preview: '', complexity: 'simple' }
            ],
            position: 3
          },
          { 
            id: 'contact', 
            name: 'Contact', 
            description: 'Contact section',
            required: true, 
            customizable: false, 
            fields: [],
            variants: [
              { id: 'form', name: 'Contact Form', description: 'Contact form', preview: '', complexity: 'simple' }
            ],
            position: 4
          }
        ],
        layout: {
          header: {
            enabled: true,
            variant: 'standard',
            sticky: false,
            transparent: false
          },
          navigation: {
            enabled: true,
            type: 'horizontal',
            items: [
              { label: 'Services', href: '#services' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' }
            ]
          },
          hero: {
            enabled: true,
            variant: 'centered',
            backgroundType: 'solid',
            height: 'medium'
          },
          features: false,
          testimonials: false,
          pricing: false,
          footer: {
            enabled: true,
            variant: 'minimal',
            columns: 3
          }
        },
        animations: {
          enabled: false,
          type: 'none',
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
      },
      component: `// Service Agency template component would go here`
    }
  ];

  getTemplates(): LandingPageTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): LandingPageTemplate | undefined {
    return this.getTemplateById(id);
  }

  getTemplatesByCategory(category: string): LandingPageTemplate[] {
    return this.templates.filter(template => template.category === category);
  }

  getTemplatesByComplexity(complexity: string): LandingPageTemplate[] {
    return this.templates.filter(template => template.complexity === complexity);
  }

  getFeaturedTemplates(): LandingPageTemplate[] {
    return this.templates
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6);
  }

  getPremiumTemplates(): LandingPageTemplate[] {
    return this.templates.filter(template => template.premium);
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

  generateCustomizedCode(customization: TemplateCustomization): string {
    try {
      // Generate a complete, self-contained React component
      const template = this.getTemplateById(customization.templateId);
      if (!template) {
        throw new Error(`Template not found: ${customization.templateId}`);
      }

      // Create a complete React component with inline styling and no external dependencies
      return this.generateSelfContainedComponent(template, customization);
    } catch (error) {
      console.error('Error generating customized code:', error);
      return this.generateFallbackComponent(customization);
    }
  }

  private generateSelfContainedComponent(template: LandingPageTemplate, customization: TemplateCustomization): string {
    const { fields, colorScheme, companyData } = customization;
    
    return `import React from 'react';

const CustomizedLandingPage = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, ${colorScheme.background} 0%, #f8fafc 100%)',
      fontFamily: '${customization.typography.fontFamily.body}'
    },
    header: {
      padding: '1rem 2rem',
      backgroundColor: 'white',
      borderBottom: '1px solid ${colorScheme.border}',
      position: 'sticky' as const,
      top: 0,
      zIndex: 50
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: colorScheme.primary
    },
    hero: {
      padding: '4rem 2rem',
      textAlign: 'center' as const,
      maxWidth: '1200px',
      margin: '0 auto'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: colorScheme.text,
      marginBottom: '1rem',
      fontFamily: '${customization.typography.fontFamily.heading}'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: colorScheme.muted,
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem auto'
    },
    ctaButton: {
      backgroundColor: colorScheme.primary,
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginRight: '1rem'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: colorScheme.primary,
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      border: \`2px solid \${colorScheme.primary}\`,
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    features: {
      padding: '4rem 2rem',
      backgroundColor: 'white',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },
    featureCard: {
      padding: '2rem',
      borderRadius: '0.75rem',
      border: \`1px solid \${colorScheme.border}\`,
      textAlign: 'center' as const,
      transition: 'all 0.3s ease'
    },
    featureIcon: {
      width: '4rem',
      height: '4rem',
      backgroundColor: \`\${colorScheme.primary}20\`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem auto',
      fontSize: '1.5rem'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: colorScheme.text,
      marginBottom: '0.5rem'
    },
    featureDescription: {
      color: colorScheme.muted,
      lineHeight: '1.6'
    },
    footer: {
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '2rem',
      textAlign: 'center' as const
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>
            ${companyData.name || 'Your Company'}
          </div>
          <div>
            <button style={styles.secondaryButton}>
              Sign In
            </button>
          </div>
        </nav>
      </header>

      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          ${fields.heroTitle || 'Transform Your Business'}
        </h1>
        <p style={styles.heroSubtitle}>
          ${fields.heroSubtitle || 'Revolutionary solutions for modern business challenges'}
        </p>
        <div>
          <button style={styles.ctaButton}>
            ${fields.ctaText || 'Get Started Free'}
          </button>
          <button style={styles.secondaryButton}>
            Learn More
          </button>
        </div>
      </section>

      <section style={styles.features}>
        <h2 style={{ ...styles.heroTitle, fontSize: '2.5rem', textAlign: 'center' }}>
          Why Choose Us
        </h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>
              ${fields.feature1Title || 'Lightning Fast'}
            </h3>
            <p style={styles.featureDescription}>
              ${fields.feature1Description || 'Experience blazing fast performance with our optimized platform'}
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <h3 style={styles.featureTitle}>
              ${fields.feature2Title || 'Secure & Reliable'}
            </h3>
            <p style={styles.featureDescription}>
              ${fields.feature2Description || 'Bank-level security with 99.9% uptime guarantee'}
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>
              ${fields.feature3Title || 'Advanced Analytics'}
            </h3>
            <p style={styles.featureDescription}>
              ${fields.feature3Description || 'Get insights that matter with our powerful analytics dashboard'}
            </p>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>&copy; 2024 ${companyData.name || 'Your Company'}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomizedLandingPage;`;
  }

  private generateFallbackComponent(customization: TemplateCustomization): string {
    const { companyData } = customization;
    
    return `import React from 'react';

const CustomizedLandingPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          ${companyData.name || 'Your Company'}
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          ${companyData.tagline || 'Revolutionary solutions for modern business'}
        </p>
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CustomizedLandingPage;`;
  }

  recommendTemplates(businessType: string, industry: string): LandingPageTemplate[] {
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

    if (businessType.toLowerCase().includes('portfolio') || businessType.toLowerCase().includes('creative')) {
      recommendations.push(...this.getTemplatesByCategory('portfolio'));
    }

    if (recommendations.length === 0) {
      return this.getFeaturedTemplates();
    }

    return recommendations.slice(0, 6);
  }

  getTemplateCategories() {
    const categories = [
      { id: 'saas', name: 'SaaS & Software', icon: 'Monitor', count: 0 },
      { id: 'ecommerce', name: 'E-commerce', icon: 'ShoppingCart', count: 0 },
      { id: 'service', name: 'Service & Agency', icon: 'Users', count: 0 },
      { id: 'portfolio', name: 'Portfolio', icon: 'Palette', count: 0 },
      { id: 'corporate', name: 'Corporate', icon: 'Building', count: 0 },
      { id: 'startup', name: 'Startup', icon: 'Rocket', count: 0 }
    ];

    categories.forEach(category => {
      category.count = this.getTemplatesByCategory(category.id).length;
    });

    return categories;
  }
}

export const templateManager = new TemplateManager();
