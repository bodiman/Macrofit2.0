import { useState, useEffect, useCallback } from 'react';
import { Meal, FoodServing } from '@shared/types/foodTypes';
import { useMealPlanApi } from '../lib/api/mealPlan';

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
  const mealPlanApi = useMealPlanApi();

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

  // updateMealPlansAfterLogging with optimistic updates
  const updateMealPlansAfterLogging = useCallback(async (mealId: string, loggedServings: FoodServing[], date?: Date) => {
    // Optimistically update meal plans immediately
    setMealPlans(prevPlans => {
      const newPlans = new Map(prevPlans);
      const mealPlan = newPlans.get(mealId);
      
      if (mealPlan) {
        // Create a copy of the meal plan to modify
        const updatedMealPlan = { ...mealPlan };
        
        loggedServings.forEach(loggedServing => {
          const plannedServing = updatedMealPlan.servings.find(
            planned => planned.food_id === loggedServing.food.id
          );
          
          if (plannedServing && plannedServing.originalQuantity !== undefined) {
            const loggedGrams = loggedServing.quantity * loggedServing.unit.grams;
            const plannedGrams = plannedServing.originalQuantity * plannedServing.unit.grams;
            const remainingGrams = plannedGrams - loggedGrams;
            
            if (remainingGrams <= 0) {
              // Remove the serving if no quantity remains
              updatedMealPlan.servings = updatedMealPlan.servings.filter(
                s => s.id !== plannedServing.id
              );
            } else {
              // Update the remaining quantity
              plannedServing.remainingQuantity = remainingGrams / plannedServing.unit.grams;
            }
          }
        });
        
        newPlans.set(mealId, updatedMealPlan);
      }
      
      return newPlans;
    });
    
    // Make API calls in background to update the database
    try {
      const mealPlan = mealPlans.get(mealId);
      if (mealPlan) {
        // Update each planned serving quantity in the database
        const updatePromises = loggedServings.map(async (loggedServing) => {
          const plannedServing = mealPlan.servings.find(
            planned => planned.food_id === loggedServing.food.id
          );
          
          if (plannedServing && plannedServing.originalQuantity !== undefined) {
            const loggedGrams = loggedServing.quantity * loggedServing.unit.grams;
            const plannedGrams = plannedServing.originalQuantity * plannedServing.unit.grams;
            const remainingGrams = plannedGrams - loggedGrams;
            
            if (remainingGrams <= 0) {
              // The serving will be deleted by the backend when quantity is 0
              return;
            } else {
              const remainingQuantity = remainingGrams / plannedServing.unit.grams;
              
              // Update the serving quantity in the database
              await mealPlanApi.updateServingQuantity(mealPlan.id, plannedServing.id, remainingQuantity);
            }
          }
        });
        
        // Wait for all updates to complete
        await Promise.all(updatePromises);
      }
    } catch (error) {
      console.error('Failed to update meal plan quantities in background:', error);
      // Note: We don't rollback the optimistic update here because the user has already
      // seen the change and it would be confusing to revert it. The next meal fetch
      // will correct any inconsistencies.
    }
  }, [mealPlans, mealPlanApi]);

  return { 
    mealPlans, 
    loading, 
    updateMealPlansWithLoggedMeals,
    updateMealPlansAfterLogging
  };
}; 