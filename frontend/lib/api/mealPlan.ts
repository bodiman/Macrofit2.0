import { useApi } from './client';
import { useCallback, useMemo } from 'react';

export const useMealPlanApi = () => {
  const api = useApi();
  
  const createMealPlan = useCallback(async (userId: number, mealId: string, date: Date, servings: any[]) => {
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
    const res = await api.get(`/api/meal-plans?user_id=${userId}&date=${dateString}`);
    return res.json();
  }, [api]);
  
  const updateMealPlan = useCallback(async (mealPlanId: string, servings: any[]) => {
    const res = await api.put(`/api/meal-plans/${mealPlanId}`, {
      servings
    });
    return res.json();
  }, [api]);
  
  const deleteMealPlan = useCallback(async (mealPlanId: string) => {
    const res = await api.delete(`/api/meal-plans/${mealPlanId}`);
    return res.json();
  }, [api]);
  
  const updateServingQuantity = useCallback(async (mealPlanId: string, servingId: string, remainingQuantity: number) => {
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