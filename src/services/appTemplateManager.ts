
import { AppTemplate, AppCustomization } from '@/types/appTemplate';

class AppTemplateManager {
  private staticTemplates: AppTemplate[] = [
    {
      id: 'advanced-saas-dashboard',
      name: 'Advanced SaaS Dashboard',
      description: 'Comprehensive dashboard with analytics, user management, and advanced features',
      category: 'saas-dashboard',
      complexity: 'advanced',
      features: ['Advanced Analytics', 'User Management', 'Real-time Data', 'Custom Reports', 'Team Collaboration'],
      previewImage: '/preview-advanced-saas.jpg',
      tags: ['saas', 'dashboard', 'analytics', 'enterprise'],
      pages: [
        {
          id: 'dashboard',
          name: 'Analytics Dashboard',
          route: '/',
          description: 'Main dashboard with key metrics and insights',
          components: [
            { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true },
            { id: 'metrics', type: 'card', name: 'Key Metrics Cards', props: {}, customizable: true, required: true },
            { id: 'charts', type: 'chart', name: 'Analytics Charts', props: {}, customizable: false, required: true },
            { id: 'table', type: 'table', name: 'Data Table', props: {}, customizable: false, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'sidebar',
            items: [
              { label: 'Dashboard', href: '/', icon: 'BarChart3' },
              { label: 'Users', href: '/users', icon: 'Users' },
              { label: 'Analytics', href: '/analytics', icon: 'TrendingUp' }
            ],
            position: 'left'
          }
        },
        {
          id: 'users',
          name: 'User Management',
          route: '/users',
          description: 'Manage users and permissions',
          components: [
            { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true },
            { id: 'user-table', type: 'table', name: 'Users Table', props: {}, customizable: false, required: true },
            { id: 'user-form', type: 'form', name: 'Add User Form', props: {}, customizable: true, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'sidebar',
            items: [
              { label: 'Dashboard', href: '/', icon: 'BarChart3' },
              { label: 'Users', href: '/users', icon: 'Users' },
              { label: 'Analytics', href: '/analytics', icon: 'TrendingUp' }
            ],
            position: 'left'
          }
        },
        {
          id: 'analytics',
          name: 'Advanced Analytics',
          route: '/analytics',
          description: 'Detailed analytics and reporting',
          components: [
            { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true },
            { id: 'analytics-charts', type: 'chart', name: 'Advanced Charts', props: {}, customizable: false, required: true },
            { id: 'report-builder', type: 'form', name: 'Report Builder', props: {}, customizable: true, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'sidebar',
            items: [
              { label: 'Dashboard', href: '/', icon: 'BarChart3' },
              { label: 'Users', href: '/users', icon: 'Users' },
              { label: 'Analytics', href: '/analytics', icon: 'TrendingUp' }
            ],
            position: 'left'
          }
        }
      ],
      config: {
        customizableFields: [
          {
            id: 'appName',
            label: 'Application Name',
            type: 'text',
            placeholder: 'My SaaS Dashboard',
            required: true,
            page: 'dashboard',
            component: 'header',
            validation: { minLength: 2, maxLength: 50 }
          },
          {
            id: 'primaryMetric',
            label: 'Primary Metric Name',
            type: 'text',
            placeholder: 'Total Users',
            required: true,
            page: 'dashboard',
            component: 'metrics'
          },
          {
            id: 'featureTitle',
            label: 'Main Feature Title',
            type: 'text',
            placeholder: 'Key Features',
            required: true,
            page: 'dashboard',
            component: 'metrics'
          }
        ],
        colorScheme: {
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#8b5cf6',
          background: '#ffffff',
          text: '#1f2937',
          muted: '#6b7280',
          border: '#e5e7eb',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
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
        dataStructure: {
          entities: [
            {
              name: 'users',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'email', type: 'string', required: true, mockStrategy: 'realistic' }
              ],
              mockCount: 10
            }
          ],
          relationships: [],
          apiEndpoints: [
            { path: '/api/users', method: 'GET', entity: 'users', mockResponse: [] }
          ]
        },
        mockData: {
          enabled: true,
          realistic: true,
          industrySpecific: false,
          dataSize: 'medium'
        },
        routing: {
          pages: [
            { path: '/', name: 'Dashboard', component: 'Dashboard', protected: true, exact: true },
            { path: '/users', name: 'Users', component: 'Users', protected: true, exact: true },
            { path: '/analytics', name: 'Analytics', component: 'Analytics', protected: true, exact: true }
          ],
          navigation: [
            { label: 'Dashboard', href: '/', icon: 'BarChart3' },
            { label: 'Users', href: '/users', icon: 'Users' },
            { label: 'Analytics', href: '/analytics', icon: 'TrendingUp' }
          ],
          defaultRoute: '/'
        },
        features: [
          { id: 'analytics', name: 'Analytics Dashboard', description: 'Comprehensive analytics and reporting', enabled: true, page: 'dashboard', component: 'charts', dependencies: [] },
          { id: 'user-management', name: 'User Management', description: 'Manage users and permissions', enabled: true, page: 'users', component: 'user-table', dependencies: [] },
          { id: 'real-time-data', name: 'Real-time Updates', description: 'Live data updates and notifications', enabled: true, page: 'dashboard', component: 'metrics', dependencies: [] }
        ]
      },
      version: '1.0.0',
      popularity: 95,
      lastUpdated: '2024-01-15',
      author: 'Template Studio',
      premium: false
    },
    {
      id: 'modern-ecommerce',
      name: 'Modern E-commerce Store',
      description: 'Complete online store with product catalog, shopping cart, and checkout',
      category: 'ecommerce',
      complexity: 'moderate',
      features: ['Product Catalog', 'Shopping Cart', 'User Authentication', 'Order Management', 'Payment Integration'],
      previewImage: '/preview-ecommerce.jpg',
      tags: ['ecommerce', 'store', 'shopping', 'retail'],
      pages: [
        {
          id: 'storefront',
          name: 'Store Front',
          route: '/',
          description: 'Main store page with featured products',
          components: [
            { id: 'header', type: 'header', name: 'Store Header', props: {}, customizable: true, required: true },
            { id: 'content', type: 'content', name: 'Hero Banner', props: {}, customizable: true, required: true },
            { id: 'products', type: 'content', name: 'Product Grid', props: {}, customizable: false, required: true }
          ],
          layout: 'full-width',
          navigation: {
            type: 'header',
            items: [
              { label: 'Home', href: '/', icon: 'Home' },
              { label: 'Products', href: '/products', icon: 'Package' },
              { label: 'Cart', href: '/cart', icon: 'ShoppingCart' }
            ],
            position: 'top'
          }
        },
        {
          id: 'products',
          name: 'Product Catalog',
          route: '/products',
          description: 'Browse all products with filtering and search',
          components: [
            { id: 'header', type: 'header', name: 'Store Header', props: {}, customizable: true, required: true },
            { id: 'filters', type: 'sidebar', name: 'Product Filters', props: {}, customizable: false, required: true },
            { id: 'product-grid', type: 'content', name: 'Products Grid', props: {}, customizable: false, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'header',
            items: [
              { label: 'Home', href: '/', icon: 'Home' },
              { label: 'Products', href: '/products', icon: 'Package' },
              { label: 'Cart', href: '/cart', icon: 'ShoppingCart' }
            ],
            position: 'top'
          }
        },
        {
          id: 'cart',
          name: 'Shopping Cart',
          route: '/cart',
          description: 'Review items and proceed to checkout',
          components: [
            { id: 'header', type: 'header', name: 'Store Header', props: {}, customizable: true, required: true },
            { id: 'cart-items', type: 'content', name: 'Cart Items', props: {}, customizable: false, required: true },
            { id: 'checkout', type: 'form', name: 'Checkout Form', props: {}, customizable: true, required: true }
          ],
          layout: 'centered',
          navigation: {
            type: 'header',
            items: [
              { label: 'Home', href: '/', icon: 'Home' },
              { label: 'Products', href: '/products', icon: 'Package' },
              { label: 'Cart', href: '/cart', icon: 'ShoppingCart' }
            ],
            position: 'top'
          }
        }
      ],
      config: {
        customizableFields: [
          {
            id: 'storeName',
            label: 'Store Name',
            type: 'text',
            placeholder: 'My Online Store',
            required: true,
            page: 'storefront',
            component: 'header',
            validation: { minLength: 2, maxLength: 50 }
          },
          {
            id: 'heroTitle',
            label: 'Hero Banner Title',
            type: 'text',
            placeholder: 'Welcome to Our Store',
            required: true,
            page: 'storefront',
            component: 'content'
          },
          {
            id: 'productCategory',
            label: 'Main Product Category',
            type: 'text',
            placeholder: 'Featured Products',
            required: true,
            page: 'storefront',
            component: 'products'
          }
        ],
        colorScheme: {
          primary: '#059669',
          secondary: '#64748b',
          accent: '#f59e0b',
          background: '#ffffff',
          text: '#1f2937',
          muted: '#6b7280',
          border: '#e5e7eb',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
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
        dataStructure: {
          entities: [
            {
              name: 'products',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'price', type: 'number', required: true, mockStrategy: 'realistic' }
              ],
              mockCount: 20
            }
          ],
          relationships: [],
          apiEndpoints: [
            { path: '/api/products', method: 'GET', entity: 'products', mockResponse: [] }
          ]
        },
        mockData: {
          enabled: true,
          realistic: true,
          industrySpecific: false,
          dataSize: 'medium'
        },
        routing: {
          pages: [
            { path: '/', name: 'Store', component: 'Storefront', protected: false, exact: true },
            { path: '/products', name: 'Products', component: 'Products', protected: false, exact: true },
            { path: '/cart', name: 'Cart', component: 'Cart', protected: false, exact: true }
          ],
          navigation: [
            { label: 'Home', href: '/', icon: 'Home' },
            { label: 'Products', href: '/products', icon: 'Package' },
            { label: 'Cart', href: '/cart', icon: 'ShoppingCart' }
          ],
          defaultRoute: '/'
        },
        features: [
          { id: 'product-catalog', name: 'Product Catalog', description: 'Comprehensive product listing and search', enabled: true, page: 'products', component: 'product-grid', dependencies: [] },
          { id: 'shopping-cart', name: 'Shopping Cart', description: 'Add items and manage cart', enabled: true, page: 'cart', component: 'cart-items', dependencies: [] },
          { id: 'user-auth', name: 'User Authentication', description: 'User registration and login', enabled: true, page: 'storefront', component: 'header', dependencies: [] }
        ]
      },
      version: '1.0.0',
      popularity: 88,
      lastUpdated: '2024-01-15',
      author: 'Template Studio',
      premium: false
    },
    {
      id: 'business-platform',
      name: 'Business Service Platform',
      description: 'Professional platform for service-based businesses with client management',
      category: 'service-platform',
      complexity: 'moderate',
      features: ['Service Showcase', 'Client Portal', 'Appointment Booking', 'Project Management', 'Team Collaboration'],
      previewImage: '/preview-business-platform.jpg',
      tags: ['business', 'services', 'platform', 'professional'],
      pages: [
        {
          id: 'homepage',
          name: 'Service Homepage',
          route: '/',
          description: 'Professional homepage showcasing services',
          components: [
            { id: 'header', type: 'header', name: 'Platform Header', props: {}, customizable: true, required: true },
            { id: 'content', type: 'content', name: 'Service Hero', props: {}, customizable: true, required: true },
            { id: 'services', type: 'content', name: 'Services Grid', props: {}, customizable: false, required: true }
          ],
          layout: 'full-width',
          navigation: {
            type: 'header',
            items: [
              { label: 'Home', href: '/', icon: 'Home' },
              { label: 'Services', href: '/services', icon: 'Briefcase' },
              { label: 'Client Portal', href: '/portal', icon: 'Users' }
            ],
            position: 'top'
          }
        },
        {
          id: 'services',
          name: 'Service Catalog',
          route: '/services',
          description: 'Detailed service offerings and pricing',
          components: [
            { id: 'header', type: 'header', name: 'Platform Header', props: {}, customizable: true, required: true },
            { id: 'service-list', type: 'content', name: 'Service Details', props: {}, customizable: false, required: true },
            { id: 'booking-form', type: 'form', name: 'Booking Form', props: {}, customizable: true, required: true }
          ],
          layout: 'centered',
          navigation: {
            type: 'header',
            items: [
              { label: 'Home', href: '/', icon: 'Home' },
              { label: 'Services', href: '/services', icon: 'Briefcase' },
              { label: 'Client Portal', href: '/portal', icon: 'Users' }
            ],
            position: 'top'
          }
        },
        {
          id: 'portal',
          name: 'Client Portal',
          route: '/portal',
          description: 'Client dashboard and project management',
          components: [
            { id: 'header', type: 'header', name: 'Platform Header', props: {}, customizable: true, required: true },
            { id: 'client-dashboard', type: 'content', name: 'Client Dashboard', props: {}, customizable: false, required: true },
            { id: 'project-tracker', type: 'table', name: 'Project Tracker', props: {}, customizable: false, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'header',
            items: [
              { label: 'Home', href: '/', icon: 'Home' },
              { label: 'Services', href: '/services', icon: 'Briefcase' },
              { label: 'Client Portal', href: '/portal', icon: 'Users' }
            ],
            position: 'top'
          }
        }
      ],
      config: {
        customizableFields: [
          {
            id: 'platformName',
            label: 'Platform Name',
            type: 'text',
            placeholder: 'My Business Platform',
            required: true,
            page: 'homepage',
            component: 'header',
            validation: { minLength: 2, maxLength: 50 }
          },
          {
            id: 'heroTitle',
            label: 'Hero Title',
            type: 'text',
            placeholder: 'Professional Services Platform',
            required: true,
            page: 'homepage',
            component: 'content'
          },
          {
            id: 'serviceType',
            label: 'Primary Service Type',
            type: 'text',
            placeholder: 'Consulting Services',
            required: true,
            page: 'homepage',
            component: 'services'
          }
        ],
        colorScheme: {
          primary: '#1e40af',
          secondary: '#64748b',
          accent: '#059669',
          background: '#ffffff',
          text: '#1f2937',
          muted: '#6b7280',
          border: '#e5e7eb',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
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
        dataStructure: {
          entities: [
            {
              name: 'services',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'description', type: 'string', required: true, mockStrategy: 'realistic' }
              ],
              mockCount: 15
            }
          ],
          relationships: [],
          apiEndpoints: [
            { path: '/api/services', method: 'GET', entity: 'services', mockResponse: [] }
          ]
        },
        mockData: {
          enabled: true,
          realistic: true,
          industrySpecific: false,
          dataSize: 'medium'
        },
        routing: {
          pages: [
            { path: '/', name: 'Home', component: 'Homepage', protected: false, exact: true },
            { path: '/services', name: 'Services', component: 'Services', protected: false, exact: true },
            { path: '/portal', name: 'Portal', component: 'Portal', protected: true, exact: true }
          ],
          navigation: [
            { label: 'Home', href: '/', icon: 'Home' },
            { label: 'Services', href: '/services', icon: 'Briefcase' },
            { label: 'Client Portal', href: '/portal', icon: 'Users' }
          ],
          defaultRoute: '/'
        },
        features: [
          { id: 'service-showcase', name: 'Service Showcase', description: 'Display services and capabilities', enabled: true, page: 'services', component: 'service-list', dependencies: [] },
          { id: 'client-portal', name: 'Client Portal', description: 'Client dashboard and project tracking', enabled: true, page: 'portal', component: 'client-dashboard', dependencies: [] },
          { id: 'appointment-booking', name: 'Appointment Booking', description: 'Schedule meetings and consultations', enabled: true, page: 'services', component: 'booking-form', dependencies: [] }
        ]
      },
      version: '1.0.0',
      popularity: 90,
      lastUpdated: '2024-01-15',
      author: 'Template Studio',
      premium: false
    }
  ];

  private dynamicTemplates: Map<string, AppTemplate> = new Map();

  getTemplates(): AppTemplate[] {
    const allTemplates = [...this.staticTemplates, ...Array.from(this.dynamicTemplates.values())];
    console.log(`AppTemplateManager: Returning ${allTemplates.length} templates (${this.staticTemplates.length} static, ${this.dynamicTemplates.size} dynamic)`);
    return allTemplates;
  }

  getTemplate(id: string): AppTemplate | null {
    console.log(`AppTemplateManager: Looking for template with ID: ${id}`);
    
    // First check static templates
    const staticTemplate = this.staticTemplates.find(template => template.id === id);
    if (staticTemplate) {
      console.log(`AppTemplateManager: Found static template: ${staticTemplate.name}`);
      return staticTemplate;
    }

    // Then check dynamic templates
    const dynamicTemplate = this.dynamicTemplates.get(id);
    if (dynamicTemplate) {
      console.log(`AppTemplateManager: Found dynamic template: ${dynamicTemplate.name}`);
      return dynamicTemplate;
    }

    console.warn(`AppTemplateManager: Template not found: ${id}`);
    console.log(`Available template IDs:`, [
      ...this.staticTemplates.map(t => t.id),
      ...Array.from(this.dynamicTemplates.keys())
    ]);
    
    return null;
  }

  registerDynamicTemplate(template: AppTemplate): void {
    console.log(`AppTemplateManager: Registering dynamic template: ${template.id} (${template.name})`);
    this.dynamicTemplates.set(template.id, template);
    console.log(`AppTemplateManager: Dynamic templates count: ${this.dynamicTemplates.size}`);
  }

  removeDynamicTemplate(id: string): boolean {
    console.log(`AppTemplateManager: Removing dynamic template: ${id}`);
    const removed = this.dynamicTemplates.delete(id);
    if (removed) {
      console.log(`AppTemplateManager: Successfully removed dynamic template: ${id}`);
    } else {
      console.warn(`AppTemplateManager: Failed to remove dynamic template: ${id}`);
    }
    return removed;
  }

  clearDynamicTemplates(): void {
    console.log(`AppTemplateManager: Clearing ${this.dynamicTemplates.size} dynamic templates`);
    this.dynamicTemplates.clear();
  }

  isDynamicTemplate(id: string): boolean {
    return this.dynamicTemplates.has(id);
  }

  getTemplatesByCategory(category: string): AppTemplate[] {
    return this.getTemplates().filter(template => template.category === category);
  }

  searchTemplates(query: string): AppTemplate[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getTemplates().filter(template => 
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      template.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    );
  }

  validateTemplate(template: AppTemplate): boolean {
    try {
      // Basic validation checks
      if (!template.id || !template.name || !template.description) {
        console.error('Template validation failed: Missing required fields');
        return false;
      }

      if (!template.pages || template.pages.length === 0) {
        console.error('Template validation failed: No pages defined');
        return false;
      }

      if (!template.config || !template.config.colorScheme) {
        console.error('Template validation failed: Missing config or color scheme');
        return false;
      }

      console.log(`Template validation passed for: ${template.id}`);
      return true;
    } catch (error) {
      console.error('Template validation error:', error);
      return false;
    }
  }

  generateCustomizedApp(customization: AppCustomization): string {
    const template = this.getTemplate(customization.templateId);
    if (!template) {
      throw new Error(`Template not found: ${customization.templateId}`);
    }

    // Generate React component code
    const componentCode = `import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, TrendingUp, Settings, Home, Package, ShoppingCart, Briefcase } from 'lucide-react';

const ${customization.appName?.replace(/[^a-zA-Z0-9]/g, '') || 'Generated'}App = () => {
  const [currentPage, setCurrentPage] = useState('${template.config.routing.defaultRoute}');
  
  const renderPage = () => {
    switch (currentPage) {
      ${template.pages.map(page => `
      case '${page.route}':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">${page.name}</h1>
            <p className="text-gray-600">${page.description}</p>
            ${this.generatePageContent(page, customization)}
          </div>
        );`).join('')}
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">${customization.companyData?.name || 'Generated App'}</h1>
            </div>
            <div className="flex space-x-4 items-center">
              ${template.config.routing.navigation.map(nav => `
              <Button
                variant={currentPage === '${nav.href}' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('${nav.href}')}
              >
                ${nav.label}
              </Button>`).join('')}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default ${customization.appName?.replace(/[^a-zA-Z0-9]/g, '') || 'Generated'}App;`;

    return componentCode;
  }

  private generatePageContent(page: any, customization: AppCustomization): string {
    return `
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>${customization.fields?.primaryMetric || 'Key Metrics'}</CardTitle>
                  <CardDescription>Overview of important data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${(customization.mockData?.metrics || [
                      { name: 'Total Users', value: '1,234', change: '+12%' },
                      { name: 'Revenue', value: '$45,678', change: '+8%' },
                      { name: 'Growth', value: '23%', change: '+3%' }
                    ]).map(metric => `
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">${metric.value}</div>
                      <div className="text-sm text-gray-600">${metric.name}</div>
                      ${metric.change ? `<div className="text-xs text-green-600">${metric.change}</div>` : ''}
                    </div>`).slice(0, 3).join('')}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>${customization.fields?.featureTitle || 'Recent Activity'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    ${(customization.mockData?.activities || [
                      { action: 'New user registered', user: 'John Doe', timestamp: '2 hours ago' },
                      { action: 'Order completed', user: 'Jane Smith', timestamp: '4 hours ago' },
                      { action: 'Report generated', user: 'Admin', timestamp: '1 day ago' }
                    ]).map(activity => `
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">${activity.action}</div>
                        <div className="text-sm text-gray-500">by ${activity.user}</div>
                      </div>
                      <div className="text-sm text-gray-400">${activity.timestamp}</div>
                    </div>`).slice(0, 5).join('')}
                  </div>
                </CardContent>
              </Card>
            </div>`;
  }
}

export const appTemplateManager = new AppTemplateManager();
