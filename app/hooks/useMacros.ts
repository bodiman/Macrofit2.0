import { useMemo } from 'react';
import { FoodServing, Macros } from '@/tempdata';
import { calculateAdjustedMacros } from '@/components/MacroDisplay/calculateMacros';

export function useMacros(foodServings: FoodServing[]) {
    return useMemo(() => {
        const totalMacros: Macros = {};
        
        foodServings.forEach((foodServing) => {
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