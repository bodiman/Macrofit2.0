import { useState, useCallback, useRef, useEffect } from 'react';

export interface OptimisticUpdate<T> {
  id: string;
  timestamp: number;
  previousState: T;
  newState: T;
  operation: string;
  metadata?: any;
}

export interface OptimisticStorageConfig {
  maxHistorySize?: number;
  enableLogging?: boolean;
  autoCleanup?: boolean;
  cleanupInterval?: number;
}

/**
 * React hook for optimistic storage with rollback capabilities
 */
export function useOptimisticStorage<T>(
  initialState: T,
  config: OptimisticStorageConfig = {}
) {
  const [state, setState] = useState<T>(initialState);
  const updateHistoryRef = useRef<OptimisticUpdate<T>[]>([]);
  const pendingOperationsRef = useRef<Map<string, Promise<any>>>(new Map());
  const cleanupTimerRef = useRef<NodeJS.Timeout>();
  
  const {
    maxHistorySize = 50,
    enableLogging = false,
    autoCleanup = true,
    cleanupInterval = 30000
  } = config;

  // Cleanup function
  const cleanup = useCallback(() => {
    const history = updateHistoryRef.current;
    if (history.length <= maxHistorySize) {
      return;
    }

    const excessCount = history.length - maxHistorySize;
    history.splice(0, excessCount);

    if (enableLogging) {
      console.log(`useOptimisticStorage: Cleaned up ${excessCount} old history entries`);
    }
  }, [maxHistorySize, enableLogging]);

  // Start cleanup timer
  useEffect(() => {
    if (autoCleanup) {
      cleanupTimerRef.current = setInterval(cleanup, cleanupInterval);
      return () => {
        if (cleanupTimerRef.current) {
          clearInterval(cleanupTimerRef.current);
        }
      };
    }
  }, [autoCleanup, cleanupInterval, cleanup]);

  // Optimistic update function
  const optimisticUpdate = useCallback(async (
    operationId: string,
    updateFn: (currentState: T) => T,
    apiCall: Promise<any>,
    operation: string,
    metadata?: any
  ): Promise<any> => {
    if (pendingOperationsRef.current.has(operationId)) {
      throw new Error(`Operation ${operationId} is already in progress`);
    }

    const previousState = state;
    const newState = updateFn(state);
    const timestamp = Date.now();

    // Create optimistic update record
    const optimisticUpdate: OptimisticUpdate<T> = {
      id: operationId,
      timestamp,
      previousState,
      newState,
      operation,
      metadata
    };

    // Apply optimistic update immediately
    setState(newState);
    updateHistoryRef.current.push(optimisticUpdate);

    if (enableLogging) {
      console.log(`useOptimisticStorage: Applied optimistic update`, {
        operationId,
        operation,
        timestamp
      });
    }

    // Execute the API call
    const executeOperation = async (): Promise<any> => {
      try {
        const result = await apiCall;
        
        // Remove the optimistic update from history since it was successful
        updateHistoryRef.current = updateHistoryRef.current.filter(
          update => update.id !== operationId
        );
        
        if (enableLogging) {
          console.log(`useOptimisticStorage: Operation completed successfully`, {
            operationId,
            operation
          });
        }

        return result;
      } catch (error) {
        // Rollback on failure
        const updateIndex = updateHistoryRef.current.findIndex(
          update => update.id === operationId
        );
        
        if (updateIndex !== -1) {
          const update = updateHistoryRef.current[updateIndex];
          setState(update.previousState);
          updateHistoryRef.current.splice(updateIndex, 1);

          if (enableLogging) {
            console.log(`useOptimisticStorage: Rolled back operation`, {
              operationId,
              operation: update.operation
            });
          }
        }

        if (enableLogging) {
          console.error(`useOptimisticStorage: Operation failed`, {
            operationId,
            operation: optimisticUpdate.operation,
            error
          });
        }
        
        throw error;
      }
    };

    // Store the pending operation
    const operationPromise = executeOperation();
    pendingOperationsRef.current.set(operationId, operationPromise);

    try {
      const result = await operationPromise;
      return result;
    } finally {
      pendingOperationsRef.current.delete(operationId);
    }
  }, [state, enableLogging]);

  // Force rollback function
  const forceRollback = useCallback(async (operationId: string): Promise<void> => {
    const updateIndex = updateHistoryRef.current.findIndex(
      update => update.id === operationId
    );
    
    if (updateIndex === -1) {
      if (enableLogging) {
        console.warn(`useOptimisticStorage: No update found for rollback`, { operationId });
      }
      return;
    }

    const update = updateHistoryRef.current[updateIndex];
    setState(update.previousState);
    updateHistoryRef.current.splice(updateIndex, 1);

    if (enableLogging) {
      console.log(`useOptimisticStorage: Force rolled back operation`, {
        operationId,
        operation: update.operation
      });
    }
  }, [enableLogging]);

  // Utility functions
  const getPendingOperations = useCallback((): string[] => {
    return Array.from(pendingOperationsRef.current.keys());
  }, []);

  const getUpdateHistory = useCallback((): OptimisticUpdate<T>[] => {
    return [...updateHistoryRef.current];
  }, []);

  const clearHistory = useCallback((): void => {
    updateHistoryRef.current = [];
    
    if (enableLogging) {
      console.log(`useOptimisticStorage: History cleared`);
    }
  }, [enableLogging]);

  const getPendingCount = useCallback((): number => {
    return pendingOperationsRef.current.size;
  }, []);

  const hasPendingOperations = useCallback((): boolean => {
    return pendingOperationsRef.current.size > 0;
  }, []);

  const waitForPendingOperations = useCallback(async (): Promise<void> => {
    const operations = Array.from(pendingOperationsRef.current.values());
    await Promise.all(operations);
  }, []);

  return {
    state,
    optimisticUpdate,
    forceRollback,
    getPendingOperations,
    getUpdateHistory,
    clearHistory,
    getPendingCount,
    hasPendingOperations,
    waitForPendingOperations
  };
} 