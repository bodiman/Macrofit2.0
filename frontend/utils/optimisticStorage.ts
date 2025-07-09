import React from 'react';

/**
 * OptimisticStorage - A utility class for managing optimistic updates with rollback capabilities
 * 
 * This class provides a way to immediately update local state (optimistic update)
 * while making an API call in the background. If the API call fails, it can
 * rollback to the previous state.
 */

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

export class OptimisticStorage<T> {
  private currentState: T;
  private updateHistory: OptimisticUpdate<T>[] = [];
  private pendingOperations: Map<string, Promise<any>> = new Map();
  private config: Required<OptimisticStorageConfig>;
  private cleanupTimer?: NodeJS.Timeout;

  constructor(
    initialState: T,
    config: OptimisticStorageConfig = {}
  ) {
    this.currentState = initialState;
    this.config = {
      maxHistorySize: 50,
      enableLogging: false,
      autoCleanup: true,
      cleanupInterval: 30000, // 30 seconds
      ...config
    };

    if (this.config.autoCleanup) {
      this.startCleanupTimer();
    }
  }

  /**
   * Get the current state
   */
  getState(): T {
    return this.currentState;
  }

  /**
   * Perform an optimistic update
   * @param operationId - Unique identifier for this operation
   * @param updateFn - Function that returns the new state
   * @param apiCall - Promise that performs the actual API call
   * @param operation - Description of the operation
   * @param metadata - Additional metadata for the operation
   */
  async optimisticUpdate(
    operationId: string,
    updateFn: (currentState: T) => T,
    apiCall: Promise<any>,
    operation: string,
    metadata?: any
  ): Promise<any> {
    if (this.pendingOperations.has(operationId)) {
      throw new Error(`Operation ${operationId} is already in progress`);
    }

    const previousState = this.currentState;
    const newState = updateFn(previousState);
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
    this.currentState = newState;
    this.updateHistory.push(optimisticUpdate);

    if (this.config.enableLogging) {
      console.log(`OptimisticStorage: Applied optimistic update`, {
        operationId,
        operation,
        timestamp
      });
    }

    // Store the pending operation
    const operationPromise = this.executeOperation(operationId, apiCall, optimisticUpdate);
    this.pendingOperations.set(operationId, operationPromise);

    try {
      const result = await operationPromise;
      
      if (this.config.enableLogging) {
        console.log(`OptimisticStorage: Operation completed successfully`, {
          operationId,
          operation
        });
      }

      return result;
    } catch (error) {
      // Rollback on failure
      await this.rollback(operationId);
      throw error;
    } finally {
      this.pendingOperations.delete(operationId);
    }
  }

  /**
   * Execute the actual API operation
   */
  private async executeOperation(
    operationId: string,
    apiCall: Promise<any>,
    optimisticUpdate: OptimisticUpdate<T>
  ): Promise<any> {
    try {
      const result = await apiCall;
      
      // Remove the optimistic update from history since it was successful
      this.updateHistory = this.updateHistory.filter(update => update.id !== operationId);
      
      return result;
    } catch (error) {
      if (this.config.enableLogging) {
        console.error(`OptimisticStorage: Operation failed`, {
          operationId,
          operation: optimisticUpdate.operation,
          error
        });
      }
      throw error;
    }
  }

  /**
   * Rollback to the previous state
   */
  private async rollback(operationId: string): Promise<void> {
    const updateIndex = this.updateHistory.findIndex(update => update.id === operationId);
    
    if (updateIndex === -1) {
      if (this.config.enableLogging) {
        console.warn(`OptimisticStorage: No update found for rollback`, { operationId });
      }
      return;
    }

    const update = this.updateHistory[updateIndex];
    
    // Rollback to previous state
    this.currentState = update.previousState;
    
    // Remove this update from history
    this.updateHistory.splice(updateIndex, 1);

    if (this.config.enableLogging) {
      console.log(`OptimisticStorage: Rolled back operation`, {
        operationId,
        operation: update.operation
      });
    }
  }

  /**
   * Force rollback of a specific operation
   */
  async forceRollback(operationId: string): Promise<void> {
    await this.rollback(operationId);
  }

  /**
   * Get all pending operations
   */
  getPendingOperations(): string[] {
    return Array.from(this.pendingOperations.keys());
  }

  /**
   * Get the update history
   */
  getUpdateHistory(): OptimisticUpdate<T>[] {
    return [...this.updateHistory];
  }

  /**
   * Clear the update history
   */
  clearHistory(): void {
    this.updateHistory = [];
    
    if (this.config.enableLogging) {
      console.log(`OptimisticStorage: History cleared`);
    }
  }

  /**
   * Get the number of pending operations
   */
  getPendingCount(): number {
    return this.pendingOperations.size;
  }

  /**
   * Check if there are any pending operations
   */
  hasPendingOperations(): boolean {
    return this.pendingOperations.size > 0;
  }

  /**
   * Wait for all pending operations to complete
   */
  async waitForPendingOperations(): Promise<void> {
    const operations = Array.from(this.pendingOperations.values());
    await Promise.all(operations);
  }

  /**
   * Start the cleanup timer
   */
  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * Cleanup old history entries
   */
  private cleanup(): void {
    if (this.updateHistory.length <= this.config.maxHistorySize) {
      return;
    }

    const excessCount = this.updateHistory.length - this.config.maxHistorySize;
    this.updateHistory.splice(0, excessCount);

    if (this.config.enableLogging) {
      console.log(`OptimisticStorage: Cleaned up ${excessCount} old history entries`);
    }
  }

  /**
   * Destroy the instance and clean up resources
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.pendingOperations.clear();
    this.updateHistory = [];
  }
}

/**
 * Create a new OptimisticStorage instance
 */
export function createOptimisticStorage<T>(
  initialState: T,
  config?: OptimisticStorageConfig
): OptimisticStorage<T> {
  return new OptimisticStorage(initialState, config);
}

/**
 * Hook for using OptimisticStorage in React components
 */
export function useOptimisticStorage<T>(
  initialState: T,
  config?: OptimisticStorageConfig
): OptimisticStorage<T> {
  const [storage] = React.useState(() => new OptimisticStorage(initialState, config));

  React.useEffect(() => {
    return () => {
      storage.destroy();
    };
  }, [storage]);

  return storage;
} 