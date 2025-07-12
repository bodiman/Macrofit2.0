import express from 'express';
import prisma from '../prisma_client';
import { BadRequestError } from '../user/types';

const router = express.Router();

// Simplified interfaces for numerical optimization
interface FoodMacroData {
  macroValues: number[]; // Values per gram for each macro
  unitGrams: number;     // Grams per unit
  quantity: number;      // Current quantity
  minQuantity: number;   // Minimum allowed quantity
  maxQuantity: number;   // Maximum allowed quantity
  locked?: boolean;      // Whether this food quantity is fixed/locked
}

interface UserPreferenceData {
  min_value: number | null;
  max_value: number | null;
}

interface OptimizationRequest {
  foods: FoodMacroData[];
  preferences: UserPreferenceData[];
  macroNames: string[]; // Array of macro names in the same order as macroValues
  maxIterations?: number; // Optional parameter for number of optimization iterations
}

interface OptimizationResponse {
  optimizedQuantities: number[];
  finalMacros: Record<string, number>;
  error: number;
}

// Calculate total macros for given food servings and quantities
const calculateTotalMacros = (foods: FoodMacroData[], quantities: number[], macroNames: string[]): Record<string, number> => {
  const macros: Record<string, number> = {};
  
  // Initialize all macros to 0
  macroNames.forEach(name => {
    macros[name] = 0;
  });
  
  foods.forEach((food, foodIndex) => {
    const quantity = quantities[foodIndex];
    const totalGrams = quantity * food.unitGrams;
    
    food.macroValues.forEach((valuePerGram, macroIndex) => {
      const macroName = macroNames[macroIndex];
      const totalValue = totalGrams * valuePerGram;
      macros[macroName] += totalValue;
    });
  });
  
  return macros;
};

// Calculate squared error between current macros and preferences
const calculateSquaredError = (
  currentMacros: Record<string, number>, 
  preferences: UserPreferenceData[], 
  macroNames: string[]
): number => {
  let totalError = 0;
  
  preferences.forEach((pref, index) => {
    const macroName = macroNames[index];
    const currentValue = currentMacros[macroName] || 0;
    
    const minValue = pref.min_value;
    const maxValue = pref.max_value;
    
    if (minValue !== null && currentValue < minValue) {
      // Below minimum
      if (minValue === 0) {
        // If min is 0, use absolute error
        totalError += (minValue - currentValue) * (minValue - currentValue);
      } else if (minValue < 0) {
        // If min is negative, use absolute error to avoid percentage issues
        totalError += (minValue - currentValue) * (minValue - currentValue);
      } else {
        // If min is positive, use percentage error
        const percentageError = (minValue - currentValue) / minValue;
        totalError += percentageError * percentageError;
      }
    } else if (maxValue !== null && currentValue > maxValue) {
      // Above maximum
      if (maxValue === 0) {
        // If max is 0, use absolute error
        totalError += (currentValue - maxValue) * (currentValue - maxValue);
      } else if (maxValue < 0) {
        // If max is negative, use absolute error to avoid percentage issues
        totalError += (currentValue - maxValue) * (currentValue - maxValue);
      } else {
        // If max is positive, use percentage error
        const percentageError = (currentValue - maxValue) / maxValue;
        totalError += percentageError * percentageError;
      }
    }
    // If within range, no error
  });
  
  return totalError;
};

