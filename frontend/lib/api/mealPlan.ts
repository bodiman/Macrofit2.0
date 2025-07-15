import { useApi } from './client';
import { useCallback, useMemo } from 'react';

export const useMealPlanApi = () => {
  const api = useApi();
  
  const createMealPlan = useCallback(async (userId: number, mealId: string, date: Date, servings: any[]) => {
    console.log('📤 CREATE MEAL PLAN API CALL:');
    console.log('  User ID:', userId);
    console.log('  Meal ID:', mealId);
    console.log('  Date:', date.toISOString().split('T')[0]);
    console.log('  Servings:', servings);
    
    const res = await api.post('/api/meal-plans', {
      user_id: userId,
      meal_id: mealId,
      date: date.toISOString().split('T')[0],
      servings
    });
    return res.json();
  }, [api]);
  
  const getMealPlans = useCallback(async (userId: number, date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    console.log('📤 GET MEAL PLANS API CALL:');
    console.log('  User ID:', userId);
    console.log('  Date:', dateString);
    
    const res = await api.get(`/api/meal-plans?user_id=${userId}&date=${dateString}`);
    return res.json();
  }, [api]);
  
  const updateMealPlan = useCallback(async (mealPlanId: string, servings: any[]) => {
    console.log('📤 UPDATE MEAL PLAN API CALL:');
    console.log('  Meal Plan ID:', mealPlanId);
    console.log('  Servings:', servings);
    
    const res = await api.put(`/api/meal-plans/${mealPlanId}`, {
      servings
    });
    return res.json();
  }, [api]);
  
  const deleteMealPlan = useCallback(async (mealPlanId: string) => {
    console.log('📤 DELETE MEAL PLAN API CALL:');
    console.log('  Meal Plan ID:', mealPlanId);
    
    const res = await api.delete(`/api/meal-plans/${mealPlanId}`);
    return res.json();
  }, [api]);
  
  const updateServingQuantity = useCallback(async (mealPlanId: string, servingId: string, remainingQuantity: number) => {
    console.log('📤 UPDATE SERVING QUANTITY API CALL:');
    console.log('  Meal Plan ID:', mealPlanId);
    console.log('  Serving ID:', servingId);
    console.log('  Remaining Quantity:', remainingQuantity);
    
    const res = await api.put(`/api/meal-plans/${mealPlanId}/servings/${servingId}`, {
      remaining_quantity: remainingQuantity
    });
    return res.json();
  }, [api]);
  
  // Memoize the return object to prevent infinite re-renders
  return useMemo(() => ({
    createMealPlan,
    getMealPlans,
    updateMealPlan,
    deleteMealPlan,
    updateServingQuantity
  }), [createMealPlan, getMealPlans, updateMealPlan, deleteMealPlan, updateServingQuantity]);
}; 