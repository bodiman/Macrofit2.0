import { useGlobalMacros } from '@/context/GlobalMacrosContext';
import { useCallback } from 'react';

/**
 * Hook for easy synchronization of local macros with global macros display
 * Provides both full updates and ultra-fast incremental updates
 */
export function useGlobalMacrosSync() {
  const {
    updateLoggedMealsMacros,
    updateMealPlanMacros,
    updateShoppingCartMacros,
    updateOtherMacros,
    setShoppingCartOpen,
    addToLoggedMealsMacros,
    subtractFromLoggedMealsMacros,
    addToMealPlanMacros,
    subtractFromMealPlanMacros,
    addToShoppingCartMacros,
    subtractFromShoppingCartMacros,
    addToOtherMacros,
    subtractFromOtherMacros,
    clearMealPlanMacros,
    clearShoppingCartMacros,
    clearOtherMacros,
    totalMacros
  } = useGlobalMacros();

  // Full sync functions (for complete replacement)
  const syncLoggedMealsMacros = useCallback((macros: any) => {
    updateLoggedMealsMacros(macros);
  }, [updateLoggedMealsMacros]);

  const syncMealPlanMacros = useCallback((macros: any) => {
    updateMealPlanMacros(macros);
  }, [updateMealPlanMacros]);

  const syncShoppingCartMacros = useCallback((macros: any) => {
    updateShoppingCartMacros(macros);
  }, [updateShoppingCartMacros]);

  const syncOtherMacros = useCallback((macros: any) => {
    updateOtherMacros(macros);
  }, [updateOtherMacros]);

  // Shopping cart modal state functions
  const openShoppingCart = useCallback(() => {
    setShoppingCartOpen(true);
  }, [setShoppingCartOpen]);

  const closeShoppingCart = useCallback(() => {
    setShoppingCartOpen(false);
  }, [setShoppingCartOpen]);

  // Ultra-fast incremental add functions
  const addToLoggedMeals = useCallback((macros: any) => {
    addToLoggedMealsMacros(macros);
  }, [addToLoggedMealsMacros]);

  const addToMealPlan = useCallback((macros: any) => {
    addToMealPlanMacros(macros);
  }, [addToMealPlanMacros]);

  const addToShoppingCart = useCallback((macros: any) => {
    addToShoppingCartMacros(macros);
  }, [addToShoppingCartMacros]);

  const addToOther = useCallback((macros: any) => {
    addToOtherMacros(macros);
  }, [addToOtherMacros]);

  // Ultra-fast incremental subtract functions
  const subtractFromLoggedMeals = useCallback((macros: any) => {
    subtractFromLoggedMealsMacros(macros);
  }, [subtractFromLoggedMealsMacros]);

  const subtractFromMealPlan = useCallback((macros: any) => {
    subtractFromMealPlanMacros(macros);
  }, [subtractFromMealPlanMacros]);

  const subtractFromShoppingCart = useCallback((macros: any) => {
    subtractFromShoppingCartMacros(macros);
  }, [subtractFromShoppingCartMacros]);

  const subtractFromOther = useCallback((macros: any) => {
    subtractFromOtherMacros(macros);
  }, [subtractFromOtherMacros]);

  // Clear functions
  const clearMealPlan = useCallback(() => {
    clearMealPlanMacros();
  }, [clearMealPlanMacros]);

  const clearShoppingCart = useCallback(() => {
    clearShoppingCartMacros();
  }, [clearShoppingCartMacros]);

  const clearOther = useCallback(() => {
    clearOtherMacros();
  }, [clearOtherMacros]);

  return {
    // Full sync functions (for complete replacement)
    syncLoggedMealsMacros,
    syncMealPlanMacros,
    syncShoppingCartMacros,
    syncOtherMacros,
    
    // Shopping cart modal state functions
    openShoppingCart,
    closeShoppingCart,
    
    // Ultra-fast incremental add functions
    addToLoggedMeals,
    addToMealPlan,
    addToShoppingCart,
    addToOther,
    
    // Ultra-fast incremental subtract functions
    subtractFromLoggedMeals,
    subtractFromMealPlan,
    subtractFromShoppingCart,
    subtractFromOther,
    
    // Clear functions
    clearMealPlan,
    clearShoppingCart,
    clearOther,
    
    // Current total macros
    totalMacros
  };
} 