
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Code, Download, Eye, Copy, Play, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandingPagePreview from './LandingPagePreview';

interface LandingPageGeneratorProps {
  idea: string;
  ideaData?: any;
}

const LandingPageGenerator = ({ idea, ideaData }: LandingPageGeneratorProps) => {
  const [reactCode, setReactCode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [validationResults, setValidationResults] = useState<{
    issues?: string[];
    fixes?: string[];
  }>({});
  const { toast } = useToast();

  useEffect(() => {
    loadPreGeneratedContent();
  }, []);

  const loadPreGeneratedContent = () => {
    try {
      const storedReports = localStorage.getItem('generatedReports');
      if (storedReports) {
        const reports = JSON.parse(storedReports);
        if (reports['landing-page']) {
          setReactCode(reports['landing-page']);
          setLoading(false);
          return;
        }
      }
      // If no pre-generated content, generate new
      generateLandingPageCode();
    } catch (error) {
      console.error('Error loading pre-generated content:', error);
      generateLandingPageCode();
    }
  };

  const validateCode = async (code: string): Promise<string> => {
    setValidating(true);
    setValidationResults({});
    
    try {
      const { data, error: validationError } = await supabase.functions.invoke('validate-react-code', {
        body: { 
          code,
          companyName: ideaData?.companyName 
        }
      });

      if (validationError) throw validationError;

      if (data?.success) {
        setValidationResults({
          issues: data.issues,
          fixes: data.fixes
        });
        
        if (data.fixes?.length > 0) {
          toast({
            title: "Code Enhanced",
            description: `Applied ${data.fixes.length} improvements to the generated code.`,
          });
        }
        
        return data.validatedCode || code;
      } else {
        throw new Error(data?.error || 'Code validation failed');
      }
    } catch (err: any) {
      console.warn('Code validation failed, using original code:', err.message);
      toast({
        title: "Validation Skipped",
        description: "Using original code without validation.",
        variant: "default",
      });
      return code;
    } finally {
      setValidating(false);
    }
  };

  const generateLandingPageCode = async () => {
    const wasRegenerating = isRegenerating;
    setLoading(true);
    setIsRegenerating(false);
    setError(null);
    setValidationResults({});

    try {
      // Step 1: Generate initial code
      const { data, error: apiError } = await supabase.functions.invoke('ai-startup-analysis', {
        body: {
          idea,
          companyName: ideaData?.companyName,
          targetAudience: ideaData?.targetAudience,
          problemStatement: ideaData?.problemStatement,
          solution: ideaData?.solution,
          uniqueValue: ideaData?.uniqueValue,
          analysisType: 'landing-page'
        }
      });

      if (apiError) throw apiError;
      
      if (data?.success) {
        // Step 2: Validate and enhance the generated code
        const validatedCode = await validateCode(data.analysis);
        setReactCode(validatedCode);
        
        // Update localStorage with the validated code
        const storedReports = localStorage.getItem('generatedReports');
        const reports = storedReports ? JSON.parse(storedReports) : {};
        reports['landing-page'] = validatedCode;
        localStorage.setItem('generatedReports', JSON.stringify(reports));

        toast({
          title: wasRegenerating ? "Code Regenerated!" : "Code Generated!",
          description: "Your React landing page is ready with enhanced validation.",
        });
      } else {
        throw new Error(data?.error || 'Failed to generate landing page code');
      }
    } catch (err: any) {
      console.error('Landing page generation error:', err);
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
    const blob = new Blob([reactCode], { type: 'text/tsx' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ideaData?.companyName || 'landing'}-page.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const regenerateContent = () => {
    setIsRegenerating(true);
    generateLandingPageCode();
  };

  if (loading || validating) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">
            {validating ? 'Validating and enhancing React code...' : 'Generating production-ready React landing page...'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {validating ? 'AI validation • Syntax checking • Code optimization' : 'Creating conversion-optimized components with live preview'}
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
          <Button onClick={regenerateContent} variant="outline" className="border-red-300">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Generation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-violet-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-violet-600" />
              <span>AI-Enhanced React Landing Page</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Play className="h-3 w-3 mr-1" />
                Live Execution
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                AI Validated
              </Badge>
              <Button 
                onClick={regenerateContent} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Generating...' : 'Regenerate'}
              </Button>
            </div>
          </div>
          <CardDescription>
            AI-generated and validated React TypeScript component with real-time execution and optimization for {ideaData?.companyName || 'your SaaS startup'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Validation Results */}
          {(validationResults.fixes?.length || validationResults.issues?.length) && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Code Validation Results
              </h4>
              {validationResults.fixes?.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm text-blue-700 font-medium">✅ Applied Fixes:</p>
                  <ul className="text-sm text-blue-600 mt-1 space-y-1">
                    {validationResults.fixes.map((fix, index) => (
                      <li key={index}>• {fix}</li>
                    ))}
                  </ul>
                </div>
              )}
              {validationResults.issues?.length > 0 && (
                <div>
                  <p className="text-sm text-yellow-700 font-medium flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Potential Issues:
                  </p>
                  <ul className="text-sm text-yellow-600 mt-1 space-y-1">
                    {validationResults.issues.map((issue, index) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Live React Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="h-4 w-4 mr-2" />
                Source Code
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-6">
              <LandingPagePreview code={reactCode} />
            </TabsContent>
            
            <TabsContent value="code" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Validated TypeScript React Component ({reactCode.split('\n').length} lines)
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Production Ready
                    </Badge>
                    {validationResults.fixes?.length > 0 && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Enhanced by AI
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => copyToClipboard(reactCode)}
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
                  value={reactCode}
                  readOnly
                  className="font-mono text-sm min-h-[500px] bg-gray-50"
                  placeholder="Generated React code will appear here..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Enhanced Features Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border-0 bg-gradient-to-br from-violet-50 to-purple-50">
          <CardContent className="pt-6">
            <CheckCircle className="h-8 w-8 text-violet-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-violet-700">AI</div>
            <div className="text-sm text-violet-600">Validated</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">Real-Time</div>
            <div className="text-sm text-blue-600">Execution</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <Code className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">Error</div>
            <div className="text-sm text-green-600">Prevention</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="pt-6">
            <Play className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">Smart</div>
            <div className="text-sm text-orange-600">Processing</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPageGenerator;
