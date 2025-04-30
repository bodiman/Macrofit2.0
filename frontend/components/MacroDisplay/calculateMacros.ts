import { FoodServing, Macros } from '@/tempdata';
import storage from '@/app/storage/storage';

export const calculateAdjustedMacros = (foodServing: FoodServing): Macros => {
    const { food, portion } = foodServing;
    const gramsInPortion = portion.quantity * portion.unit.grams;
    
    return {
        calories: Math.round((food.macros.calories || 0) * gramsInPortion),
        protein: Math.round((food.macros.protein || 0) * gramsInPortion),
        carbs: Math.round((food.macros.carbs || 0) * gramsInPortion),
        fat: Math.round((food.macros.fat || 0) * gramsInPortion),
        fiber: Math.round((food.macros.fiber || 0) * gramsInPortion),
        sugar: Math.round((food.macros.sugar || 0) * gramsInPortion),
        sodium: Math.round((food.macros.sodium || 0) * gramsInPortion),
        potassium: Math.round((food.macros.potassium || 0) * gramsInPortion)
    };
};

export const calculateTotalMacros = (): Macros => {
    const mealLog = storage.getString('meals');
    if (!mealLog) return {};

    const allMeals = JSON.parse(mealLog);
    const totalMacros: Macros = {};

    allMeals.forEach((meal: { foods: FoodServing[] }) => {
        meal.foods.forEach((foodServing: FoodServing) => {
            const adjustedMacros = calculateAdjustedMacros(foodServing);
            
            Object.entries(adjustedMacros).forEach(([key, value]) => {
                if (value) {
                    totalMacros[key as keyof Macros] = (totalMacros[key as keyof Macros] || 0) + value;
                }
            });
        });
    });

    return totalMacros;
}; 