
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Loader2, AlertCircle, Clock, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  const [hasStartedGeneration, setHasStartedGeneration] = useState(false);
  const [currentlyGenerating, setCurrentlyGenerating] = useState<string | null>(null);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [generationStartTime, setGenerationStartTime] = useState<number>(0);

  const analysisTypes = [
    { key: 'business-plan', name: 'Business Plan', icon: '📋', estimatedTime: 45 },
    { key: 'marketing', name: 'Marketing Strategy', icon: '📈', estimatedTime: 40 },
    { key: 'competitive', name: 'Competitive Analysis', icon: '🎯', estimatedTime: 50 },
    { key: 'technical', name: 'Technical Specifications', icon: '⚙️', estimatedTime: 35 },
    { key: 'ux-design', name: 'UX Design', icon: '🎨', estimatedTime: 30 },
    { key: 'financial', name: 'Financial Projections', icon: '💰', estimatedTime: 40 },
    { key: 'landing-page', name: 'Landing Page Code', icon: '🚀', estimatedTime: 25 }
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
    } catch (error) {
      navigate('/submit-idea');
    }
  }, [navigate]);

  // Start sequential generation when ideaData is available
  useEffect(() => {
    if (ideaData && !hasStartedGeneration && !isPaused) {
      setHasStartedGeneration(true);
      setGenerationStartTime(Date.now());
      generateReportsSequentially(ideaData);
    }
  }, [ideaData, hasStartedGeneration, isPaused]);

  // Update estimated time remaining
  useEffect(() => {
    if (currentlyGenerating && generationStartTime) {
      const interval = setInterval(() => {
        const completedReports = Object.values(status).filter(s => s === 'complete').length;
        const totalTime = analysisTypes.reduce((sum, type) => sum + type.estimatedTime, 0);
        const completedTime = analysisTypes
          .filter(type => status[type.key as keyof GenerationStatus] === 'complete')
          .reduce((sum, type) => sum + type.estimatedTime, 0);
        
        const remainingTime = Math.max(0, totalTime - completedTime);
        setEstimatedTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentlyGenerating, generationStartTime, status]);

  // Check if all reports are complete and redirect
  useEffect(() => {
    const completedReports = Object.values(status).filter(s => s === 'complete').length;
    const totalReports = analysisTypes.length;
    
    if (completedReports === totalReports && completedReports > 0) {
      localStorage.setItem('generatedReports', JSON.stringify(generatedContent));
      console.log('All reports completed, redirecting to results...');
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    }
  }, [status, generatedContent, navigate]);

  const generateReport = async (analysisType: string, data: any, delay: number = 0) => {
    if (isPaused) return;
    
    // Add delay between requests to respect rate limits
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    console.log(`Starting generation for ${analysisType}`);
    setCurrentlyGenerating(analysisType);
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
        console.log(`${analysisType} completed successfully`);
        setGeneratedContent(prev => ({ ...prev, [analysisType]: result.analysis }));
        setStatus(prev => ({ ...prev, [analysisType]: 'complete' }));
        
        toast({
          title: "Report Generated",
          description: `${analysisTypes.find(t => t.key === analysisType)?.name} completed successfully`,
        });
      } else {
        throw new Error(result?.error || 'Generation failed');
      }
    } catch (err: any) {
      console.error(`${analysisType} generation error:`, err);
      setStatus(prev => ({ ...prev, [analysisType]: 'error' }));
      
      toast({
        title: "Report Generation Failed",
        description: `Failed to generate ${analysisTypes.find(t => t.key === analysisType)?.name}. Will use fallback content.`,
        variant: "destructive",
      });
    } finally {
      setCurrentlyGenerating(null);
    }
  };

  const generateReportsSequentially = async (data: any) => {
    console.log('Starting sequential generation of reports...');
    
    for (let i = 0; i < analysisTypes.length; i++) {
      if (isPaused) break;
      
      const type = analysisTypes[i];
      const delay = i > 0 ? 4000 : 0; // 4 second delay between reports (except first)
      
      await generateReport(type.key, data, delay);
      
      if (isPaused) break;
    }
    
    console.log('Sequential generation completed');
  };

  const getProgress = () => {
    const completed = Object.values(status).filter(s => s === 'complete').length;
    return (completed / analysisTypes.length) * 100;
  };

  const getStatusColor = (reportStatus: string) => {
    switch (reportStatus) {
      case 'complete': return 'text-green-600 bg-green-50 border-green-200';
      case 'loading': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (reportStatus: string) => {
    switch (reportStatus) {
      case 'complete': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'loading': return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const pauseGeneration = () => {
    setIsPaused(true);
    setCurrentlyGenerating(null);
  };

  const resumeGeneration = () => {
    setIsPaused(false);
    if (ideaData) {
      generateReportsSequentially(ideaData);
    }
  };

  const retryGeneration = () => {
    if (ideaData) {
      console.log('Retrying generation...');
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
      setHasStartedGeneration(false);
      setIsPaused(false);
      setGenerationStartTime(Date.now());
    }
  };

  const hasErrors = Object.values(status).some(s => s === 'error');
  const isComplete = Object.values(status).every(s => s === 'complete');
  const completedCount = Object.values(status).filter(s => s === 'complete').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center space-x-3">
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
              : currentlyGenerating 
                ? `Currently generating: ${analysisTypes.find(t => t.key === currentlyGenerating)?.name}`
                : 'AI is analyzing your idea and generating comprehensive reports'
            }
          </CardDescription>
          
          {!isComplete && (
            <div className="flex items-center justify-center space-x-4 mt-4">
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                {completedCount}/{analysisTypes.length} Complete
              </Badge>
              {estimatedTimeRemaining > 0 && (
                <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                  ~{Math.ceil(estimatedTimeRemaining / 60)} min remaining
                </Badge>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Overall Progress</span>
                <span>{Math.round(getProgress())}%</span>
              </div>
              <Progress value={getProgress()} className="h-3" />
            </div>

            <div className="space-y-3">
              {analysisTypes.map((type) => {
                const reportStatus = status[type.key as keyof GenerationStatus];
                const isCurrentlyGenerating = currentlyGenerating === type.key;
                
                return (
                  <div 
                    key={type.key} 
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                      isCurrentlyGenerating ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                    } ${getStatusColor(reportStatus)}`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{type.icon}</span>
                      <div>
                        <div className="font-medium text-lg">{type.name}</div>
                        {isCurrentlyGenerating && (
                          <div className="text-sm text-blue-600">Generating now...</div>
                        )}
                        {reportStatus === 'complete' && (
                          <div className="text-sm text-green-600">Generated successfully</div>
                        )}
                        {reportStatus === 'error' && (
                          <div className="text-sm text-red-600">Will use fallback content</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={getStatusColor(reportStatus)}>
                        {reportStatus === 'pending' && 'Waiting'}
                        {reportStatus === 'loading' && 'Generating'}
                        {reportStatus === 'complete' && 'Complete'}
                        {reportStatus === 'error' && 'Error'}
                      </Badge>
                      {getStatusIcon(reportStatus)}
                    </div>
                  </div>
                );
              })}
            </div>

            {!isComplete && (
              <div className="flex justify-center space-x-4">
                {!isPaused ? (
                  <Button onClick={pauseGeneration} variant="outline">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Generation
                  </Button>
                ) : (
                  <Button onClick={resumeGeneration} variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Resume Generation
                  </Button>
                )}
                
                {hasErrors && (
                  <Button onClick={retryGeneration} variant="outline">
                    Retry Failed Reports
                  </Button>
                )}
              </div>
            )}

            {isComplete && (
              <div className="text-center">
                <div className="text-green-600 font-medium text-lg mb-4">
                  ✅ All reports generated successfully!
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Redirecting to results page...
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
