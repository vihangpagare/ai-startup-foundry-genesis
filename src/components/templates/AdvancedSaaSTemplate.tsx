
import React from 'react';
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
  Smartphone,
  Play,
  ChevronRight,
  Award,
  TrendingUp,
  Target,
  Layers
} from 'lucide-react';

interface AdvancedSaaSTemplateProps {
  customization: any;
}

const AdvancedSaaSTemplate = ({ customization }: AdvancedSaaSTemplateProps) => {
  const { fields, colorScheme, companyData, animations } = customization;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced Header with Mega Navigation */}
      <header className="container mx-auto px-4 py-4 sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{companyData.name?.charAt(0) || 'S'}</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">{companyData.name}</span>
              <p className="text-xs text-gray-500 -mt-1">Trusted by 50,000+ teams</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <a href="#product" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
                  <span>Product</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:rotate-90 transition-transform" />
                </a>
              </div>
              <div className="relative group">
                <a href="#solutions" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
                  <span>Solutions</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:rotate-90 transition-transform" />
                </a>
              </div>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#resources" className="text-gray-600 hover:text-gray-900">Resources</a>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost">Sign In</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {fields.ctaText || 'Start Free Trial'}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Advanced Hero Section with Interactive Elements */}
      <section className="container mx-auto px-4 py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
                <Award className="h-3 w-3 mr-1" />
                🏆 #1 Rated Platform 2024
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {fields.heroTitle || 'Transform Your Business'}
                </span>
                <br />
                <span className="text-gray-900">with AI-Powered Analytics</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {fields.heroSubtitle || 'Join 50,000+ companies using our platform to make data-driven decisions 10x faster. No technical expertise required.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {fields.ctaText || 'Start Free 14-Day Trial'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 group">
                <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch 2-Min Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
          
          {/* Interactive Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600 ml-4">Analytics Dashboard</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600">Revenue</p>
                        <p className="text-2xl font-bold text-blue-700">$127K</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600">Growth</p>
                        <p className="text-2xl font-bold text-green-700">+23%</p>
                      </div>
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Interactive Chart Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">Trusted by industry leaders worldwide</p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              {['TechCorp', 'DataFlow', 'InnovateLab', 'CloudTech', 'AnalyticsPlus'].map((company) => (
                <div key={company} className="text-xl font-semibold text-gray-700">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with Interactive Cards */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Layers className="h-4 w-4 mr-2" />
            Platform Features
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything you need to scale your business
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
              description: fields.feature1Description || 'Real-time insights with predictive analytics and custom dashboards',
              color: 'blue',
              features: ['Real-time dashboards', 'Predictive analytics', 'Custom reports', 'Data export']
            },
            {
              icon: Zap,
              title: fields.feature2Title || 'Lightning Fast',
              description: fields.feature2Description || 'Sub-second query responses with enterprise-grade performance',
              color: 'purple',
              features: ['Sub-second queries', 'Auto-scaling', 'Global CDN', '99.9% uptime']
            },
            {
              icon: Shield,
              title: fields.feature3Title || 'Enterprise Security',
              description: fields.feature3Description || 'Bank-level security with SOC 2 compliance and encryption',
              color: 'green',
              features: ['SOC 2 compliant', 'End-to-end encryption', 'GDPR ready', '2FA authentication']
            }
          ].map((feature, index) => (
            <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
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

        {/* Interactive Feature Demo */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                See it in action
              </h3>
              <p className="text-gray-600 mb-6">
                Experience the power of our platform with an interactive demo tailored to your industry.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Start Interactive Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <Play className="h-12 w-12 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials with Video */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What our customers say
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of satisfied customers across 50+ countries
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO, TechCorp',
                company: 'TechCorp',
                avatar: 'bg-gradient-to-r from-pink-400 to-red-400',
                rating: 5,
                text: "This platform transformed our data analysis workflow. We've seen 300% improvement in decision-making speed.",
                metrics: '300% faster decisions'
              },
              {
                name: 'Mike Chen',
                role: 'CTO, DataFlow',
                company: 'DataFlow',
                avatar: 'bg-gradient-to-r from-blue-400 to-indigo-400',
                rating: 5,
                text: "Implementation was seamless. The AI insights have helped us identify opportunities we never knew existed.",
                metrics: '$2M+ revenue increase'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Director, InnovateLab',
                company: 'InnovateLab',
                avatar: 'bg-gradient-to-r from-green-400 to-teal-400',
                rating: 5,
                text: "Outstanding support and reliability. Our team productivity increased by 40% in the first month.",
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
                  <blockquote className="text-gray-100 mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${testimonial.avatar} rounded-full flex items-center justify-center mr-3`}>
                        <span className="text-white font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-300">{testimonial.role}</p>
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

      {/* Advanced CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join 50,000+ companies already using {companyData.name} to make better decisions faster
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
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
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">{companyData.name?.charAt(0) || 'S'}</span>
                </div>
                <span className="text-xl font-bold">{companyData.name}</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                {companyData.description || 'Empowering businesses with AI-driven analytics and insights.'}
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'facebook', 'github'].map((social) => (
                  <div key={social} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                    <span className="text-sm capitalize">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Security', 'Integrations', 'API', 'Updates']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press', 'Partners', 'Contact']
              },
              {
                title: 'Resources',
                links: ['Documentation', 'Help Center', 'Community', 'Webinars', 'Status', 'Terms']
              }
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 {companyData.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdvancedSaaSTemplate;
