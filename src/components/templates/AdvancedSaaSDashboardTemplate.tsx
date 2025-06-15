
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Settings, 
  Bell,
  Search,
  Plus,
  Eye,
  MessageSquare,
  Star,
  Zap,
  BarChart3,
  PuzzleIcon as Puzzle,
  Rocket,
  CheckCircle,
  Clock,
  ArrowRight,
  LogOut,
  User
} from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';
import AuthScreen from '@/components/AuthScreen';

interface AdvancedSaaSDashboardTemplateProps {
  customization: AppCustomization;
}

const AdvancedSaaSDashboardTemplate = ({ customization }: AdvancedSaaSDashboardTemplateProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { companyData, mockData, colorScheme } = customization;

  // Mock authentication check
  useEffect(() => {
    const authCheck = localStorage.getItem('template_auth');
    if (authCheck) {
      setIsAuthenticated(true);
      setUser({ name: 'John Doe', email: 'john@example.com' });
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    localStorage.setItem('template_auth', 'true');
    setIsAuthenticated(true);
    setUser({ name: 'John Doe', email });
  };

  const handleLogout = () => {
    localStorage.removeItem('template_auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Feature-focused metrics instead of revenue
  const metrics = [
    { label: 'Active Features', value: '12', change: '+3 new', trend: 'up', icon: Puzzle, color: 'text-blue-600' },
    { label: 'Feature Usage', value: '89%', change: '+15%', trend: 'up', icon: TrendingUp, color: 'text-green-600' },
    { label: 'User Engagement', value: '8.4/10', change: '+0.8', trend: 'up', icon: Star, color: 'text-yellow-600' },
    { label: 'Features Completed', value: '47', change: '+5 today', trend: 'up', icon: CheckCircle, color: 'text-purple-600' }
  ];

  const featureActivity = [
    { user: 'Sarah Chen', action: 'Activated Advanced Analytics feature', time: '2 minutes ago', type: 'feature-activation' },
    { user: 'Mike Johnson', action: 'Completed onboarding for Collaboration Tools', time: '15 minutes ago', type: 'feature-completion' },
    { user: 'Emily Davis', action: 'Started using Automated Workflows', time: '1 hour ago', type: 'feature-start' },
    { user: 'Alex Rodriguez', action: 'Provided feedback on Dashboard Customization', time: '2 hours ago', type: 'feature-feedback' },
    { user: 'Lisa Wang', action: 'Unlocked Premium Features package', time: '3 hours ago', type: 'feature-unlock' }
  ];

  const featureRoadmap = [
    { name: 'AI-Powered Insights', progress: 78, status: 'In Development', users: 245, priority: 'High' },
    { name: 'Mobile App Integration', progress: 92, status: 'Beta Testing', users: 156, priority: 'Medium' },
    { name: 'Advanced Reporting', progress: 45, status: 'Planning', users: 389, priority: 'High' },
    { name: 'Third-party Integrations', progress: 100, status: 'Live', users: 567, priority: 'High' }
  ];

  const availableFeatures = [
    { name: 'User Management', description: 'Manage user accounts and permissions', status: 'Active', usage: '95%' },
    { name: 'Analytics Dashboard', description: 'View detailed usage analytics', status: 'Active', usage: '87%' },
    { name: 'Collaboration Tools', description: 'Team communication features', status: 'Active', usage: '76%' },
    { name: 'API Access', description: 'Developer API endpoints', status: 'Beta', usage: '23%' },
    { name: 'Custom Workflows', description: 'Build automated processes', status: 'Coming Soon', usage: '0%' },
    { name: 'Advanced Security', description: 'Enhanced security features', status: 'Coming Soon', usage: '0%' }
  ];

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} companyName={companyData.name} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header with improved contrast */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">Feature Platform</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-gray-300 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" size="sm" className="border-gray-300">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-gray-300">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar with improved navigation */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', label: 'Feature Overview', icon: BarChart3 },
              { id: 'library', label: 'Feature Library', icon: Puzzle },
              { id: 'management', label: 'Feature Management', icon: Settings },
              { id: 'roadmap', label: 'Feature Roadmap', icon: Rocket },
              { id: 'account', label: 'Account Settings', icon: User }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content with better contrast */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h2>
                <p className="text-gray-600 mt-2">Here's your feature usage overview for {companyData.name} today.</p>
              </div>

              {/* Feature Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                          <p className="text-sm text-green-600 mt-1">
                            {metric.change} from last week
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-gray-50">
                          <metric.icon className={`h-6 w-6 ${metric.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Feature Usage Analytics and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Feature Usage Analytics</CardTitle>
                    <CardDescription className="text-gray-600">Most popular features this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border border-gray-100">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                        <p className="text-gray-700 font-medium">Interactive feature usage chart</p>
                        <p className="text-sm text-gray-500 mt-1">12 active features • 89% adoption rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Recent Feature Activity</CardTitle>
                    <CardDescription className="text-gray-600">Latest feature interactions from your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {featureActivity.slice(0, 5).map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                            <p className="text-sm text-gray-600">{activity.action}</p>
                            <span className="text-xs text-gray-400">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Feature Library</h2>
                  <p className="text-gray-600 mt-1">Discover and manage available features</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Request Feature
                </Button>
              </div>

              <div className="grid gap-6">
                {availableFeatures.map((feature, index) => (
                  <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                            <Badge variant={feature.status === 'Active' ? 'default' : feature.status === 'Beta' ? 'secondary' : 'outline'}>
                              {feature.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{feature.description}</p>
                          {feature.status === 'Active' && (
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-500">Usage: {feature.usage}</span>
                              <div className="w-24">
                                <Progress value={parseInt(feature.usage)} className="h-2" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2 ml-4">
                          {feature.status === 'Active' && (
                            <Button variant="outline" size="sm" className="border-gray-300">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={feature.status === 'Coming Soon'}
                            className="border-gray-300"
                          >
                            {feature.status === 'Coming Soon' ? (
                              <Clock className="h-4 w-4" />
                            ) : (
                              <ArrowRight className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'management' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Feature Management</h2>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure Active Features</h3>
                <p className="text-gray-600 mb-6">Customize how features work for your organization</p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">Feature Configuration Panel</h4>
                    <p className="text-sm text-gray-600 mt-1">This section will be populated with specific feature settings based on your business needs.</p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">Feature Permissions</h4>
                    <p className="text-sm text-gray-600 mt-1">Control which users have access to specific features.</p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">Feature Analytics</h4>
                    <p className="text-sm text-gray-600 mt-1">Monitor feature performance and user engagement.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Feature Roadmap</h2>
                <Button variant="outline" className="border-gray-300">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>

              <div className="grid gap-4">
                {featureRoadmap.map((feature, index) => (
                  <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                          <p className="text-sm text-gray-600">{feature.users} users interested • Priority: {feature.priority}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={feature.status === 'Live' ? 'default' : 'secondary'}>
                            {feature.status}
                          </Badge>
                          <Button variant="outline" size="sm" className="border-gray-300">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Development Progress</span>
                          <span className="text-sm font-medium text-gray-900">{feature.progress}%</span>
                        </div>
                        <Progress value={feature.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-white border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-gray-900">Profile Information</CardTitle>
                      <CardDescription className="text-gray-600">Update your account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Company Name</label>
                          <Input value={companyData.name} className="mt-1 border-gray-300" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Industry</label>
                          <Input value={companyData.industry} className="mt-1 border-gray-300" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <Input value={user?.email} className="mt-1 border-gray-300" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" className="border-gray-300">Cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-white border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-gray-900">Account Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Plan</span>
                          <span className="text-sm font-medium text-gray-900">Professional</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Features Active</span>
                          <span className="text-sm font-medium text-gray-900">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full border-gray-300">
                        Manage Subscription
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSaaSDashboardTemplate;
