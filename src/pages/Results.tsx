import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, FileText, TrendingUp, Code, CheckCircle, Sparkles, Building, Users, Zap, PieChart, Target, Rocket, Star, Globe, Brain, BarChart, Presentation, Database, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessPlan from '@/components/BusinessPlan';
import MarketingStrategy from '@/components/MarketingStrategy';
import TechnicalSpecs from '@/components/TechnicalSpecs';
import FinancialProjections from '@/components/FinancialProjections';
import CompetitiveAnalysis from '@/components/CompetitiveAnalysis';
import UserExperience from '@/components/UserExperience';
import LandingPageGenerator from '@/components/LandingPageGenerator';
import DataVisualization from '@/components/DataVisualization';
import RealTimeMarketData from '@/components/RealTimeMarketData';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { exportToPDF, downloadCompletePackage } from '@/utils/exportUtils';
import { exportToAdvancedPDF, exportToPowerPoint, exportToJSON } from '@/utils/enhancedExport';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const ResultsContent = () => {
  const [ideaData, setIdeaData] = useState<any>(null);
  const [generatedReports, setGeneratedReports] = useState<Record<string, string>>({});
  const [executiveSummary, setExecutiveSummary] = useState({
    timeToMarket: '3-6 months',
    viabilityScore: '85%'
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
    const idea = data.idea?.toLowerCase() || '';
    
    let timeToMarket = '3-6 months';
    
    if (idea.includes('restaurant') || idea.includes('food')) {
      timeToMarket = '2-4 months';
    } else if (idea.includes('health') || idea.includes('medical')) {
      timeToMarket = '6-12 months';
    } else if (idea.includes('fintech') || idea.includes('finance')) {
      timeToMarket = '6-12 months';
    }

    let viabilityScore = 75;
    
    if (data.problemStatement && data.solution) viabilityScore += 10;
    if (data.uniqueValue) viabilityScore += 5;
    if (data.targetAudience && data.targetAudience !== 'Not specified') viabilityScore += 5;
    
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

  const handleExportAdvanced = async () => {
    try {
      const success = await exportToAdvancedPDF(ideaData, generatedReports);
      if (success) {
        toast({
          title: "Premium Export Successful",
          description: "Your enhanced business analysis has been exported.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your analysis.",
        variant: "destructive",
      });
    }
  };

  const handleExportPresentation = async () => {
    try {
      const success = await exportToPowerPoint(ideaData, generatedReports);
      if (success) {
        toast({
          title: "Presentation Export Successful", 
          description: "Your presentation slides have been exported.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error creating your presentation.",
        variant: "destructive",
      });
    }
  };

  const handleExportData = async () => {
    try {
      const success = await exportToJSON(ideaData, generatedReports);
      if (success) {
        toast({
          title: "Data Export Successful",
          description: "Your structured data has been exported as JSON.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data.",
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
      icon: <Building className="h-6 w-6" />,
      title: "Strategic Business Plan",
      description: "Comprehensive business strategy, market analysis, and operational framework",
      status: "Complete",
      pages: "25-30 pages",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Marketing & Growth Strategy",
      description: "Go-to-market plan, customer acquisition, and revenue optimization",
      status: "Complete", 
      pages: "15-20 pages",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Competitive Analysis",
      description: "Market positioning, competitor research, and differentiation strategy",
      status: "Complete",
      pages: "10-12 pages",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Technical Architecture",
      description: "MVP specifications, system design, and development roadmap",
      status: "Complete",
      pages: "20-25 pages",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "User Experience Design",
      description: "Wireframes, user flows, and responsive design specifications", 
      status: "Complete",
      pages: "15-18 pages",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Financial Projections",
      description: "Revenue models, cost analysis, and 3-year financial forecasts",
      status: "Complete",
      pages: "12-15 pages",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  if (!ideaData) return null;

  return (
    <div className="min-h-screen animated-bg">
      {/* Enhanced Header with theme toggle */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>New Analysis</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <ThemeSwitcher />
              
              {!isMobile && (
                <>
                  <Button variant="outline" onClick={handleExportAdvanced} className="glass border-white/30 text-white hover:bg-white/10">
                    <FileText className="mr-2 h-4 w-4" />
                    Premium PDF
                  </Button>
                  <Button variant="outline" onClick={handleExportPresentation} className="glass border-white/30 text-white hover:bg-white/10">
                    <Presentation className="mr-2 h-4 w-4" />
                    Slides
                  </Button>
                  <Button variant="outline" onClick={handleExportData} className="glass border-white/30 text-white hover:bg-white/10">
                    <Database className="mr-2 h-4 w-4" />
                    Data
                  </Button>
                </>
              )}
              
              <Button 
                className="btn-vibrant"
                onClick={handleDownloadPackage}
              >
                <Download className="mr-2 h-4 w-4" />
                {isMobile ? 'Download' : 'Complete Package'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isMobile && (
          <Card className="mb-6 card-vibrant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Export Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" onClick={handleExportAdvanced} className="text-xs">
                  <FileText className="mr-1 h-3 w-3" />
                  PDF
                </Button>
                <Button variant="outline" onClick={handleExportPresentation} className="text-xs">
                  <Presentation className="mr-1 h-3 w-3" />
                  Slides
                </Button>
                <Button variant="outline" onClick={handleExportData} className="text-xs">
                  <Database className="mr-1 h-3 w-3" />
                  Data
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <RealTimeMarketData idea={ideaData.idea} />

        <Card className="mb-8 card-vibrant gentle-glow">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-3">
              <div className="bg-gradient-success p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold text-gradient font-poppins">
                  Your Complete Startup Package is Ready! 🚀
                </span>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  <span className="text-lg text-gradient-secondary font-medium">
                    AI-generated with {executiveSummary.viabilityScore} market viability score
                  </span>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </CardTitle>
            <CardDescription className="text-xl mt-4 font-medium">
              <strong className="text-gradient">SaaS Concept:</strong> {ideaData.companyName && `"${ideaData.companyName}" - `}
              {ideaData.idea.substring(0, 200)}...
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-vibrant text-center smooth-hover">
            <CardContent className="pt-6">
              <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">{executiveSummary.timeToMarket}</div>
              <div className="text-sm text-gray-600 font-medium">Time to Market</div>
            </CardContent>
          </Card>
          <Card className="card-vibrant text-center smooth-hover">
            <CardContent className="pt-6">
              <div className="bg-gradient-success p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">{executiveSummary.viabilityScore}</div>
              <div className="text-sm text-gray-600 font-medium">Viability Score</div>
            </CardContent>
          </Card>
          <Card className="card-vibrant text-center smooth-hover">
            <CardContent className="pt-6">
              <div className="bg-gradient-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">Live</div>
              <div className="text-sm text-gray-600 font-medium">Market Research</div>
            </CardContent>
          </Card>
          <Card className="card-vibrant text-center smooth-hover">
            <CardContent className="pt-6">
              <div className="bg-gradient-warning p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">AI</div>
              <div className="text-sm text-gray-600 font-medium">Powered Analysis</div>
            </CardContent>
          </Card>
        </div>

        <DataVisualization ideaData={ideaData} reports={generatedReports} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {deliverables.map((deliverable, index) => (
            <Card key={index} className="card-vibrant hover:shadow-vibrant transition-all duration-500 smooth-hover">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-gradient-to-r ${deliverable.gradient} p-3 rounded-xl text-white shadow-lg`}>
                      {deliverable.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-poppins">{deliverable.title}</CardTitle>
                      <div className="text-xs text-gray-500 font-medium">{deliverable.pages}</div>
                    </div>
                  </div>
                  <span className="text-sm text-white font-bold bg-gradient-success px-3 py-2 rounded-full shadow-lg">
                    ✓ {deliverable.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 font-medium">{deliverable.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-vibrant shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl flex items-center justify-center space-x-3 font-poppins">
              <div className="bg-gradient-primary p-3 rounded-full">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <span className="text-gradient">Complete AI-Powered Startup Analysis</span>
            </CardTitle>
            <CardDescription className="text-xl text-gray-700 dark:text-gray-300 font-medium">
              Comprehensive business foundation with AI-generated analysis, live market data, and advanced visualizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className={`grid w-full ${isMobile ? 'grid-cols-4' : 'grid-cols-8'} bg-gradient-primary p-2 rounded-2xl`}>
                <TabsTrigger value="overview" className="text-sm font-medium text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-xl transition-all">
                  {isMobile ? '📊' : 'Overview'}
                </TabsTrigger>
                <TabsTrigger value="business-plan" className="text-sm font-medium text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-xl transition-all">
                  {isMobile ? '📋' : 'Business'}
                </TabsTrigger>
                <TabsTrigger value="marketing" className="text-sm font-medium text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-xl transition-all">
                  {isMobile ? '📈' : 'Marketing'}
                </TabsTrigger>
                <TabsTrigger value="competitive" className="text-sm font-medium text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-xl transition-all">
                  {isMobile ? '🎯' : 'Competition'}
                </TabsTrigger>
                {!isMobile && (
                  <>
                    <TabsTrigger value="technical" className="text-sm font-medium text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-xl transition-all">Technical</TabsTrigger>
                    <TabsTrigger value="ux-design" className="text-sm font-medium text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-xl transition-all">UX Design</TabsTrigger>
                    <TabsTrigger value="financial" className="text-sm font-medium text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-xl transition-all">Financial</TabsTrigger>
                    <TabsTrigger value="landing-page" className="text-sm font-medium text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-xl transition-all">Landing Page</TabsTrigger>
                  </>
                )}
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <DataVisualization ideaData={ideaData} reports={generatedReports} />
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="report-section">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <BarChart className="h-5 w-5" />
                          <span>Key Metrics Dashboard</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Market Opportunity</span>
                            <Badge className="bg-green-100 text-green-800">High</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Technical Feasibility</span>
                            <Badge className="bg-blue-100 text-blue-800">Very High</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Competition Level</span>
                            <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Investment Appeal</span>
                            <Badge className="bg-purple-100 text-purple-800">Strong</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="report-section">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5" />
                          <span>Next Steps Roadmap</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">MVP Development (Month 1-2)</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">Beta Testing (Month 3)</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-sm">Market Launch (Month 4-5)</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                            <span className="text-sm">Scale & Growth (Month 6+)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="business-plan" className="mt-6">
                <div className="report-section">
                  <BusinessPlan idea={ideaData.idea} ideaData={ideaData} />
                </div>
              </TabsContent>
              
              <TabsContent value="marketing" className="mt-6">
                <div className="report-section">
                  <MarketingStrategy idea={ideaData.idea} ideaData={ideaData} />
                </div>
              </TabsContent>
              
              <TabsContent value="competitive" className="mt-6">
                <div className="report-section">
                  <CompetitiveAnalysis idea={ideaData.idea} ideaData={ideaData} />
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="mt-6">
                <div className="report-section">
                  <TechnicalSpecs idea={ideaData.idea} ideaData={ideaData} />
                </div>
              </TabsContent>
              
              <TabsContent value="ux-design" className="mt-6">
                <div className="report-section">
                  <UserExperience idea={ideaData.idea} ideaData={ideaData} />
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="mt-6">
                <div className="report-section">
                  <FinancialProjections idea={ideaData.idea} ideaData={ideaData} />
                </div>
              </TabsContent>
              
              <TabsContent value="landing-page" className="mt-6">
                <div className="report-section">
                  <LandingPageGenerator idea={ideaData.idea} ideaData={ideaData} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const Results = () => {
  return (
    <ThemeProvider>
      <ResultsContent />
    </ThemeProvider>
  );
};

export default Results;
