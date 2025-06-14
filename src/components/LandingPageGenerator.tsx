import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Code, Download, Eye, Copy, Play } from 'lucide-react';
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
        
        // Update localStorage with the new report
        const storedReports = localStorage.getItem('generatedReports');
        const reports = storedReports ? JSON.parse(storedReports) : {};
        reports['landing-page'] = data.analysis;
        localStorage.setItem('generatedReports', JSON.stringify(reports));
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
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="code">React Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-6">
              <LandingPagePreview code={reactCode} />
            </TabsContent>
            
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

export default LandingPageGenerator;
