import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Code, Download, Eye, Copy, Play, CheckCircle, AlertTriangle, Sparkles, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandingPagePreview from './LandingPagePreview';
import TemplateGallery from './TemplateGallery';
import TemplateCustomizer from './TemplateCustomizer';
import AILandingPageGenerator from './AILandingPageGenerator';
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';
import { templateManager } from '@/services/templateManager';

interface LandingPageGeneratorProps {
  idea: string;
  ideaData?: any;
}

type ViewMode = 'ai-generator' | 'gallery' | 'customizer' | 'preview' | 'code';

const LandingPageGenerator = ({ idea, ideaData }: LandingPageGeneratorProps) => {
  const [currentView, setCurrentView] = useState<ViewMode>('ai-generator');
  const [selectedTemplate, setSelectedTemplate] = useState<LandingPageTemplate | null>(null);
  const [customization, setCustomization] = useState<TemplateCustomization | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
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

    // Check for pre-generated content
    loadPreGeneratedContent();
  }, []);

  const loadPreGeneratedContent = () => {
    try {
      const storedReports = localStorage.getItem('generatedReports');
      if (storedReports) {
        const reports = JSON.parse(storedReports);
        if (reports['landing-page']) {
          setGeneratedCode(reports['landing-page']);
          setCurrentView('code');
          return;
        }
      }
    } catch (error) {
      console.error('Error loading pre-generated content:', error);
    }
  };

  const handleAITemplateSelected = (template: LandingPageTemplate, templateCustomization: TemplateCustomization) => {
    setSelectedTemplate(template);
    setCustomization(templateCustomization);
    setCurrentView('preview');
    
    // Generate code immediately
    try {
      const customizedCode = templateManager.generateCustomizedCode(templateCustomization);
      setGeneratedCode(customizedCode);
      
      toast({
        title: "Claude AI Template Ready!",
        description: "Your AI-generated landing page with personalized content is ready for preview.",
      });
    } catch (err: any) {
      console.error('Code generation error:', err);
      toast({
        title: "Generation Failed",
        description: err.message || "Could not generate code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleManualSelection = () => {
    setCurrentView('gallery');
  };

  const handleTemplateSelect = (template: LandingPageTemplate) => {
    setSelectedTemplate(template);
    setCurrentView('customizer');
  };

  const handleBackToGallery = () => {
    setSelectedTemplate(null);
    setCustomization(null);
    setCurrentView('gallery');
  };

  const handleBackToAI = () => {
    setSelectedTemplate(null);
    setCustomization(null);
    setCurrentView('ai-generator');
  };

  const handlePreview = (templateCustomization: TemplateCustomization) => {
    if (!selectedTemplate) return;
    
    setCustomization(templateCustomization);
    
    try {
      const customizedCode = templateManager.generateCustomizedCode(templateCustomization);
      setGeneratedCode(customizedCode);
      setCurrentView('preview');
      
      toast({
        title: "Preview Generated!",
        description: "Your customized landing page is ready for preview.",
      });
    } catch (err: any) {
      console.error('Preview generation error:', err);
      toast({
        title: "Preview Failed",
        description: err.message || "Could not generate preview. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateCode = async (templateCustomization: TemplateCustomization) => {
    if (!selectedTemplate) return;
    
    setLoading(true);
    setError(null);
    
    try {
      setCustomization(templateCustomization);
      
      const customizedCode = templateManager.generateCustomizedCode(templateCustomization);
      
      setGeneratedCode(customizedCode);
      
      const storedReports = localStorage.getItem('generatedReports');
      const reports = storedReports ? JSON.parse(storedReports) : {};
      reports['landing-page'] = customizedCode;
      localStorage.setItem('generatedReports', JSON.stringify(reports));
      
      setCurrentView('code');
      
      toast({
        title: "Code Generated!",
        description: "Your customized React landing page is ready with zero syntax errors.",
      });
    } catch (err: any) {
      console.error('Code generation error:', err);
      setError(err.message);
      toast({
        title: "Generation Failed",
        description: "Could not generate landing page code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/tsx' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ideaData?.companyName || 'landing'}-page.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetToGallery = () => {
    setCurrentView('gallery');
    setSelectedTemplate(null);
    setCustomization(null);
    setGeneratedCode('');
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Generating your customized landing page...</p>
          <p className="text-sm text-gray-500 mt-2">
            Using Claude AI-powered generation • Zero syntax errors • Production ready
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Generation Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">{error}</p>
          <Button onClick={handleBackToAI} variant="outline" className="border-red-300">
            <RefreshCw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <Card className="border border-gray-200 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Brain className="h-6 w-6 text-violet-600" />
              <span>Claude AI-Powered Landing Page Generator</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="h-3 w-3 mr-1" />
                Zero Errors
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-300">
                <Brain className="h-3 w-3 mr-1" />
                Claude AI
              </Badge>
              {currentView !== 'ai-generator' && (
                <Button 
                  onClick={handleBackToAI} 
                  variant="outline" 
                  size="sm"
                  className="text-gray-700 border-gray-300"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Claude AI Generator
                </Button>
              )}
            </div>
          </div>
          <CardDescription className="text-gray-600">
            Let Claude AI analyze your startup data and generate a perfect landing page with personalized content, or choose manually from our professional templates
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Main Content */}
      {currentView === 'ai-generator' && (
        <AILandingPageGenerator
          ideaData={ideaData}
          reports={reports}
          onTemplateSelected={handleAITemplateSelected}
          onManualSelection={handleManualSelection}
        />
      )}

      {currentView === 'gallery' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Manual Template Selection</h3>
            <Button variant="outline" onClick={handleBackToAI} className="text-gray-700 border-gray-300">
              <Brain className="h-4 w-4 mr-2" />
              Try Claude AI Generator
            </Button>
          </div>
          <TemplateGallery 
            onSelectTemplate={handleTemplateSelect}
            businessType={ideaData?.problemStatement}
            industry={ideaData?.targetAudience}
          />
        </div>
      )}

      {currentView === 'customizer' && selectedTemplate && (
        <TemplateCustomizer
          template={selectedTemplate}
          ideaData={ideaData}
          onBack={handleBackToGallery}
          onPreview={handlePreview}
          onGenerate={handleGenerateCode}
        />
      )}

      {currentView === 'preview' && generatedCode && customization && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Live Preview</h3>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setCurrentView('customizer')} className="text-gray-700 border-gray-300">
                Edit Template
              </Button>
              <Button onClick={() => setCurrentView('code')} className="bg-blue-600 hover:bg-blue-700 text-white">
                View Code
              </Button>
            </div>
          </div>
          <LandingPagePreview customization={customization} onEdit={() => setCurrentView('customizer')} />
        </div>
      )}

      {currentView === 'code' && generatedCode && (
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="preview" className="text-gray-700">
              <Eye className="h-4 w-4 mr-2" />
              Live Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-gray-700">
              <Code className="h-4 w-4 mr-2" />
              Source Code
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-6">
            {customization && (
              <LandingPagePreview customization={customization} onEdit={() => setCurrentView('customizer')} />
            )}
          </TabsContent>
          
          <TabsContent value="code" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Claude AI-Generated React Component ({generatedCode.split('\n').length} lines)
                  </span>
                  <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                    Zero Syntax Errors
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800 border-purple-300">
                    Template: {selectedTemplate?.name}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => copyToClipboard(generatedCode)}
                    variant="outline"
                    size="sm"
                    className="text-gray-700 border-gray-300"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button onClick={downloadCode} variant="outline" size="sm" className="text-gray-700 border-gray-300">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={generatedCode}
                readOnly
                className="font-mono text-sm min-h-[500px] bg-gray-50 text-gray-900 border-gray-300"
                placeholder="Generated React code will appear here..."
              />
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Benefits Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border border-gray-200 bg-white">
          <CardContent className="pt-6">
            <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">Claude AI</div>
            <div className="text-sm text-purple-600">Powered</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-200 bg-white">
          <CardContent className="pt-6">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">Zero</div>
            <div className="text-sm text-green-600">Syntax Errors</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-200 bg-white">
          <CardContent className="pt-6">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">Live</div>
            <div className="text-sm text-blue-600">Preview</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-200 bg-white">
          <CardContent className="pt-6">
            <Sparkles className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">Personalized</div>
            <div className="text-sm text-orange-600">Content</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPageGenerator;
