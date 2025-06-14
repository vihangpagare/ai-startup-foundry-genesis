
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, TrendingUp, DollarSign, Users, Target, BarChart3, PieChart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FinancialProjectionsProps {
  idea: string;
  ideaData: any;
}

const FinancialProjections = ({ idea, ideaData }: FinancialProjectionsProps) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    generateFinancialProjections();
  }, [idea, ideaData]);

  const generateFinancialProjections = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('ai-startup-analysis', {
        body: {
          idea,
          companyName: ideaData?.companyName,
          targetAudience: ideaData?.targetAudience,
          problemStatement: ideaData?.problemStatement,
          solution: ideaData?.solution,
          uniqueValue: ideaData?.uniqueValue,
          analysisType: 'financial'
        }
      });

      if (functionError) throw functionError;
      
      if (data?.success) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data?.error || 'Failed to generate analysis');
      }
    } catch (err: any) {
      console.error('Financial projections generation error:', err);
      setError(err.message);
      toast({
        title: "Analysis Failed",
        description: "Could not generate financial projections. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const regenerateAnalysis = () => {
    generateFinancialProjections();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Generating AI-powered financial projections...</p>
          <p className="text-sm text-gray-500 mt-2">Analyzing revenue models and market data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Analysis Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">{error}</p>
          <Button onClick={regenerateAnalysis} variant="outline" className="border-red-300">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Analysis
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <span>AI-Generated Financial Projections</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Powered by Claude AI
              </Badge>
              <Button onClick={regenerateAnalysis} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
          <CardDescription>
            Comprehensive financial analysis and projections for {ideaData?.companyName || 'your SaaS startup'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-green max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {analysis}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">Revenue</div>
            <div className="text-sm text-green-600">Projections</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">Cost</div>
            <div className="text-sm text-blue-600">Analysis</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="pt-6">
            <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">Metrics</div>
            <div className="text-sm text-purple-600">KPIs</div>
          </CardContent>
        </Card>
        <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="pt-6">
            <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">Funding</div>
            <div className="text-sm text-orange-600">Strategy</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialProjections;
