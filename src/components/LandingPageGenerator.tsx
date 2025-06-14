
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
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'strategy'>('strategy');
  const { toast } = useToast();

  useEffect(() => {
    generateLandingPageContent();
  }, [idea, ideaData]);

  const generateLandingPageContent = async () => {
    setLoading(true);
    setError(null);

    try {
      // Generate landing page strategy using the main ai-startup-analysis function
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
        setAnalysis(data.analysis);
      } else {
        throw new Error(data?.error || 'Failed to generate landing page strategy');
      }
    } catch (err: any) {
      console.error('Landing page generation error:', err);
      setError(err.message);
      toast({
        title: "Generation Failed",
        description: "Could not generate landing page strategy. Please try again.",
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
        description: "Content copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const regenerateContent = () => {
    generateLandingPageContent();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Generating AI-powered landing page strategy...</p>
          <p className="text-sm text-gray-500 mt-2">Creating conversion-optimized content and design guidelines</p>
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
              <span>AI-Generated Landing Page Strategy</span>
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
            Conversion-optimized landing page strategy and guidelines for {ideaData?.companyName || 'your SaaS startup'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Strategy Content */}
          <div className="prose prose-violet max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {analysis}
            </div>
          </div>

          {/* Copy Action */}
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => copyToClipboard(analysis)}
              variant="outline"
              size="sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Strategy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border-0 bg-gradient-to-br from-violet-50 to-purple-50">
          <CardContent className="pt-6">
            <Code className="h-8 w-8 text-violet-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-violet-700">Strategy</div>
            <div className="text-sm text-violet-600">Optimized</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">Conversion</div>
            <div className="text-sm text-blue-600">Focused</div>
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
            <div className="text-sm text-orange-600">Implement</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPageGenerator;
