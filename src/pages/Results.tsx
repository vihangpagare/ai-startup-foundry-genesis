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
import LandingPageGenerator from '@/components/LandingPageGenerator';
import { exportToPDF, downloadCompletePackage } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';

const Results = () => {
  const [ideaData, setIdeaData] = useState<any>(null);
  const [generatedReports, setGeneratedReports] = useState<Record<string, string>>({});
  const [executiveSummary, setExecutiveSummary] = useState({
    timeToMarket: '3-6 months',
    viabilityScore: '85%'
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem('saasIdea');
    const storedReports = localStorage.getItem('generatedReports');
    
    if (!storedData || !storedReports) {
      navigate('/submit-idea');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      const parsedReports = JSON.parse(storedReports);
      setIdeaData(parsedData);
      setGeneratedReports(parsedReports);
      generateDynamicExecutiveSummary(parsedData, parsedReports);
    } catch (error) {
      navigate('/submit-idea');
    }
  }, [navigate]);

  const generateDynamicExecutiveSummary = (data: any, reports: Record<string, string>) => {
    // Extract insights from AI-generated reports to create dynamic metrics
    const idea = data.idea?.toLowerCase() || '';
    
    // Industry-based refinements for time to market
    let timeToMarket = '3-6 months';
    
    if (idea.includes('restaurant') || idea.includes('food')) {
      timeToMarket = '2-4 months';
    } else if (idea.includes('health') || idea.includes('medical')) {
      timeToMarket = '6-12 months';
    } else if (idea.includes('fintech') || idea.includes('finance')) {
      timeToMarket = '6-12 months';
    }

    // Calculate viability score based on report content quality
    let viabilityScore = 75;
    
    // Boost score for well-defined problems and solutions
    if (data.problemStatement && data.solution) viabilityScore += 10;
    if (data.uniqueValue) viabilityScore += 5;
    if (data.targetAudience && data.targetAudience !== 'Not specified') viabilityScore += 5;
    
    // Analyze report content quality
    const businessPlan = reports['business-plan'] || '';
    if (businessPlan.length > 2000) viabilityScore += 3;
    if (reports['financial']?.includes('revenue model')) viabilityScore += 2;
    if (reports['competitive']?.includes('competitor')) viabilityScore += 3;
    
    viabilityScore = Math.min(viabilityScore, 97);

    setExecutiveSummary({
      timeToMarket,
      viabilityScore: `${viabilityScore}%`
    });
  };

  const handleExportPDF = async () => {
    try {
      const success = await exportToPDF(ideaData);
      if (success) {
        toast({
          title: "Export Successful",
          description: "Your business plan has been exported. Check your downloads folder.",
        });
      } else {
        throw new Error("Export failed");
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your business plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPackage = async () => {
    try {
      const success = await downloadCompletePackage(ideaData);
      if (success) {
        toast({
          title: "Download Complete",
          description: "Your complete startup package has been downloaded. Check your downloads folder.",
        });
      } else {
        throw new Error("Download failed");
      }
    } catch (error) {
      toast({
        title: "Download Failed", 
        description: "There was an error downloading your package. Please try again.",
        variant: "destructive",
      });
    }
  };

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

  if (!ideaData) return null;

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
              <Button variant="outline" onClick={handleExportPDF}>
                <FileText className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                onClick={handleDownloadPackage}
              >
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
                  <span className="text-sm text-green-700">AI-generated with {executiveSummary.viabilityScore} market viability score</span>
                </div>
              </div>
            </CardTitle>
            <CardDescription className="text-lg">
              <strong>SaaS Concept:</strong> {ideaData.companyName && `"${ideaData.companyName}" - `}
              {ideaData.idea.substring(0, 200)}...
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Executive Summary Cards - Reduced to 2 cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{executiveSummary.timeToMarket}</div>
              <div className="text-sm text-gray-600">Time to Market</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-1">{executiveSummary.viabilityScore}</div>
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
              <span>Complete AI-Powered Startup Analysis</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Comprehensive business foundation with AI-generated analysis across all critical startup dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="business-plan" className="w-full">
              <TabsList className="grid w-full grid-cols-7 bg-gray-100">
                <TabsTrigger value="business-plan" className="text-sm">Business Plan</TabsTrigger>
                <TabsTrigger value="marketing" className="text-sm">Marketing</TabsTrigger>
                <TabsTrigger value="competitive" className="text-sm">Competition</TabsTrigger>
                <TabsTrigger value="technical" className="text-sm">Technical</TabsTrigger>
                <TabsTrigger value="ux-design" className="text-sm">UX Design</TabsTrigger>
                <TabsTrigger value="financial" className="text-sm">Financial</TabsTrigger>
                <TabsTrigger value="landing-page" className="text-sm">Landing Page</TabsTrigger>
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
              
              <TabsContent value="landing-page" className="mt-6">
                <LandingPageGenerator idea={ideaData.idea} ideaData={ideaData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Results;
