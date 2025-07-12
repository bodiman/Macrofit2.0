import { useState, useEffect, useCallback } from 'react';
import { useMealPlanApi } from '@/lib/api/mealPlan';
import { Meal, FoodServing } from '@shared/types/foodTypes';
import useUser from '@/app/hooks/useUser';

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

export const useMealPlans = () => {
  const [mealPlans, setMealPlans] = useState<Map<string, MealPlan>>(new Map());
  const [loading, setLoading] = useState(false);
  const mealPlanApi = useMealPlanApi();
  const { appUser, loading: userLoading } = useUser();
  
  const fetchMealPlans = useCallback(async (date: Date) => {
    console.log('🚀 fetchMealPlans called with:', { userLoading, appUser: !!appUser, date: date.toISOString() });
    
    // Don't fetch if user is still loading or not available
    if (userLoading || !appUser) {
      console.log('⏸️ Skipping meal plan fetch - userLoading:', userLoading, 'appUser:', !!appUser);
      return;
    }
    
    setLoading(true);
    try {
      console.log('🔍 Fetching meal plans for user:', appUser.user_id, 'date:', date.toISOString());
      const plans = await mealPlanApi.getMealPlans(appUser.user_id, date);
      console.log('📦 Received meal plans:', plans.length, 'plans');
      
      const plansMap = new Map();
      plans.forEach((plan: MealPlan) => {
        // Initialize remaining quantities
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
      
      console.log('🗺️ Meal plans map keys:', Array.from(plansMap.keys()));
      setMealPlans(plansMap);
    } catch (error) {
      console.error('Failed to fetch meal plans:', error);
    } finally {
      setLoading(false);
    }
  }, [appUser, userLoading]); // Removed mealPlanApi from dependencies
  
  const updateMealPlansWithLoggedMeals = useCallback((loggedMeals: Meal[]) => {
    console.log('🔄 updateMealPlansWithLoggedMeals called with', loggedMeals.length, 'meals');
    
    // When foods are logged, subtract from planned quantities
    setMealPlans(prevPlans => {
      console.log('📊 Previous meal plans:', Array.from(prevPlans.keys()));
      
      const newPlans = new Map(prevPlans);
      
      loggedMeals.forEach(meal => {
        const mealPlan = newPlans.get(meal.id);
        if (mealPlan) {
          console.log(`🍽️ Updating meal plan for ${meal.name} (${meal.id})`);
          console.log(`  Original planned servings:`, mealPlan.servings.map(s => `${s.food.name}: ${s.remainingQuantity} ${s.unit.name}`));
          console.log(`  Logged servings:`, meal.servings.map(s => `${s.food.name}: ${s.quantity} ${s.unit.name}`));
          
          meal.servings.forEach(loggedServing => {
            // Find matching planned serving
            const plannedServing = mealPlan.servings.find(
              planned => planned.food_id === loggedServing.food.id
            );
            
            if (plannedServing && plannedServing.originalQuantity !== undefined) {
              // Convert to grams and subtract
              const loggedGrams = loggedServing.quantity * loggedServing.unit.grams;
              const plannedGrams = plannedServing.originalQuantity * plannedServing.unit.grams;
              const remainingGrams = plannedGrams - loggedGrams;
              
              console.log(`  ${loggedServing.food.name}: planned=${plannedGrams}g, logged=${loggedGrams}g, remaining=${remainingGrams}g`);
              
              if (remainingGrams <= 0) {
                // Remove the planned serving
                mealPlan.servings = mealPlan.servings.filter(
                  s => s.id !== plannedServing.id
                );
                console.log(`  ❌ Removed ${loggedServing.food.name} from planned foods`);
              } else {
                // Update remaining quantity
                plannedServing.remainingQuantity = remainingGrams / plannedServing.unit.grams;
                console.log(`  ✅ Updated ${loggedServing.food.name} remaining quantity to ${plannedServing.remainingQuantity}`);
              }
            }
          });
          
          console.log(`  Final planned servings:`, mealPlan.servings.map(s => `${s.food.name}: ${s.remainingQuantity} ${s.unit.name}`));
        }
      });
      
      console.log('📊 Final meal plans:', Array.from(newPlans.keys()));
      return newPlans;
    });
  }, []);
  
  const updateMealPlansAfterLogging = useCallback(async (mealId: string, loggedServings: FoodServing[], date?: Date) => {
    // Update meal plans when foods are logged
    const mealPlan = mealPlans.get(mealId);
    if (!mealPlan) return;
    
    for (const loggedServing of loggedServings) {
      const plannedServing = mealPlan.servings.find(
        planned => planned.food_id === loggedServing.food.id
      );
      
      if (plannedServing && plannedServing.originalQuantity !== undefined) {
        const loggedGrams = loggedServing.quantity * loggedServing.unit.grams;
        const plannedGrams = plannedServing.originalQuantity * plannedServing.unit.grams;
        const remainingGrams = plannedGrams - loggedGrams;
        
        if (remainingGrams <= 0) {
          // Remove the planned serving
          await mealPlanApi.updateServingQuantity(mealPlan.id, plannedServing.id, 0);
        } else {
          // Update remaining quantity
          const remainingQuantity = remainingGrams / plannedServing.unit.grams;
          await mealPlanApi.updateServingQuantity(mealPlan.id, plannedServing.id, remainingQuantity);
        }
      }
    }
    
    // Refresh meal plans with the provided date or current date
    if (date) {
      await fetchMealPlans(date);
    }
  }, [mealPlans]); // Removed mealPlanApi and fetchMealPlans from dependencies
  
  return { 
    mealPlans, 
    loading, 
    fetchMealPlans, 
    updateMealPlansWithLoggedMeals,
    updateMealPlansAfterLogging
  };
}; 