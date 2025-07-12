import { useOptimisticStorage } from '../hooks/useOptimisticStorage';
import { Meal } from '@shared/types/foodTypes';

/**
 * Example: How to use optimistic storage in the home page
 */

// Example 1: Using the hook in a component
export function useMealsOptimisticStorage() {
  const {
    state: mealsData,
    optimisticUpdate,
    forceRollback,
    getPendingOperations,
    hasPendingOperations
  } = useOptimisticStorage<{
    meals: Meal[];
    macros: any;
  }>({
    meals: [],
    macros: {}
  }, {
    enableLogging: true,
    maxHistorySize: 20
  });

  // Optimistic delete food
  const deleteFoodOptimistically = async (mealId: string, foodServingId: string, apiCall: Promise<any>) => {
    const operationId = `delete-food-${mealId}-${foodServingId}`;
    
    return optimisticUpdate(
      operationId,
      (currentState) => ({
        meals: currentState.meals.map(meal => 
          meal.id === mealId 
            ? { ...meal, servings: meal.servings.filter(serving => serving.id !== foodServingId) }
            : meal
        ),
        macros: currentState.macros // Keep existing macros for now
      }),
      apiCall,
      'deleteFood',
      { mealId, foodServingId }
    );
  };

  // Optimistic add foods
  const addFoodsOptimistically = async (mealId: string, foodsToAdd: any[], apiCall: Promise<any>) => {
    const operationId = `add-foods-${mealId}-${Date.now()}`;
    
    return optimisticUpdate(
      operationId,
      (currentState) => ({
        meals: currentState.meals.map(meal => 
          meal.id === mealId 
            ? { ...meal, servings: [...meal.servings, ...foodsToAdd] }
            : meal
        ),
        macros: currentState.macros // Keep existing macros for now
      }),
      apiCall,
      'addFoods',
      { mealId, foodsCount: foodsToAdd.length }
    );
  };

  // Optimistic update food portion
  const updateFoodPortionOptimistically = async (
    servingId: string, 
    quantity: number, 
    unit: any, 
    apiCall: Promise<any>
  ) => {
    const operationId = `update-portion-${servingId}`;
    
    return optimisticUpdate(
      operationId,
      (currentState) => ({
        meals: currentState.meals.map(meal => ({
          ...meal,
          servings: meal.servings.map(serving => 
            serving.id === servingId 
              ? { ...serving, quantity, unit }
              : serving
          )
        })),
        macros: currentState.macros // Keep existing macros for now
      }),
      apiCall,
      'updateFoodPortion',
      { servingId, quantity, unit }
    );
  };

  return {
    mealsData,
    deleteFoodOptimistically,
    addFoodsOptimistically,
    updateFoodPortionOptimistically,
    forceRollback,
    getPendingOperations,
    hasPendingOperations
  };
}

// Example 2: Using the class-based version
import { OptimisticStorage } from '../utils/optimisticStorage';

export class MealsOptimisticStorage extends OptimisticStorage<{
  meals: Meal[];
  macros: any;
}> {
  constructor() {
    super({
      meals: [],
      macros: {}
    }, {
      enableLogging: true,
      maxHistorySize: 20
    });
  }

  async deleteFood(mealId: string, foodServingId: string, apiCall: Promise<any>) {
    const operationId = `delete-food-${mealId}-${foodServingId}`;
    
    return this.optimisticUpdate(
      operationId,
      (currentState) => ({
        meals: currentState.meals.map(meal => 
          meal.id === mealId 
            ? { ...meal, servings: meal.servings.filter(serving => serving.id !== foodServingId) }
            : meal
        ),
        macros: currentState.macros
      }),
      apiCall,
      'deleteFood',
      { mealId, foodServingId }
    );
  }

  async addFoods(mealId: string, foodsToAdd: any[], apiCall: Promise<any>) {
    const operationId = `add-foods-${mealId}-${Date.now()}`;
    
    return this.optimisticUpdate(
      operationId,
      (currentState) => ({
        meals: currentState.meals.map(meal => 
          meal.id === mealId 
            ? { ...meal, servings: [...meal.servings, ...foodsToAdd] }
            : meal
        ),
        macros: currentState.macros
      }),
      apiCall,
      'addFoods',
      { mealId, foodsCount: foodsToAdd.length }
    );
  }

  async updateFoodPortion(servingId: string, quantity: number, unit: any, apiCall: Promise<any>) {
    const operationId = `update-portion-${servingId}`;
    
    return this.optimisticUpdate(
      operationId,
      (currentState) => ({
        meals: currentState.meals.map(meal => ({
          ...meal,
          servings: meal.servings.map(serving => 
            serving.id === servingId 
              ? { ...serving, quantity, unit }
              : serving
          )
        })),
        macros: currentState.macros
      }),
      apiCall,
      'updateFoodPortion',
      { servingId, quantity, unit }
    );
  }
}

// Example 3: Usage in a component
export function ExampleUsage() {
  const {
    mealsData,
    deleteFoodOptimistically,
    addFoodsOptimistically,
    updateFoodPortionOptimistically,
    hasPendingOperations
  } = useMealsOptimisticStorage();

  const handleDeleteFood = async (mealId: string, foodServingId: string) => {
    try {
      // This will immediately update the UI optimistically
      await deleteFoodOptimistically(
        mealId, 
        foodServingId, 
        // The actual API call (import this from your API module)
        // deleteFoodFromMeal(mealId, foodServingId)
        Promise.resolve() // Placeholder for actual API call
      );
      
      // If the API call succeeds, the optimistic update is confirmed
      // If it fails, the UI automatically rolls back to the previous state
    } catch (error) {
      console.error('Failed to delete food:', error);
      // The UI has already been rolled back automatically
    }
  };

  return {
    mealsData,
    handleDeleteFood,
    hasPendingOperations
  };
} 