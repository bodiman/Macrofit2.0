import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { MacroPreferences } from '@/tempdata';

interface GlobalMacrosContextType {
  // Current macros state
  loggedMealsMacros: any;
  mealPlanMacros: any;
  shoppingCartMacros: any;
  otherMacros: any;
  
  // Shopping cart modal state
  isShoppingCartOpen: boolean;
  
  // Incremental update functions (FAST - just add/subtract differences)
  updateLoggedMealsMacros: (macros: any) => void;
  updateMealPlanMacros: (macros: any) => void;
  updateShoppingCartMacros: (macros: any) => void;
  updateOtherMacros: (macros: any) => void;
  
  // Shopping cart modal state functions
  setShoppingCartOpen: (isOpen: boolean) => void;
  
  // Incremental add/subtract functions (ULTRA FAST)
  addToLoggedMealsMacros: (macros: any) => void;
  subtractFromLoggedMealsMacros: (macros: any) => void;
  addToMealPlanMacros: (macros: any) => void;
  subtractFromMealPlanMacros: (macros: any) => void;
  addToShoppingCartMacros: (macros: any) => void;
  subtractFromShoppingCartMacros: (macros: any) => void;
  addToOtherMacros: (macros: any) => void;
  subtractFromOtherMacros: (macros: any) => void;
  
  // Combined macros
  totalMacros: any;
  
  // Utility functions
  clearAllMacros: () => void;
  clearMealPlanMacros: () => void;
  clearShoppingCartMacros: () => void;
  clearOtherMacros: () => void;
}

const GlobalMacrosContext = createContext<GlobalMacrosContextType | undefined>(undefined);

export function GlobalMacrosProvider({ children }: { children: React.ReactNode }) {
  const [loggedMealsMacros, setLoggedMealsMacros] = useState<any>({});
  const [mealPlanMacros, setMealPlanMacros] = useState<any>({});
  const [shoppingCartMacros, setShoppingCartMacros] = useState<any>({});
  const [otherMacros, setOtherMacros] = useState<any>({});
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);

  // Helper function for incremental updates
  const addMacros = useCallback((currentMacros: any, newMacros: any) => {
    const updated = { ...currentMacros };
    for (const [key, value] of Object.entries(newMacros)) {
      updated[key] = (updated[key] || 0) + (value as number);
    }
    return updated;
  }, []);

  const subtractMacros = useCallback((currentMacros: any, macrosToSubtract: any) => {
    const updated = { ...currentMacros };
    for (const [key, value] of Object.entries(macrosToSubtract)) {
      updated[key] = Math.max(0, (updated[key] || 0) - (value as number));
    }
    return updated;
  }, []);

  // Full update functions (for complete replacement)
  const updateLoggedMealsMacros = useCallback((macros: any) => {
    setLoggedMealsMacros(macros);
  }, []);

  const updateMealPlanMacros = useCallback((macros: any) => {
    setMealPlanMacros(macros);
  }, []);

  const updateShoppingCartMacros = useCallback((macros: any) => {
    setShoppingCartMacros(macros);
  }, []);

  const updateOtherMacros = useCallback((macros: any) => {
    setOtherMacros(macros);
  }, []);

  // Shopping cart modal state functions
  const setShoppingCartOpen = useCallback((isOpen: boolean) => {
    console.log(`🛒 Shopping cart ${isOpen ? 'OPENED' : 'CLOSED'}`);
    setIsShoppingCartOpen(isOpen);
  }, []);

  // Incremental add functions (ULTRA FAST)
  const addToLoggedMealsMacros = useCallback((macros: any) => {
    setLoggedMealsMacros((prev: any) => addMacros(prev, macros));
  }, [addMacros]);

  const addToMealPlanMacros = useCallback((macros: any) => {
    setMealPlanMacros((prev: any) => addMacros(prev, macros));
  }, [addMacros]);

  const addToShoppingCartMacros = useCallback((macros: any) => {
    setShoppingCartMacros((prev: any) => addMacros(prev, macros));
  }, [addMacros]);

  const addToOtherMacros = useCallback((macros: any) => {
    setOtherMacros((prev: any) => addMacros(prev, macros));
  }, [addMacros]);

  // Incremental subtract functions (ULTRA FAST)
  const subtractFromLoggedMealsMacros = useCallback((macros: any) => {
    setLoggedMealsMacros((prev: any) => subtractMacros(prev, macros));
  }, [subtractMacros]);

  const subtractFromMealPlanMacros = useCallback((macros: any) => {
    setMealPlanMacros((prev: any) => subtractMacros(prev, macros));
  }, [subtractMacros]);

  const subtractFromShoppingCartMacros = useCallback((macros: any) => {
    setShoppingCartMacros((prev: any) => subtractMacros(prev, macros));
  }, [subtractMacros]);

  const subtractFromOtherMacros = useCallback((macros: any) => {
    setOtherMacros((prev: any) => subtractMacros(prev, macros));
  }, [subtractMacros]);

  // Clear functions
  const clearAllMacros = useCallback(() => {
    setLoggedMealsMacros({});
    setMealPlanMacros({});
    setShoppingCartMacros({});
    setOtherMacros({});
  }, []);

  const clearMealPlanMacros = useCallback(() => {
    setMealPlanMacros({});
  }, []);

  const clearShoppingCartMacros = useCallback(() => {
    setShoppingCartMacros({});
  }, []);

  const clearOtherMacros = useCallback(() => {
    setOtherMacros({});
  }, []);

  // Combine all macros
  const totalMacros = useMemo(() => {
    const combined: any = {};

    // Add logged meals macros
    for (const [key, value] of Object.entries(loggedMealsMacros)) {
      combined[key] = (combined[key] || 0) + (value as number);
    }

    // Add meal plan macros
    for (const [key, value] of Object.entries(mealPlanMacros)) {
      combined[key] = (combined[key] || 0) + (value as number);
    }

    // Add shopping cart macros only if the modal is open
    if (isShoppingCartOpen) {
      console.log(`🛒 Including shopping cart macros in total:`, shoppingCartMacros);
      for (const [key, value] of Object.entries(shoppingCartMacros)) {
        combined[key] = (combined[key] || 0) + (value as number);
      }
    } else {
      console.log(`🛒 Shopping cart closed - NOT including cart macros:`, shoppingCartMacros);
    }

    // Add other macros
    for (const [key, value] of Object.entries(otherMacros)) {
      combined[key] = (combined[key] || 0) + (value as number);
    }

    console.log(`📊 Total macros breakdown:`, {
      loggedMeals: loggedMealsMacros,
      mealPlan: mealPlanMacros,
      shoppingCart: isShoppingCartOpen ? shoppingCartMacros : 'EXCLUDED',
      other: otherMacros,
      total: combined
    });

    return combined;
  }, [loggedMealsMacros, mealPlanMacros, shoppingCartMacros, otherMacros, isShoppingCartOpen]);

  const value: GlobalMacrosContextType = {
    loggedMealsMacros,
    mealPlanMacros,
    shoppingCartMacros,
    otherMacros,
    isShoppingCartOpen,
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
    totalMacros,
    clearAllMacros,
    clearMealPlanMacros,
    clearShoppingCartMacros,
    clearOtherMacros,
  };

  return (
    <GlobalMacrosContext.Provider value={value}>
      {children}
    </GlobalMacrosContext.Provider>
  );
}

export function useGlobalMacros() {
  const context = useContext(GlobalMacrosContext);
  if (context === undefined) {
    throw new Error('useGlobalMacros must be used within a GlobalMacrosProvider');
  }
  return context;
} 