
import { useEffect, useState, useCallback, useRef } from 'react';
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

interface GenerationState {
  sessionId: string;
  status: GenerationStatus;
  generatedContent: Record<string, string>;
  currentIndex: number;
  isGenerating: boolean;
  isPaused: boolean;
  startTime: number;
}

const GeneratingReports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ideaData, setIdeaData] = useState<any>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const generationLockRef = useRef(false);
  const currentGenerationSessionRef = useRef<string | null>(null);
  
  const [generationState, setGenerationState] = useState<GenerationState>(() => {
    // Try to restore from localStorage
    const stored = localStorage.getItem('generation_state');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Only restore if it's a recent session (within 1 hour)
        if (Date.now() - parsed.startTime < 3600000) {
          return parsed;
        }
      } catch (error) {
        console.warn('Failed to parse stored generation state:', error);
      }
    }
    
    return {
      sessionId,
      status: {
        'business-plan': 'pending',
        'marketing': 'pending',
        'competitive': 'pending',
        'technical': 'pending',
        'ux-design': 'pending',
        'financial': 'pending',
        'landing-page': 'pending'
      },
      generatedContent: {},
      currentIndex: 0,
      isGenerating: false,
      isPaused: false,
      startTime: Date.now()
    };
  });

  const analysisTypes = [
    { key: 'business-plan', name: 'Business Plan', icon: '📋', estimatedTime: 45 },
    { key: 'marketing', name: 'Marketing Strategy', icon: '📈', estimatedTime: 40 },
    { key: 'competitive', name: 'Competitive Analysis', icon: '🎯', estimatedTime: 50 },
    { key: 'technical', name: 'Technical Specifications', icon: '⚙️', estimatedTime: 35 },
    { key: 'ux-design', name: 'UX Design', icon: '🎨', estimatedTime: 30 },
    { key: 'financial', name: 'Financial Projections', icon: '💰', estimatedTime: 40 },
    { key: 'landing-page', name: 'Landing Page Code', icon: '🚀', estimatedTime: 25 }
  ];

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('generation_state', JSON.stringify(generationState));
  }, [generationState]);

  // Load idea data
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
      console.error('Failed to parse idea data:', error);
      navigate('/submit-idea');
    }
  }, [navigate]);

  // Memoized report generation function
  const generateReport = useCallback(async (analysisType: string, data: any): Promise<boolean> => {
    if (generationLockRef.current || generationState.isPaused) {
      console.log('Generation locked or paused, skipping:', analysisType);
      return false;
    }

    if (currentGenerationSessionRef.current !== generationState.sessionId) {
      console.log('Session changed, aborting generation:', analysisType);
      return false;
    }

    console.log(`Starting generation for ${analysisType}`);
    
    setGenerationState(prev => ({
      ...prev,
      status: { ...prev.status, [analysisType]: 'loading' }
    }));

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

      // Check if session is still valid
      if (currentGenerationSessionRef.current !== generationState.sessionId) {
        console.log('Session changed during generation, discarding result:', analysisType);
        return false;
      }

      if (error) throw error;
      
      if (result?.success) {
        console.log(`${analysisType} completed successfully`);
        
        setGenerationState(prev => ({
          ...prev,
          status: { ...prev.status, [analysisType]: 'complete' },
          generatedContent: { ...prev.generatedContent, [analysisType]: result.analysis }
        }));
        
        toast({
          title: "Report Generated",
          description: `${analysisTypes.find(t => t.key === analysisType)?.name} completed successfully`,
        });
        
        return true;
      } else {
        throw new Error(result?.error || 'Generation failed');
      }
    } catch (err: any) {
      console.error(`${analysisType} generation error:`, err);
      
      if (currentGenerationSessionRef.current === generationState.sessionId) {
        setGenerationState(prev => ({
          ...prev,
          status: { ...prev.status, [analysisType]: 'error' }
        }));
        
        toast({
          title: "Report Generation Failed",
          description: `Failed to generate ${analysisTypes.find(t => t.key === analysisType)?.name}. Will use fallback content.`,
          variant: "destructive",
        });
      }
      
      return false;
    }
  }, [generationState.sessionId, generationState.isPaused, toast, analysisTypes]);

  // Memoized sequential generation function
  const generateReportsSequentially = useCallback(async (data: any) => {
    if (generationLockRef.current) {
      console.log('Generation already in progress, skipping');
      return;
    }

    generationLockRef.current = true;
    currentGenerationSessionRef.current = generationState.sessionId;
    
    console.log('Starting sequential generation of reports...', generationState.sessionId);
    
    setGenerationState(prev => ({ ...prev, isGenerating: true }));

    try {
      for (let i = generationState.currentIndex; i < analysisTypes.length; i++) {
        // Check if generation should stop
        if (generationState.isPaused || currentGenerationSessionRef.current !== generationState.sessionId) {
          console.log('Generation stopped at index:', i);
          break;
        }

        const type = analysisTypes[i];
        
        // Skip if already completed
        if (generationState.status[type.key as keyof GenerationStatus] === 'complete') {
          console.log('Skipping already completed report:', type.key);
          continue;
        }

        // Update current index
        setGenerationState(prev => ({ ...prev, currentIndex: i }));
        
        // Add delay between reports (except first)
        if (i > generationState.currentIndex) {
          await new Promise(resolve => setTimeout(resolve, 4000));
        }
        
        // Generate the report
        const success = await generateReport(type.key, data);
        
        // Check if we should continue
        if (!success || generationState.isPaused || currentGenerationSessionRef.current !== generationState.sessionId) {
          break;
        }
      }
    } finally {
      generationLockRef.current = false;
      setGenerationState(prev => ({ ...prev, isGenerating: false }));
    }
    
    console.log('Sequential generation completed');
  }, [generationState.sessionId, generationState.currentIndex, generationState.isPaused, generationState.status, generateReport, analysisTypes]);

  // Start generation when idea data is available
  useEffect(() => {
    if (ideaData && !generationState.isGenerating && !generationState.isPaused) {
      const completedReports = Object.values(generationState.status).filter(s => s === 'complete').length;
      const totalReports = analysisTypes.length;
      
      // Only start if not all reports are complete
      if (completedReports < totalReports) {
        console.log('Starting generation process...');
        generateReportsSequentially(ideaData);
      }
    }
  }, [ideaData, generationState.isGenerating, generationState.isPaused, generateReportsSequentially, generationState.status, analysisTypes.length]);

  // Check completion and redirect
  useEffect(() => {
    const completedReports = Object.values(generationState.status).filter(s => s === 'complete').length;
    const totalReports = analysisTypes.length;
    
    if (completedReports === totalReports && completedReports > 0) {
      localStorage.setItem('generatedReports', JSON.stringify(generationState.generatedContent));
      localStorage.removeItem('generation_state'); // Clean up
      console.log('All reports completed, redirecting to results...');
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    }
  }, [generationState.status, generationState.generatedContent, navigate, analysisTypes.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      generationLockRef.current = false;
      currentGenerationSessionRef.current = null;
    };
  }, []);

  const getProgress = () => {
    const completed = Object.values(generationState.status).filter(s => s === 'complete').length;
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

  const pauseGeneration = useCallback(() => {
    console.log('Pausing generation');
    setGenerationState(prev => ({ ...prev, isPaused: true }));
    currentGenerationSessionRef.current = null;
  }, []);

  const resumeGeneration = useCallback(() => {
    console.log('Resuming generation');
    setGenerationState(prev => ({ ...prev, isPaused: false }));
    if (ideaData) {
      generateReportsSequentially(ideaData);
    }
  }, [ideaData, generateReportsSequentially]);

  const retryGeneration = useCallback(() => {
    console.log('Retrying generation...');
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setGenerationState({
      sessionId: newSessionId,
      status: {
        'business-plan': 'pending',
        'marketing': 'pending',
        'competitive': 'pending',
        'technical': 'pending',
        'ux-design': 'pending',
        'financial': 'pending',
        'landing-page': 'pending'
      },
      generatedContent: {},
      currentIndex: 0,
      isGenerating: false,
      isPaused: false,
      startTime: Date.now()
    });
    
    generationLockRef.current = false;
    currentGenerationSessionRef.current = null;
  }, []);

  const hasErrors = Object.values(generationState.status).some(s => s === 'error');
  const isComplete = Object.values(generationState.status).every(s => s === 'complete');
  const completedCount = Object.values(generationState.status).filter(s => s === 'complete').length;
  const currentlyGenerating = analysisTypes.find(type => 
    generationState.status[type.key as keyof GenerationStatus] === 'loading'
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
              <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                Session: {generationState.sessionId.split('_')[2]}
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
                const reportStatus = generationState.status[type.key as keyof GenerationStatus];
                const isCurrentlyGenerating = currentlyGenerating === type.key;
                const isUpcoming = index > generationState.currentIndex && reportStatus === 'pending';
                
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
              <div className="flex justify-center space-x-4">
                {!generationState.isPaused ? (
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
