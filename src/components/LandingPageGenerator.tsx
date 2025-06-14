
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Eye, Download } from 'lucide-react';
import { useState } from 'react';

interface LandingPageGeneratorProps {
  idea: string;
  ideaData?: any;
}

const LandingPageGenerator = ({ idea, ideaData }: LandingPageGeneratorProps) => {
  const [showCode, setShowCode] = useState(false);
  
  const generateLandingPageCode = () => {
    const companyName = ideaData?.companyName || "YourSaaS";
    const description = idea.substring(0, 200);
    
    return `import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ${companyName}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-indigo-600">Reviews</a>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-6">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ businesses
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            ${description.split(' ').slice(0, 6).join(' ')}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Made Simple
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            ${description}... Transform your workflow with our intelligent automation platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need to succeed</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex justify-center text-indigo-600 mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Process tasks 10x faster with our intelligent automation
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex justify-center text-indigo-600 mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bank-level security with SOC 2 compliance
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex justify-center text-indigo-600 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real-time collaboration with unlimited team members
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-lg text-gray-600">Start free, scale as you grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="text-3xl font-bold">Free</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />5 projects</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Basic features</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Email support</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Get Started</Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-indigo-200 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <div className="text-3xl font-bold">$29<span className="text-sm text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Unlimited projects</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Advanced features</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Priority support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Analytics</li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600">Start Trial</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">$99<span className="text-sm text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Everything in Pro</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Custom integrations</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Dedicated support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />SLA guarantee</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using ${companyName}
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">${companyName}</span>
              </div>
              <p className="text-gray-400">
                Transforming businesses with intelligent automation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ${companyName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;`;
  };

  const downloadCode = () => {
    const code = generateLandingPageCode();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LandingPage.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Landing Page Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-indigo-600" />
            <span>Production-Ready Landing Page</span>
          </CardTitle>
          <CardDescription>
            Complete React landing page with responsive design, modern UI components, and conversion optimization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Key Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Responsive mobile-first design</li>
                <li>• Modern gradient hero section</li>
                <li>• Feature showcase cards</li>
                <li>• Pricing table with CTA buttons</li>
                <li>• Professional navigation & footer</li>
                <li>• Optimized for conversions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Technical Stack</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS styling</li>
                <li>• Shadcn/ui components</li>
                <li>• Lucide React icons</li>
                <li>• Responsive breakpoints</li>
                <li>• SEO-friendly structure</li>
              </ul>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={() => setShowCode(!showCode)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>{showCode ? 'Hide' : 'View'} Code</span>
            </Button>
            <Button 
              onClick={downloadCode}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Component</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Code Display */}
      {showCode && (
        <Card>
          <CardHeader>
            <CardTitle>Landing Page React Component</CardTitle>
            <CardDescription>
              Copy this code to create your landing page component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generateLandingPageCode()}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Implementation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Setup Instructions</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Create a new file: <code className="bg-gray-100 px-1 rounded">src/components/LandingPage.tsx</code></li>
              <li>Copy the generated React component code</li>
              <li>Add routing in your App.tsx or create a new route</li>
              <li>Ensure all required dependencies are installed</li>
              <li>Customize colors, content, and branding</li>
              <li>Test responsiveness across devices</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Customization Points</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Update company name and branding</li>
              <li>• Modify hero section messaging</li>
              <li>• Adjust pricing tiers and features</li>
              <li>• Change color scheme in Tailwind classes</li>
              <li>• Add your own images and assets</li>
              <li>• Integrate with your analytics and forms</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPageGenerator;
