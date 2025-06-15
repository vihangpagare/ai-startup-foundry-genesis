
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  LineChart, 
  Database, 
  Brain, 
  Zap, 
  Target,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Globe,
  Shield,
  Clock,
  Eye
} from 'lucide-react';
import { TemplateCustomization } from '@/types/template';

interface AnalyticsSaaSTemplateProps {
  customization: TemplateCustomization;
}

const AnalyticsSaaSTemplate = ({ customization }: AnalyticsSaaSTemplateProps) => {
  const { fields, colorScheme, companyData } = customization;
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
              >
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">{companyData.name}</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <a href="#analytics" className="text-gray-600 hover:text-gray-900">Analytics</a>
                <a href="#insights" className="text-gray-600 hover:text-gray-900">AI Insights</a>
                <a href="#integrations" className="text-gray-600 hover:text-gray-900">Integrations</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost">Sign In</Button>
                <Button style={{ backgroundColor: colorScheme.primary }} className="text-white">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                  <Brain className="h-3 w-3 mr-1" />
                  AI-Powered Analytics Platform
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {fields.heroTitle || 'Turn Data Into Actionable Insights'}
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {fields.heroSubtitle || 'Advanced analytics platform that transforms complex data into clear, actionable insights. Make data-driven decisions with confidence using AI-powered analytics.'}
                </p>

                <div className="grid grid-cols-3 gap-6 py-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: colorScheme.primary }}>10B+</div>
                    <div className="text-sm text-gray-600">Data Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: colorScheme.primary }}>500ms</div>
                    <div className="text-sm text-gray-600">Query Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: colorScheme.primary }}>99.9%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 py-4 text-white" style={{ backgroundColor: colorScheme.primary }}>
                  {fields.ctaText || 'Start Analyzing Data'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 group">
                  <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>
            </div>
            
            {/* Interactive Analytics Dashboard */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">Analytics Dashboard</div>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Live Data</Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Metric Selector */}
                  <div className="flex space-x-2 mb-6">
                    {['revenue', 'users', 'conversion'].map((metric) => (
                      <button
                        key={metric}
                        onClick={() => setSelectedMetric(metric)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                          selectedMetric === metric 
                            ? 'text-white'
                            : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                        }`}
                        style={selectedMetric === metric ? { backgroundColor: colorScheme.primary } : {}}
                      >
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Main Metric Display */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: `${colorScheme.primary}15` }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm" style={{ color: colorScheme.primary }}>
                            {selectedMetric === 'revenue' ? 'Monthly Revenue' : 
                             selectedMetric === 'users' ? 'Active Users' : 'Conversion Rate'}
                          </p>
                          <p className="text-2xl font-bold" style={{ color: colorScheme.primary }}>
                            {selectedMetric === 'revenue' ? '$247K' : 
                             selectedMetric === 'users' ? '24.7K' : '12.4%'}
                          </p>
                          <p className="text-xs text-green-600">+23.5% vs last month</p>
                        </div>
                        <TrendingUp className="h-8 w-8" style={{ color: colorScheme.primary }} />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600">Predictions</p>
                          <p className="text-2xl font-bold text-purple-700">+34%</p>
                          <p className="text-xs text-purple-600">Next quarter</p>
                        </div>
                        <Brain className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="h-32 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colorScheme.primary}10, ${colorScheme.secondary}10)` }}>
                    <div className="text-center">
                      <LineChart className="h-8 w-8 mx-auto mb-2" style={{ color: colorScheme.primary }} />
                      <span className="text-sm text-gray-600">Interactive Chart</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Features */}
      <section id="analytics" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Powerful Analytics Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to understand your data and make informed decisions
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: fields.feature1Title || 'Real-Time Dashboards',
              description: fields.feature1Description || 'Create beautiful, interactive dashboards that update in real-time with your data.',
              features: ['Drag & drop builder', 'Custom visualizations', 'Real-time updates', 'Mobile responsive'],
              color: colorScheme.primary
            },
            {
              icon: Brain,
              title: fields.feature2Title || 'AI-Powered Insights',
              description: fields.feature2Description || 'Discover hidden patterns and trends with machine learning algorithms.',
              features: ['Anomaly detection', 'Predictive analytics', 'Smart alerts', 'Trend analysis'],
              color: '#8B5CF6'
            },
            {
              icon: Database,
              title: fields.feature3Title || 'Universal Connectors',
              description: fields.feature3Description || 'Connect to any data source with our extensive library of integrations.',
              features: ['300+ integrations', 'API access', 'Data pipelines', 'Real-time sync'],
              color: '#10B981'
            }
          ].map((feature, index) => (
            <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="h-8 w-8" style={{ color: feature.color }} />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Data Visualization Showcase */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Beautiful Data Visualizations
            </h2>
            <p className="text-xl text-gray-600">
              Transform complex data into stunning, easy-to-understand visuals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: 'Bar Charts', description: 'Compare categories' },
              { icon: LineChart, title: 'Line Graphs', description: 'Track trends over time' },
              { icon: PieChart, title: 'Pie Charts', description: 'Show proportions' },
              { icon: TrendingUp, title: 'Trend Analysis', description: 'Identify patterns' }
            ].map((chart, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colorScheme.primary}15` }}
                >
                  <chart.icon className="h-8 w-8" style={{ color: colorScheme.primary }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{chart.title}</h3>
                <p className="text-sm text-gray-600">{chart.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Connect Your Data Sources
          </h2>
          <p className="text-xl text-gray-600">
            Seamlessly integrate with all your favorite tools and platforms
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
          {['Salesforce', 'Google Analytics', 'Shopify', 'Stripe', 'HubSpot', 'Slack'].map((integration) => (
            <div key={integration} className="text-center">
              <div className="text-lg font-semibold text-gray-700">{integration}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All 300+ Integrations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div 
          className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Start Making Data-Driven Decisions Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of companies using {companyData.name} to unlock the power of their data
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-4 bg-white hover:bg-gray-100" style={{ color: colorScheme.primary }}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              No credit card required • 14-day free trial • Setup in minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">{companyData.name}</span>
              </div>
              <p className="text-gray-400 mb-4">{companyData.description || 'Advanced analytics for modern businesses'}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#analytics" className="hover:text-white">Analytics</a></li>
                <li><a href="#insights" className="hover:text-white">AI Insights</a></li>
                <li><a href="#integrations" className="hover:text-white">Integrations</a></li>
                <li><a href="#api" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#docs" className="hover:text-white">Documentation</a></li>
                <li><a href="#tutorials" className="hover:text-white">Tutorials</a></li>
                <li><a href="#blog" className="hover:text-white">Blog</a></li>
                <li><a href="#support" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#careers" className="hover:text-white">Careers</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 {companyData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnalyticsSaaSTemplate;
