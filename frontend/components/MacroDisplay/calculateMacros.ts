import { FoodServing, Macros } from '@/tempdata';
import storage from '@/app/storage/storage';

// macros adjusted for portion size
export const calculateAdjustedMacros = (foodServing: FoodServing): Macros => {
    const { food, portion } = foodServing;
    const gramsInPortion = portion.quantity * portion.unit.grams;
    const totalMacros: Macros = {};

    // console.log("food.macros", food.macros);

    for (const [key, value] of Object.entries(food.macros)) {
        totalMacros[key] = Math.round(value * gramsInPortion);
    }

    // food.macros.forEach((value, key) => {
    //     totalMacros.set(key, Math.round(value * gramsInPortion));
    // })
    
    return totalMacros;
};