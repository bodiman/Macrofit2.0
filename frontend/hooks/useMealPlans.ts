import { useState, useEffect, useCallback } from 'react';
import { Meal, FoodServing } from '@shared/types/foodTypes';

interface MealPlanServing {
  id: string;
  food_id: string;
  quantity: number;
  unit_id: string;
  food: any;
  unit: any;
  originalQuantity?: number;
  remainingQuantity?: number;
}

interface MealPlan {
  id: string;
  user_id: number;
  meal_id: string;
  date: string;
  servings: MealPlanServing[];
  meal: any;
}

export const useMealPlans = (mealPlansFromMeals: MealPlan[] = []) => {
  // Use the meal plans from the meals fetch
  const [mealPlans, setMealPlans] = useState<Map<string, MealPlan>>(new Map());
  const [loading, setLoading] = useState(false);

  // Update mealPlans state whenever mealPlansFromMeals changes
  useEffect(() => {
    const plansMap = new Map();
    mealPlansFromMeals.forEach((plan: MealPlan) => {
      const planWithRemaining = {
        ...plan,
        servings: plan.servings.map(serving => ({
          ...serving,
          originalQuantity: serving.quantity,
          remainingQuantity: serving.quantity
        }))
      };
      plansMap.set(plan.meal_id, planWithRemaining);
    });
    setMealPlans(plansMap);
  }, [mealPlansFromMeals]);

  const updateMealPlansWithLoggedMeals = useCallback((loggedMeals: Meal[]) => {
    setMealPlans(prevPlans => {
      const newPlans = new Map(prevPlans);
      loggedMeals.forEach(meal => {
        const mealPlan = newPlans.get(meal.id);
        if (mealPlan) {
          meal.servings.forEach(loggedServing => {
            const plannedServing = mealPlan.servings.find(
              planned => planned.food_id === loggedServing.food.id
            );
            if (plannedServing && plannedServing.originalQuantity !== undefined) {
              const loggedGrams = loggedServing.quantity * loggedServing.unit.grams;
              const plannedGrams = plannedServing.originalQuantity * plannedServing.unit.grams;
              const remainingGrams = plannedGrams - loggedGrams;
              if (remainingGrams <= 0) {
                mealPlan.servings = mealPlan.servings.filter(
                  s => s.id !== plannedServing.id
                );
              } else {
                plannedServing.remainingQuantity = remainingGrams / plannedServing.unit.grams;
              }
            }
          });
        }
      });
      return newPlans;
    });
  }, []);

  // updateMealPlansAfterLogging can remain as is, but should not refetch
  const updateMealPlansAfterLogging = useCallback(async (mealId: string, loggedServings: FoodServing[], date?: Date) => {
    // This function can be a no-op or just update state, since refetching is handled by meals fetch
    // Optionally, update the local state as above
  }, []);

  return { 
    mealPlans, 
    loading, 
    updateMealPlansWithLoggedMeals,
    updateMealPlansAfterLogging
  };
}; 