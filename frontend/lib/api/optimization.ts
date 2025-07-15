import { useApi } from './client';

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

export interface OptimizationRequest {
  foods: FoodMacroData[];
  preferences: UserPreferenceData[];
  macroNames: string[]; // Array of macro names in the same order as macroValues
  dailyMaxValues: number[]; // Array of daily maximum values for each macro (for weighting)
  maxIterations?: number; // Optional parameter for number of optimization iterations
}

export interface OptimizationResponse {
  optimizedQuantities: number[];
  finalMacros: Record<string, number>;
  error: number;
}

export const useOptimizationApi = () => {
  const api = useApi();
  
  const optimizeQuantities = async (request: OptimizationRequest): Promise<OptimizationResponse> => {
    const response = await api.post('/api/optimize', request);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to optimize quantities');
    }
    
    return response.json();
  };

  return {
    optimizeQuantities,
  };
}; 