
import { useState, useCallback } from 'react';

interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
}

interface RetryState {
  isRetrying: boolean;
  attemptCount: number;
  lastError?: Error;
}

export const useRetryLogic = (options: RetryOptions = {}) => {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000
  } = options;

  const [retryState, setRetryState] = useState<RetryState>({
    isRetrying: false,
    attemptCount: 0
  });

  const executeWithRetry = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    setRetryState({ isRetrying: true, attemptCount: 0 });

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setRetryState(prev => ({ ...prev, attemptCount: attempt }));
        const result = await operation();
        setRetryState({ isRetrying: false, attemptCount: 0 });
        return result;
      } catch (error) {
        const isLastAttempt = attempt === maxAttempts;
        const isRateLimitError = error instanceof Error && 
          (error.message.includes('rate limit') || error.message.includes('429'));

        if (isLastAttempt) {
          setRetryState({ 
            isRetrying: false, 
            attemptCount: attempt,
            lastError: error as Error
          });
          throw error;
        }

        // Calculate exponential backoff delay
        const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
        
        // Add extra delay for rate limit errors
        const finalDelay = isRateLimitError ? delay * 2 : delay;
        
        console.log(`Attempt ${attempt} failed, retrying in ${finalDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, finalDelay));
      }
    }

    throw new Error('Max retry attempts exceeded');
  }, [maxAttempts, baseDelay, maxDelay]);

  const reset = useCallback(() => {
    setRetryState({ isRetrying: false, attemptCount: 0 });
  }, []);

  return {
    executeWithRetry,
    reset,
    ...retryState
  };
};
