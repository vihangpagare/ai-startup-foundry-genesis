
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Code, Download, Eye, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface LandingPageGeneratorProps {
  idea: string;
  ideaData?: any;
}

const LandingPageGenerator = ({ idea, ideaData }: LandingPageGeneratorProps) => {
  const [landingPageCode, setLandingPageCode] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'strategy' | 'code'>('strategy');
  const { toast } = useToast();

  useEffect(() => {
    generateLandingPageContent();
  }, [idea, ideaData]);

  const generateLandingPageContent = async () => {
    setLoading(true);
    setError(null);

    try {
      // Generate landing page strategy
      const { data: strategyData, error: strategyError } = await supabase.functions.invoke('ai-startup-analysis', {
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

      if (strategyError) throw strategyError;
      
      if (strategyData?.success) {
        setAnalysis(strategyData.analysis);
      }

      // Generate landing page code
      const { data: codeData, error: codeError } = await supabase.functions.invoke('generate-landing-page', {
        body: {
          idea,
          companyName: ideaData?.companyName,
          targetAudience: ideaData?.targetAudience,
          uniqueValue: ideaData?.uniqueValue,
          analysisData: strategyData?.analysis
        }
      });

      if (codeError) throw codeError;
      
      if (codeData?.success) {
        setLandingPageCode(codeData.code);
      } else {
        throw new Error(codeData?.error || 'Failed to generate landing page code');
      }
    } catch (err: any) {
      console.error('Landing page generation error:', err);
      setError(err.message);
      toast({
        title: "Generation Failed",
        description: "Could not generate landing page. Please try again.",
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
    const blob = new Blob([landingPageCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ideaData?.companyName || 'SaaS'}_LandingPage.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const regenerateContent = () => {
    generateLandingPageContent();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Generating AI-powered landing page...</p>
          <p className="text-sm text-gray-500 mt-2">Creating strategy and production-ready code</p>
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
              <span>AI-Generated Landing Page</span>
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
            Conversion-optimized landing page strategy and production-ready React code for {ideaData?.companyName || 'your SaaS startup'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={activeTab === 'strategy' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('strategy')}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              Strategy & Guidelines
            </Button>
            <Button
              variant={activeTab === 'code' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('code')}
              className="flex-1"
            >
              <Code className="h-4 w-4 mr-2" />
              React Code
            </Button>
          </div>

          {/* Strategy Tab */}
          {activeTab === 'strategy' && (
            <div className="prose prose-violet max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {analysis}
              </div>
            </div>
          )}

          {/* Code Tab */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-900">Production-Ready React Component</h4>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => copyToClipboard(landingPageCode)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button
                    onClick={downloadCode}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download .tsx
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={landingPageCode}
                readOnly
                className="min-h-[500px] font-mono text-sm bg-gray-50 border border-gray-200"
                placeholder="Generated React component code will appear here..."
              />
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">Usage Instructions</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Copy the code and save as a .tsx file in your React project</li>
                  <li>• Ensure you have Tailwind CSS and Lucide React installed</li>
                  <li>• Import and use the component in your application</li>
                  <li>• Customize colors, content, and styling as needed</li>
                  <li>• The component is fully responsive and accessible</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border-0 bg-gradient-to-br from-violet-50 to-purple-50">
          <CardContent className="pt-6">
            <Code className="h-8 w-8 text-violet-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-violet-700">Production</div>
            <div className="text-sm text-violet-600">Ready Code</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">Conversion</div>
            <div className="text-sm text-blue-600">Optimized</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <RefreshCw className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">Responsive</div>
            <div className="text-sm text-green-600">Design</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="pt-6">
            <Download className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">Ready to</div>
            <div className="text-sm text-orange-600">Deploy</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPageGenerator;
