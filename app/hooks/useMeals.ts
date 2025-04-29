import { useState, useEffect } from 'react';
import { Meal, FoodServing, Portion } from '@/tempdata';
import storage, { meals as defaultMeals } from '../storage/storage';
import { eventBus } from '../storage/eventEmitter';

export default function useMeals() {
    const [meals, setMeals] = useState<Meal[]>(defaultMeals);
    const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
    const [editingFood, setEditingFood] = useState<FoodServing | null>(null);

    // Initialize meals from storage
    useEffect(() => {
        const storedMeals = storage.getString('meals');
        if (storedMeals) {
            setMeals(JSON.parse(storedMeals));
        } else {
            storage.set('meals', JSON.stringify(defaultMeals));
        }

        // Listen for meal updates from other components
        eventBus.on('mealsUpdated', () => {
            const updatedMeals = storage.getString('meals');
            if (updatedMeals) {
                setMeals(JSON.parse(updatedMeals));
            }
        });
        return () => {
            eventBus.off('mealsUpdated', () => {
                const updatedMeals = storage.getString('meals');
                if (updatedMeals) {
                    setMeals(JSON.parse(updatedMeals));
                }
            });
        };
    }, []);

    // Update a specific meal
    const updateMeal = (updatedMeal: Meal) => {
        const updatedMeals = meals.map(meal => 
            meal.id === updatedMeal.id ? updatedMeal : meal
        );
        setMeals(updatedMeals);
        storage.set('meals', JSON.stringify(updatedMeals));
        eventBus.emit('mealsUpdated');
    };

    // Add foods to a meal
    const addFoodsToMeal = (mealId: string, foodsToAdd: Meal['foods']) => {
        const meal = meals.find(m => m.id === mealId);
        if (!meal) return;

        const updatedMeal = {
            ...meal,
            foods: [...meal.foods, ...foodsToAdd]
        };
        updateMeal(updatedMeal);
    };

    // Update a food's portion in a meal
    const updateFoodPortion = (foodId: string, newPortion: Portion) => {
        const updatedMeals = meals.map(meal => {
            const updatedFoods = meal.foods.map(food => {
                if (food.id === foodId) {
                    return {
                        ...food,
                        portion: newPortion
                    };
                }
                return food;
            });
            return {
                ...meal,
                foods: updatedFoods
            };
        });
        setMeals(updatedMeals);
        storage.set('meals', JSON.stringify(updatedMeals));
        eventBus.emit('mealsUpdated');
    };

    // Open the food search modal for a specific meal
    const openFoodSearch = (meal: Meal) => {
        setActiveMeal(meal);
    };

    // Close the food search modal
    const closeFoodSearch = () => {
        // Close the modal
        eventBus.emit('foodSearchModalClose');
        setActiveMeal(null);
    };

    return {
        meals,
        activeMeal,
        editingFood,
        setEditingFood,
        updateMeal,
        addFoodsToMeal,
        updateFoodPortion,
        openFoodSearch,
        closeFoodSearch
    };
} 