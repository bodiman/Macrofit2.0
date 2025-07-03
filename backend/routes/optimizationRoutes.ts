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
const calculateSquaredError = (currentMacros: Record<string, number>, preferences: UserPreferenceData[], macroNames: string[]): number => {
  let totalError = 0;
  
  preferences.forEach((pref, index) => {
    const macroName = macroNames[index];
    const currentValue = currentMacros[macroName] || 0;
    const minValue = pref.min_value || 0;
    const maxValue = pref.max_value || Infinity;
    
    if (currentValue < minValue) {
      // Below minimum - calculate percentage error
      const percentageError = (minValue - currentValue) / minValue;
      totalError += percentageError * percentageError;
    } else if (currentValue > maxValue) {
      // Above maximum - calculate percentage error
      const percentageError = (currentValue - maxValue) / maxValue;
      totalError += percentageError * percentageError;
    }
    // If within range, no error
  });
  
  return totalError;
};

// Simple gradient descent optimization
const optimizeQuantities = (
  foods: FoodMacroData[],
  preferences: UserPreferenceData[],
  macroNames: string[],
  initialQuantities: number[],
  maxIterations: number
): { quantities: number[]; error: number } => {
  const learningRate = 0.1;
  const tolerance = 1e-6;
  
  let quantities = [...initialQuantities];
  let currentError = calculateSquaredError(calculateTotalMacros(foods, quantities, macroNames), preferences, macroNames);
  let prevError = Infinity;
  
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // Calculate gradients using finite differences
    const gradients = new Array(quantities.length).fill(0);
    const h = 1e-6; // Small step for finite difference
    
    for (let i = 0; i < quantities.length; i++) {
      const qPlus = [...quantities];
      const qMinus = [...quantities];
      qPlus[i] += h;
      qMinus[i] -= h;
      
      // Ensure finite difference calculations respect bounds
      const minQuantity = foods[i].minQuantity;
      const maxQuantity = foods[i].maxQuantity;
      qPlus[i] = Math.max(minQuantity, Math.min(maxQuantity, qPlus[i]));
      qMinus[i] = Math.max(minQuantity, Math.min(maxQuantity, qMinus[i]));
      
      const errorPlus = calculateSquaredError(calculateTotalMacros(foods, qPlus, macroNames), preferences, macroNames);
      const errorMinus = calculateSquaredError(calculateTotalMacros(foods, qMinus, macroNames), preferences, macroNames);
      
      gradients[i] = (errorPlus - errorMinus) / (2 * h);
    }
    
    // Update quantities using gradient descent
    for (let i = 0; i < quantities.length; i++) {
      quantities[i] -= learningRate * gradients[i];
      // Ensure quantities respect min/max bounds
      const minQuantity = foods[i].minQuantity;
      const maxQuantity = foods[i].maxQuantity;
      quantities[i] = Math.max(minQuantity, Math.min(maxQuantity, quantities[i]));
    }
    
    // Calculate new error
    currentError = calculateSquaredError(calculateTotalMacros(foods, quantities, macroNames), preferences, macroNames);
    
    // Check convergence
    if (Math.abs(currentError - prevError) < tolerance) {
      break;
    }
    
    prevError = currentError;
  }
  
  return { quantities, error: currentError };
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
    
    // Calculate final macros with optimized quantities
    const finalMacros = calculateTotalMacros(foods, optimizedQuantities, macroNames);
    
    const response: OptimizationResponse = {
      optimizedQuantities,
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