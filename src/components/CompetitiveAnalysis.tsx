
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Target, Shield, TrendingUp, TrendingDown, Minus, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CompetitiveAnalysisProps {
  idea: string;
  ideaData?: any;
}

const CompetitiveAnalysis = ({ idea, ideaData }: CompetitiveAnalysisProps) => {
  const [analysis, setAnalysis] = useState<string>('');
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
        if (reports['competitive']) {
          setAnalysis(reports['competitive']);
          setLoading(false);
          return;
        }
      }
      // If no pre-generated content, generate new
      generateAnalysis();
    } catch (error) {
      console.error('Error loading pre-generated content:', error);
      generateAnalysis();
    }
  };

  const generateAnalysis = async () => {
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
          analysisType: 'competitive'
        }
      });

      if (apiError) throw apiError;
      
      if (data?.success) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data?.error || 'Failed to generate competitive analysis');
      }
    } catch (err: any) {
      console.error('Competitive analysis error:', err);
      setError(err.message);
      toast({
        title: "Analysis Failed",
        description: "Could not generate competitive analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const regenerateAnalysis = () => {
    generateAnalysis();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading competitive analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Analysis Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={regenerateAnalysis}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry Analysis</span>
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span>AI-Generated Competitive Analysis</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Powered by Claude AI
              </Badge>
              <button 
                onClick={regenerateAnalysis}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>
          <CardDescription>
            Comprehensive competitive landscape analysis for {ideaData?.companyName || 'your SaaS startup'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-blue max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {analysis}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitiveAnalysis;
