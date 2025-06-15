
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Package, 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  BarChart3,
  Settings,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Star,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Globe,
  Zap
} from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';

interface BusinessSpecificPagesProps {
  customization: AppCustomization;
  currentPage: string;
}

// Dynamic Main Interface Page - Core SaaS Functionality
const MainInterfacePage = ({ customization }: { customization: AppCustomization }) => {
  const businessModel = customization.fields.businessModel || 'platform';
  const primaryFeature = customization.fields.primaryFeature || 'Management';
  const dataType = customization.fields.dataType || 'Items';
  const actionVerb = customization.fields.actionVerb || 'Manage';
  
  const primaryEntities = customization.mockData.primaryEntities || [
    { name: 'Sample Item', status: 'Active', metric: '100', category: 'General' }
  ];

  const activities = customization.mockData.activities || [
    { action: 'Updated item', user: 'User', timestamp: '1 hour ago', result: 'Success' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'in stock':
      case 'verified':
      case 'updated':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'low stock':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'out of stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = () => {
    if (businessModel.includes('inventory')) return <Package className="h-5 w-5" />;
    if (businessModel.includes('marketplace')) return <ShoppingCart className="h-5 w-5" />;
    if (businessModel.includes('analytics')) return <BarChart3 className="h-5 w-5" />;
    return <Zap className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {primaryFeature}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {actionVerb} your {dataType.toLowerCase()} efficiently with our powerful platform
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button variant="outline" className="mr-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button style={{ backgroundColor: customization.colorScheme.primary }}>
            <Plus className="h-4 w-4 mr-2" />
            Add {dataType.slice(0, -1)}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder={`Search ${dataType.toLowerCase()}...`} className="pl-10" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Entities List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getIcon()}
                <span>{dataType}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {primaryEntities.map((entity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getIcon()}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{entity.name}</h4>
                        <p className="text-sm text-gray-500">{entity.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold" style={{ color: customization.colorScheme.primary }}>
                          {entity.metric}
                        </p>
                        <Badge className={getStatusColor(entity.status)}>
                          {entity.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" style={{ backgroundColor: customization.colorScheme.primary }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        by {activity.user} • {activity.timestamp}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {activity.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add New {dataType.slice(0, -1)}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Configure Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Business Analytics Dashboard
const AnalyticsDashboardPage = ({ customization }: { customization: AppCustomization }) => {
  const metrics = customization.mockData.metrics || [
    { name: 'Success Rate', value: '94%', change: '+8%', trend: 'up' }
  ];

  const metricName = customization.fields.metricName || 'Performance';
  const businessModel = customization.fields.businessModel || 'platform';

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Analytics Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your {businessModel} performance and key metrics
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button variant="outline" className="mr-2">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button style={{ backgroundColor: customization.colorScheme.primary }}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span> from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Track your key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance chart visualization</p>
                <p className="text-sm text-gray-400">Interactive charts showing {metricName} trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Insights</CardTitle>
            <CardDescription>Understanding your user behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(customization.mockData.users || []).slice(0, 3).map((user, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role} • Joined {user.joined}</p>
                  </div>
                  <Badge variant="secondary">{user.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// User Management Page
const UserManagementPage = ({ customization }: { customization: AppCustomization }) => {
  const users = customization.mockData.users || [
    { name: 'Sample User', role: 'User', status: 'Active', joined: '2024-01-01' }
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            User Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage user accounts, permissions, and settings
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button style={{ backgroundColor: customization.colorScheme.primary }}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* User Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Update your account information and preferences</CardDescription>
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
                <label className="text-sm font-medium">Website</label>
                <Input placeholder="https://yourcompany.com" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button style={{ backgroundColor: customization.colorScheme.primary }}>
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
                  <Badge style={{ backgroundColor: customization.colorScheme.success }}>
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Users</span>
                  <span className="text-sm font-medium">{users.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Storage</span>
                  <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.slice(0, 3).map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <Badge variant="secondary">{user.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const BusinessSpecificPages: React.FC<BusinessSpecificPagesProps> = ({ customization, currentPage }) => {
  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <MainInterfacePage customization={customization} />;
      case '/analytics':
      case '/dashboard':
        return <AnalyticsDashboardPage customization={customization} />;
      case '/users':
      case '/account':
      case '/profile':
        return <UserManagementPage customization={customization} />;
      default:
        return <MainInterfacePage customization={customization} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default BusinessSpecificPages;
