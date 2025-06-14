
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, FileText, Code, TrendingUp, Users, Zap, Target, PieChart, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Strategic Business Planning",
      description: "AI-powered comprehensive business plan with market analysis, competitive research, financial projections, and SWOT analysis"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Complete Marketing Strategy",
      description: "Go-to-market plan with messaging, pricing strategies, customer acquisition funnels, and content marketing roadmap"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Production-Ready MVP",
      description: "Fully functional React application with responsive design, database integration, authentication, and deployment-ready code"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Technical Architecture",
      description: "Complete system design, database schemas, API specifications, security implementation, and scalability roadmap"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User Experience Design",
      description: "Detailed wireframes, user flows, accessibility compliance, and mobile-first responsive design specifications"
    },
    {
      icon: <PieChart className="h-8 w-8" />,
      title: "Financial Modeling",
      description: "Revenue projections, cost analysis, funding strategies, and detailed financial forecasts for first 3 years"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Idea Submission & Analysis",
      description: "Submit your SaaS idea and our AI analyzes market viability, competition, and target audience",
      icon: <Target className="h-6 w-6" />
    },
    {
      step: "2", 
      title: "Strategic Foundation",
      description: "Generate comprehensive business strategy, value propositions, and competitive positioning",
      icon: <Building className="h-6 w-6" />
    },
    {
      step: "3",
      title: "Technical Architecture",
      description: "Design complete system architecture, database schemas, and technical specifications",
      icon: <Code className="h-6 w-6" />
    },
    {
      step: "4",
      title: "Marketing & Growth Strategy",
      description: "Create detailed go-to-market plans, pricing strategies, and customer acquisition funnels",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      step: "5",
      title: "MVP Development",
      description: "Generate production-ready React application with full functionality and responsive design",
      icon: <Zap className="h-6 w-6" />
    },
    {
      step: "6",
      title: "Complete Package Delivery",
      description: "Receive business plan, marketing strategy, technical docs, and deployable MVP code",
      icon: <FileText className="h-6 w-6" />
    }
  ];

  const testimonials = [
    {
      quote: "Transformed my vague idea into a complete business with working MVP in minutes. The depth of analysis was incredible.",
      author: "Sarah Chen",
      role: "Founder, DataFlow Analytics"
    },
    {
      quote: "The AI-generated business plan was more comprehensive than what I paid consultants $10k for. Plus I got working code!",
      author: "Marcus Rodriguez", 
      role: "CEO, TaskOptimize"
    },
    {
      quote: "From concept to deployed app in one session. The technical architecture saved me months of development planning.",
      author: "Jennifer Kim",
      role: "CTO, MindfulMetrics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Startup Foundry
                </h1>
                <p className="text-sm text-gray-600">From Idea to MVP & Business Plan</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/submit-idea')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
            >
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Advanced AI Architecture
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> SaaS Idea</span>
            <br />Into a Complete Startup
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            From concept to production-ready code - get a comprehensive business plan, detailed marketing strategy, 
            technical architecture, and fully functional MVP for your SaaS startup idea in minutes, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/submit-idea')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-4 shadow-xl"
            >
              Launch Your Startup Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-4 border-2 border-indigo-200 hover:border-indigo-300"
            >
              See What You Get
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
            <div className="text-gray-600">Analysis Points</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">15min</div>
            <div className="text-gray-600">Average Generation Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">99%</div>
            <div className="text-gray-600">Production Ready Code</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Responsive Design</div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Startup Package</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to launch your SaaS startup, generated by our AI founding team
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-center text-indigo-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How Our AI Founding Team Works</h3>
            <p className="text-lg text-gray-600">
              Six specialized AI agents collaborate to build your complete startup package
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="text-indigo-600">
                        {step.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{step.description}</CardDescription>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Startup Success Stories</h3>
            <p className="text-lg text-gray-600">
              Real founders who transformed their ideas into successful businesses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Build Your Startup?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of founders who've transformed their ideas into successful businesses
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/submit-idea')}
            className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg"
          >
            Start Your Startup Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
