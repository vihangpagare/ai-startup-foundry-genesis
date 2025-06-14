
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Eye, Smartphone, Monitor, Tablet } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useRetryLogic } from '@/hooks/useRetryLogic';
import ErrorBoundary from './ErrorBoundary';
import FallbackReport from './FallbackReports';

interface UserExperienceProps {
  idea: string;
  ideaData?: any;
}

const UserExperience = ({ idea, ideaData }: UserExperienceProps) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const { toast } = useToast();
  const { executeWithRetry, isRetrying, attemptCount } = useRetryLogic({
    maxAttempts: 3,
    baseDelay: 2000,
    maxDelay: 15000
  });

  useEffect(() => {
    loadPreGeneratedContent();
  }, []);

  const loadPreGeneratedContent = () => {
    try {
      const storedReports = localStorage.getItem('generatedReports');
      if (storedReports) {
        const reports = JSON.parse(storedReports);
        if (reports['ux-design']) {
          setAnalysis(reports['ux-design']);
          setLoading(false);
          return;
        }
      }
      generateAnalysis();
    } catch (error) {
      console.error('Error loading pre-generated content:', error);
      generateAnalysis();
    }
  };

  const generateAnalysis = async () => {
    setLoading(true);
    setError(null);
    setShowFallback(false);

    try {
      const result = await executeWithRetry(async () => {
        const { data, error: apiError } = await supabase.functions.invoke('ai-startup-analysis', {
          body: {
            idea,
            companyName: ideaData?.companyName,
            targetAudience: ideaData?.targetAudience,
            problemStatement: ideaData?.problemStatement,
            solution: ideaData?.solution,
            uniqueValue: ideaData?.uniqueValue,
            analysisType: 'ux-design'
          }
        });

        if (apiError) {
          throw new Error(apiError.message || 'Analysis failed');
        }
        
        if (!data?.success) {
          throw new Error(data?.error || 'Failed to generate UX design analysis');
        }

        return data.analysis;
      });

      setAnalysis(result);
      
      // Cache the successful result
      try {
        const storedReports = localStorage.getItem('generatedReports');
        const reports = storedReports ? JSON.parse(storedReports) : {};
        reports['ux-design'] = result;
        localStorage.setItem('generatedReports', JSON.stringify(reports));
      } catch (cacheError) {
        console.warn('Failed to cache report:', cacheError);
      }

    } catch (err: any) {
      console.error('UX design analysis error:', err);
      setError(err.message);
      
      if (err.message.includes('rate limit') || attemptCount >= 3) {
        setShowFallback(true);
        toast({
          title: "Using Fallback Content",
          description: "AI analysis is temporarily unavailable. Showing general UX design guide.",
          variant: "default",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: "Could not generate UX design analysis. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const regenerateAnalysis = () => {
    generateAnalysis();
  };

  if (loading || isRetrying) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">
            {isRetrying 
              ? `Generating UX design specifications... (Attempt ${attemptCount})`
              : 'Loading UX design specifications...'
            }
          </p>
        </div>
      </div>
    );
  }

  if (showFallback) {
    return (
      <ErrorBoundary>
        <FallbackReport type="ux-design" ideaData={ideaData} />
      </ErrorBoundary>
    );
  }

  if (error && !analysis) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Analysis Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex space-x-2">
            <Button onClick={regenerateAnalysis} variant="outline" className="border-red-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Analysis
            </Button>
            <Button onClick={() => setShowFallback(true)} variant="outline">
              Show Fallback Content
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-purple-600" />
                <span>AI-Generated UX Design Specifications</span>
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
              Comprehensive user experience design and wireframe specifications for {ideaData?.companyName || 'your SaaS startup'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-purple max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {analysis}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="text-center border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="pt-6">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">User</div>
              <div className="text-sm text-purple-600">Personas</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="pt-6">
              <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">Mobile</div>
              <div className="text-sm text-blue-600">First</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="pt-6">
              <Monitor className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">Responsive</div>
              <div className="text-sm text-green-600">Design</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardContent className="pt-6">
              <Tablet className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">WCAG</div>
              <div className="text-sm text-orange-600">Compliant</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default UserExperience;
