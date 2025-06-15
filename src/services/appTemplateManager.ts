import { AppTemplate, AppCustomization, AppPage, AppComponent } from '@/types/appTemplate';

class AppTemplateManager {
  private templates: AppTemplate[] = [
    {
      id: 'saas-dashboard',
      name: 'SaaS Dashboard',
      description: 'Complete dashboard application with analytics, user management, and settings',
      category: 'saas-dashboard',
      complexity: 'moderate',
      features: ['Dashboard Analytics', 'User Management', 'Settings Panel', 'Data Visualization'],
      previewImage: '/placeholder.svg',
      tags: ['dashboard', 'analytics', 'saas', 'business'],
      pages: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          route: '/',
          description: 'Main dashboard with key metrics and overview',
          components: [
            { id: 'header', type: 'header', name: 'App Header', props: {}, customizable: true, required: true },
            { id: 'metrics', type: 'card', name: 'Metrics Cards', props: {}, customizable: true, required: true },
            { id: 'charts', type: 'chart', name: 'Analytics Charts', props: {}, customizable: true, required: false },
            { id: 'recent-activity', type: 'table', name: 'Recent Activity', props: {}, customizable: true, required: false }
          ],
          layout: 'sidebar',
          navigation: {
            type: 'sidebar',
            items: [
              { label: 'Dashboard', href: '/', icon: 'BarChart3' },
              { label: 'Features', href: '/features', icon: 'Settings' },
              { label: 'Account', href: '/account', icon: 'User' }
            ],
            position: 'left'
          }
        },
        {
          id: 'features',
          name: 'Feature Management',
          route: '/features',
          description: 'Core functionality and feature management interface',
          components: [
            { id: 'feature-grid', type: 'card', name: 'Feature Grid', props: {}, customizable: true, required: true },
            { id: 'feature-actions', type: 'form', name: 'Feature Actions', props: {}, customizable: true, required: true }
          ],
          layout: 'default',
          navigation: {
            type: 'sidebar',
            items: [
              { label: 'Dashboard', href: '/', icon: 'BarChart3' },
              { label: 'Features', href: '/features', icon: 'Settings' },
              { label: 'Account', href: '/account', icon: 'User' }
            ],
            position: 'left'
          }
        },
        {
          id: 'account',
          name: 'Account Settings',
          route: '/account',
          description: 'User profile, billing, and account preferences',
          components: [
            { id: 'profile-form', type: 'form', name: 'Profile Settings', props: {}, customizable: true, required: true },
            { id: 'billing-info', type: 'card', name: 'Billing Information', props: {}, customizable: true, required: false }
          ],
          layout: 'centered',
          navigation: {
            type: 'sidebar',
            items: [
              { label: 'Dashboard', href: '/', icon: 'BarChart3' },
              { label: 'Features', href: '/features', icon: 'Settings' },
              { label: 'Account', href: '/account', icon: 'User' }
            ],
            position: 'left'
          }
        }
      ],
      config: {
        customizableFields: [
          { id: 'appName', label: 'App Name', type: 'text', required: true, page: 'all', component: 'header' },
          { id: 'primaryMetric', label: 'Primary Metric', type: 'text', required: true, page: 'dashboard', component: 'metrics' },
          { id: 'featureTitle', label: 'Main Feature', type: 'text', required: true, page: 'features', component: 'feature-grid' }
        ],
        colorScheme: {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          accent: '#10B981',
          background: '#F8FAFC',
          text: '#1F2937',
          muted: '#6B7280',
          border: '#E5E7EB',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444'
        },
        typography: {
          fontFamily: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
          fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
          fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700' }
        },
        routing: {
          pages: [
            { path: '/', name: 'Dashboard', component: 'Dashboard', protected: true, exact: true },
            { path: '/features', name: 'Features', component: 'Features', protected: true, exact: true },
            { path: '/account', name: 'Account', component: 'Account', protected: true, exact: true }
          ],
          navigation: [
            { label: 'Dashboard', href: '/' },
            { label: 'Features', href: '/features' },
            { label: 'Account', href: '/account' }
          ],
          defaultRoute: '/'
        },
        dataStructure: {
          entities: [
            { name: 'User', fields: [{ name: 'name', type: 'string', required: true, mockStrategy: 'realistic' }], mockCount: 10 },
            { name: 'Metric', fields: [{ name: 'value', type: 'number', required: true, mockStrategy: 'random' }], mockCount: 5 }
          ],
          relationships: [],
          apiEndpoints: [
            { path: '/api/users', method: 'GET', entity: 'User', mockResponse: [] },
            { path: '/api/metrics', method: 'GET', entity: 'Metric', mockResponse: [] }
          ]
        },
        mockData: { enabled: true, realistic: true, industrySpecific: true, dataSize: 'medium' },
        features: [
          { id: 'analytics', name: 'Analytics Dashboard', description: 'View key metrics and charts', enabled: true, page: 'dashboard', component: 'charts', dependencies: [] }
        ]
      },
      version: '1.0.0',
      popularity: 95,
      lastUpdated: '2024-01-15',
      author: 'App Templates',
      premium: false
    },
    {
      id: 'ecommerce-store',
      name: 'E-commerce Store',
      description: 'Complete online store with product catalog, cart, and user account',
      category: 'ecommerce',
      complexity: 'moderate',
      features: ['Product Catalog', 'Shopping Cart', 'User Account', 'Order Management'],
      previewImage: '/placeholder.svg',
      tags: ['ecommerce', 'shopping', 'retail', 'products'],
      pages: [
        {
          id: 'catalog',
          name: 'Product Catalog',
          route: '/',
          description: 'Browse and search products',
          components: [
            { id: 'product-grid', type: 'card', name: 'Product Grid', props: {}, customizable: true, required: true },
            { id: 'filters', type: 'form', name: 'Product Filters', props: {}, customizable: true, required: false }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [
              { label: 'Products', href: '/', icon: 'Package' },
              { label: 'Cart', href: '/cart', icon: 'ShoppingCart' },
              { label: 'Account', href: '/account', icon: 'User' }
            ],
            position: 'top'
          }
        },
        {
          id: 'cart',
          name: 'Shopping Cart',
          route: '/cart',
          description: 'Review items and complete purchase',
          components: [
            { id: 'cart-items', type: 'table', name: 'Cart Items', props: {}, customizable: true, required: true },
            { id: 'checkout-form', type: 'form', name: 'Checkout', props: {}, customizable: true, required: true }
          ],
          layout: 'centered',
          navigation: {
            type: 'header',
            items: [
              { label: 'Products', href: '/', icon: 'Package' },
              { label: 'Cart', href: '/cart', icon: 'ShoppingCart' },
              { label: 'Account', href: '/account', icon: 'User' }
            ],
            position: 'top'
          }
        },
        {
          id: 'account',
          name: 'User Account',
          route: '/account',
          description: 'Order history and profile management',
          components: [
            { id: 'order-history', type: 'table', name: 'Order History', props: {}, customizable: true, required: true },
            { id: 'profile-form', type: 'form', name: 'Profile Settings', props: {}, customizable: true, required: true }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [
              { label: 'Products', href: '/', icon: 'Package' },
              { label: 'Cart', href: '/cart', icon: 'ShoppingCart' },
              { label: 'Account', href: '/account', icon: 'User' }
            ],
            position: 'top'
          }
        }
      ],
      config: {
        customizableFields: [
          { id: 'storeName', label: 'Store Name', type: 'text', required: true, page: 'all', component: 'header' },
          { id: 'productCategory', label: 'Main Product Category', type: 'text', required: true, page: 'catalog', component: 'product-grid' }
        ],
        colorScheme: {
          primary: '#059669',
          secondary: '#047857',
          accent: '#F59E0B',
          background: '#FFFFFF',
          text: '#111827',
          muted: '#6B7280',
          border: '#D1D5DB',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444'
        },
        typography: {
          fontFamily: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
          fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
          fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700' }
        },
        routing: {
          pages: [
            { path: '/', name: 'Products', component: 'ProductCatalog', protected: false, exact: true },
            { path: '/cart', name: 'Cart', component: 'ShoppingCart', protected: false, exact: true },
            { path: '/account', name: 'Account', component: 'UserAccount', protected: true, exact: true }
          ],
          navigation: [
            { label: 'Products', href: '/' },
            { label: 'Cart', href: '/cart' },
            { label: 'Account', href: '/account' }
          ],
          defaultRoute: '/'
        },
        dataStructure: {
          entities: [
            { name: 'Product', fields: [{ name: 'name', type: 'string', required: true, mockStrategy: 'realistic' }, { name: 'price', type: 'number', required: true, mockStrategy: 'realistic' }], mockCount: 20 },
            { name: 'Order', fields: [{ name: 'total', type: 'number', required: true, mockStrategy: 'realistic' }], mockCount: 5 }
          ],
          relationships: [{ from: 'Order', to: 'Product', type: 'many-to-many' }],
          apiEndpoints: [
            { path: '/api/products', method: 'GET', entity: 'Product', mockResponse: [] },
            { path: '/api/orders', method: 'GET', entity: 'Order', mockResponse: [] }
          ]
        },
        mockData: { enabled: true, realistic: true, industrySpecific: true, dataSize: 'medium' },
        features: [
          { id: 'search', name: 'Product Search', description: 'Search and filter products', enabled: true, page: 'catalog', component: 'filters', dependencies: [] }
        ]
      },
      version: '1.0.0',
      popularity: 88,
      lastUpdated: '2024-01-15',
      author: 'App Templates',
      premium: false
    },
    {
      id: 'service-platform',
      name: 'Service Platform',
      description: 'Service marketplace with provider listings, booking, and user management',
      category: 'service-platform',
      complexity: 'moderate',
      features: ['Service Marketplace', 'Provider Profiles', 'Booking System', 'User Dashboard'],
      previewImage: '/placeholder.svg',
      tags: ['services', 'marketplace', 'booking', 'providers'],
      pages: [
        {
          id: 'marketplace',
          name: 'Service Marketplace',
          route: '/',
          description: 'Browse available services and providers',
          components: [
            { id: 'service-grid', type: 'card', name: 'Service Grid', props: {}, customizable: true, required: true },
            { id: 'search-filters', type: 'form', name: 'Search & Filters', props: {}, customizable: true, required: false }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [
              { label: 'Services', href: '/', icon: 'Briefcase' },
              { label: 'Bookings', href: '/bookings', icon: 'Calendar' },
              { label: 'Profile', href: '/profile', icon: 'User' }
            ],
            position: 'top'
          }
        },
        {
          id: 'bookings',
          name: 'Booking Management',
          route: '/bookings',
          description: 'Schedule and manage service bookings',
          components: [
            { id: 'booking-calendar', type: 'chart', name: 'Booking Calendar', props: {}, customizable: true, required: true },
            { id: 'booking-form', type: 'form', name: 'New Booking', props: {}, customizable: true, required: true }
          ],
          layout: 'default',
          navigation: {
            type: 'header',
            items: [
              { label: 'Services', href: '/', icon: 'Briefcase' },
              { label: 'Bookings', href: '/bookings', icon: 'Calendar' },
              { label: 'Profile', href: '/profile', icon: 'User' }
            ],
            position: 'top'
          }
        },
        {
          id: 'profile',
          name: 'User Profile',
          route: '/profile',
          description: 'Manage profile and booking history',
          components: [
            { id: 'profile-info', type: 'form', name: 'Profile Information', props: {}, customizable: true, required: true },
            { id: 'booking-history', type: 'table', name: 'Booking History', props: {}, customizable: true, required: true }
          ],
          layout: 'centered',
          navigation: {
            type: 'header',
            items: [
              { label: 'Services', href: '/', icon: 'Briefcase' },
              { label: 'Bookings', href: '/bookings', icon: 'Calendar' },
              { label: 'Profile', href: '/profile', icon: 'User' }
            ],
            position: 'top'
          }
        }
      ],
      config: {
        customizableFields: [
          { id: 'platformName', label: 'Platform Name', type: 'text', required: true, page: 'all', component: 'header' },
          { id: 'serviceType', label: 'Primary Service Type', type: 'text', required: true, page: 'marketplace', component: 'service-grid' }
        ],
        colorScheme: {
          primary: '#7C3AED',
          secondary: '#5B21B6',
          accent: '#F59E0B',
          background: '#FAFAFA',
          text: '#1F2937',
          muted: '#6B7280',
          border: '#E5E7EB',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444'
        },
        typography: {
          fontFamily: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
          fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
          fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700' }
        },
        routing: {
          pages: [
            { path: '/', name: 'Services', component: 'ServiceMarketplace', protected: false, exact: true },
            { path: '/bookings', name: 'Bookings', component: 'BookingManagement', protected: true, exact: true },
            { path: '/profile', name: 'Profile', component: 'UserProfile', protected: true, exact: true }
          ],
          navigation: [
            { label: 'Services', href: '/' },
            { label: 'Bookings', href: '/bookings' },
            { label: 'Profile', href: '/profile' }
          ],
          defaultRoute: '/'
        },
        dataStructure: {
          entities: [
            { name: 'Service', fields: [{ name: 'name', type: 'string', required: true, mockStrategy: 'realistic' }, { name: 'price', type: 'number', required: true, mockStrategy: 'realistic' }], mockCount: 15 },
            { name: 'Booking', fields: [{ name: 'date', type: 'date', required: true, mockStrategy: 'realistic' }], mockCount: 8 }
          ],
          relationships: [{ from: 'Booking', to: 'Service', type: 'one-to-many' }],
          apiEndpoints: [
            { path: '/api/services', method: 'GET', entity: 'Service', mockResponse: [] },
            { path: '/api/bookings', method: 'GET', entity: 'Booking', mockResponse: [] }
          ]
        },
        mockData: { enabled: true, realistic: true, industrySpecific: true, dataSize: 'medium' },
        features: [
          { id: 'calendar', name: 'Booking Calendar', description: 'Interactive calendar for bookings', enabled: true, page: 'bookings', component: 'booking-calendar', dependencies: [] }
        ]
      },
      version: '1.0.0',
      popularity: 82,
      lastUpdated: '2024-01-15',
      author: 'App Templates',
      premium: false
    }
  ];

  getTemplates(): AppTemplate[] {
    return this.templates;
  }

  getTemplate(id: string): AppTemplate | null {
    return this.templates.find(template => template.id === id) || null;
  }

  getTemplatesByCategory(category: string): AppTemplate[] {
    return this.templates.filter(template => template.category === category);
  }

  generateCustomizedApp(customization: AppCustomization): string {
    const template = this.getTemplate(customization.templateId);
    if (!template) {
      throw new Error(`Template ${customization.templateId} not found`);
    }

    return this.generateAppCode(template, customization);
  }

  private generateAppCode(template: AppTemplate, customization: AppCustomization): string {
    // Generate complete React app code with routing and components
    const appName = customization.appName || template.name;
    const pages = template.pages.map(page => this.generatePageComponent(page, customization));
    
    return `// ${appName} - Generated App
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  BarChart3, 
  Settings, 
  User, 
  Package, 
  ShoppingCart, 
  Briefcase, 
  Calendar,
  Search,
  Filter,
  Menu,
  Home,
  Plus,
  Edit,
  Trash,
  Save,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

// App Navigation Component
const AppNavigation = () => {
  const navItems = ${JSON.stringify(template.config.routing.navigation)};
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">${appName}</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

${pages.join('\n\n')}

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppNavigation />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            ${template.config.routing.pages.map(route => 
              `<Route path="${route.path}" element={<${route.component} />} />`
            ).join('\n            ')}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;`;
  }

  private generatePageComponent(page: AppPage, customization: AppCustomization): string {
    const componentName = page.name.replace(/\s+/g, '');
    const mockData = this.generateMockData(page, customization);
    
    return `// ${page.name} Component
const ${componentName} = () => {
  ${mockData}
  
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">
            ${page.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            ${page.description}
          </p>
        </div>
      </div>
      
      ${this.generatePageContent(page, customization)}
    </div>
  );
};`;
  }

  private generatePageContent(page: AppPage, customization: AppCustomization): string {
    return page.components.map(component => {
      switch (component.type) {
        case 'card':
          return this.generateCardComponent(component, page);
        case 'form':
          return this.generateFormComponent(component, page);
        case 'table':
          return this.generateTableComponent(component, page);
        case 'chart':
          return this.generateChartComponent(component, page);
        default:
          return `<div className="p-4 border rounded-lg">
            <h3 className="font-medium">${component.name}</h3>
            <p className="text-sm text-gray-500">Component content goes here</p>
          </div>`;
      }
    }).join('\n      ');
  }

  private generateCardComponent(component: AppComponent, page: AppPage): string {
    if (page.id === 'dashboard') {
      return `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>`;
    }
    
    return `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{item.price}</span>
              <Button size="sm">Select</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>`;
  }

  private generateFormComponent(component: AppComponent, page: AppPage): string {
    return `<Card>
      <CardHeader>
        <CardTitle>${component.name}</CardTitle>
        <CardDescription>Fill out the form below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Enter name" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="Enter email" type="email" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Message</label>
          <Textarea placeholder="Enter message" />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </CardContent>
    </Card>`;
  }

  private generateTableComponent(component: AppComponent, page: AppPage): string {
    return `<Card>
      <CardHeader>
        <CardTitle>${component.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{row.name}</td>
                  <td className="py-2">
                    <Badge variant={row.status === 'Active' ? 'default' : 'secondary'}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="py-2">{row.date}</td>
                  <td className="py-2">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>`;
  }

  private generateChartComponent(component: AppComponent, page: AppPage): string {
    return `<Card>
      <CardHeader>
        <CardTitle>${component.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>
      </CardContent>
    </Card>`;
  }

  private generateMockData(page: AppPage, customization: AppCustomization): string {
    switch (page.id) {
      case 'dashboard':
        return `const metrics = [
    { name: 'Total Users', value: '2,651', change: '+12%' },
    { name: 'Revenue', value: '$45,231', change: '+8%' },
    { name: 'Growth Rate', value: '24%', change: '+2%' },
    { name: 'Active Sessions', value: '573', change: '+18%' }
  ];`;
      case 'catalog':
        return `const items = [
    { name: 'Premium Product', description: 'High-quality product with premium features', price: '$99.99' },
    { name: 'Standard Product', description: 'Great value for everyday use', price: '$49.99' },
    { name: 'Basic Product', description: 'Simple and affordable option', price: '$19.99' }
  ];`;
      case 'marketplace':
        return `const items = [
    { name: 'Consulting Service', description: 'Expert consulting for your business', price: '$150/hr' },
    { name: 'Design Service', description: 'Professional design services', price: '$80/hr' },
    { name: 'Development Service', description: 'Custom development solutions', price: '$120/hr' }
  ];`;
      default:
        return `const tableData = [
    { name: 'Item 1', status: 'Active', date: '2024-01-15' },
    { name: 'Item 2', status: 'Pending', date: '2024-01-14' },
    { name: 'Item 3', status: 'Active', date: '2024-01-13' }
  ];`;
    }
  }
}

export const appTemplateManager = new AppTemplateManager();
