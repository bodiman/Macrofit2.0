import { Macros } from '@/tempdata';
import { FoodServing } from '@shared/types/foodTypes';
import storage from '@/app/storage/storage';

// macros adjusted for portion size
export const calculateAdjustedMacros = (foodServing: FoodServing): Macros => {
    const { unit, quantity, food } = foodServing;
    // console.log("portion", portion)
    const gramsInPortion = quantity * unit.grams;
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