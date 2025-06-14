
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GenerationStatus {
  'business-plan': 'pending' | 'loading' | 'complete' | 'error';
  'marketing': 'pending' | 'loading' | 'complete' | 'error';
  'competitive': 'pending' | 'loading' | 'complete' | 'error';
  'technical': 'pending' | 'loading' | 'complete' | 'error';
  'ux-design': 'pending' | 'loading' | 'complete' | 'error';
  'financial': 'pending' | 'loading' | 'complete' | 'error';
  'landing-page': 'pending' | 'loading' | 'complete' | 'error';
}

const GeneratingReports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [ideaData, setIdeaData] = useState<any>(null);
  const [status, setStatus] = useState<GenerationStatus>({
    'business-plan': 'pending',
    'marketing': 'pending',
    'competitive': 'pending',
    'technical': 'pending',
    'ux-design': 'pending',
    'financial': 'pending',
    'landing-page': 'pending'
  });
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});

  const analysisTypes = [
    { key: 'business-plan', name: 'Business Plan', icon: '📋' },
    { key: 'marketing', name: 'Marketing Strategy', icon: '📈' },
    { key: 'competitive', name: 'Competitive Analysis', icon: '🎯' },
    { key: 'technical', name: 'Technical Specifications', icon: '⚙️' },
    { key: 'ux-design', name: 'UX Design', icon: '🎨' },
    { key: 'financial', name: 'Financial Projections', icon: '💰' },
    { key: 'landing-page', name: 'Landing Page Code', icon: '🚀' }
  ];

  useEffect(() => {
    const storedData = localStorage.getItem('saasIdea');
    if (!storedData) {
      navigate('/submit-idea');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setIdeaData(parsedData);
      generateAllReports(parsedData);
    } catch (error) {
      navigate('/submit-idea');
    }
  }, [navigate]);

  const generateReport = async (analysisType: string, data: any) => {
    setStatus(prev => ({ ...prev, [analysisType]: 'loading' }));

    try {
      const { data: result, error } = await supabase.functions.invoke('ai-startup-analysis', {
        body: {
          idea: data.idea,
          companyName: data.companyName,
          targetAudience: data.targetAudience,
          problemStatement: data.problemStatement,
          solution: data.solution,
          uniqueValue: data.uniqueValue,
          analysisType: analysisType
        }
      });

      if (error) throw error;
      
      if (result?.success) {
        setGeneratedContent(prev => ({ ...prev, [analysisType]: result.analysis }));
        setStatus(prev => ({ ...prev, [analysisType]: 'complete' }));
      } else {
        throw new Error(result?.error || 'Generation failed');
      }
    } catch (err: any) {
      console.error(`${analysisType} generation error:`, err);
      setStatus(prev => ({ ...prev, [analysisType]: 'error' }));
    }
  };

  const generateAllReports = async (data: any) => {
    // Generate all reports in parallel
    const promises = analysisTypes.map(type => 
      generateReport(type.key, data)
    );
    
    await Promise.all(promises);
    
    // Check if all completed successfully
    const allComplete = Object.values(status).every(s => s === 'complete');
    if (allComplete) {
      // Store all generated content
      localStorage.setItem('generatedReports', JSON.stringify(generatedContent));
      
      // Wait a moment then navigate
      setTimeout(() => {
        navigate('/results');
      }, 1000);
    }
  };

  const getProgress = () => {
    const completed = Object.values(status).filter(s => s === 'complete').length;
    return (completed / analysisTypes.length) * 100;
  };

  const retryGeneration = () => {
    if (ideaData) {
      setStatus({
        'business-plan': 'pending',
        'marketing': 'pending',
        'competitive': 'pending',
        'technical': 'pending',
        'ux-design': 'pending',
        'financial': 'pending',
        'landing-page': 'pending'
      });
      setGeneratedContent({});
      generateAllReports(ideaData);
    }
  };

  const hasErrors = Object.values(status).some(s => s === 'error');
  const isComplete = Object.values(status).every(s => s === 'complete');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            {isComplete ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            )}
            <span>
              {isComplete ? 'Reports Complete!' : 'Generating Your Startup Package'}
            </span>
          </CardTitle>
          <CardDescription className="text-lg">
            {isComplete 
              ? 'All reports have been generated successfully. Redirecting...'
              : 'AI is analyzing your idea and generating comprehensive reports'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Overall Progress</span>
                <span>{Math.round(getProgress())}%</span>
              </div>
              <Progress value={getProgress()} className="h-2" />
            </div>

            <div className="space-y-3">
              {analysisTypes.map((type) => (
                <div key={type.key} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{type.icon}</span>
                    <span className="font-medium">{type.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {status[type.key as keyof GenerationStatus] === 'pending' && (
                      <span className="text-gray-500 text-sm">Waiting...</span>
                    )}
                    {status[type.key as keyof GenerationStatus] === 'loading' && (
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                    )}
                    {status[type.key as keyof GenerationStatus] === 'complete' && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {status[type.key as keyof GenerationStatus] === 'error' && (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {hasErrors && (
              <div className="text-center">
                <button
                  onClick={retryGeneration}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Retry Generation
                </button>
              </div>
            )}

            {isComplete && (
              <div className="text-center">
                <p className="text-green-600 font-medium">
                  ✅ All reports generated successfully! Redirecting to results...
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratingReports;
