import { useMemo } from 'react';
// import { FoodServing, Macros } from '@/tempdata';
import { FoodServing } from '@shared/types/foodTypes';
import { Macros } from '@shared/types/macroTypes';
import { calculateAdjustedMacros } from '@/components/MacroDisplay/calculateMacros';

export default function useMacros(foodServings: FoodServing[]) {
    return useMemo(() => {
        const totalMacros: Macros = {};
        
        foodServings.forEach((foodServing) => {
            // console.log("foodServing", foodServing.food);
            const adjustedMacros = calculateAdjustedMacros(foodServing);
            
            Object.entries(adjustedMacros).forEach(([key, value]) => {
                if (value) {
                    totalMacros[key as keyof Macros] = (totalMacros[key as keyof Macros] || 0) + value;
                }
            });
        });
        
        return totalMacros;
    }, [foodServings]);
} 