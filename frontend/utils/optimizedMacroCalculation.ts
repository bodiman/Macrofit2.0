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
  // Add validation and error handling
  if (!foodServing) {
    console.error('calculateAdjustedMacrosOptimized: foodServing is null or undefined');
    return {};
  }

  if (!foodServing.unit || !foodServing.food || !foodServing.food.macros) {
    console.error('calculateAdjustedMacrosOptimized: Invalid foodServing structure:', foodServing);
    return {};
  }

  const { unit, quantity, food } = foodServing;
  
  // Validate quantity and unit.grams
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    console.error('calculateAdjustedMacrosOptimized: Invalid quantity:', quantity);
    return {};
  }

  if (typeof unit.grams !== 'number' || isNaN(unit.grams)) {
    console.error('calculateAdjustedMacrosOptimized: Invalid unit.grams:', unit.grams);
    return {};
  }

  const gramsInPortion = quantity * unit.grams;
  const totalMacros: Record<string, number> = {};

  // Use direct property access instead of Object.entries for better performance
  const macros = food.macros;
  
  if (!macros || typeof macros !== 'object') {
    console.error('calculateAdjustedMacrosOptimized: Invalid macros object:', macros);
    return {};
  }

  const macroKeys = Object.keys(macros);
  
  for (let i = 0; i < macroKeys.length; i++) {
    const key = macroKeys[i];
    const macroValue = macros[key];
    
    // Validate macro value
    if (typeof macroValue !== 'number' || isNaN(macroValue)) {
      console.warn(`calculateAdjustedMacrosOptimized: Invalid macro value for ${key}:`, macroValue);
      continue;
    }
    
    if (preferenceSet.size === 0 || preferenceSet.has(key)) {
      totalMacros[key] = Math.round(macroValue * gramsInPortion);
    }
  }
  
  return totalMacros;
};

// Batch calculation for multiple meals
export const calculateAllMacrosOptimized = (
  meals: any[], 
  userPreferences?: UserPreference[]
): Record<string, number> => {
  // Add comprehensive error handling and debugging
  console.log('calculateAllMacrosOptimized called with:', {
    mealsType: typeof meals,
    mealsIsArray: Array.isArray(meals),
    mealsLength: meals?.length,
    mealsValue: meals,
    userPreferencesType: typeof userPreferences,
    userPreferencesIsArray: Array.isArray(userPreferences),
    userPreferencesLength: userPreferences?.length
  });

  // Validate inputs
  if (!meals) {
    console.error('calculateAllMacrosOptimized: meals is null or undefined');
    return {};
  }

  if (!Array.isArray(meals)) {
    console.error('calculateAllMacrosOptimized: meals is not an array, received:', meals);
    return {};
  }

  if (meals.length === 0) {
    console.log('calculateAllMacrosOptimized: meals array is empty, returning empty macros');
    return {};
  }

  // Validate each meal has the expected structure
  meals.forEach((meal, index) => {
    if (!meal) {
      console.error(`calculateAllMacrosOptimized: meal at index ${index} is null or undefined`);
      return;
    }
    
    if (!meal.servings) {
      console.error(`calculateAllMacrosOptimized: meal at index ${index} has no servings property:`, meal);
      return;
    }
    
    if (!Array.isArray(meal.servings)) {
      console.error(`calculateAllMacrosOptimized: meal.servings at index ${index} is not an array:`, meal.servings);
      return;
    }
  });

  const preferenceSet = createPreferenceSet(userPreferences);
  const totalMacros: Record<string, number> = {};
  
  // Pre-allocate common macro keys for better performance
  const commonMacroKeys = new Set<string>();
  
  try {
    meals.forEach((meal, mealIndex) => {
      if (!meal || !meal.servings || !Array.isArray(meal.servings)) {
        console.warn(`calculateAllMacrosOptimized: Skipping invalid meal at index ${mealIndex}:`, meal);
        return;
      }
      
      meal.servings.forEach((serving: FoodServing, servingIndex: number) => {
        if (!serving || !serving.food || !serving.food.macros) {
          console.warn(`calculateAllMacrosOptimized: Skipping invalid serving at meal ${mealIndex}, serving ${servingIndex}:`, serving);
          return;
        }
        
        Object.keys(serving.food.macros).forEach(key => {
          if (preferenceSet.size === 0 || preferenceSet.has(key)) {
            commonMacroKeys.add(key);
          }
        });
      });
    });
  } catch (error) {
    console.error('calculateAllMacrosOptimized: Error during pre-allocation phase:', error);
    return {};
  }
  
  // Initialize all macro keys to 0
  commonMacroKeys.forEach(key => {
    totalMacros[key] = 0;
  });
  
  // Calculate macros for all servings
  try {
    meals.forEach((meal, mealIndex) => {
      if (!meal || !meal.servings || !Array.isArray(meal.servings)) {
        console.warn(`calculateAllMacrosOptimized: Skipping invalid meal at index ${mealIndex} during calculation:`, meal);
        return;
      }
      
      meal.servings.forEach((foodServing: FoodServing, servingIndex: number) => {
        if (!foodServing || !foodServing.food || !foodServing.food.macros) {
          console.warn(`calculateAllMacrosOptimized: Skipping invalid serving at meal ${mealIndex}, serving ${servingIndex} during calculation:`, foodServing);
          return;
        }
        
        try {
          const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
          
          // Use direct property access for accumulation
          Object.keys(adjustedMacros).forEach(key => {
            totalMacros[key] += adjustedMacros[key];
          });
        } catch (error) {
          console.error(`calculateAllMacrosOptimized: Error calculating macros for serving at meal ${mealIndex}, serving ${servingIndex}:`, error, foodServing);
        }
      });
    });
  } catch (error) {
    console.error('calculateAllMacrosOptimized: Error during calculation phase:', error);
    return {};
  }
  
  console.log('calculateAllMacrosOptimized completed successfully, returning:', totalMacros);
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