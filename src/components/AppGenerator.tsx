
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Code, Download, Eye, Copy, Play, CheckCircle, AlertTriangle, Sparkles, Brain, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppPreview from './AppPreview';
import AIAppGenerator from './AIAppGenerator';
import { AppTemplate, AppCustomization } from '@/types/appTemplate';
import { appTemplateManager } from '@/services/appTemplateManager';

interface AppGeneratorProps {
  idea: string;
  ideaData?: any;
}

type ViewMode = 'ai-generator' | 'preview' | 'code';

const AppGenerator = ({ idea, ideaData }: AppGeneratorProps) => {
  const [currentView, setCurrentView] = useState<ViewMode>('ai-generator');
  const [selectedTemplate, setSelectedTemplate] = useState<AppTemplate | null>(null);
  const [customization, setCustomization] = useState<AppCustomization | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    console.log('AppGenerator initialized with:', { idea: idea?.substring(0, 50), ideaData: ideaData?.companyName });
    loadStoredData();
    validateEnvironment();
  }, []);

  const loadStoredData = () => {
    try {
      const storedReports = localStorage.getItem('generatedReports');
      if (storedReports) {
        const parsedReports = JSON.parse(storedReports);
        setReports(parsedReports);
        console.log('Loaded reports:', Object.keys(parsedReports));
      }

      // Check for pre-generated app content
      loadPreGeneratedAppContent();
    } catch (error) {
      console.error('Error loading stored data:', error);
      setValidationErrors(prev => [...prev, 'Failed to load stored data']);
    }
  };

  const validateEnvironment = () => {
    const errors: string[] = [];
    
    // Check if required services are available
    if (!appTemplateManager) {
      errors.push('App template manager not available');
    }

    // Validate template availability
    try {
      const templates = appTemplateManager.getTemplates();
      if (!templates || templates.length === 0) {
        errors.push('No app templates available');
      } else {
        console.log('Available templates:', templates.map(t => t.id));
      }
    } catch (error) {
      errors.push('Template validation failed');
    }

    setValidationErrors(errors);
  };

  const loadPreGeneratedAppContent = () => {
    try {
      const storedReports = localStorage.getItem('generatedReports');
      if (storedReports) {
        const reports = JSON.parse(storedReports);
        if (reports['generated-app']) {
          setGeneratedCode(reports['generated-app']);
          setCurrentView('code');
          console.log('Pre-generated app content loaded');
          return;
        }
      }
    } catch (error) {
      console.error('Error loading pre-generated app content:', error);
    }
  };

  const handleAIAppSelected = (template: AppTemplate, appCustomization: AppCustomization) => {
    console.log('AI app selected:', { templateId: template.id, customization: appCustomization });
    
    try {
      setSelectedTemplate(template);
      setCustomization(appCustomization);
      setError(null);
      setCurrentView('preview');
      
      // Generate code immediately with error handling
      const customizedCode = appTemplateManager.generateCustomizedApp(appCustomization);
      
      if (!customizedCode || customizedCode.trim().length === 0) {
        throw new Error('Generated code is empty');
      }
      
      setGeneratedCode(customizedCode);
      
      toast({
        title: "App Generated Successfully!",
        description: "Your feature-centric web application is ready for preview.",
      });
      
    } catch (err: any) {
      console.error('App generation error:', err);
      setError(`Failed to generate app: ${err.message}`);
      
      toast({
        title: "Generation Failed",
        description: err.message || "Could not generate app code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackToAI = () => {
    console.log('Navigating back to AI generator');
    setSelectedTemplate(null);
    setCustomization(null);
    setError(null);
    setCurrentView('ai-generator');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "App code copied to clipboard",
      });
    } catch (err) {
      console.error('Copy failed:', err);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadCode = () => {
    try {
      const blob = new Blob([generatedCode], { type: 'text/tsx' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${ideaData?.companyName || 'app'}-application.tsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "App code file downloaded successfully",
      });
    } catch (err) {
      console.error('Download failed:', err);
      toast({
        title: "Download Failed",
        description: "Could not download the code file",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-900 font-medium">Generating your feature-centric web application...</p>
          <p className="text-sm text-gray-600 mt-2">
            AI-powered generation • Interactive dashboard • Production ready
          </p>
        </div>
      </div>
    );
  }

  if (error || validationErrors.length > 0) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>App Generation Issues Detected</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-700 mb-4 font-medium">{error}</p>}
          {validationErrors.length > 0 && (
            <div className="mb-4">
              <p className="text-red-700 font-medium mb-2">Validation Errors:</p>
              <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                {validationErrors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex space-x-2">
            <Button onClick={handleBackToAI} variant="outline" className="border-red-300 text-red-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white">
              Reload Application
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <Card className="border border-gray-200 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Brain className="h-6 w-6 text-blue-600" />
              <span>AI Web App Generator</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="h-3 w-3 mr-1" />
                Feature-Centric
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-300">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
              {currentView !== 'ai-generator' && (
                <Button 
                  onClick={handleBackToAI} 
                  variant="outline" 
                  size="sm"
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  AI Generator
                </Button>
              )}
            </div>
          </div>
          <CardDescription className="text-gray-700">
            Generate a complete feature-centric web application with AI analysis of your startup data, 
            featuring interactive navigation, authentication, and business-specific functionality
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Main Content */}
      {currentView === 'ai-generator' && (
        <AIAppGenerator
          ideaData={ideaData}
          reports={reports}
          onAppSelected={handleAIAppSelected}
        />
      )}

      {currentView === 'preview' && generatedCode && customization && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Live App Preview</h3>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleBackToAI} className="text-gray-700 border-gray-300 hover:bg-gray-50">
                Generate Different App
              </Button>
              <Button onClick={() => setCurrentView('code')} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Code className="h-4 w-4 mr-2" />
                View Source Code
              </Button>
            </div>
          </div>
          <AppPreview customization={customization} onEdit={handleBackToAI} />
        </div>
      )}

      {currentView === 'code' && generatedCode && (
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="preview" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900">
              <Eye className="h-4 w-4 mr-2" />
              Live Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900">
              <Code className="h-4 w-4 mr-2" />
              Source Code
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-6">
            {customization && (
              <AppPreview customization={customization} onEdit={handleBackToAI} />
            )}
          </TabsContent>
          
          <TabsContent value="code" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700 font-medium">
                    Generated React App ({generatedCode.split('\n').length} lines)
                  </span>
                  <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                    Feature-Centric Dashboard
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-300">
                    Template: {selectedTemplate?.name}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => copyToClipboard(generatedCode)}
                    variant="outline"
                    size="sm"
                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button onClick={downloadCode} variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={generatedCode}
                readOnly
                className="font-mono text-sm min-h-[500px] bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500"
                placeholder="Generated React app code will appear here..."
              />
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Enhanced Benefits Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">AI-Powered</div>
            <div className="text-sm text-purple-600">Intelligent Generation</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">Feature-Rich</div>
            <div className="text-sm text-blue-600">Interactive Dashboard</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Play className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">Production Ready</div>
            <div className="text-sm text-green-600">Fully Functional</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <Sparkles className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">Customized</div>
            <div className="text-sm text-orange-600">Business-Specific</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppGenerator;
