
import React, { useState } from 'react';
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
  ArrowRight,
  Eye,
  Code
} from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';

interface AppPreviewProps {
  customization: AppCustomization;
  onEdit: () => void;
}

// Navigation Component
const AppNavigation = ({ 
  customization, 
  currentPage, 
  onPageChange 
}: { 
  customization: AppCustomization;
  currentPage: string;
  onPageChange: (page: string) => void;
}) => {
  const navItems = customization.routing.navigation;
  
  return (
    <nav className="bg-white shadow-sm border-b" style={{ borderBottomColor: customization.colorScheme.border }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold" style={{ color: customization.colorScheme.primary }}>
                {customization.appName}
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(item => (
                <button
                  key={item.href}
                  onClick={() => onPageChange(item.href)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                    currentPage === item.href
                      ? 'border-current'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ 
                    color: currentPage === item.href 
                      ? customization.colorScheme.primary 
                      : customization.colorScheme.muted 
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Dashboard Page Component
const DashboardPage = ({ customization }: { customization: AppCustomization }) => {
  const metrics = customization.mockData.metrics || [
    { name: 'Total Users', value: '1,234', change: '+12%' },
    { name: 'Revenue', value: '$45,678', change: '+8%' },
    { name: 'Growth Rate', value: '24%', change: '+2%' },
    { name: 'Active Sessions', value: '573', change: '+18%' }
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button style={{ backgroundColor: customization.colorScheme.primary }}>
            <Plus className="h-4 w-4 mr-2" />
            New Item
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(customization.mockData.users || []).slice(0, 3).map((user, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Features/Products Page Component
const FeaturesPage = ({ customization }: { customization: AppCustomization }) => {
  const items = customization.mockData.products || customization.mockData.users || [
    { name: 'Feature 1', price: '$99.99', category: 'Premium' },
    { name: 'Feature 2', price: '$49.99', category: 'Standard' },
    { name: 'Feature 3', price: '$19.99', category: 'Basic' }
  ];

  const pageTitle = customization.templateId === 'ecommerce-store' ? 'Products' : 
                   customization.templateId === 'service-platform' ? 'Services' : 'Features';

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {pageTitle}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your {pageTitle.toLowerCase()} and configurations.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button variant="outline" className="mr-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button style={{ backgroundColor: customization.colorScheme.primary }}>
            <Plus className="h-4 w-4 mr-2" />
            Add {pageTitle.slice(0, -1)}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder={`Search ${pageTitle.toLowerCase()}...`} className="pl-10" />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription>{item.category || item.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold" style={{ color: customization.colorScheme.primary }}>
                  {item.price || item.status}
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" style={{ backgroundColor: customization.colorScheme.primary }}>
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Account/Profile Page Component
const AccountPage = ({ customization }: { customization: AppCustomization }) => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Account Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account preferences and settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <Input value={customization.companyData.name} />
                </div>
                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <Input value={customization.companyData.industry} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Company Description</label>
                <Textarea value={customization.companyData.description} />
              </div>
              <div>
                <label className="text-sm font-medium">Tagline</label>
                <Input value={customization.companyData.tagline} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button style={{ backgroundColor: customization.colorScheme.primary }}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Plan</span>
                  <span className="text-sm font-medium">Professional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge variant="default" style={{ backgroundColor: customization.colorScheme.success }}>
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Users</span>
                  <span className="text-sm font-medium">{customization.mockData.users?.length || 5}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Main App Content Component (replaces Router)
const AppContent = ({ customization, currentPage }: { customization: AppCustomization; currentPage: string }) => {
  const renderCurrentPage = () => {
    switch (currentPage) {
      case '/':
        return <DashboardPage customization={customization} />;
      case '/features':
      case '/cart':
      case '/bookings':
        return <FeaturesPage customization={customization} />;
      case '/account':
      case '/profile':
        return <AccountPage customization={customization} />;
      default:
        return <DashboardPage customization={customization} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

const AppPreview = ({ customization, onEdit }: AppPreviewProps) => {
  const [currentPage, setCurrentPage] = useState('/');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {/* Preview Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Live App Preview</h3>
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <Eye className="h-3 w-3 mr-1" />
            Interactive
          </Badge>
          <Badge variant="secondary">
            {customization.templateId}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit App
          </Button>
          <Button variant="outline">
            <Code className="h-4 w-4 mr-2" />
            View Code
          </Button>
        </div>
      </div>

      {/* App Preview Frame */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-lg">
        <div className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded px-3 py-1 text-sm text-gray-600">
              {customization.appName.toLowerCase().replace(/\s+/g, '')}.app{currentPage}
            </div>
          </div>
        </div>
        <div className="h-[600px] overflow-auto">
          <AppNavigation 
            customization={customization} 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <AppContent customization={customization} currentPage={currentPage} />
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-2">About This App</h4>
        <p className="text-gray-700 mb-4">{customization.appDescription}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-900">Template:</span>
            <p className="text-gray-600">{customization.templateId}</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Pages:</span>
            <p className="text-gray-600">{customization.routing.pages.length} pages</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Features:</span>
            <p className="text-gray-600">{customization.enabledFeatures.length} enabled</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Industry:</span>
            <p className="text-gray-600">{customization.companyData.industry}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
