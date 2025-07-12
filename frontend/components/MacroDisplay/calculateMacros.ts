import { Macros } from '@/tempdata';
import { FoodServing } from '@shared/types/foodTypes';
import { UserPreference } from '@shared/types/databaseTypes';
import storage from '@/app/storage/storage';

// macros adjusted for portion size, filtered to only include user preferences
export const calculateAdjustedMacros = (foodServing: FoodServing, userPreferences?: UserPreference[]): Macros => {
    const { unit, quantity, food } = foodServing;
    // console.log("portion", portion)
    const gramsInPortion = quantity * unit.grams;
    const totalMacros: Macros = {};

    // console.log("food.macros", food.macros);

    // If user preferences are provided, only calculate macros that are in user preferences
    if (userPreferences && userPreferences.length > 0) {
        const preferenceMetricIds = new Set(userPreferences.map(pref => pref.metric_id));
        
        for (const [key, value] of Object.entries(food.macros)) {
            if (preferenceMetricIds.has(key)) {
                totalMacros[key] = Math.round(value * gramsInPortion);
            }
        }
    } else {
        // If no preferences provided, calculate all macros (backward compatibility)
        for (const [key, value] of Object.entries(food.macros)) {
            totalMacros[key] = Math.round(value * gramsInPortion);
        }
    }

    // food.macros.forEach((value, key) => {
    //     totalMacros.set(key, Math.round(value * gramsInPortion));
    // })
    
    return totalMacros;
};