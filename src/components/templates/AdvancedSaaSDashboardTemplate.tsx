
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Settings, 
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash,
  Eye,
  MessageSquare,
  Star
} from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';

interface AdvancedSaaSDashboardTemplateProps {
  customization: AppCustomization;
}

const AdvancedSaaSDashboardTemplate = ({ customization }: AdvancedSaaSDashboardTemplateProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const { companyData, mockData, colorScheme } = customization;

  // Enhanced mock data
  const metrics = [
    { label: 'Total Revenue', value: '$127,482', change: '+12.5%', trend: 'up', icon: DollarSign },
    { label: 'Active Users', value: '8,429', change: '+8.2%', trend: 'up', icon: Users },
    { label: 'Conversion Rate', value: '3.24%', change: '+0.8%', trend: 'up', icon: TrendingUp },
    { label: 'Churn Rate', value: '2.1%', change: '-0.3%', trend: 'down', icon: BarChart3 }
  ];

  const recentActivity = [
    { user: 'Sarah Chen', action: 'Created new project', time: '2 minutes ago', type: 'create' },
    { user: 'Mike Johnson', action: 'Updated billing settings', time: '15 minutes ago', type: 'update' },
    { user: 'Emily Davis', action: 'Invited team member', time: '1 hour ago', type: 'invite' },
    { user: 'Alex Rodriguez', action: 'Generated report', time: '2 hours ago', type: 'report' },
    { user: 'Lisa Wang', action: 'Deployed to production', time: '3 hours ago', type: 'deploy' }
  ];

  const teamMembers = [
    { name: 'Sarah Chen', role: 'Product Manager', status: 'Online', lastActive: 'Now', avatar: '🧑‍💼' },
    { name: 'Mike Johnson', role: 'Developer', status: 'Away', lastActive: '5m ago', avatar: '👨‍💻' },
    { name: 'Emily Davis', role: 'Designer', status: 'Online', lastActive: 'Now', avatar: '🎨' },
    { name: 'Alex Rodriguez', role: 'Data Analyst', status: 'Offline', lastActive: '2h ago', avatar: '📊' }
  ];

  const projects = [
    { name: 'Mobile App Redesign', progress: 78, status: 'In Progress', team: 5, deadline: '2024-02-15' },
    { name: 'API Integration', progress: 92, status: 'Review', team: 3, deadline: '2024-01-30' },
    { name: 'User Dashboard', progress: 45, status: 'In Progress', team: 4, deadline: '2024-03-01' },
    { name: 'Analytics Platform', progress: 100, status: 'Completed', team: 6, deadline: '2024-01-20' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
            <Badge variant="secondary">Pro Plan</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'projects', label: 'Projects', icon: Calendar },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h2>
                <p className="text-gray-600 mt-1">Here's what's happening with your {companyData.name} today.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{metric.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                          <p className={`text-sm mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change} from last month
                          </p>
                        </div>
                        <div className={`p-3 rounded-full ${metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                          <metric.icon className={`h-6 w-6 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-gray-600">Interactive revenue chart</p>
                        <p className="text-sm text-gray-500">Showing $127K this month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions from your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.slice(0, 5).map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.user}</p>
                            <p className="text-xs text-gray-500">{activity.action}</p>
                          </div>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>

              <div className="grid gap-4">
                {projects.map((project, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.team} team members • Due {project.deadline}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>

              <div className="grid gap-4">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                            {member.avatar}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={member.status === 'Online' ? 'default' : 'secondary'}>
                              {member.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{member.lastActive}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-600">User engagement metrics</p>
                        <p className="text-sm text-gray-500">78% increase this quarter</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: 'Page Load Time', value: '1.2s', status: 'good' },
                        { label: 'API Response Time', value: '145ms', status: 'good' },
                        { label: 'Error Rate', value: '0.1%', status: 'excellent' },
                        { label: 'Uptime', value: '99.9%', status: 'excellent' }
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{metric.label}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{metric.value}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              metric.status === 'excellent' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              
              <Tabs defaultValue="general" className="w-full">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                      <CardDescription>Update your company details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Company Name</label>
                          <Input defaultValue={companyData.name} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Industry</label>
                          <Input defaultValue={companyData.industry} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Input defaultValue={companyData.description} />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Information</CardTitle>
                      <CardDescription>Manage your subscription and billing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Pro Plan</h4>
                            <p className="text-sm text-gray-600">$99/month • Next billing: Feb 15, 2024</p>
                          </div>
                          <Button variant="outline">Manage</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSaaSDashboardTemplate;
