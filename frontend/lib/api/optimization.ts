import { useApi } from './client';

export interface FoodServing {
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

export interface UserPreference {
  metric_id: string;
  min_value: number | null;
  max_value: number | null;
}

export interface OptimizationRequest {
  foodServings: FoodServing[];
  preferences: UserPreference[];
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