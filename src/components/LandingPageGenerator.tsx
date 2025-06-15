
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Code, Download, Eye, Copy, Play, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandingPagePreview from './LandingPagePreview';
import TemplateGallery from './TemplateGallery';
import TemplateCustomizer from './TemplateCustomizer';
import { LandingPageTemplate, TemplateCustomization } from '@/types/template';
import { templateManager } from '@/services/templateManager';

interface LandingPageGeneratorProps {
  idea: string;
  ideaData?: any;
}

type ViewMode = 'gallery' | 'customizer' | 'preview' | 'code';

const LandingPageGenerator = ({ idea, ideaData }: LandingPageGeneratorProps) => {
  const [currentView, setCurrentView] = useState<ViewMode>('gallery');
  const [selectedTemplate, setSelectedTemplate] = useState<LandingPageTemplate | null>(null);
  const [customization, setCustomization] = useState<TemplateCustomization | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
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

  const handleTemplateSelect = (template: LandingPageTemplate) => {
    setSelectedTemplate(template);
    setCurrentView('customizer');
  };

  const handleBackToGallery = () => {
    setSelectedTemplate(null);
    setCustomization(null);
    setCurrentView('gallery');
  };

  const handlePreview = (templateCustomization: TemplateCustomization) => {
    if (!selectedTemplate) return;
    
    setCustomization(templateCustomization);
    
    try {
      // Generate the customized code
      const customizedCode = templateManager.generateCustomizedCode(
        selectedTemplate.id, 
        templateCustomization
      );
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
      
      // Generate the customized code using template
      const customizedCode = templateManager.generateCustomizedCode(
        selectedTemplate.id, 
        templateCustomization
      );
      
      setGeneratedCode(customizedCode);
      
      // Store in localStorage
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
            Using template-based generation • Zero syntax errors • Production ready
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
          <Button onClick={resetToGallery} variant="outline" className="border-red-300">
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
      <Card className="border-0 shadow-lg bg-gradient-to-r from-violet-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-violet-600" />
              <span>AI-Enhanced Template System</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Zero Errors
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Play className="h-3 w-3 mr-1" />
                Template Based
              </Badge>
              {currentView !== 'gallery' && (
                <Button 
                  onClick={resetToGallery} 
                  variant="outline" 
                  size="sm"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              )}
            </div>
          </div>
          <CardDescription>
            Choose from professionally designed templates, customize with AI assistance, and generate error-free React code for {ideaData?.companyName || 'your startup'}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Main Content */}
      {currentView === 'gallery' && (
        <TemplateGallery 
          onSelectTemplate={handleTemplateSelect}
          businessType={ideaData?.problemStatement}
          industry={ideaData?.targetAudience}
        />
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

      {currentView === 'preview' && generatedCode && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Live Preview</h3>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setCurrentView('customizer')}>
                Edit Template
              </Button>
              <Button onClick={() => setCurrentView('code')}>
                View Code
              </Button>
            </div>
          </div>
          <LandingPagePreview code={generatedCode} />
        </div>
      )}

      {currentView === 'code' && generatedCode && (
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Live Preview
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Source Code
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-6">
            <LandingPagePreview code={generatedCode} />
          </TabsContent>
          
          <TabsContent value="code" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Template-Generated React Component ({generatedCode.split('\n').length} lines)
                  </span>
                  <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                    Zero Syntax Errors
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                    Template: {selectedTemplate?.name}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => copyToClipboard(generatedCode)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button onClick={downloadCode} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={generatedCode}
                readOnly
                className="font-mono text-sm min-h-[500px] bg-gray-50"
                placeholder="Generated React code will appear here..."
              />
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Benefits Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">Zero</div>
            <div className="text-sm text-green-600">Syntax Errors</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">AI</div>
            <div className="text-sm text-blue-600">Customization</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="pt-6">
            <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">Live</div>
            <div className="text-sm text-purple-600">Preview</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="pt-6">
            <Code className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">Template</div>
            <div className="text-sm text-orange-600">Based</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPageGenerator;
