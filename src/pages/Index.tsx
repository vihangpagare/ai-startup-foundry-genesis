
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, FileText, Code, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Strategic Planning",
      description: "Comprehensive business plan with market analysis, competitive research, and financial projections"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Marketing Strategy",
      description: "Complete go-to-market plan with messaging, pricing strategies, and customer acquisition funnels"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "MVP Development",
      description: "Fully functional React application with responsive design and database integration"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Documentation",
      description: "Complete setup guides, deployment instructions, and project roadmap"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Startup Foundry</h1>
            </div>
            <Button 
              onClick={() => navigate('/submit-idea')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Transform Your SaaS Idea Into a 
            <span className="text-indigo-600"> Complete Startup Package</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From concept to code - get a comprehensive business plan, marketing strategy, 
            and fully functional MVP for your SaaS startup idea in minutes.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/submit-idea')}
            className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3"
          >
            Launch Your Startup Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Submit Your Idea</h4>
              <p className="text-gray-600">Describe your SaaS concept, target problem, and proposed solution</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">AI Analysis</h4>
              <p className="text-gray-600">Our AI team analyzes your idea across strategy, marketing, and technical dimensions</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Get Your Package</h4>
              <p className="text-gray-600">Receive comprehensive business plan, marketing strategy, and functional MVP</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
