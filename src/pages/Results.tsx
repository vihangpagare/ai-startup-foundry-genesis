
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, BarChart3, Lightbulb, Code, DollarSign, Users, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import existing components
import BusinessPlan from '@/components/BusinessPlan';
import MarketingStrategy from '@/components/MarketingStrategy';
import CompetitiveAnalysis from '@/components/CompetitiveAnalysis';
import TechnicalSpecs from '@/components/TechnicalSpecs';
import FinancialProjections from '@/components/FinancialProjections';
import UserExperience from '@/components/UserExperience';
import LandingPageGenerator from '@/components/LandingPageGenerator';

// Import enhanced components
import EnhancedDataVisualization from '@/components/EnhancedDataVisualization';
import EnhancedReportRenderer from '@/components/EnhancedReportRenderer';

// Import export utilities
import { exportToPDF, downloadCompletePackage } from '@/utils/exportUtils';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ideaData, setIdeaData] = useState<any>(null);
  const [reports, setReports] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('business-plan');

  useEffect(() => {
    // Load idea data from localStorage
    const storedData = localStorage.getItem('saasIdea');
    if (!storedData) {
      navigate('/submit-idea');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setIdeaData(parsedData);
    } catch (error) {
      console.error('Error parsing stored data:', error);
      navigate('/submit-idea');
      return;
    }

    // Load generated reports
    const storedReports = localStorage.getItem('generatedReports');
    if (storedReports) {
      try {
        const parsedReports = JSON.parse(storedReports);
        setReports(parsedReports);
      } catch (error) {
        console.error('Error parsing stored reports:', error);
      }
    }
  }, [navigate]);

  const handleExportPDF = async () => {
    if (!ideaData) return;
    
    try {
      const success = await exportToPDF(ideaData);
      if (success) {
        toast({
          title: "Export Successful",
          description: "Your business plan has been exported as PDF.",
        });
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPackage = async () => {
    if (!ideaData) return;
    
    try {
      const success = await downloadCompletePackage(ideaData);
      if (success) {
        toast({
          title: "Download Successful",
          description: "Your complete startup package has been downloaded.",
        });
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download package. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!ideaData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Lightbulb className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">{ideaData.companyName || 'Your Startup'}</h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">{ideaData.idea}</p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button onClick={handleExportPDF} className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Export PDF</span>
            </Button>
            <Button onClick={handleDownloadPackage} variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Complete Package</span>
            </Button>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ✅ Business Plan Complete
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              📊 Market Analysis Ready
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              🚀 Ready for Launch
            </Badge>
          </div>
        </div>

        {/* Enhanced Data Visualization */}
        <div className="mb-8">
          <EnhancedDataVisualization ideaData={ideaData} reports={reports} />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:grid-cols-7">
            <TabsTrigger value="business-plan" className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Business</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="competitive" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Competitive</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center space-x-1">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Technical</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="ux-design" className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">UX Design</span>
            </TabsTrigger>
            <TabsTrigger value="landing-page" className="flex items-center space-x-1">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Landing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business-plan">
            {reports['business-plan'] ? (
              <EnhancedReportRenderer 
                content={reports['business-plan']} 
                title="Business Plan Analysis" 
                type="business-plan" 
              />
            ) : (
              <BusinessPlan idea={ideaData.idea} ideaData={ideaData} />
            )}
          </TabsContent>

          <TabsContent value="marketing">
            {reports['marketing'] ? (
              <EnhancedReportRenderer 
                content={reports['marketing']} 
                title="Marketing Strategy" 
                type="marketing" 
              />
            ) : (
              <MarketingStrategy idea={ideaData.idea} ideaData={ideaData} />
            )}
          </TabsContent>

          <TabsContent value="competitive">
            {reports['competitive'] ? (
              <EnhancedReportRenderer 
                content={reports['competitive']} 
                title="Competitive Analysis" 
                type="competitive" 
              />
            ) : (
              <CompetitiveAnalysis idea={ideaData.idea} ideaData={ideaData} />
            )}
          </TabsContent>

          <TabsContent value="technical">
            {reports['technical'] ? (
              <EnhancedReportRenderer 
                content={reports['technical']} 
                title="Technical Specifications" 
                type="technical" 
              />
            ) : (
              <TechnicalSpecs idea={ideaData.idea} ideaData={ideaData} />
            )}
          </TabsContent>

          <TabsContent value="financial">
            {reports['financial'] ? (
              <EnhancedReportRenderer 
                content={reports['financial']} 
                title="Financial Projections" 
                type="financial" 
              />
            ) : (
              <FinancialProjections idea={ideaData.idea} ideaData={ideaData} />
            )}
          </TabsContent>

          <TabsContent value="ux-design">
            {reports['ux-design'] ? (
              <EnhancedReportRenderer 
                content={reports['ux-design']} 
                title="UX Design Specifications" 
                type="ux-design" 
              />
            ) : (
              <UserExperience idea={ideaData.idea} ideaData={ideaData} />
            )}
          </TabsContent>

          <TabsContent value="landing-page">
            <LandingPageGenerator idea={ideaData.idea} ideaData={ideaData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Results;
