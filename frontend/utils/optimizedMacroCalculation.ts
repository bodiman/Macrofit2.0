import { FoodServing } from '@shared/types/foodTypes';
import { UserPreference } from '@shared/types/databaseTypes';

// Pre-compute preference metric IDs for faster lookup
const createPreferenceSet = (userPreferences?: UserPreference[]): Set<string> => {
  if (!userPreferences || userPreferences.length === 0) {
    return new Set();
  }
  return new Set(userPreferences.map(pref => pref.metric_id));
};

// Optimized single food serving calculation
export const calculateAdjustedMacrosOptimized = (
  foodServing: FoodServing, 
  preferenceSet: Set<string>
): Record<string, number> => {
  const { unit, quantity, food } = foodServing;
  const gramsInPortion = quantity * unit.grams;
  const totalMacros: Record<string, number> = {};

  // Use direct property access instead of Object.entries for better performance
  const macros = food.macros;
  const macroKeys = Object.keys(macros);
  
  for (let i = 0; i < macroKeys.length; i++) {
    const key = macroKeys[i];
    if (preferenceSet.size === 0 || preferenceSet.has(key)) {
      totalMacros[key] = Math.round(macros[key] * gramsInPortion);
    }
  }
  
  return totalMacros;
};

// Batch calculation for multiple meals
export const calculateAllMacrosOptimized = (
  meals: any[], 
  userPreferences?: UserPreference[]
): Record<string, number> => {
  const preferenceSet = createPreferenceSet(userPreferences);
  const totalMacros: Record<string, number> = {};
  
  // Pre-allocate common macro keys for better performance
  const commonMacroKeys = new Set<string>();
  meals.forEach(meal => {
    meal.servings.forEach((serving: FoodServing) => {
      Object.keys(serving.food.macros).forEach(key => {
        if (preferenceSet.size === 0 || preferenceSet.has(key)) {
          commonMacroKeys.add(key);
        }
      });
    });
  });
  
  // Initialize all macro keys to 0
  commonMacroKeys.forEach(key => {
    totalMacros[key] = 0;
  });
  
  // Calculate macros for all servings
  meals.forEach(meal => {
    meal.servings.forEach((foodServing: FoodServing) => {
      const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
      
      // Use direct property access for accumulation
      Object.keys(adjustedMacros).forEach(key => {
        totalMacros[key] += adjustedMacros[key];
      });
    });
  });
  
  return totalMacros;
};

// Parallel calculation using Promise.all for multiple independent calculations
export const calculateMacrosParallel = async (
  meals: any[], 
  userPreferences?: UserPreference[]
): Promise<Record<string, number>> => {
  const preferenceSet = createPreferenceSet(userPreferences);
  
  // Split meals into chunks for parallel processing
  const chunkSize = 5; // Process 5 meals at a time
  const chunks = [];
  
  for (let i = 0; i < meals.length; i += chunkSize) {
    chunks.push(meals.slice(i, i + chunkSize));
  }
  
  // Process chunks in parallel
  const chunkResults = await Promise.all(
    chunks.map(chunk => 
      new Promise<Record<string, number>>((resolve) => {
        // Use setTimeout to defer to next tick for better responsiveness
        setTimeout(() => {
          const chunkMacros: Record<string, number> = {};
          
          chunk.forEach(meal => {
            meal.servings.forEach((foodServing: FoodServing) => {
              const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
              Object.keys(adjustedMacros).forEach(key => {
                chunkMacros[key] = (chunkMacros[key] || 0) + adjustedMacros[key];
              });
            });
          });
          
          resolve(chunkMacros);
        }, 0);
      })
    )
  );
  
  // Combine results
  const totalMacros: Record<string, number> = {};
  chunkResults.forEach(chunkMacros => {
    Object.keys(chunkMacros).forEach(key => {
      totalMacros[key] = (totalMacros[key] || 0) + chunkMacros[key];
    });
  });
  
  return totalMacros;
}; 