import express from 'express';
import prisma from '../prisma_client';
import { BadRequestError } from '../user/types';
const { solveQP } = require('quadprog');

const router = express.Router();

// Simplified interfaces for numerical optimization
export interface FoodMacroData {
  macroValues: number[]; // Values per gram for each macro
  unitGrams: number;     // Grams per unit
  quantity: number;      // Current quantity
  minQuantity: number;   // Minimum allowed quantity
  maxQuantity: number;   // Maximum allowed quantity
  locked?: boolean;      // Whether this food quantity is fixed/locked
}

export interface UserPreferenceData {
  min_value: number | null;
  max_value: number | null;
}

interface OptimizationRequest {
  foods: FoodMacroData[];
  preferences: UserPreferenceData[];
  macroNames: string[]; // Array of macro names in the same order as macroValues
  dailyMaxValues: number[]; // Array of daily maximum values for each macro (for weighting)
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

// Calculate weighted squared error between current macros and preferences
const calculateWeightedSquaredError = (
  currentMacros: Record<string, number>, 
  preferences: UserPreferenceData[], 
  macroNames: string[],
  dailyMaxValues: number[]
): number => {
  let totalError = 0;
  
  preferences.forEach((pref, index) => {
    const macroName = macroNames[index];
    const currentValue = currentMacros[macroName] || 0;
    
    const minValue = pref.min_value;
    const maxValue = pref.max_value;
    
    // Get the daily maximum for this macro to calculate the weight
    const dailyMax = dailyMaxValues[index] || 1; // Use 1 as fallback to avoid division by zero
    const weight = 1 / dailyMax;
    
    // Handle min value constraints (independent of max)
    if (minValue !== null) {
      if (minValue > 0 && currentValue < minValue) {
        // Below positive minimum - use squared error weighted by 1/daily_max
        const squaredError = (minValue - currentValue) * (minValue - currentValue);
        const weightedError = squaredError * weight;
        totalError += weightedError;
      } else if (minValue <= 0 && currentValue > 0) {
        // Negative minimum means we've exceeded the target - penalize any positive consumption
        // The penalty should be proportional to how much we've exceeded the target
        const exceededAmount = Math.abs(minValue);
        const penalty = currentValue * (1 + exceededAmount / dailyMax);
        const squaredError = penalty * penalty;
        const weightedError = squaredError * weight;
        totalError += weightedError;
      }
    }
    
    // Handle max value constraints (independent of min)
    if (maxValue !== null) {
      if (maxValue > 0 && currentValue > maxValue) {
        // Above positive maximum - use squared error weighted by 1/daily_max
        const squaredError = (currentValue - maxValue) * (currentValue - maxValue);
        const weightedError = squaredError * weight;
        totalError += weightedError;
      } else if (maxValue <= 0 && currentValue > 0) {
        // Negative maximum means we've exceeded the target - penalize any positive consumption
        // The penalty should be proportional to how much we've exceeded the target
        const exceededAmount = Math.abs(maxValue);
        const penalty = currentValue * (1 + exceededAmount / dailyMax);
        const squaredError = penalty * penalty;
        const weightedError = squaredError * weight;
        totalError += weightedError;
      }
    }
    // If within range, no error
  });
  
  return totalError;
};

// Direct optimization using gradient descent to minimize weighted squared error
const optimizeQuantitiesQP = (
  foods: FoodMacroData[],
  preferences: UserPreferenceData[],
  macroNames: string[],
  dailyMaxValues: number[],
  initialQuantities: number[]
): { quantities: number[]; error: number } => {
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
    const error = calculateWeightedSquaredError(
      calculateTotalMacros(foods, initialQuantities, macroNames),
      preferences,
      macroNames,
      dailyMaxValues
    );
    return { quantities: initialQuantities, error };
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
  
  // Debug: Log adjusted preferences
  console.log('QP Debug - Adjusted preferences (after subtracting locked foods):');
  adjustedPreferences.forEach((pref, index) => {
    console.log(`Macro ${index}: min = ${pref.min_value?.toFixed(3) || 'null'}, max = ${pref.max_value?.toFixed(3) || 'null'}`);
  });
  
  const numMutableFoods = mutableFoodIndices.length;
  const numMacros = macroNames.length;
  
  // Build the V matrix: food macro values (numMacros x numMutableFoods)
  const V: number[][] = [];
  for (let i = 0; i < numMacros; i++) {
    V[i] = [];
    for (let j = 0; j < numMutableFoods; j++) {
      const food = foods[mutableFoodIndices[j]];
      V[i][j] = food.unitGrams * food.macroValues[i];
    }
  }
  
  // Quantity bounds: ell (lower) and u (upper)
  const ell: number[] = mutableFoodIndices.map(i => foods[i].minQuantity);
  const u: number[] = mutableFoodIndices.map(i => foods[i].maxQuantity);
  
  console.log('QP Debug - Problem setup:');
  console.log('V matrix (food macro values):', V);
  console.log('Quantity bounds (ell, u):', { ell, u });
  
  // Use a two-phase grid search to find the best quantities
  // Phase 1: Coarse grid search to identify promising regions
  // Phase 2: Fine grid search focused on the best regions
  const coarseGridStep = 0.1; // Finer coarse step size (was 0.2)
  const fineGridStep = 0.01;  // Much finer step size for precision (was 0.02)
  const coarseIterations = 500; // Fewer iterations for coarse search
  const fineIterations = 1500;  // More iterations for fine search
  
  let bestQuantities = mutableFoodIndices.map(i => foods[i].quantity);
  let bestError = calculateWeightedSquaredError(
    calculateTotalMacros(foods, initialQuantities, macroNames),
    preferences,
    macroNames,
    dailyMaxValues
  );
  
  console.log('QP Debug - Starting two-phase grid search optimization');
  console.log('Initial quantities:', bestQuantities);
  console.log('Initial error:', bestError.toFixed(6));
  
  // Phase 1: Coarse grid search
  console.log('Phase 1: Coarse grid search...');
  const coarseCandidates: { quantities: number[]; error: number }[] = [];
  
  for (let iteration = 0; iteration < coarseIterations; iteration++) {
    // Generate candidate quantities with coarse step
    const candidateQuantities = mutableFoodIndices.map((foodIndex, i) => {
      const minQty = ell[i];
      const maxQty = u[i];
      
      if (iteration === 0) {
        // First iteration: use current quantities
        return foods[foodIndex].quantity;
      } else if (iteration < 50) {
        // Early iterations: try coarse grid points
        const steps = Math.floor((maxQty - minQty) / coarseGridStep) + 1;
        const stepIndex = (iteration - 1) % steps;
        return minQty + stepIndex * coarseGridStep;
      } else {
        // Later iterations: random search with larger range
        const current = bestQuantities[i];
        const range = (maxQty - minQty) * 0.2; // 20% of range for coarse search
        const randomOffset = (Math.random() - 0.5) * range;
        return Math.max(minQty, Math.min(maxQty, current + randomOffset));
      }
    });
    
    // Calculate error for candidate quantities
    const candidateQuantitiesFull = [...initialQuantities];
    mutableFoodIndices.forEach((foodIndex, i) => {
      candidateQuantitiesFull[foodIndex] = candidateQuantities[i];
    });
    
    const candidateError = calculateWeightedSquaredError(
      calculateTotalMacros(foods, candidateQuantitiesFull, macroNames),
      preferences,
      macroNames,
      dailyMaxValues
    );
    
    // Store promising candidates (error within 50% of best)
    if (candidateError <= bestError * 1.5) {
      coarseCandidates.push({ quantities: [...candidateQuantities], error: candidateError });
    }
    
    // Update best solution if better
    if (candidateError < bestError) {
      bestError = candidateError;
      bestQuantities = [...candidateQuantities];
      
      if (iteration % 100 === 0) {
        console.log(`Phase 1 - Iteration ${iteration}: New best error = ${bestError.toFixed(6)}`);
      }
    }
  }
  
  console.log(`Phase 1 completed. Found ${coarseCandidates.length} promising candidates.`);
  console.log('Best error after coarse search:', bestError.toFixed(6));
  
  // Phase 2: Fine grid search around promising regions
  console.log('Phase 2: Fine grid search around promising regions...');
  
  // Create search regions around the best candidates
  const searchRegions: { center: number[]; radius: number }[] = [];
  
  // Add region around the best solution
  searchRegions.push({
    center: [...bestQuantities],
    radius: coarseGridStep * 0.5 // Search within half the coarse step size
  });
  
  // Add regions around other promising candidates
  coarseCandidates.slice(0, 5).forEach(candidate => { // Top 5 candidates
    searchRegions.push({
      center: [...candidate.quantities],
      radius: coarseGridStep * 0.3
    });
  });
  
  // Fine grid search in each region
  for (let regionIndex = 0; regionIndex < searchRegions.length; regionIndex++) {
    const region = searchRegions[regionIndex];
    console.log(`Searching region ${regionIndex + 1}/${searchRegions.length} around:`, region.center.map(x => x.toFixed(3)));
    
    for (let iteration = 0; iteration < fineIterations / searchRegions.length; iteration++) {
      // Generate candidate quantities with fine step around region center
      const candidateQuantities = mutableFoodIndices.map((foodIndex, i) => {
        const minQty = ell[i];
        const maxQty = u[i];
        const center = region.center[i];
        const radius = region.radius;
        
        if (iteration < 20) {
          // Try fine grid points within the region
          const regionMin = Math.max(minQty, center - radius);
          const regionMax = Math.min(maxQty, center + radius);
          const steps = Math.floor((regionMax - regionMin) / fineGridStep) + 1;
          const stepIndex = iteration % steps;
          return regionMin + stepIndex * fineGridStep;
        } else {
          // Random search within the region
          const regionMin = Math.max(minQty, center - radius);
          const regionMax = Math.min(maxQty, center + radius);
          const randomOffset = (Math.random() - 0.5) * radius * 2;
          return Math.max(regionMin, Math.min(regionMax, center + randomOffset));
        }
      });
      
      // Calculate error for candidate quantities
      const candidateQuantitiesFull = [...initialQuantities];
      mutableFoodIndices.forEach((foodIndex, i) => {
        candidateQuantitiesFull[foodIndex] = candidateQuantities[i];
      });
      
      const candidateError = calculateWeightedSquaredError(
        calculateTotalMacros(foods, candidateQuantitiesFull, macroNames),
        preferences,
        macroNames,
        dailyMaxValues
      );
      
      // Update best solution if better
      if (candidateError < bestError) {
        bestError = candidateError;
        bestQuantities = [...candidateQuantities];
        
        console.log(`Phase 2 - Region ${regionIndex + 1}, Iteration ${iteration}: New best error = ${bestError.toFixed(6)}`);
      }
      
      // Early stopping if error is very low
      if (bestError < 0.0001) {
        console.log(`Phase 2 - Early stopping with error ${bestError.toFixed(6)}`);
        break;
      }
    }
  }
  
  console.log('Two-phase grid search completed');
  console.log('Best quantities found:', bestQuantities);
  console.log('Best error:', bestError.toFixed(6));
  
  // Apply best quantities to the full solution
  const optimizedQuantities = [...initialQuantities];
  mutableFoodIndices.forEach((foodIndex, i) => {
    optimizedQuantities[foodIndex] = bestQuantities[i];
  });
  
  console.log('Final optimized quantities:', optimizedQuantities);
  
  return { quantities: optimizedQuantities, error: bestError };
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
    // Extract daily max values from the request
    const dailyMaxValues = req.body.dailyMaxValues || macroNames.map(() => 1);

    // Log starting error
    const startingError = calculateWeightedSquaredError(
      calculateTotalMacros(foods, initialQuantities, macroNames),
      preferences,
      macroNames,
      dailyMaxValues
    );
    console.log('QP Debug - Starting weighted absolute error:', startingError.toFixed(6));

    // Run quadratic programming optimization
    const { quantities: optimizedQuantities, error } = optimizeQuantitiesQP(
      foods,
      preferences,
      macroNames,
      dailyMaxValues,
      initialQuantities
    );

    // Log ending error
    console.log('QP Debug - Ending weighted absolute error:', error.toFixed(6));
    console.log('QP Debug - Error improvement:', (startingError - error).toFixed(6));
    
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

// Export core optimization functions for testing
export { optimizeQuantitiesQP, calculateTotalMacros, calculateWeightedSquaredError }; 