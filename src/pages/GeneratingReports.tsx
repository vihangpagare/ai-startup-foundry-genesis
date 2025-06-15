
import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Loader2, AlertCircle, Clock, Pause, Play, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useRetryLogic } from '@/hooks/useRetryLogic';

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
  lastActivity: number;
}

const GeneratingReports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ideaData, setIdeaData] = useState<any>(null);
  
  // Stable refs that don't change during component lifecycle
  const sessionIdRef = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const generationLockRef = useRef(false);
  const currentGenerationSessionRef = useRef<string | null>(null);
  const initializationRef = useRef(false);
  
  const { executeWithRetry } = useRetryLogic({ maxAttempts: 3, baseDelay: 2000 });
  
  const [generationState, setGenerationState] = useState<GenerationState>(() => {
    // Try to restore from localStorage with validation
    const stored = localStorage.getItem('generation_state');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Only restore if it's a recent session (within 1 hour) and has valid data
        if (parsed && Date.now() - parsed.startTime < 3600000 && parsed.sessionId) {
          console.log('Restored generation state from localStorage:', parsed.sessionId);
          return {
            ...parsed,
            lastActivity: Date.now() // Update activity timestamp
          };
        }
      } catch (error) {
        console.warn('Failed to parse stored generation state:', error);
      }
    }
    
    const initialState = {
      sessionId: sessionIdRef.current,
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
      startTime: Date.now(),
      lastActivity: Date.now()
    };
    
    console.log('Created new generation state:', initialState.sessionId);
    return initialState;
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
    const stateToStore = { ...generationState, lastActivity: Date.now() };
    localStorage.setItem('generation_state', JSON.stringify(stateToStore));
  }, [generationState]);

  // Load idea data - this only runs once
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

  // Stable report generation function with enhanced error handling
  const generateSingleReport = useCallback(async (analysisType: string, data: any): Promise<boolean> => {
    const currentSession = currentGenerationSessionRef.current;
    console.log(`🚀 Starting generation for ${analysisType} with session ${currentSession}`);
    
    // Validate session and lock state
    if (!generationLockRef.current || !currentSession) {
      console.warn(`❌ Generation aborted for ${analysisType} - invalid session or not locked`);
      return false;
    }

    // Update status to loading using functional update
    setGenerationState(prev => {
      console.log(`📝 Setting ${analysisType} to loading state`);
      return {
        ...prev,
        status: { ...prev.status, [analysisType]: 'loading' },
        lastActivity: Date.now()
      };
    });

    try {
      const result = await executeWithRetry(async () => {
        // Enhanced timeout wrapper for edge function call
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          console.warn(`⏰ Timeout for ${analysisType} after 90 seconds`);
          controller.abort();
        }, 90000); // 90 second timeout

        try {
          console.log(`📡 Calling edge function for ${analysisType}`);
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

          clearTimeout(timeoutId);

          if (error) {
            console.error(`🔥 Edge function error for ${analysisType}:`, error);
            throw error;
          }
          
          if (!result?.success) {
            console.error(`❌ Edge function failed for ${analysisType}:`, result?.error);
            throw new Error(result?.error || 'Generation failed');
          }
          
          console.log(`✅ Edge function success for ${analysisType}`);
          return result;
        } catch (error) {
          clearTimeout(timeoutId);
          throw error;
        }
      });

      // Verify session is still valid before updating state
      if (currentGenerationSessionRef.current !== currentSession) {
        console.warn(`🔄 Session changed during ${analysisType} generation, discarding result`);
        return false;
      }

      console.log(`🎉 ${analysisType} completed successfully`);
      
      // Update state with functional updates to avoid stale closures
      setGenerationState(prev => ({
        ...prev,
        status: { ...prev.status, [analysisType]: 'complete' },
        generatedContent: { ...prev.generatedContent, [analysisType]: result.analysis },
        lastActivity: Date.now()
      }));
      
      toast({
        title: "Report Generated",
        description: `${analysisTypes.find(t => t.key === analysisType)?.name} completed successfully`,
      });
      
      return true;
    } catch (err: any) {
      console.error(`💥 ${analysisType} generation error:`, err);
      
      // Only update state if session is still valid
      if (currentGenerationSessionRef.current === currentSession) {
        setGenerationState(prev => ({
          ...prev,
          status: { ...prev.status, [analysisType]: 'error' },
          lastActivity: Date.now()
        }));
        
        toast({
          title: "Report Generation Failed",
          description: `Failed to generate ${analysisTypes.find(t => t.key === analysisType)?.name}. ${err.message}`,
          variant: "destructive",
        });
      }
      
      return false;
    }
  }, [toast, analysisTypes, executeWithRetry]);

  // Stable sequential generation function with proper session management
  const startSequentialGeneration = useCallback(async (data: any) => {
    const sessionId = sessionIdRef.current;
    console.log('🎬 Starting sequential generation with session:', sessionId);
    
    // Prevent multiple generations and validate prerequisites
    if (generationLockRef.current) {
      console.log('⚠️  Generation already in progress, skipping');
      return;
    }

    if (!data || !data.idea) {
      console.error('❌ Cannot start generation - missing idea data');
      toast({
        title: "Generation Error",
        description: "Missing startup idea data. Please go back and submit your idea.",
        variant: "destructive",
      });
      return;
    }

    // Initialize session and lock with enhanced logging
    console.log('🔒 Acquiring generation lock and setting session');
    generationLockRef.current = true;
    currentGenerationSessionRef.current = sessionId;
    
    // Update state to indicate generation started
    setGenerationState(prev => ({ 
      ...prev, 
      isGenerating: true, 
      isPaused: false,
      lastActivity: Date.now()
    }));

    try {
      // Get current state for iteration - use fresh state from localStorage
      const currentStoredState = localStorage.getItem('generation_state');
      const currentState = currentStoredState ? JSON.parse(currentStoredState) : generationState;
      const startIndex = currentState.currentIndex || 0;

      console.log(`📊 Starting generation from index ${startIndex} of ${analysisTypes.length} reports`);

      for (let i = startIndex; i < analysisTypes.length; i++) {
        // Check if generation should stop
        if (!generationLockRef.current || currentGenerationSessionRef.current !== sessionId) {
          console.log('🛑 Generation stopped at index:', i);
          break;
        }

        // Check if paused - get fresh state
        const latestStoredState = localStorage.getItem('generation_state');
        const latestState = latestStoredState ? JSON.parse(latestStoredState) : generationState;
        if (latestState.isPaused) {
          console.log('⏸️  Generation paused at index:', i);
          break;
        }

        const type = analysisTypes[i];
        console.log(`📝 Processing report ${i + 1}/${analysisTypes.length}: ${type.name}`);
        
        // Skip if already completed
        if (latestState.status?.[type.key] === 'complete') {
          console.log(`✅ Skipping already completed report: ${type.key}`);
          continue;
        }

        // Update current index
        setGenerationState(prev => ({ 
          ...prev, 
          currentIndex: i,
          lastActivity: Date.now()
        }));
        
        // Add delay between reports (except first)
        if (i > startIndex) {
          console.log(`⏱️  Waiting 3 seconds before next report...`);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
        // Generate the report
        console.log(`🎯 Generating ${type.key}...`);
        const success = await generateSingleReport(type.key, data);
        
        // Check if we should continue
        if (!success) {
          console.error(`❌ Failed to generate ${type.key}, but continuing...`);
        }
        
        if (!generationLockRef.current || currentGenerationSessionRef.current !== sessionId) {
          console.log('🔄 Breaking generation loop due to session change');
          break;
        }
      }
    } catch (error) {
      console.error('💥 Sequential generation error:', error);
      toast({
        title: "Generation Error",
        description: `An error occurred during report generation: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      console.log('🏁 Sequential generation completed, releasing lock');
      generationLockRef.current = false;
      setGenerationState(prev => ({ 
        ...prev, 
        isGenerating: false,
        lastActivity: Date.now()
      }));
    }
  }, [generateSingleReport, analysisTypes, toast, generationState]);

  // Initialize generation when component mounts and idea data is available
  useEffect(() => {
    if (!initializationRef.current && ideaData && ideaData.idea) {
      initializationRef.current = true;
      
      const completedReports = Object.values(generationState.status).filter(s => s === 'complete').length;
      const totalReports = analysisTypes.length;
      
      console.log(`🔍 Initialization check: ${completedReports}/${totalReports} reports complete`);
      
      // Check if we should start generation
      if (completedReports < totalReports && !generationState.isGenerating && !generationState.isPaused) {
        console.log('🚀 Auto-starting generation process...');
        // Use a small delay to ensure component is fully mounted
        setTimeout(() => {
          startSequentialGeneration(ideaData);
        }, 1000);
      } else if (completedReports === totalReports) {
        console.log('✅ All reports already complete');
      } else {
        console.log('⏸️  Generation in progress or paused, not auto-starting');
      }
    }
  }, [ideaData, startSequentialGeneration, generationState.status, generationState.isGenerating, generationState.isPaused, analysisTypes.length]);

  // Check completion and redirect
  useEffect(() => {
    const completedReports = Object.values(generationState.status).filter(s => s === 'complete').length;
    const totalReports = analysisTypes.length;
    
    if (completedReports === totalReports && completedReports > 0) {
      console.log('🎊 All reports completed, preparing redirect...');
      localStorage.setItem('generatedReports', JSON.stringify(generationState.generatedContent));
      localStorage.removeItem('generation_state'); // Clean up
      
      toast({
        title: "All Reports Complete!",
        description: "Redirecting to results page...",
      });
      
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    }
  }, [generationState.status, generationState.generatedContent, navigate, analysisTypes.length, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Cleaning up GeneratingReports component');
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
    console.log('⏸️  Pausing generation');
    setGenerationState(prev => ({ ...prev, isPaused: true, lastActivity: Date.now() }));
    generationLockRef.current = false;
    currentGenerationSessionRef.current = null;
  }, []);

  const resumeGeneration = useCallback(() => {
    console.log('▶️  Resuming generation');
    setGenerationState(prev => ({ ...prev, isPaused: false, lastActivity: Date.now() }));
    if (ideaData) {
      startSequentialGeneration(ideaData);
    }
  }, [ideaData, startSequentialGeneration]);

  const forceRestartGeneration = useCallback(() => {
    console.log('🔄 Force restarting generation...');
    
    // Stop current generation
    generationLockRef.current = false;
    currentGenerationSessionRef.current = null;
    
    // Create new session
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionIdRef.current = newSessionId;
    
    // Reset state
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
      startTime: Date.now(),
      lastActivity: Date.now()
    });
    
    // Clear stored state
    localStorage.removeItem('generation_state');
    
    toast({
      title: "Generation Restarted",
      description: "Starting fresh generation process...",
    });
    
    // Start generation after a brief delay
    if (ideaData) {
      setTimeout(() => {
        startSequentialGeneration(ideaData);
      }, 1000);
    }
  }, [ideaData, startSequentialGeneration, toast]);

  const hasErrors = Object.values(generationState.status).some(s => s === 'error');
  const isComplete = Object.values(generationState.status).every(s => s === 'complete');
  const completedCount = Object.values(generationState.status).filter(s => s === 'complete').length;
  const currentlyGenerating = analysisTypes.find(type => 
    generationState.status[type.key as keyof GenerationStatus] === 'loading'
  )?.key || null;

  // Check if generation appears stuck
  const isStuck = !generationState.isGenerating && 
                  !generationState.isPaused && 
                  !isComplete && 
                  completedCount === 0 &&
                  Date.now() - generationState.lastActivity > 10000; // 10 seconds

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center space-x-3">
            {isComplete ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : isStuck ? (
              <AlertCircle className="h-8 w-8 text-red-600" />
            ) : (
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            )}
            <span>
              {isComplete 
                ? 'Reports Complete!' 
                : isStuck 
                  ? 'Generation Stuck - Action Required'
                  : 'Generating Your Startup Package'
              }
            </span>
          </CardTitle>
          <CardDescription className="text-lg">
            {isComplete 
              ? 'All reports have been generated successfully. Redirecting...'
              : isStuck
                ? 'Generation appears to be stuck. Please use the restart button below.'
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
              {isStuck && (
                <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                  STUCK
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
                
                <Button onClick={forceRestartGeneration} variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Force Restart
                </Button>
                
                {hasErrors && (
                  <Button onClick={forceRestartGeneration} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                    Retry Failed Reports
                  </Button>
                )}
              </div>
            )}

            {isStuck && (
              <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-600 font-medium text-lg mb-2">
                  ⚠️ Generation appears to be stuck
                </div>
                <p className="text-red-700 mb-4">
                  The generation process hasn't started or made progress. This can happen due to network issues or high server load.
                </p>
                <Button onClick={forceRestartGeneration} className="bg-red-600 hover:bg-red-700 text-white">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restart Generation Now
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
