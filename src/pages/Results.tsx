
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, FileText, TrendingUp, Code, CheckCircle, Sparkles, Building, Users, Zap, PieChart, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessPlan from '@/components/BusinessPlan';
import MarketingStrategy from '@/components/MarketingStrategy';
import TechnicalSpecs from '@/components/TechnicalSpecs';
import FinancialProjections from '@/components/FinancialProjections';
import CompetitiveAnalysis from '@/components/CompetitiveAnalysis';
import UserExperience from '@/components/UserExperience';

const Results = () => {
  const [ideaData, setIdeaData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('saasIdea');
    if (!storedData) {
      navigate('/submit-idea');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setIdeaData(parsedData);
    } catch (error) {
      navigate('/submit-idea');
    }
  }, [navigate]);

  if (!ideaData) return null;

  const deliverables = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Strategic Business Plan",
      description: "Comprehensive business strategy, market analysis, and operational framework",
      status: "Complete",
      pages: "25-30 pages"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Marketing & Growth Strategy",
      description: "Go-to-market plan, customer acquisition, and revenue optimization",
      status: "Complete", 
      pages: "15-20 pages"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Competitive Analysis",
      description: "Market positioning, competitor research, and differentiation strategy",
      status: "Complete",
      pages: "10-12 pages"
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Technical Architecture",
      description: "MVP specifications, system design, and development roadmap",
      status: "Complete",
      pages: "20-25 pages"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "User Experience Design",
      description: "Wireframes, user flows, and responsive design specifications", 
      status: "Complete",
      pages: "15-18 pages"
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      title: "Financial Projections",
      description: "Revenue models, cost analysis, and 3-year financial forecasts",
      status: "Complete",
      pages: "12-15 pages"
    }
  ];

  const executiveSummary = {
    marketSize: ideaData.idea.toLowerCase().includes('restaurant') ? '$15.2B' :
                ideaData.idea.toLowerCase().includes('design') ? '$8.4B' :
                ideaData.idea.toLowerCase().includes('hr') ? '$24.3B' : '$195B',
    targetMarket: ideaData.targetAudience || 'Small to medium businesses',
    revenueProjection: '$250K-500K',
    timeToMarket: '3-6 months',
    initialInvestment: '$50K-100K'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
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
            <div className="flex space-x-3">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Download className="mr-2 h-4 w-4" />
                Download Complete Package
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Banner */}
        <Card className="mb-8 border-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <span className="text-2xl font-bold text-green-800">Your Complete Startup Package is Ready!</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Generated in 12 minutes with 95% market viability score</span>
                </div>
              </div>
            </CardTitle>
            <CardDescription className="text-lg">
              <strong>SaaS Concept:</strong> {ideaData.companyName && `"${ideaData.companyName}" - `}
              {ideaData.idea.substring(0, 200)}...
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Executive Summary Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-indigo-600 mb-1">{executiveSummary.marketSize}</div>
              <div className="text-sm text-gray-600">Market Size</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">{executiveSummary.revenueProjection}</div>
              <div className="text-sm text-gray-600">Year 1 Revenue</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-indigo-600 mb-1">{executiveSummary.timeToMarket}</div>
              <div className="text-sm text-gray-600">Time to Market</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">{executiveSummary.initialInvestment}</div>
              <div className="text-sm text-gray-600">Initial Investment</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">Viability Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Deliverables Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {deliverables.map((deliverable, index) => (
            <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">{deliverable.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{deliverable.title}</CardTitle>
                      <div className="text-xs text-gray-500">{deliverable.pages}</div>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    {deliverable.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{deliverable.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comprehensive Analysis Tabs */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Zap className="h-6 w-6 text-indigo-600" />
              <span>Complete Startup Analysis & Documentation</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Comprehensive business foundation with detailed analysis across all critical startup dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="business-plan" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-gray-100">
                <TabsTrigger value="business-plan" className="text-sm">Business Plan</TabsTrigger>
                <TabsTrigger value="marketing" className="text-sm">Marketing</TabsTrigger>
                <TabsTrigger value="competitive" className="text-sm">Competition</TabsTrigger>
                <TabsTrigger value="technical" className="text-sm">Technical</TabsTrigger>
                <TabsTrigger value="ux-design" className="text-sm">UX Design</TabsTrigger>
                <TabsTrigger value="financial" className="text-sm">Financial</TabsTrigger>
              </TabsList>
              
              <TabsContent value="business-plan" className="mt-6">
                <BusinessPlan idea={ideaData.idea} ideaData={ideaData} />
              </TabsContent>
              
              <TabsContent value="marketing" className="mt-6">
                <MarketingStrategy idea={ideaData.idea} ideaData={ideaData} />
              </TabsContent>
              
              <TabsContent value="competitive" className="mt-6">
                <CompetitiveAnalysis idea={ideaData.idea} ideaData={ideaData} />
              </TabsContent>
              
              <TabsContent value="technical" className="mt-6">
                <TechnicalSpecs idea={ideaData.idea} ideaData={ideaData} />
              </TabsContent>
              
              <TabsContent value="ux-design" className="mt-6">
                <UserExperience idea={ideaData.idea} ideaData={ideaData} />
              </TabsContent>
              
              <TabsContent value="financial" className="mt-6">
                <FinancialProjections idea={ideaData.idea} ideaData={ideaData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Results;