// Constrained Linear Programming using Simplex-like approach
const optimizeQuantities = (
  foods: FoodMacroData[],
  preferences: UserPreferenceData[],
  macroNames: string[],
  initialQuantities: number[],
  maxIterations: number
): { quantities: number[]; error: number } => {
  const tolerance = 1e-6;
  
  // Create mutable quantities array (copy of initial)
  let quantities = [...initialQuantities];
  
  // Separate mutable and locked foods
  const mutableFoodIndices: number[] = [];
  const lockedFoodIndices: number[] = [];
  
  foods.forEach((food, index) => {
    if (food.locked) {
      lockedFoodIndices.push(index);
    } else {
      mutableFoodIndices.push(index);
    }
  });
  
  // If no mutable foods, return initial quantities
  if (mutableFoodIndices.length === 0) {
    const error = calculateSquaredError(
      calculateTotalMacros(foods, quantities, macroNames),
      preferences,
      macroNames
    );
    return { quantities, error };
  }
  
  // Calculate locked food contribution to macros
  const lockedMacros: Record<string, number> = {};
  macroNames.forEach(name => {
    lockedMacros[name] = 0;
  });
  
  lockedFoodIndices.forEach(foodIndex => {
    const food = foods[foodIndex];
    const totalGrams = food.quantity * food.unitGrams;
    food.macroValues.forEach((valuePerGram, macroIndex) => {
      const macroName = macroNames[macroIndex];
      lockedMacros[macroName] += totalGrams * valuePerGram;
    });
  });
  
  // Adjust preferences by subtracting locked food contribution
  const adjustedPreferences = preferences.map((pref, index) => {
    const macroName = macroNames[index];
    const lockedContribution = lockedMacros[macroName] || 0;
    
    return {
      min_value: pref.min_value !== null ? pref.min_value - lockedContribution : null,
      max_value: pref.max_value !== null ? pref.max_value - lockedContribution : null
    };
  });
  
  // Use a combination of coordinate descent and constraint satisfaction
  let currentError = calculateSquaredError(
    calculateTotalMacros(foods, quantities, macroNames),
    preferences,
    macroNames
  );
  let prevError = Infinity;
  let noImprovementCount = 0;
  
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let improved = false;
    
    // Try optimizing each mutable food one at a time
    for (const foodIndex of mutableFoodIndices) {
      const food = foods[foodIndex];
      const currentQuantity = quantities[foodIndex];
      
      // Calculate current macros without this food
      const macrosWithoutFood: Record<string, number> = {};
      macroNames.forEach(name => {
        macrosWithoutFood[name] = lockedMacros[name] || 0;
      });
      
      mutableFoodIndices.forEach(idx => {
        if (idx !== foodIndex) {
          const otherFood = foods[idx];
          const totalGrams = quantities[idx] * otherFood.unitGrams;
          otherFood.macroValues.forEach((valuePerGram, macroIndex) => {
            const macroName = macroNames[macroIndex];
            macrosWithoutFood[macroName] += totalGrams * valuePerGram;
          });
        }
      });
      
      // Find optimal quantity for this food
      let bestQuantity = currentQuantity;
      let bestError = currentError;
      
      // Try different quantities within bounds
      const stepSize = Math.max(0.1, (food.maxQuantity - food.minQuantity) / 20);
      for (let q = food.minQuantity; q <= food.maxQuantity; q += stepSize) {
        // Calculate macros with this quantity
        const testMacros = { ...macrosWithoutFood };
        const totalGrams = q * food.unitGrams;
        food.macroValues.forEach((valuePerGram, macroIndex) => {
          const macroName = macroNames[macroIndex];
          testMacros[macroName] += totalGrams * valuePerGram;
        });
        
        // Calculate error with adjusted preferences
        const testError = calculateSquaredError(testMacros, adjustedPreferences, macroNames);
        
        if (testError < bestError) {
          bestError = testError;
          bestQuantity = q;
          improved = true;
        }
      }
      
      // Update quantity if improvement found
      if (bestQuantity !== currentQuantity) {
        quantities[foodIndex] = bestQuantity;
        currentError = bestError;
      }
    }
    
    // Check convergence
    if (Math.abs(currentError - prevError) < tolerance) {
      break;
    }
    
    if (!improved) {
      noImprovementCount++;
      if (noImprovementCount > 5) {
        break; // No improvement for several iterations
      }
    } else {
      noImprovementCount = 0;
    }
    
    prevError = currentError;
  }
  
  // Final error calculation with original preferences
  const finalError = calculateSquaredError(
    calculateTotalMacros(foods, quantities, macroNames),
    preferences,
    macroNames
  );
  
  return { quantities, error: finalError };
};

// POST /api/optimize
router.post('/', async (req, res) => {
  try {
    const { foods, preferences, macroNames }: OptimizationRequest = req.body;
    
    // Validate input
    if (!foods || !Array.isArray(foods) || foods.length === 0) {
      throw new BadRequestError('foods is required and must be a non-empty array');
    }
    
    if (!preferences || !Array.isArray(preferences) || preferences.length === 0) {
      throw new BadRequestError('preferences is required and must be a non-empty array');
    }
    
    if (!macroNames || !Array.isArray(macroNames) || macroNames.length === 0) {
      throw new BadRequestError('macroNames is required and must be a non-empty array');
    }
    
    // Extract initial quantities
    const initialQuantities = foods.map(food => food.quantity);
    
    // Run optimization
    const { quantities: optimizedQuantities, error } = optimizeQuantities(
      foods,
      preferences,
      macroNames,
      initialQuantities,
      req.body.maxIterations || 1000
    );
    
    // Ensure locked foods maintain their original quantities
    const finalQuantities = optimizedQuantities.map((quantity, index) => {
      if (foods[index].locked) {
        return foods[index].quantity; // Return original quantity for locked foods
      }
      return quantity; // Return optimized quantity for mutable foods
    });
    
    // Calculate final macros with optimized quantities
    const finalMacros = calculateTotalMacros(foods, finalQuantities, macroNames);
    
    const response: OptimizationResponse = {
      optimizedQuantities: finalQuantities,
      finalMacros,
      error
    };
    
    res.json(response);
    
  } catch (error: any) {
    console.error('Optimization error:', error);
    
    if (error instanceof BadRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error during optimization' });
    }
  }
});

export default router; 