import { useState, useEffect } from 'react';
import { FoodServing, Macros } from '@/tempdata';
import { calculateAdjustedMacros } from '@/components/MacroDisplay/calculateMacros';
import { eventBus } from '../storage/eventEmitter';

export function useMacros(foodServings: FoodServing[]) {
    const [totalMacros, setTotalMacros] = useState<Macros>({});

    useEffect(() => {
        const calculateTotal = () => {
            const newTotalMacros: Macros = {};
            
            foodServings.forEach((foodServing) => {
                const adjustedMacros = calculateAdjustedMacros(foodServing);
                
                Object.entries(adjustedMacros).forEach(([key, value]) => {
                    if (value) {
                        newTotalMacros[key as keyof Macros] = (newTotalMacros[key as keyof Macros] || 0) + value;
                    }
                });
            });
            
            setTotalMacros(newTotalMacros);
        };

        calculateTotal();
    }, [foodServings]);

    return totalMacros;
} 