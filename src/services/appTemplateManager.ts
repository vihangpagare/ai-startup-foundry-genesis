import { AppTemplate } from '@/types/appTemplate';

class AppTemplateManager {
  private templates: AppTemplate[] = [];

  constructor() {
    this.templates = [
      this.generateAdvancedSaaSDashboardTemplate(),
      this.generateModernEcommerceTemplate(),
      this.generateBusinessPlatformTemplate(),
    ];
  }

  getTemplates(): AppTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): AppTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  getTemplatesByCategory(category: string): AppTemplate[] {
    return this.templates.filter(template => template.category === category);
  }

  searchTemplates(query: string): AppTemplate[] {
    const lowercaseQuery = query.toLowerCase();
    return this.templates.filter(template =>
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      template.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    );
  }

  recommendTemplates(businessType: string, industry: string): AppTemplate[] {
    // Simple recommendation logic based on business type and industry
    if (businessType.toLowerCase().includes('saas') || industry.toLowerCase().includes('technology')) {
      return this.templates.filter(t => t.category === 'saas-dashboard');
    }

    if (businessType.toLowerCase().includes('ecommerce') || industry.toLowerCase().includes('retail')) {
      return this.templates.filter(t => t.category === 'ecommerce');
    }

    if (businessType.toLowerCase().includes('platform') || industry.toLowerCase().includes('services')) {
      return this.templates.filter(t => t.category === 'service-platform');
    }

    // Default recommendations
    return this.templates.slice(0, 3);
  }

  generateCustomizedApp(customization: any): string {
    try {
      const template = this.getTemplate(customization.templateId);
      if (!template) {
        throw new Error(`Template not found: ${customization.templateId}`);
      }

      // Generate the customized React application code based on the template
      const componentName = this.getComponentNameFromTemplate(template);
      const code = `import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, Users, TrendingUp, Settings, ShoppingCart, Calendar, 
  DollarSign, Activity, PieChart, LineChart, ArrowUpRight, Star,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload,
  Bell, Mail, Phone, MapPin, Clock, Check, X, Heart, Share2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const App = () => {
  const [currentPage, setCurrentPage] = useState('${template.pages[0]?.id || 'dashboard'}');
  
  ${this.generateMockData(template)}
  
  ${this.generatePageComponents(template, customization)}
  
  const renderCurrentPage = () => {
    switch (currentPage) {
      ${template.pages.map(page => `
        case '${page.id}':
          return <${this.capitalizeFirst(page.id)}Page />;`).join('')}
      default:
        return <${this.capitalizeFirst(template.pages[0]?.id || 'dashboard')}Page />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      ${this.generateNavigation(template, customization)}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default App;`;

      return code;
    } catch (error) {
      console.error('Error generating customized app:', error);
      throw error;
    }
  }

  private getComponentNameFromTemplate(template: AppTemplate): string {
    switch (template.id) {
      case 'advanced-saas-dashboard':
        return 'AdvancedSaaSDashboardTemplate';
      case 'modern-ecommerce-platform':
        return 'ModernEcommerceTemplate';
      case 'business-service-platform':
        return 'BusinessPlatformTemplate';
      default:
        return 'DefaultTemplate';
    }
  }

  private generateMockData(template: AppTemplate): string {
    let mockDataCode = '';
    
    template.config.dataStructure.entities.forEach(entity => {
      mockDataCode += `
  const mock${entity.name}s = ${JSON.stringify(this.generateEntityMockData(entity), null, 2)};`;
    });

    return mockDataCode;
  }

  private generateEntityMockData(entity: any): any[] {
    const mockData = [];
    for (let i = 0; i < Math.min(entity.mockCount || 10, 20); i++) {
      const item: any = {};
      entity.fields.forEach((field: any) => {
        item[field.name] = this.generateFieldValue(field, i);
      });
      mockData.push(item);
    }
    return mockData;
  }

  private generateFieldValue(field: any, index: number): any {
    switch (field.type) {
      case 'string':
        if (field.name === 'id') return `id-${index + 1}`;
        if (field.name === 'name') return `Sample ${field.name} ${index + 1}`;
        if (field.name === 'email') return `user${index + 1}@example.com`;
        if (field.name === 'status') return ['active', 'pending', 'completed'][index % 3];
        if (field.name === 'role') return ['admin', 'user', 'manager'][index % 3];
        return `Sample ${field.name}`;
      case 'number':
        if (field.name === 'progress') return Math.floor(Math.random() * 100);
        if (field.name === 'price') return Math.floor(Math.random() * 1000) + 10;
        return Math.floor(Math.random() * 100);
      case 'date':
        return new Date(Date.now() - Math.random() * 10000000000).toISOString();
      default:
        return `Sample ${field.name}`;
    }
  }

  private generatePageComponents(template: AppTemplate, customization: any): string {
    return template.pages.map(page => {
      return `
  const ${this.capitalizeFirst(page.id)}Page = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">${page.name}</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
        
        ${this.generatePageContent(page, template)}
      </div>
    );
  };`;
    }).join('\n');
  }

  private generatePageContent(page: any, template: AppTemplate): string {
    let content = '';
    
    page.components.forEach((component: any) => {
      switch (component.type) {
        case 'chart':
          content += `
        <Card>
          <CardHeader>
            <CardTitle>${component.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockProjects || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>`;
          break;
        case 'table':
          content += `
        <Card>
          <CardHeader>
            <CardTitle>${component.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(mockUsers || mockProjects || []).slice(0, 5).map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>{item.status}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>`;
          break;
        case 'card':
          content += `
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">42</div>
                  <div className="text-sm text-gray-500">Total Items</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">128</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>`;
          break;
        default:
          content += `
        <Card>
          <CardHeader>
            <CardTitle>${component.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Content for ${component.name} component.</p>
          </CardContent>
        </Card>`;
      }
    });

    return content;
  }

  private generateNavigation(template: AppTemplate, customization: any): string {
    return `
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">${customization?.fields?.companyName || 'My App'}</h1>
            </div>
            <div className="flex items-center space-x-4">
              ${template.pages.map(page => `
                <Button 
                  variant={currentPage === '${page.id}' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('${page.id}')}
                  className="text-sm"
                >
                  ${page.name}
                </Button>`).join('')}
            </div>
          </div>
        </div>
      </nav>`;
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private generateAdvancedSaaSDashboardTemplate(): AppTemplate {
    return {
      id: 'advanced-saas-dashboard',
      name: 'Advanced SaaS Dashboard',
      description: 'Comprehensive SaaS application with analytics, user management, billing, and team collaboration',
      category: 'saas-dashboard',
      complexity: 'advanced',
      features: [
        'Real-time Analytics Dashboard',
        'User Management & Permissions',
        'Billing & Subscription Management',
        'Team Collaboration Tools',
        'API Integration Management',
        'Advanced Reporting',
        'Multi-tenant Architecture',
        'Security & Compliance'
      ],
      previewImage: '/preview-advanced-saas-dashboard.jpg',
      tags: ['saas', 'dashboard', 'analytics', 'enterprise', 'collaboration'],
      pages: [
        {
          id: 'dashboard',
          name: 'Main Dashboard',
          route: '/',
          description: 'Overview dashboard with key metrics and insights',
          components: [
            { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true },
            { id: 'metrics', type: 'card', name: 'Key Metrics', props: {}, customizable: true, required: true },
            { id: 'charts', type: 'chart', name: 'Analytics Charts', props: {}, customizable: false, required: true },
            { id: 'activity', type: 'table', name: 'Recent Activity', props: {}, customizable: false, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'sidebar',
            items: [
              { label: 'Dashboard', href: '/', icon: 'BarChart3' },
              { label: 'Projects', href: '/projects', icon: 'Calendar' },
              { label: 'Team', href: '/team', icon: 'Users' },
              { label: 'Analytics', href: '/analytics', icon: 'TrendingUp' },
              { label: 'Settings', href: '/settings', icon: 'Settings' }
            ],
            position: 'left'
          }
        },
        {
          id: 'projects',
          name: 'Projects Management',
          route: '/projects',
          description: 'Project tracking and management interface',
          components: [
            { id: 'project-list', type: 'table', name: 'Projects Table', props: {}, customizable: false, required: true },
            { id: 'project-cards', type: 'card', name: 'Project Cards', props: {}, customizable: true, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'sidebar',
            items: [],
            position: 'left'
          }
        },
        {
          id: 'team',
          name: 'Team Management',
          route: '/team',
          description: 'Team member management and collaboration',
          components: [
            { id: 'team-list', type: 'table', name: 'Team Members', props: {}, customizable: false, required: true },
            { id: 'team-cards', type: 'card', name: 'Member Cards', props: {}, customizable: true, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'sidebar',
            items: [],
            position: 'left'
          }
        }
      ],
      config: {
        customizableFields: [
          {
            id: 'companyName',
            label: 'Company Name',
            type: 'text',
            placeholder: 'Your Company',
            required: true,
            page: 'dashboard',
            component: 'header',
            validation: { minLength: 2, maxLength: 50 }
          },
          {
            id: 'dashboardTitle',
            label: 'Dashboard Title',
            type: 'text',
            placeholder: 'Analytics Dashboard',
            required: true,
            page: 'dashboard',
            component: 'header'
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
          },
        },
        routing: {
          pages: [
            { path: '/', name: 'Dashboard', component: 'Dashboard', protected: true, exact: true },
            { path: '/projects', name: 'Projects', component: 'Projects', protected: true, exact: true },
            { path: '/team', name: 'Team', component: 'Team', protected: true, exact: true },
            { path: '/analytics', name: 'Analytics', component: 'Analytics', protected: true, exact: true },
            { path: '/settings', name: 'Settings', component: 'Settings', protected: true, exact: true }
          ],
          navigation: [
            { label: 'Dashboard', href: '/', icon: 'BarChart3' },
            { label: 'Projects', href: '/projects', icon: 'Calendar' },
            { label: 'Team', href: '/team', icon: 'Users' },
            { label: 'Analytics', href: '/analytics', icon: 'TrendingUp' },
            { label: 'Settings', href: '/settings', icon: 'Settings' }
          ],
          defaultRoute: '/'
        },
        dataStructure: {
          entities: [
            {
              name: 'User',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'random' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'email', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'role', type: 'string', required: true, mockStrategy: 'industry-specific' },
                { name: 'status', type: 'string', required: true, mockStrategy: 'industry-specific' },
                { name: 'lastActive', type: 'date', required: true, mockStrategy: 'realistic' }
              ],
              mockCount: 50
            },
            {
              name: 'Project',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'random' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'industry-specific' },
                { name: 'description', type: 'string', required: false, mockStrategy: 'industry-specific' },
                { name: 'status', type: 'string', required: true, mockStrategy: 'industry-specific' },
                { name: 'progress', type: 'number', required: true, mockStrategy: 'realistic' },
                { name: 'teamSize', type: 'number', required: true, mockStrategy: 'realistic' },
                { name: 'deadline', type: 'date', required: true, mockStrategy: 'realistic' }
              ],
              mockCount: 25
            }
          ],
          relationships: [
            { from: 'Project', to: 'User', type: 'one-to-many' },
            { from: 'User', to: 'Project', type: 'one-to-many' }
          ],
          apiEndpoints: [
            { path: '/api/users', method: 'GET', entity: 'User', mockResponse: [] },
            { path: '/api/projects', method: 'GET', entity: 'Project', mockResponse: [] }
          ]
        },
        mockData: {
          enabled: true,
          realistic: true,
          industrySpecific: true,
          dataSize: 'medium'
        },
        features: [
          {
            id: 'analytics',
            name: 'Advanced Analytics',
            description: 'Real-time data visualization and insights',
            enabled: true,
            page: 'dashboard',
            component: 'charts',
            dependencies: ['recharts']
          },
          {
            id: 'user-management',
            name: 'User Management',
            description: 'Team member management and permissions',
            enabled: true,
            page: 'team',
            component: 'team-list',
            dependencies: []
          }
        ]
      },
      version: '2.0.0',
      popularity: 96,
      lastUpdated: '2024-01-15',
      author: 'Lovable Template Studio',
      premium: false
    };
  }

  private generateModernEcommerceTemplate(): AppTemplate {
    return {
      id: 'modern-ecommerce-platform',
      name: 'Modern Ecommerce Platform',
      description: 'Sleek and responsive e-commerce platform with product listings, shopping cart, and checkout process',
      category: 'ecommerce',
      complexity: 'moderate',
      features: [
        'Product Catalog Management',
        'Shopping Cart & Checkout',
        'Payment Gateway Integration',
        'Order Tracking',
        'Customer Accounts',
        'Product Reviews & Ratings',
        'Promotions & Discounts',
        'Mobile Responsive Design'
      ],
      previewImage: '/preview-modern-ecommerce.jpg',
      tags: ['ecommerce', 'platform', 'shopping', 'retail', 'online store'],
      pages: [
        {
          id: 'home',
          name: 'Home',
          route: '/',
          description: 'Main landing page with featured products and promotions',
          components: [
            { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true },
            { id: 'hero', type: 'card', name: 'Hero Section', props: {}, customizable: true, required: true },
            { id: 'featured-products', type: 'table', name: 'Featured Products', props: {}, customizable: false, required: true }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [
              { label: 'Home', href: '/', icon: 'Home' },
              { label: 'Shop', href: '/shop', icon: 'ShoppingBag' },
              { label: 'Cart', href: '/cart', icon: 'ShoppingCart' },
              { label: 'Account', href: '/account', icon: 'User' }
            ],
            position: 'top'
          }
        },
        {
          id: 'shop',
          name: 'Shop',
          route: '/shop',
          description: 'Product listing page with search and filtering',
          components: [
            { id: 'product-list', type: 'table', name: 'Product List', props: {}, customizable: false, required: true },
            { id: 'filters', type: 'sidebar', name: 'Filters Sidebar', props: {}, customizable: true, required: true }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'header',
            items: [],
            position: 'top'
          }
        },
        {
          id: 'cart',
          name: 'Shopping Cart',
          route: '/cart',
          description: 'Shopping cart and checkout process',
          components: [
            { id: 'cart-items', type: 'table', name: 'Cart Items', props: {}, customizable: false, required: true },
            { id: 'checkout-form', type: 'form', name: 'Checkout Form', props: {}, customizable: true, required: true }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [],
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
            placeholder: 'Your Store',
            required: true,
            page: 'home',
            component: 'header',
            validation: { minLength: 2, maxLength: 50 }
          },
          {
            id: 'heroTitle',
            label: 'Hero Title',
            type: 'text',
            placeholder: 'Welcome to Our Store',
            required: true,
            page: 'home',
            component: 'hero'
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
        routing: {
          pages: [
            { path: '/', name: 'Home', component: 'Home', protected: false, exact: true },
            { path: '/shop', name: 'Shop', component: 'Shop', protected: false, exact: true },
            { path: '/cart', name: 'Cart', component: 'Cart', protected: false, exact: true },
            { path: '/account', name: 'Account', component: 'Account', protected: true, exact: true }
          ],
          navigation: [
            { label: 'Home', href: '/', icon: 'Home' },
            { label: 'Shop', href: '/shop', icon: 'ShoppingBag' },
            { label: 'Cart', href: '/cart', icon: 'ShoppingCart' },
            { label: 'Account', href: '/account', icon: 'User' }
          ],
          defaultRoute: '/'
        },
        dataStructure: {
          entities: [
            {
              name: 'Product',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'random' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'industry-specific' },
                { name: 'description', type: 'string', required: false, mockStrategy: 'industry-specific' },
                { name: 'price', type: 'number', required: true, mockStrategy: 'realistic' },
                { name: 'imageUrl', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'category', type: 'string', required: true, mockStrategy: 'industry-specific' }
              ],
              mockCount: 50
            },
            {
              name: 'Category',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'random' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'industry-specific' },
                { name: 'description', type: 'string', required: false, mockStrategy: 'industry-specific' }
              ],
              mockCount: 10
            }
          ],
          relationships: [
            { from: 'Product', to: 'Category', type: 'one-to-many' }
          ],
          apiEndpoints: [
            { path: '/api/products', method: 'GET', entity: 'Product', mockResponse: [] },
            { path: '/api/categories', method: 'GET', entity: 'Category', mockResponse: [] }
          ]
        },
        mockData: {
          enabled: true,
          realistic: true,
          industrySpecific: true,
          dataSize: 'medium'
        },
        features: [
          {
            id: 'product-reviews',
            name: 'Product Reviews',
            description: 'Customer reviews and ratings for products',
            enabled: true,
            page: 'shop',
            component: 'product-list',
            dependencies: []
          },
          {
            id: 'promotions',
            name: 'Promotions',
            description: 'Promotional banners and discounts',
            enabled: true,
            page: 'home',
            component: 'hero',
            dependencies: []
          }
        ]
      },
      version: '1.0.0',
      popularity: 85,
      lastUpdated: '2024-01-15',
      author: 'Lovable Template Studio',
      premium: false
    };
  }

  private generateBusinessPlatformTemplate(): AppTemplate {
    return {
      id: 'business-service-platform',
      name: 'Business Service Platform',
      description: 'Professional platform for showcasing business services with appointment scheduling and client management',
      category: 'service-platform',
      complexity: 'moderate',
      features: [
        'Service Catalog Management',
        'Appointment Scheduling',
        'Client Management',
        'Team Collaboration',
        'Billing & Invoicing',
        'Reporting & Analytics',
        'Customer Support',
        'Mobile Responsive Design'
      ],
      previewImage: '/preview-business-platform.jpg',
      tags: ['business', 'platform', 'services', 'scheduling', 'crm'],
      pages: [
        {
          id: 'home',
          name: 'Home',
          route: '/',
          description: 'Main landing page with service offerings and testimonials',
          components: [
            { id: 'header', type: 'header', name: 'Navigation Header', props: {}, customizable: true, required: true },
            { id: 'hero', type: 'card', name: 'Hero Section', props: {}, customizable: true, required: true },
            { id: 'services', type: 'table', name: 'Service Offerings', props: {}, customizable: false, required: true }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [
              { label: 'Home', href: '/', icon: 'Home' },
              { label: 'Services', href: '/services', icon: 'Briefcase' },
              { label: 'Appointments', href: '/appointments', icon: 'Calendar' },
              { label: 'Clients', href: '/clients', icon: 'Users' }
            ],
            position: 'top'
          }
        },
        {
          id: 'services',
          name: 'Services',
          route: '/services',
          description: 'Detailed service catalog with descriptions and pricing',
          components: [
            { id: 'service-list', type: 'table', name: 'Service List', props: {}, customizable: false, required: true },
            { id: 'service-details', type: 'card', name: 'Service Details', props: {}, customizable: true, required: true }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [],
            position: 'top'
          }
        },
        {
          id: 'appointments',
          name: 'Appointments',
          route: '/appointments',
          description: 'Appointment scheduling and management interface',
          components: [
            { id: 'appointment-table', type: 'table', name: 'Appointment Schedule', props: {}, customizable: false, required: true },
            { id: 'appointment-form', type: 'form', name: 'Appointment Form', props: {}, customizable: true, required: true }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [],
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
            placeholder: 'Your Platform',
            required: true,
            page: 'home',
            component: 'header',
            validation: { minLength: 2, maxLength: 50 }
          },
          {
            id: 'heroTitle',
            label: 'Hero Title',
            type: 'text',
            placeholder: 'Welcome to Our Platform',
            required: true,
            page: 'home',
            component: 'hero'
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
        routing: {
          pages: [
            { path: '/', name: 'Home', component: 'Home', protected: false, exact: true },
            { path: '/services', name: 'Services', component: 'Services', protected: false, exact: true },
            { path: '/appointments', name: 'Appointments', component: 'Appointments', protected: true, exact: true },
            { path: '/clients', name: 'Clients', component: 'Clients', protected: true, exact: true }
          ],
          navigation: [
            { label: 'Home', href: '/', icon: 'Home' },
            { label: 'Services', href: '/services', icon: 'Briefcase' },
            { label: 'Appointments', href: '/appointments', icon: 'Calendar' },
            { label: 'Clients', href: '/clients', icon: 'Users' }
          ],
          defaultRoute: '/'
        },
        dataStructure: {
          entities: [
            {
              name: 'Service',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'random' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'industry-specific' },
                { name: 'description', type: 'string', required: false, mockStrategy: 'industry-specific' },
                { name: 'price', type: 'number', required: true, mockStrategy: 'realistic' },
                { name: 'duration', type: 'number', required: true, mockStrategy: 'realistic' }
              ],
              mockCount: 50
            },
            {
              name: 'Client',
              fields: [
                { name: 'id', type: 'string', required: true, mockStrategy: 'random' },
                { name: 'name', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'email', type: 'string', required: true, mockStrategy: 'realistic' },
                { name: 'phone', type: 'string', required: true, mockStrategy: 'realistic' }
              ],
              mockCount: 25
            }
          ],
          relationships: [
            { from: 'Appointment', to: 'Service', type: 'one-to-many' },
            { from: 'Appointment', to: 'Client', type: 'one-to-many' }
          ],
          apiEndpoints: [
            { path: '/api/services', method: 'GET', entity: 'Service', mockResponse: [] },
            { path: '/api/clients', method: 'GET', entity: 'Client', mockResponse: [] },
            { path: '/api/appointments', method: 'GET', entity: 'Appointment', mockResponse: [] }
          ]
        },
        mockData: {
          enabled: true,
          realistic: true,
          industrySpecific: true,
          dataSize: 'medium'
        },
        features: [
          {
            id: 'appointment-reminders',
            name: 'Appointment Reminders',
            description: 'Automated reminders for upcoming appointments',
            enabled: true,
            page: 'appointments',
            component: 'appointment-table',
            dependencies: []
          },
          {
            id: 'client-portal',
            name: 'Client Portal',
            description: 'Dedicated portal for clients to manage their appointments and profile',
            enabled: true,
            page: 'clients',
            component: 'client-list',
            dependencies: []
          }
        ]
      },
      version: '1.0.0',
      popularity: 90,
      lastUpdated: '2024-01-15',
      author: 'Lovable Template Studio',
      premium: false
    };
  }
}

export const appTemplateManager = new AppTemplateManager();
