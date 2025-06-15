
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Loader2, AlertCircle, Clock, Pause, Play, RefreshCw } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const analysisTypes = [
    { key: 'business-plan', name: 'Business Plan', icon: '📋', estimatedTime: 45 },
    { key: 'marketing', name: 'Marketing Strategy', icon: '📈', estimatedTime: 40 },
    { key: 'competitive', name: 'Competitive Analysis', icon: '🎯', estimatedTime: 50 },
    { key: 'technical', name: 'Technical Specifications', icon: '⚙️', estimatedTime: 35 },
    { key: 'ux-design', name: 'UX Design', icon: '🎨', estimatedTime: 30 },
    { key: 'financial', name: 'Financial Projections', icon: '💰', estimatedTime: 40 },
    { key: 'landing-page', name: 'Landing Page Code', icon: '🚀', estimatedTime: 25 }
  ];

  // Load idea data
  useEffect(() => {
    const storedData = localStorage.getItem('saasIdea');
    if (!storedData) {
      console.error('No startup idea data found, redirecting to submit-idea');
      navigate('/submit-idea');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      console.log('Loaded startup idea data:', { 
        companyName: parsedData.companyName, 
        hasIdea: !!parsedData.idea 
      });
      setIdeaData(parsedData);
    } catch (error) {
      console.error('Failed to parse idea data:', error);
      navigate('/submit-idea');
    }
  }, [navigate]);

  // Generate single report
  const generateSingleReport = async (analysisType: string, data: any): Promise<boolean> => {
    console.log(`Starting generation for ${analysisType}`);
    
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

      if (error) {
        console.error(`Edge function error for ${analysisType}:`, error);
        throw error;
      }
      
      if (!result?.success) {
        console.error(`Edge function failed for ${analysisType}:`, result?.error);
        throw new Error(result?.error || 'Generation failed');
      }
      
      console.log(`${analysisType} completed successfully`);
      
      setStatus(prev => ({ ...prev, [analysisType]: 'complete' }));
      setGeneratedContent(prev => ({ ...prev, [analysisType]: result.analysis }));
      
      toast({
        title: "Report Generated",
        description: `${analysisTypes.find(t => t.key === analysisType)?.name} completed successfully`,
      });
      
      return true;
    } catch (err: any) {
      console.error(`${analysisType} generation error:`, err);
      
      setStatus(prev => ({ ...prev, [analysisType]: 'error' }));
      
      toast({
        title: "Report Generation Failed",
        description: `Failed to generate ${analysisTypes.find(t => t.key === analysisType)?.name}. ${err.message}`,
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Start sequential generation
  const startGeneration = async () => {
    if (isGenerating || !ideaData || !ideaData.idea) {
      console.log('Cannot start generation - already generating or missing data');
      return;
    }

    console.log('Starting sequential generation');
    setIsGenerating(true);
    setIsPaused(false);

    try {
      for (let i = currentIndex; i < analysisTypes.length; i++) {
        if (isPaused) {
          console.log('Generation paused at index:', i);
          setCurrentIndex(i);
          break;
        }

        const type = analysisTypes[i];
        console.log(`Processing report ${i + 1}/${analysisTypes.length}: ${type.name}`);
        
        // Skip if already completed
        if (status[type.key as keyof GenerationStatus] === 'complete') {
          console.log(`Skipping already completed report: ${type.key}`);
          continue;
        }

        setCurrentIndex(i);
        
        // Add delay between reports (except first)
        if (i > 0) {
          console.log('Waiting 2 seconds before next report...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        // Generate the report
        console.log(`Generating ${type.key}...`);
        await generateSingleReport(type.key, ideaData);
      }
    } catch (error) {
      console.error('Sequential generation error:', error);
      toast({
        title: "Generation Error",
        description: `An error occurred during report generation: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Start generation when idea data is loaded
  useEffect(() => {
    if (ideaData && ideaData.idea && !isGenerating) {
      const completedReports = Object.values(status).filter(s => s === 'complete').length;
      if (completedReports < analysisTypes.length) {
        console.log('Auto-starting generation process...');
        setTimeout(() => {
          startGeneration();
        }, 1000);
      }
    }
  }, [ideaData]);

  // Check completion and redirect
  useEffect(() => {
    const completedReports = Object.values(status).filter(s => s === 'complete').length;
    const totalReports = analysisTypes.length;
    
    if (completedReports === totalReports && completedReports > 0) {
      console.log('All reports completed, preparing redirect...');
      localStorage.setItem('generatedReports', JSON.stringify(generatedContent));
      
      toast({
        title: "All Reports Complete!",
        description: "Redirecting to results page...",
      });
      
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    }
  }, [status, generatedContent, navigate, analysisTypes.length, toast]);

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
    console.log('Pausing generation');
    setIsPaused(true);
  };

  const resumeGeneration = () => {
    console.log('Resuming generation');
    setIsPaused(false);
    startGeneration();
  };

  const restartGeneration = () => {
    console.log('Restarting generation');
    
    // Reset all state
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
    setCurrentIndex(0);
    setIsGenerating(false);
    setIsPaused(false);
    
    toast({
      title: "Generation Restarted",
      description: "Starting fresh generation process...",
    });
    
    // Start generation after a brief delay
    setTimeout(() => {
      startGeneration();
    }, 1000);
  };

  const forceStartGeneration = () => {
    console.log('Force starting generation');
    setIsGenerating(false);
    setIsPaused(false);
    startGeneration();
  };

  const hasErrors = Object.values(status).some(s => s === 'error');
  const isComplete = Object.values(status).every(s => s === 'complete');
  const completedCount = Object.values(status).filter(s => s === 'complete').length;
  const currentlyGenerating = analysisTypes.find(type => 
    status[type.key as keyof GenerationStatus] === 'loading'
  )?.key || null;

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
              {isComplete 
                ? 'Reports Complete!' 
                : 'Generating Your Startup Package'
              }
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
              {analysisTypes.map((type, index) => {
                const reportStatus = status[type.key as keyof GenerationStatus];
                const isCurrentlyGenerating = currentlyGenerating === type.key;
                const isUpcoming = index > currentIndex && reportStatus === 'pending';
                
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
                          <div className="text-sm text-red-600">Generation failed</div>
                        )}
                        {isUpcoming && (
                          <div className="text-sm text-gray-500">Queued for generation</div>
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
              <div className="flex justify-center space-x-4 flex-wrap gap-2">
                {!isGenerating ? (
                  <Button onClick={forceStartGeneration} variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                    <Play className="h-4 w-4 mr-2" />
                    Start Generation
                  </Button>
                ) : !isPaused ? (
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
                
                <Button onClick={restartGeneration} variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restart Generation
                </Button>
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
