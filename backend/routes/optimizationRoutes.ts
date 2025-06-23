import express from 'express';
import prisma from '../prisma_client';
import { BadRequestError } from '../user/types';

const router = express.Router();

interface FoodServing {
  id: string;
  food: {
    id: string;
    name: string;
    macros: Array<{
      metric: {
        id: string;
        name: string;
      };
      value: number;
    }>;
    servingUnits: Array<{
      id: string;
      name: string;
      grams: number;
    }>;
  };
  unit: {
    id: string;
    name: string;
    grams: number;
  };
  quantity: number;
}

interface UserPreference {
  metric_id: string;
  min_value: number | null;
  max_value: number | null;
}

interface OptimizationRequest {
  foodServings: FoodServing[];
  preferences: UserPreference[];
}

interface OptimizationResponse {
  optimizedQuantities: number[];
  finalMacros: Record<string, number>;
  error: number;
}

// Calculate total macros for given food servings and quantities
const calculateTotalMacros = (foodServings: FoodServing[], quantities: number[]): Record<string, number> => {
  const macros: Record<string, number> = {};
  
  foodServings.forEach((serving, index) => {
    const quantity = quantities[index];
    const unitGrams = serving.unit.grams;
    const totalGrams = quantity * unitGrams;
    
    serving.food.macros.forEach(macro => {
      const metricName = macro.metric.name;
      const valuePergram = macro.value;
      const totalValue = (totalGrams) * valuePergram;
      
      macros[metricName] = (macros[metricName] || 0) + totalValue;
    });
  });
  
  return macros;
};

// Calculate squared error between current macros and preferences
const calculateSquaredError = (currentMacros: Record<string, number>, preferences: UserPreference[]): number => {
  let totalError = 0;
  
  preferences.forEach(pref => {
    const currentValue = currentMacros[pref.metric_id] || 0;
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
  foodServings: FoodServing[],
  preferences: UserPreference[],
  initialQuantities: number[]
): { quantities: number[]; error: number } => {
  const learningRate = 0.1;
  const maxIterations = 1000;
  const tolerance = 1e-6;
  
  let quantities = [...initialQuantities];
  let currentError = calculateSquaredError(calculateTotalMacros(foodServings, quantities), preferences);
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
      
      const macros = calculateTotalMacros(foodServings, qMinus)
    //   for (let preference of preferences) {
    //     console.log(preference)
    //     console.log(macros[preference.metric_id])
    //   }
      const errorPlus = calculateSquaredError(calculateTotalMacros(foodServings, qPlus), preferences);
      const errorMinus = calculateSquaredError(calculateTotalMacros(foodServings, qMinus), preferences);
      
      gradients[i] = (errorPlus - errorMinus) / (2 * h);
    }
    
    // Update quantities using gradient descent
    for (let i = 0; i < quantities.length; i++) {
      quantities[i] -= learningRate * gradients[i];
      // Ensure non-negative quantities
      quantities[i] = Math.max(0, quantities[i]);
    }
    
    // Calculate new error
    currentError = calculateSquaredError(calculateTotalMacros(foodServings, quantities), preferences);
    
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
    const { foodServings, preferences }: OptimizationRequest = req.body;
    
    // Validate input
    if (!foodServings || !Array.isArray(foodServings) || foodServings.length === 0) {
      throw new BadRequestError('foodServings is required and must be a non-empty array');
    }
    
    if (!preferences || !Array.isArray(preferences) || preferences.length === 0) {
      throw new BadRequestError('preferences is required and must be a non-empty array');
    }
    
    // Extract initial quantities
    const initialQuantities = foodServings.map(serving => serving.quantity);
    
    // Run optimization
    const { quantities: optimizedQuantities, error } = optimizeQuantities(
      foodServings,
      preferences,
      initialQuantities
    );
    
    // Calculate final macros with optimized quantities
    const finalMacros = calculateTotalMacros(foodServings, optimizedQuantities);
    
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