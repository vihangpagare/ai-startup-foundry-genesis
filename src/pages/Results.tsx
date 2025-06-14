
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, FileText, TrendingUp, Code, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessPlan from '@/components/BusinessPlan';
import MarketingStrategy from '@/components/MarketingStrategy';
import TechnicalSpecs from '@/components/TechnicalSpecs';

const Results = () => {
  const [idea, setIdea] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedIdea = localStorage.getItem('saasIdea');
    if (!storedIdea) {
      navigate('/submit-idea');
      return;
    }
    setIdea(storedIdea);
  }, [navigate]);

  const deliverables = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Business Plan",
      description: "Comprehensive strategy, market analysis, and financial projections",
      status: "Complete"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Marketing Strategy",
      description: "Go-to-market plan, messaging, and customer acquisition funnel",
      status: "Complete"
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Technical Specifications",
      description: "MVP requirements, architecture, and development roadmap",
      status: "Complete"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>New Analysis</span>
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Download className="mr-2 h-4 w-4" />
              Download Package
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Idea Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Your Startup Package is Ready!</span>
            </CardTitle>
            <CardDescription>
              Based on your SaaS idea: "{idea.substring(0, 150)}..."
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Deliverables Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {deliverables.map((deliverable, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-indigo-600">{deliverable.icon}</div>
                    <CardTitle className="text-lg">{deliverable.title}</CardTitle>
                  </div>
                  <span className="text-sm text-green-600 font-medium">{deliverable.status}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{deliverable.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Your Complete Startup Package</CardTitle>
            <CardDescription>
              Explore each section to understand your business strategy, marketing approach, and technical implementation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="business-plan" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="business-plan">Business Plan</TabsTrigger>
                <TabsTrigger value="marketing">Marketing Strategy</TabsTrigger>
                <TabsTrigger value="technical">Technical Specs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="business-plan" className="mt-6">
                <BusinessPlan idea={idea} />
              </TabsContent>
              
              <TabsContent value="marketing" className="mt-6">
                <MarketingStrategy idea={idea} />
              </TabsContent>
              
              <TabsContent value="technical" className="mt-6">
                <TechnicalSpecs idea={idea} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Results;
