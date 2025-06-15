
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Clock, 
  CheckCircle,
  Circle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Download,
  Upload
} from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';

interface BusinessPlatformTemplateProps {
  customization: AppCustomization;
}

const BusinessPlatformTemplate = ({ customization }: BusinessPlatformTemplateProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const { companyData, mockData, colorScheme } = customization;

  const clients = [
    { 
      id: 1, 
      name: 'Acme Corporation', 
      contact: 'Sarah Johnson', 
      email: 'sarah@acme.com', 
      phone: '+1 (555) 123-4567',
      status: 'Active', 
      value: '$45,000', 
      projects: 3,
      lastContact: '2024-01-15',
      rating: 5
    },
    { 
      id: 2, 
      name: 'Tech Innovators LLC', 
      contact: 'Mike Chen', 
      email: 'mike@techinnovators.com', 
      phone: '+1 (555) 234-5678',
      status: 'Prospect', 
      value: '$12,000', 
      projects: 1,
      lastContact: '2024-01-12',
      rating: 4
    },
    { 
      id: 3, 
      name: 'Global Solutions Inc', 
      contact: 'Emily Rodriguez', 
      email: 'emily@globalsolutions.com', 
      phone: '+1 (555) 345-6789',
      status: 'Active', 
      value: '$78,000', 
      projects: 5,
      lastContact: '2024-01-14',
      rating: 5
    }
  ];

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corporation',
      status: 'In Progress',
      progress: 65,
      deadline: '2024-02-15',
      budget: '$15,000',
      team: ['John', 'Sarah', 'Mike'],
      priority: 'High'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'Tech Innovators LLC',
      status: 'Planning',
      progress: 20,
      deadline: '2024-03-30',
      budget: '$45,000',
      team: ['Alex', 'Lisa'],
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Brand Identity Package',
      client: 'Global Solutions Inc',
      status: 'Review',
      progress: 90,
      deadline: '2024-01-25',
      budget: '$8,000',
      team: ['Emma', 'David'],
      priority: 'Low'
    }
  ];

  const tasks = [
    { id: 1, title: 'Complete wireframes for homepage', project: 'Website Redesign', priority: 'High', due: '2024-01-20', completed: false },
    { id: 2, title: 'Client presentation slides', project: 'Mobile App Development', priority: 'Medium', due: '2024-01-18', completed: false },
    { id: 3, title: 'Logo design variations', project: 'Brand Identity Package', priority: 'High', due: '2024-01-17', completed: true },
    { id: 4, title: 'User testing session', project: 'Website Redesign', priority: 'Medium', due: '2024-01-22', completed: false }
  ];

  const invoices = [
    { id: 'INV-001', client: 'Acme Corporation', amount: '$5,000', status: 'Paid', date: '2024-01-10', dueDate: '2024-01-25' },
    { id: 'INV-002', client: 'Tech Innovators LLC', amount: '$12,000', status: 'Pending', date: '2024-01-12', dueDate: '2024-01-27' },
    { id: 'INV-003', client: 'Global Solutions Inc', amount: '$3,500', status: 'Overdue', date: '2023-12-15', dueDate: '2023-12-30' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
              <nav className="hidden md:flex space-x-6">
                {['dashboard', 'clients', 'projects', 'calendar', 'invoices'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
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
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Projects', value: '12', change: '+2', icon: FileText, color: 'blue' },
                { label: 'Total Clients', value: '48', change: '+5', icon: Users, color: 'green' },
                { label: 'Monthly Revenue', value: '$34,500', change: '+12%', icon: DollarSign, color: 'purple' },
                { label: 'Tasks Due', value: '7', change: '-3', icon: Clock, color: 'orange' }
              ].map((metric, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                        <p className="text-sm text-green-600 mt-1">{metric.change} this month</p>
                      </div>
                      <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                        <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity & Upcoming Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                  <CardDescription>Current project status overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{project.name}</h4>
                            <p className="text-sm text-gray-600">{project.client}</p>
                          </div>
                          <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <Progress value={project.progress} className="flex-1 mr-4" />
                          <span className="text-sm text-gray-600">{project.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Tasks due this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.filter(task => !task.completed).slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-center space-x-3">
                        <button className="text-gray-400 hover:text-blue-600">
                          <Circle className="h-4 w-4" />
                        </button>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-xs text-gray-600">{task.project} • Due {task.due}</p>
                        </div>
                        <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Revenue trending upward</p>
                    <p className="text-sm text-gray-500">$34.5K this month (+12% growth)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>

            <div className="grid gap-6">
              {clients.map((client) => (
                <Card key={client.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                            <p className="text-gray-600">{client.contact}</p>
                          </div>
                          <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                            {client.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{client.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{client.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Last contact: {client.lastContact}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div>
                            <span className="text-sm text-gray-600">Project Value</span>
                            <p className="font-semibold text-green-600">{client.value}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Active Projects</span>
                            <p className="font-semibold">{client.projects}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-600">Rating</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">
                          View Projects
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <p className="text-gray-600">{project.client}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={project.priority === 'High' ? 'destructive' : project.priority === 'Medium' ? 'default' : 'secondary'}>
                          {project.priority}
                        </Badge>
                        <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-600">Budget</span>
                        <p className="font-semibold text-green-600">{project.budget}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Deadline</span>
                        <p className="font-semibold">{project.deadline}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Team</span>
                        <p className="font-semibold">{project.team.join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Progress</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={project.progress} className="flex-1" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Files
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Invoice Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            <div className="grid gap-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                          <p className="text-sm text-gray-600">{invoice.client}</p>
                        </div>
                        <Badge 
                          variant={
                            invoice.status === 'Paid' ? 'default' : 
                            invoice.status === 'Overdue' ? 'destructive' : 'secondary'
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{invoice.amount}</p>
                        <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        {invoice.status === 'Pending' && (
                          <Button size="sm">
                            Send Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Calendar & Scheduling</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar Integration</h3>
                    <p className="text-gray-600 mb-4">Schedule and manage your appointments</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium">Today</h4>
                          <p className="text-2xl font-bold text-blue-600">3</p>
                          <p className="text-sm text-gray-600">meetings</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium">This Week</h4>
                          <p className="text-2xl font-bold text-green-600">12</p>
                          <p className="text-sm text-gray-600">appointments</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium">Next Week</h4>
                          <p className="text-2xl font-bold text-purple-600">8</p>
                          <p className="text-sm text-gray-600">scheduled</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessPlatformTemplate;
