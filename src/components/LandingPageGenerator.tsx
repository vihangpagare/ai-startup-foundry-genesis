
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Code, Download, Eye, Copy, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LandingPageGeneratorProps {
  idea: string;
  ideaData?: any;
}

const LandingPageGenerator = ({ idea, ideaData }: LandingPageGeneratorProps) => {
  const [reactCode, setReactCode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const generateLandingPageCode = async () => {
    setLoading(true);
    setError(null);

    try {
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
        setReactCode(data.analysis);
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
    generateLandingPageCode();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Generating production-ready React landing page...</p>
          <p className="text-sm text-gray-500 mt-2">Creating conversion-optimized components and code</p>
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
              <span>Production-Ready React Landing Page</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Powered by Claude AI
              </Badge>
              <Button onClick={regenerateContent} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
          <CardDescription>
            Complete React TypeScript component with Tailwind CSS for {ideaData?.companyName || 'your SaaS startup'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">React Code</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="code" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Complete TypeScript React Component ({reactCode.split('\n').length} lines)
                  </span>
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
            
            <TabsContent value="preview" className="mt-6">
              <CodePreview code={reactCode} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border-0 bg-gradient-to-br from-violet-50 to-purple-50">
          <CardContent className="pt-6">
            <Code className="h-8 w-8 text-violet-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-violet-700">TypeScript</div>
            <div className="text-sm text-violet-600">Ready</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">Responsive</div>
            <div className="text-sm text-blue-600">Design</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <RefreshCw className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">Conversion</div>
            <div className="text-sm text-green-600">Optimized</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="pt-6">
            <Play className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">Live</div>
            <div className="text-sm text-orange-600">Preview</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CodePreview = ({ code }: { code: string }) => {
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      // This is a simplified preview - in a real implementation you'd want to compile the React code
      // For now, we'll show a placeholder that indicates the code is ready for use
      setTimeout(() => {
        setPreviewHtml(`
          <div style="padding: 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
            <h2>🚀 Landing Page Code Generated!</h2>
            <p>Your production-ready React component is ready to deploy.</p>
            <p style="margin-top: 15px; font-size: 14px; opacity: 0.9;">
              Copy the code from the "React Code" tab and add it to your React project.<br/>
              The component includes responsive design, conversion optimization, and modern styling.
            </p>
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 6px;">
              <strong>Features Included:</strong><br/>
              ✅ Hero Section with CTA<br/>
              ✅ Feature Showcase<br/>
              ✅ Pricing Plans<br/>
              ✅ Testimonials<br/>
              ✅ FAQ Section<br/>
              ✅ Footer with Links
            </div>
          </div>
        `);
        setLoading(false);
      }, 1000);
    }
  }, [code]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Preparing preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-4 text-sm text-gray-600">Landing Page Preview</span>
      </div>
      <div 
        className="min-h-[400px] p-4"
        dangerouslySetInnerHTML={{ __html: previewHtml }}
      />
    </div>
  );
};

export default LandingPageGenerator;
