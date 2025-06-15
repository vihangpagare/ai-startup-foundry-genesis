
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Globe, 
  Play,
  ChevronRight,
  Award,
  TrendingUp,
  Target,
  Layers,
  Lock,
  Database,
  Code,
  Smartphone,
  Clock,
  DollarSign,
  Building,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import { TemplateCustomization } from '@/types/template';

interface EnhancedSaaSTemplateProps {
  customization: TemplateCustomization;
}

const EnhancedSaaSTemplate = ({ customization }: EnhancedSaaSTemplateProps) => {
  const { fields, colorScheme, companyData } = customization;
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [activeDemoTab, setActiveDemoTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
              >
                {companyData.name?.charAt(0) || 'S'}
              </div>
              <span className="text-xl font-bold text-gray-900">{companyData.name}</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#demo" className="text-gray-600 hover:text-gray-900">Demo</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Customers</a>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost">Sign In</Button>
                <Button style={{ backgroundColor: colorScheme.primary }} className="text-white">
                  {fields.ctaText || 'Start Free Trial'}
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colorScheme.primary}10, ${colorScheme.secondary}10)` }}>
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                  <Award className="h-3 w-3 mr-1" />
                  🏆 #1 Rated SaaS Platform 2024
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {fields.heroTitle || `Transform Your Business with ${companyData.name}`}
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {fields.heroSubtitle || 'Join 50,000+ companies using our platform to streamline operations and accelerate growth with AI-powered insights.'}
                </p>

                <div className="grid grid-cols-3 gap-6 py-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: colorScheme.primary }}>50K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: colorScheme.primary }}>99.9%</div>
                    <div className="text-sm text-gray-600">Uptime SLA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: colorScheme.primary }}>4.9★</div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 py-4 text-white" style={{ backgroundColor: colorScheme.primary }}>
                  {fields.ctaText || 'Start Free 14-Day Trial'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 group">
                  <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>
            </div>
            
            {/* Interactive Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-600 ml-4">{companyData.name} Dashboard</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: `${colorScheme.primary}20` }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm" style={{ color: colorScheme.primary }}>Revenue</p>
                          <p className="text-2xl font-bold" style={{ color: colorScheme.primary }}>$847K</p>
                        </div>
                        <TrendingUp className="h-8 w-8" style={{ color: colorScheme.primary }} />
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600">Growth</p>
                          <p className="text-2xl font-bold text-green-700">+127%</p>
                        </div>
                        <Target className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="h-32 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colorScheme.primary}20, ${colorScheme.secondary}20)` }}>
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2" style={{ color: colorScheme.primary }} />
                      <span className="text-sm text-gray-600">Interactive Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">Trusted by industry leaders worldwide</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
              {['TechCorp', 'DataFlow', 'InnovateLab', 'CloudTech', 'AnalyticsPlus'].map((company) => (
                <div key={company} className="text-center">
                  <div className="text-lg font-semibold text-gray-700">{company}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Layers className="h-4 w-4 mr-2" />
            Platform Features
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything you need to scale your SaaS business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive suite of tools designed to accelerate growth and streamline operations
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: BarChart3,
              title: fields.feature1Title || 'Advanced Analytics',
              description: fields.feature1Description || 'Real-time insights with predictive analytics and custom dashboards that drive data-driven decisions.',
              features: ['Real-time dashboards', 'Predictive analytics', 'Custom reports', 'Data export'],
              color: colorScheme.primary
            },
            {
              icon: Zap,
              title: fields.feature2Title || 'Lightning Performance',
              description: fields.feature2Description || 'Sub-second query responses with enterprise-grade performance and global CDN.',
              features: ['Sub-second queries', 'Auto-scaling', 'Global CDN', '99.9% uptime'],
              color: colorScheme.secondary
            },
            {
              icon: Shield,
              title: fields.feature3Title || 'Enterprise Security',
              description: fields.feature3Description || 'Bank-level security with SOC 2 compliance, end-to-end encryption, and advanced threat protection.',
              features: ['SOC 2 compliant', 'End-to-end encryption', 'GDPR ready', '2FA authentication'],
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

      {/* Interactive Demo Section */}
      <section id="demo" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              See {companyData.name} in Action
            </h2>
            <p className="text-xl text-gray-600">
              Experience the power of our platform with an interactive demo
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'reports', label: 'Reports', icon: Database }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDemoTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                      activeDemoTab === tab.id 
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    style={activeDemoTab === tab.id ? { backgroundColor: colorScheme.primary } : {}}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="h-96 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colorScheme.primary}10, ${colorScheme.secondary}10)` }}>
                <div className="text-center">
                  <Play className="h-16 w-16 mx-auto mb-4" style={{ color: colorScheme.primary }} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive {activeDemoTab} Demo</h3>
                  <p className="text-gray-600">Click to start the interactive demo experience</p>
                  <Button className="mt-4 text-white" style={{ backgroundColor: colorScheme.primary }}>
                    Start Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              id: 'starter',
              name: 'Starter',
              price: '$29',
              description: 'Perfect for small teams getting started',
              features: ['Up to 5 team members', 'Basic analytics', 'Email support', '5GB storage'],
              popular: false
            },
            {
              id: 'pro',
              name: 'Professional',
              price: '$99',
              description: 'Best for growing businesses',
              features: ['Up to 25 team members', 'Advanced analytics', 'Priority support', '100GB storage', 'API access'],
              popular: true
            },
            {
              id: 'enterprise',
              name: 'Enterprise',
              price: 'Custom',
              description: 'For large organizations',
              features: ['Unlimited team members', 'Custom analytics', '24/7 phone support', 'Unlimited storage', 'Custom integrations'],
              popular: false
            }
          ].map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'ring-2 scale-105' : ''} hover:shadow-lg transition-all cursor-pointer`}
              style={plan.popular ? { ringColor: colorScheme.primary } : {}}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-600">/month</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                  style={plan.popular ? { backgroundColor: colorScheme.primary } : {}}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20" style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}>
        <div className="container mx-auto px-4 text-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of satisfied customers across 50+ countries
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO, TechCorp',
                avatar: 'SJ',
                rating: 5,
                text: `${companyData.name} transformed our data analysis workflow. We've seen 300% improvement in decision-making speed.`,
                metrics: '300% faster decisions'
              },
              {
                name: 'Mike Chen',
                role: 'CTO, DataFlow',
                avatar: 'MC',
                rating: 5,
                text: 'Implementation was seamless. The AI insights helped us identify opportunities we never knew existed.',
                metrics: '$2M+ revenue increase'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Director, InnovateLab',
                avatar: 'ER',
                rating: 5,
                text: 'Outstanding support and reliability. Our team productivity increased by 40% in the first month.',
                metrics: '40% productivity boost'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-white/90 mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-white/70">{testimonial.role}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {testimonial.metrics}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-600">
              Your data is protected with bank-level security and compliance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: 'SOC 2 Compliant', description: 'Certified security controls' },
              { icon: Lock, title: 'End-to-End Encryption', description: '256-bit AES encryption' },
              { icon: Globe, title: 'GDPR Ready', description: 'Full data privacy compliance' },
              { icon: Award, title: 'ISO 27001', description: 'Information security standard' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colorScheme.primary}20` }}
                >
                  <item.icon className="h-8 w-8" style={{ color: colorScheme.primary }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div 
          className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join 50,000+ companies already using {companyData.name} to make better decisions faster
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-4 bg-white hover:bg-gray-100" style={{ color: colorScheme.primary }}>
                {fields.ctaText || 'Start Free Trial'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  {companyData.name?.charAt(0) || 'S'}
                </div>
                <span className="text-xl font-bold">{companyData.name}</span>
              </div>
              <p className="text-gray-400 mb-4">{companyData.description || companyData.tagline}</p>
              <div className="flex space-x-4">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#demo" className="hover:text-white">Demo</a></li>
                <li><a href="#api" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#careers" className="hover:text-white">Careers</a></li>
                <li><a href="#blog" className="hover:text-white">Blog</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#help" className="hover:text-white">Help Center</a></li>
                <li><a href="#docs" className="hover:text-white">Documentation</a></li>
                <li><a href="#status" className="hover:text-white">Status</a></li>
                <li><a href="#security" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 {companyData.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#privacy" className="hover:text-white">Privacy Policy</a>
              <a href="#terms" className="hover:text-white">Terms of Service</a>
              <a href="#cookies" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedSaaSTemplate;
