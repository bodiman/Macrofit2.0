import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, InteractionManager } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import Colors from '@/styles/colors'
import { useUser } from '@/app/hooks/useUser'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useMenuApi } from '@/lib/api/menu'
import { useOptimizationApi } from '@/lib/api/optimization'
import { useMealPlanApi } from '@/lib/api/mealPlan'
import { Food, Meal, FoodServing } from '@shared/types/foodTypes'
import Slider from '@react-native-community/slider'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import KitchenActivationModal from '@/components/Kitchen/KitchenActivationModal'
import eventBus from '@/app/storage/eventEmitter'
import { Swipeable } from 'react-native-gesture-handler'
import { useFoodSearchApi } from '@/lib/api/foodSearch'
import MacrosDisplay from '@/components/MacroDisplay/MacrosDisplay'
import { calculateAllMacrosOptimized, calculateAdjustedMacrosOptimized } from '@/utils/optimizedMacroCalculation'
import { useSelectedDate } from './_layout'
import { useGlobalMacros } from '@/context/GlobalMacrosContext'
import { useGlobalMacrosSync } from '@/hooks/useGlobalMacrosSync'

interface Kitchen {
  id: string
  name: string
  description?: string
  foods: Food[]
}

interface KitchenWithActiveFoods extends Kitchen {
  foods: (Food & { 
    active: boolean
    quantity: number
    minQuantity: number
    maxQuantity: number
    selectedUnit: string
  })[]
}

// Filter types
interface Filter {
  id: string
  type: 'kitchen' | 'calories' | 'protein' | 'carbs' | 'fat' | 'name' | 'macro'
  operator: 'equals' | 'contains' | 'less_than' | 'greater_than' | 'between'
  value: string | number | [number, number]
  label: string
}

type FlowStep = 'filters' | 'quantities'

export default function PlanDetailPage() {
  const { planId, initialMealPlans } = useLocalSearchParams()
  const { userMealPreferences, preferences, rawPreferences, appUser, getMeals } = useUser()
  const { selectedDate } = useSelectedDate()
  const { updateMealPlanMacros } = useGlobalMacros()
  const [mealsData, setMealsData] = useState<{
    meals: Meal[];
    macros: any;
  }>({ meals: [], macros: {} });
  const [mealsLoading, setMealsLoading] = useState(false)
  const [expandedFoods, setExpandedFoods] = useState<Set<string>>(new Set())
  const [kitchens, setKitchens] = useState<KitchenWithActiveFoods[]>([])
  const [loading, setLoading] = useState(true)
  const [focusedContainer, setFocusedContainer] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState<{ foodId: string, type: 'min' | 'max' } | null>(null)
  const [selectedFoods, setSelectedFoods] = useState<Map<string, Set<string>>>(new Map())
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Track existing meal plans to optimize save operations
  const [existingMealPlans, setExistingMealPlans] = useState<Set<string>>(new Set())
  
  // Track meal preference to meal plan ID mapping
  const [mealPlanIdMapping, setMealPlanIdMapping] = useState<Map<string, string>>(new Map())
  
  // Food selection modal state
  const [showSelectionModal, setShowSelectionModal] = useState(false)
  const [currentModalMealId, setCurrentModalMealId] = useState<string | null>(null)
  
  // Quantity text input state
  const [quantityTextInputs, setQuantityTextInputs] = useState<Map<string, string>>(new Map())
  const [lastValidQuantities, setLastValidQuantities] = useState<Map<string, number>>(new Map())
  
  const menuApi = useMenuApi()
  const optimizationApi = useOptimizationApi()
  const mealPlanApi = useMealPlanApi()
  const minInputRef = useRef<TextInput>(null)
  const maxInputRef = useRef<TextInput>(null)
  const nextFocusedInputRef = useRef<{ foodId: string, type: 'min' | 'max' } | null>(null)
  const foodSearchApi = useFoodSearchApi()
  const hasInitializedFromPropsRef = useRef(false)

  const [mealFoodQuantities, setMealFoodQuantities] = useState<
    Map<string, Map<string, { quantity: number; minQuantity: number; maxQuantity: number; selectedUnit: string; locked: boolean }>>
  >(new Map())

  // Create preference set for optimized calculations
  const preferenceSet = useMemo(() => {
    if (!rawPreferences || rawPreferences.length === 0) {
      return new Set<string>();
    }
    return new Set(rawPreferences.map(pref => pref.metric_id));
  }, [rawPreferences]);

  // Initialize meal plans from props (only once)
  const initializeFromProps = useCallback(() => {
    if (hasInitializedFromPropsRef.current || !initialMealPlans || kitchens.length === 0) {
      return;
    }

    try {
      const mealPlansData = JSON.parse(initialMealPlans as string);
      console.log('Initializing from props with meal plans:', mealPlansData);
      
      // Extract existing meal plan IDs and create mapping
      const newMealPlanIdMapping = new Map<string, string>();
      const newExistingMealPlans = new Set<string>();
      
      mealPlansData.forEach((mealPlan: any) => {
        const mealPlanId = mealPlan.id; // This is the actual meal plan ID
        const mealName = mealPlan.meal?.name;
        console.log(`Processing meal plan: ${mealName} (Plan ID: ${mealPlanId})`);
        
        // Find the corresponding meal preference
        const mealPreference = userMealPreferences.find(meal => meal.name === mealName);
        if (!mealPreference) {
          console.warn(`No meal preference found for meal plan: ${mealName}`);
          return;
        }
        
        // Map meal preference ID to meal plan ID
        newMealPlanIdMapping.set(mealPreference.id, mealPlanId);
        newExistingMealPlans.add(mealPlanId);
        
        console.log(`  Mapped meal preference ${mealPreference.id} (${mealName}) to meal plan ${mealPlanId}`);
      });
      
      setMealPlanIdMapping(newMealPlanIdMapping);
      setExistingMealPlans(newExistingMealPlans);
      
      // Populate selected foods and quantities from existing meal plans
      const newSelectedFoods = new Map<string, Set<string>>();
      const newMealFoodQuantities = new Map<string, Map<string, any>>();
      
      // Initialize with empty sets for all meals
      userMealPreferences.forEach(meal => {
        newSelectedFoods.set(meal.id, new Set<string>());
        newMealFoodQuantities.set(meal.id, new Map());
      });
      
      // Process each meal plan
      mealPlansData.forEach((mealPlan: any) => {
        const mealPlanId = mealPlan.id;
        const mealName = mealPlan.meal?.name;
        console.log(`Processing meal plan for ${mealName} (Plan ID: ${mealPlanId})`);
        
        // Find the corresponding meal preference
        const mealPreference = userMealPreferences.find(meal => meal.name === mealName);
        if (!mealPreference) {
          console.warn(`No meal preference found for meal plan: ${mealName}`);
          return;
        }
        
        const mealQuantities = new Map<string, any>();
        
        // Process each serving in the meal plan
        mealPlan.servings.forEach((serving: any) => {
          const foodId = serving.food_id;
          console.log(`  Adding food ${foodId} with quantity ${serving.quantity} ${serving.unit?.name || 'g'}`);
          
          // Add to selected foods
          const selectedFoodsForMeal = newSelectedFoods.get(mealPreference.id) || new Set<string>();
          selectedFoodsForMeal.add(foodId);
          newSelectedFoods.set(mealPreference.id, selectedFoodsForMeal);
          
          // Add to quantities
          mealQuantities.set(foodId, {
            quantity: serving.quantity,
            minQuantity: 0, // Default min
            maxQuantity: 3, // Default max
            selectedUnit: serving.unit?.name || 'g',
            locked: false, // Default unlocked
          });
        });
        
        newMealFoodQuantities.set(mealPreference.id, mealQuantities);
      });
      
      // Update state
      setSelectedFoods(newSelectedFoods);
      setMealFoodQuantities(newMealFoodQuantities);
      
      // Mark as initialized to prevent future overwrites
      hasInitializedFromPropsRef.current = true;
      
      console.log('Initialized from props:', {
        mealPlansCount: mealPlansData.length,
        mealPlanIdMapping: Object.fromEntries(newMealPlanIdMapping),
        existingMealPlans: Array.from(newExistingMealPlans),
        selectedFoods: Object.fromEntries(
          Array.from(newSelectedFoods.entries()).map(([mealId, foods]) => [
            mealId, 
            Array.from(foods)
          ])
        )
      });
      
    } catch (error) {
      console.error('Failed to parse initial meal plans:', error);
      // If parsing fails, start with empty state
      const initialSelectedFoods = new Map<string, Set<string>>();
      userMealPreferences.forEach(meal => {
        initialSelectedFoods.set(meal.id, new Set<string>());
      });
      setSelectedFoods(initialSelectedFoods);
      setExistingMealPlans(new Set());
      setMealPlanIdMapping(new Map());
      // Still mark as initialized to prevent retries
      hasInitializedFromPropsRef.current = true;
    }
  }, [initialMealPlans, kitchens.length, userMealPreferences]);

  // Initialize from props after kitchens are loaded
  useEffect(() => {
    if (kitchens.length > 0 && !loading) {
      initializeFromProps();
    }
  }, [kitchens, loading, initializeFromProps]);

  // Reset the initialized flag when selected date changes (for new navigation)
  useEffect(() => {
    hasInitializedFromPropsRef.current = false;
  }, [selectedDate]);

  // Save meal plan function - ultra-optimized for speed
  // Optimization strategy:
  // 1. Immediate UI feedback (redirect to home)
  // 2. Pre-fetch existing meal plans to avoid create/update guessing
  // 3. Parallel API calls for all meal plans
  // 4. Background save completion (non-blocking)
  // 5. Optimistic macro updates
  const saveMealPlan = async () => {
    if (!appUser) {
      alert('User not found');
      return;
    }

    console.log('=== SAVE MEAL PLAN START ===');
    console.log('User ID:', appUser.user_id);
    console.log('Selected Date:', selectedDate.toISOString());
    console.log('Existing meal plans:', Array.from(existingMealPlans));
    console.log('Meal plan ID mapping:', Object.fromEntries(mealPlanIdMapping));

    // Set saving state immediately
    setIsSaving(true);

    try {
      // Pre-calculate all the data we need to avoid repeated calculations
      const allFoodServings: { mealId: string; foodServings: any[] }[] = [];
      const savedMealPlanMacros: any = {};
      
      // Build food servings and calculate macros in a single pass
      userMealPreferences.forEach(meal => {
        const selectedFoodIds = selectedFoods.get(meal.id) || new Set();
        const mealFoodServings: any[] = [];
        
        console.log(`Processing meal: ${meal.name} (${meal.id})`);
        console.log(`  Selected foods: ${Array.from(selectedFoodIds)}`);
        
        selectedFoodIds.forEach(foodId => {
          for (const kitchen of kitchens) {
            const food = kitchen.foods.find(f => f.id === foodId);
            if (food) {
              const q = mealFoodQuantities.get(meal.id)?.get(foodId) || {
                quantity: 1,
                minQuantity: 0,
                maxQuantity: 3,
                selectedUnit: food.servingUnits[0]?.name || 'g',
                locked: false,
              };
              
              const serving = {
                food_id: food.id,
                quantity: q.quantity,
                unit_name: q.selectedUnit
              };
              
              mealFoodServings.push(serving);
              console.log(`    Adding serving: ${food.name} - ${q.quantity} ${q.selectedUnit}`);
              
              // Calculate macros for this food serving
              const unit = food.servingUnits.find(u => u.name === q.selectedUnit);
              if (unit) {
                const foodServingObj = {
                  id: food.id,
                  food_id: food.id,
                  quantity: q.quantity,
                  unit: {
                    id: q.selectedUnit,
                    name: q.selectedUnit,
                    food_id: food.id,
                    grams: unit.grams
                  },
                  food: food
                };
                const adjustedMacros = calculateAdjustedMacrosOptimized(foodServingObj, preferenceSet);
                Object.entries(adjustedMacros).forEach(([key, value]) => {
                  if (value) {
                    savedMealPlanMacros[key] = (savedMealPlanMacros[key] || 0) + value;
                  }
                });
              }
              break;
            }
          }
        });
        
        // Always include the meal plan, even if it has no foods
        // This ensures that meals with deleted foods are properly updated in the database
        allFoodServings.push({
          mealId: meal.id,
          foodServings: mealFoodServings
        });
        
        console.log(`  Final servings for ${meal.name}: ${mealFoodServings.length} foods`);
      });

      console.log('All food servings to save:', allFoodServings);
      console.log('Saved meal plan macros:', savedMealPlanMacros);

      // Update global macros immediately for better UX
      subtractFromMealPlan(savedMealPlanMacros);
      addToLoggedMeals(savedMealPlanMacros);

      // Redirect to home page immediately for instant feedback
      router.push('/');

      // Save all meal plans in parallel with smart create/update logic
      const savePromises = allFoodServings.map(async ({ mealId, foodServings }) => {
        console.log(`Saving meal plan for ${mealId}:`);
        
        // Get the actual meal plan ID from the mapping
        const actualMealPlanId = mealPlanIdMapping.get(mealId);
        const hasExistingMealPlan = actualMealPlanId && existingMealPlans.has(actualMealPlanId);
        
        console.log(`  Meal preference ID: ${mealId}`);
        console.log(`  Actual meal plan ID: ${actualMealPlanId || 'None'}`);
        console.log(`  Existing meal plan: ${hasExistingMealPlan ? 'YES' : 'NO'}`);
        console.log(`  Food servings: ${foodServings.length}`);
        
        // Use existing meal plans knowledge to make smart decisions
        if (hasExistingMealPlan && actualMealPlanId) {
          console.log(`  🔄 Updating existing meal plan: ${actualMealPlanId}`);
          // Update existing meal plan (even if foodServings is empty)
          try {
            const result = await mealPlanApi.updateMealPlan(actualMealPlanId, foodServings);
            console.log(`  ✅ Updated meal plan: ${actualMealPlanId}`);
            
            // If the meal plan was deleted (empty servings), remove it from tracking
            if (foodServings.length === 0) {
              console.log(`  🗑️  Meal plan ${actualMealPlanId} is now empty, removing from tracking`);
              setExistingMealPlans(prev => {
                const newSet = new Set(prev);
                newSet.delete(actualMealPlanId);
                return newSet;
              });
              setMealPlanIdMapping(prev => {
                const newMap = new Map(prev);
                newMap.delete(mealId);
                return newMap;
              });
            }
            
            return result;
          } catch (error: any) {
            console.log(`  ❌ Update failed for ${actualMealPlanId}:`, error.message);
            // If update fails (e.g., meal plan was deleted), remove from tracking
            setExistingMealPlans(prev => {
              const newSet = new Set(prev);
              newSet.delete(actualMealPlanId);
              return newSet;
            });
            setMealPlanIdMapping(prev => {
              const newMap = new Map(prev);
              newMap.delete(mealId);
              return newMap;
            });
            throw error;
          }
        } else {
          console.log(`  ➕ Creating new meal plan for: ${mealId}`);
          // Only create new meal plan if it has foods
          if (foodServings.length > 0) {
            try {
              const result = await mealPlanApi.createMealPlan(
                appUser.user_id,
                mealId,
                selectedDate,
                foodServings
              );
              
              // Extract the created meal plan ID and add to tracking
              const createdMealPlanId = result.id;
              console.log(`  ✅ Created meal plan: ${createdMealPlanId}`);
              
              // Mark as existing for future operations
              setExistingMealPlans(prev => new Set(prev).add(createdMealPlanId));
              setMealPlanIdMapping(prev => {
                const newMap = new Map(prev);
                newMap.set(mealId, createdMealPlanId);
                return newMap;
              });
              
              return result;
            } catch (error: any) {
              console.log(`  ⚠️  Creation failed for ${mealId}, trying update:`, error.message);
              // If creation fails due to existing meal plan, update instead
              if (error.message?.includes('already exists') || error.status === 409) {
                // This shouldn't happen with our new logic, but handle it just in case
                console.log(`  🔄 Creation failed, but this shouldn't happen with new logic`);
                throw error;
              }
              // For other errors, re-throw
              throw error;
            }
          } else {
            // No foods and no existing meal plan - nothing to do
            console.log(`  ⏭️  No foods for meal ${mealId} and no existing meal plan - skipping`);
            return null;
          }
        }
      });

      // Wait for all saves to complete in background
      Promise.all(savePromises)
        .then((savedMealPlans) => {
          const successfulSaves = savedMealPlans.filter(plan => plan !== null);
          console.log(`✅ Successfully saved ${successfulSaves.length} meal plans!`);
          console.log('Saved meal plan macros (now logged):', savedMealPlanMacros);
          // Show success message in console for debugging
          console.log('✅ Meal plan saved successfully!');
          console.log('=== SAVE MEAL PLAN END ===\n');
        })
        .catch((error) => {
          console.error('❌ Background save failed:', error);
          // Show error message in console for debugging
          console.error('❌ Meal plan save failed:', error.message);
          console.log('=== SAVE MEAL PLAN END (ERROR) ===\n');
        });

    } catch (error) {
      console.error('❌ Failed to save meal plan:', error);
      alert('Failed to save meal plan. Please try again.');
      console.log('=== SAVE MEAL PLAN END (ERROR) ===\n');
    } finally {
      setIsSaving(false);
    }
  };

  // Fetch meals when selectedDate or appUser changes
  useEffect(() => {
    console.log('PlanDetailPage: Fetch meals useEffect triggered', {
      appUser: appUser?.user_id,
      selectedDate: selectedDate?.toISOString(),
      rawPreferencesLength: rawPreferences?.length
    });
    
    if (appUser && selectedDate) {
      setMealsLoading(true);
      getMeals(appUser.user_id, selectedDate)
        .then((fetchedMeals) => {
          console.log('PlanDetailPage: Meals fetched successfully', {
            mealsCount: fetchedMeals.meals?.length || 0,
            mealNames: fetchedMeals.meals?.map((m: any) => m.name) || []
          });
          
          if (!fetchedMeals.meals || !Array.isArray(fetchedMeals.meals)) {
            console.error('PlanDetailPage: Invalid meals data received:', fetchedMeals);
            setMealsData({ meals: [], macros: {} });
            return;
          }
          
          try {
            // Use optimized batch calculation
            const totalMacros = calculateAllMacrosOptimized(fetchedMeals.meals, rawPreferences);
            // Update both meals and macros in single state change
            setMealsData({ meals: fetchedMeals.meals, macros: totalMacros });
          } catch (error) {
            console.error('PlanDetailPage: Error calculating macros:', error);
            setMealsData({ meals: fetchedMeals.meals, macros: {} });
          }
        })
        .finally(() => setMealsLoading(false));
    } else {
      console.log('PlanDetailPage: Clearing meals data - no appUser or selectedDate');
      setMealsData({ meals: [], macros: {} });
      setMealsLoading(false);
    }
  }, [appUser, selectedDate, rawPreferences]);

  // Listen for meal updates from other pages
  useEffect(() => {
    const handleMealsUpdated = () => {
      if (appUser && selectedDate) {
        getMeals(appUser.user_id, selectedDate)
          .then((fetchedMeals) => {
            if (!fetchedMeals.meals || !Array.isArray(fetchedMeals.meals)) {
              console.error('PlanDetailPage: Invalid meals data in handleMealsUpdated:', fetchedMeals);
              setMealsData({ meals: [], macros: {} });
              return;
            }
            
            try {
              const totalMacros = calculateAllMacrosOptimized(fetchedMeals.meals, rawPreferences);
              setMealsData({ meals: fetchedMeals.meals, macros: totalMacros });
            } catch (error) {
              console.error('PlanDetailPage: Error calculating macros in handleMealsUpdated:', error);
              setMealsData({ meals: fetchedMeals.meals, macros: {} });
            }
          });
      }
    };

    eventBus.on('mealsUpdated', handleMealsUpdated);
    return () => {
      eventBus.off('mealsUpdated', handleMealsUpdated);
    };
  }, [appUser, selectedDate, rawPreferences]);

  // Helper function to get servings for a single meal
  const getMealSelectedFoodServings = (mealId: string) => {
    const servings: any[] = [];
    const selectedFoodIds = selectedFoods.get(mealId) || new Set<string>();
    selectedFoodIds.forEach(foodId => {
      for (const kitchen of kitchens) {
        const food = kitchen.foods.find(f => f.id === foodId);
        if (food) {
          const q = mealFoodQuantities.get(mealId)?.get(foodId) || {
            quantity: 1,
            minQuantity: 0,
            maxQuantity: 3,
            selectedUnit: food.servingUnits[0]?.name || 'g',
            locked: false,
          };
          servings.push({
            id: food.id,
            food_id: food.id,
            quantity: q.quantity,
            unit: {
              id: q.selectedUnit,
              name: q.selectedUnit,
              food_id: food.id,
              grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
            },
            food: food
          });
          break;
        }
      }
    });
    return servings;
  };

  // Helper function to get meal-specific preferences for display (full goals, not adjusted)
  const getMealDisplayPreferences = (meal: any) => {
    if (!preferences || !meal.distribution_percentage) {
      return preferences;
    }
    
    const distributionPercentage = meal.distribution_percentage;
    
    return preferences.map(pref => ({
      ...pref,
      min: pref.min ? pref.min * distributionPercentage : undefined,
      max: pref.max ? pref.max * distributionPercentage : undefined,
    }));
  };

  // Helper function to scale preferences based on meal distribution percentage and account for logged foods and locked foods (for optimization)
  const getMealSpecificPreferences = (meal: any) => {
    if (!preferences || !meal.distribution_percentage) {
      return preferences;
    }
    
    const distributionPercentage = meal.distribution_percentage;
    
    // Calculate total logged macros for this meal
    const loggedMeal = mealsData.meals.find((m: Meal) => m.name === meal.name);
    const loggedMacros: any = {};
    if (loggedMeal) {
      loggedMeal.servings.forEach((foodServing: FoodServing) => {
        const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
        Object.entries(adjustedMacros).forEach(([key, value]) => {
          if (value) {
            loggedMacros[key] = (loggedMacros[key] || 0) + value;
          }
        });
      });
    }
    
    // Calculate total locked food macros for this meal
    const lockedMacros: any = {};
    const selectedFoodIds = selectedFoods.get(meal.id) || new Set();
    selectedFoodIds.forEach(foodId => {
      const q = mealFoodQuantities.get(meal.id)?.get(foodId);
      if (q && q.locked) {
        for (const kitchen of kitchens) {
          const food = kitchen.foods.find(f => f.id === foodId);
          if (food) {
            const foodServing = {
              id: food.id,
              food_id: food.id,
              quantity: q.quantity,
              unit: {
                id: q.selectedUnit,
                name: q.selectedUnit,
                food_id: food.id,
                grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
              },
              food: food
            };
            const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
            Object.entries(adjustedMacros).forEach(([key, value]) => {
              if (value) {
                lockedMacros[key] = (lockedMacros[key] || 0) + value;
              }
            });
            break;
          }
        }
      }
    });
    
    const result = preferences.map(pref => {
      const mealTarget = {
        min: pref.min ? pref.min * distributionPercentage : undefined,
        max: pref.max ? pref.max * distributionPercentage : undefined,
      };
      
      // Subtract logged macros and locked macros from the targets
      const loggedAmount = loggedMacros[pref.id] || 0;
      const lockedAmount = lockedMacros[pref.id] || 0;
      const totalFixedAmount = loggedAmount + lockedAmount;
      
      const adjustedPref = {
        ...pref,
        min: mealTarget.min ? mealTarget.min - totalFixedAmount : undefined,
        max: mealTarget.max ? mealTarget.max - totalFixedAmount : undefined,
      };
      
      return adjustedPref;
    });
    
    return result;
  };

  // Calculate macros for all meals at the top level - now using global macros context
  const { totalMacros: globalTotalMacros } = useGlobalMacros();
  const { addToMealPlan, subtractFromMealPlan, clearMealPlan, addToLoggedMeals } = useGlobalMacrosSync();
  const mealMacros = useMemo(() => {
    const macros: { [mealId: string]: any } = {};
    userMealPreferences.forEach(meal => {
      const servings = getMealSelectedFoodServings(meal.id);
      // Calculate macros directly instead of using useMacros hook
      const totalMacros: any = {};
      
      // Add macros from planned foods
      servings.forEach((foodServing) => {
        const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
        Object.entries(adjustedMacros).forEach(([key, value]) => {
          if (value) {
            totalMacros[key] = (totalMacros[key] || 0) + value;
          }
        });
      });
      
      // Add macros from logged foods for this meal
      const loggedMeal = mealsData.meals.find((m: Meal) => m.name === meal.name);
      if (loggedMeal) {
        loggedMeal.servings.forEach((foodServing: FoodServing) => {
          const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
          Object.entries(adjustedMacros).forEach(([key, value]) => {
            if (value) {
              totalMacros[key] = (totalMacros[key] || 0) + value;
            }
          });
        });
      }
      
      macros[meal.id] = totalMacros;
    });
    return macros;
  }, [userMealPreferences, selectedFoods, mealFoodQuantities, kitchens, preferenceSet, mealsData.meals]);

  // Helper function to get overall preferences accounting for all logged foods and locked foods
  const getOverallPreferencesWithLoggedFoods = () => {
    if (!preferences) return preferences;
    
    // Calculate total logged macros across all meals
    const totalLoggedMacros: any = {};
    mealsData.meals.forEach((meal: Meal) => {
      meal.servings.forEach((foodServing: FoodServing) => {
        const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
        Object.entries(adjustedMacros).forEach(([key, value]) => {
          if (value) {
            totalLoggedMacros[key] = (totalLoggedMacros[key] || 0) + value;
          }
        });
      });
    });
    
    // Calculate total locked food macros across all meals
    const totalLockedMacros: any = {};
    userMealPreferences.forEach(meal => {
      const selectedFoodIds = selectedFoods.get(meal.id) || new Set();
      selectedFoodIds.forEach(foodId => {
        const q = mealFoodQuantities.get(meal.id)?.get(foodId);
        if (q && q.locked) {
          for (const kitchen of kitchens) {
            const food = kitchen.foods.find(f => f.id === foodId);
            if (food) {
              const foodServing = {
                id: food.id,
                food_id: food.id,
                quantity: q.quantity,
                unit: {
                  id: q.selectedUnit,
                  name: q.selectedUnit,
                  food_id: food.id,
                  grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
                },
                food: food
              };
              const adjustedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
              Object.entries(adjustedMacros).forEach(([key, value]) => {
                if (value) {
                  totalLockedMacros[key] = (totalLockedMacros[key] || 0) + value;
                }
              });
              break;
            }
          }
        }
      });
    });
    
    return preferences.map(pref => {
      const loggedAmount = totalLoggedMacros[pref.id] || 0;
      const lockedAmount = totalLockedMacros[pref.id] || 0;
      const totalFixedAmount = loggedAmount + lockedAmount;
      
      const adjustedPref = {
        ...pref,
        min: pref.min ? pref.min - totalFixedAmount : undefined,
        max: pref.max ? pref.max - totalFixedAmount : undefined,
      };
      
      return adjustedPref;
    });
  };

  useEffect(() => {
    console.log('PlanDetailPage: fetchKitchens useEffect triggered');
    fetchKitchens()
  }, [])

  const fetchKitchens = async () => {
    try {
      const allFoods = await foodSearchApi.getAllFoods()
      
      // Create a single "All Foods" kitchen with all foods
      const allFoodsKitchen = {
        id: 'all-foods',
        name: 'All Foods',
        description: 'All available foods',
        foods: allFoods.map(food => ({
          ...food,
          active: true,
          quantity: 1,
          minQuantity: 0,
          maxQuantity: 3,
          selectedUnit: food.servingUnits[0]?.name || 'g'
        }))
      }
      
      setKitchens([allFoodsKitchen])
      
      // Initialize selected foods for each meal
      const initialSelectedFoods = new Map<string, Set<string>>()
      
      userMealPreferences.forEach(meal => {
        initialSelectedFoods.set(meal.id, new Set<string>())
      })
      
      setSelectedFoods(initialSelectedFoods)
    } catch (error) {
      console.error('Error fetching foods:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load existing meal plans and populate selected foods and quantities
  // DISABLED: This function was causing user changes to be overwritten
  // Now using initializeFromProps instead
  const loadExistingMealPlans = useCallback(async () => {
    // Function disabled to prevent overwriting user changes
    console.log('loadExistingMealPlans: Function disabled - using initializeFromProps instead');
    return;
  }, []);

  // Load existing meal plans after kitchens are loaded
  useEffect(() => {
    // Effect disabled to prevent overwriting user changes
    console.log('loadExistingMealPlans useEffect: Effect disabled - using initializeFromProps instead');
  }, []);

  const handleQuantityChange = (mealId: string, foodId: string, value: number) => {
    setMealFoodQuantities(prev => {
      const newMap = new Map(prev)
      const mealMap = new Map(newMap.get(mealId) || new Map())
      const entry = mealMap.get(foodId)
      if (entry && !entry.locked) {
        mealMap.set(foodId, { ...entry, quantity: value })
        newMap.set(mealId, mealMap)
      }
      return newMap
    })
  }

  const handleQuantityTextChange = (mealId: string, foodId: string, value: string) => {
    const key = `${mealId}:${foodId}`
    
    // Allow only numbers and decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, '')
    
    // Prevent multiple decimal points
    const parts = sanitizedValue.split('.')
    const finalValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : sanitizedValue
    
    // Update the text input state
    setQuantityTextInputs(prev => {
      const newMap = new Map(prev)
      newMap.set(key, finalValue)
      return newMap
    })
    
    // Interpret empty input as zero, otherwise update if it's a valid number
    if (finalValue === '') {
      // Empty input = zero
      setLastValidQuantities(prev => {
        const newMap = new Map(prev)
        newMap.set(key, 0)
        return newMap
      })
      
      setMealFoodQuantities(prev => {
        const newMap = new Map(prev)
        const mealMap = new Map(newMap.get(mealId) || new Map())
        const entry = mealMap.get(foodId)
        if (entry && !entry.locked) {
          const clampedValue = Math.max(entry.minQuantity, 0)
          mealMap.set(foodId, { ...entry, quantity: clampedValue })
          newMap.set(mealId, mealMap)
        }
        return newMap
      })
    } else {
      const numValue = parseFloat(finalValue)
      if (!isNaN(numValue) && numValue >= 0) {
        setLastValidQuantities(prev => {
          const newMap = new Map(prev)
          newMap.set(key, numValue)
          return newMap
        })
        
        setMealFoodQuantities(prev => {
          const newMap = new Map(prev)
          const mealMap = new Map(newMap.get(mealId) || new Map())
          const entry = mealMap.get(foodId)
          if (entry && !entry.locked) {
            const clampedValue = Math.max(entry.minQuantity, Math.min(numValue, entry.maxQuantity))
            mealMap.set(foodId, { ...entry, quantity: clampedValue })
            newMap.set(mealId, mealMap)
          }
          return newMap
        })
      }
    }
  }

  const handleQuantityTextBlur = (mealId: string, foodId: string) => {
    const key = `${mealId}:${foodId}`
    const currentText = quantityTextInputs.get(key) || ''
    
    // If empty, keep it as empty (interpreted as zero)
    if (currentText === '') {
      return
    }
    
    const numValue = parseFloat(currentText)
    
    if (isNaN(numValue) || numValue < 0) {
      // Restore the last valid quantity
      const lastValid = lastValidQuantities.get(key)
      if (lastValid !== undefined) {
        setQuantityTextInputs(prev => {
          const newMap = new Map(prev)
          newMap.set(key, lastValid.toFixed(1))
          return newMap
        })
      } else {
        // If no last valid, use the current quantity from state
        const q = getMealFoodQuantity(mealId, foodId)
        setQuantityTextInputs(prev => {
          const newMap = new Map(prev)
          newMap.set(key, getSafeQuantity(q).toFixed(1))
          return newMap
        })
      }
    } else {
      // Update the text to show the formatted value
      setQuantityTextInputs(prev => {
        const newMap = new Map(prev)
        newMap.set(key, numValue.toFixed(1))
        return newMap
      })
    }
  }

  const handleQuantityTextFocus = (mealId: string, foodId: string) => {
    const key = `${mealId}:${foodId}`
    const q = getMealFoodQuantity(mealId, foodId)
    
    // Initialize the text input with current quantity if not already set
    if (!quantityTextInputs.has(key)) {
      setQuantityTextInputs(prev => {
        const newMap = new Map(prev)
        newMap.set(key, getSafeQuantity(q).toFixed(1))
        return newMap
      })
    }
  }

  const handleMinQuantityChange = (mealId: string, foodId: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setMealFoodQuantities(prev => {
        const newMap = new Map(prev)
        const mealMap = new Map(newMap.get(mealId) || new Map())
        const entry = mealMap.get(foodId)
        if (entry && !entry.locked) {
          const newMin = Math.max(0, Math.min(numValue, entry.maxQuantity))
          mealMap.set(foodId, {
            ...entry,
            minQuantity: newMin,
            quantity: Math.max(newMin, entry.quantity),
          })
          newMap.set(mealId, mealMap)
        }
        return newMap
      })
    }
  }

  const handleMaxQuantityChange = (mealId: string, foodId: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setMealFoodQuantities(prev => {
        const newMap = new Map(prev)
        const mealMap = new Map(newMap.get(mealId) || new Map())
        const entry = mealMap.get(foodId)
        if (entry && !entry.locked) {
          const newMax = Math.max(numValue, entry.minQuantity)
          mealMap.set(foodId, {
            ...entry,
            maxQuantity: newMax,
            quantity: Math.min(newMax, entry.quantity),
          })
          newMap.set(mealId, mealMap)
        }
        return newMap
      })
    }
  }

  const handleUnitChange = (mealId: string, foodId: string, unit: string) => {
    setMealFoodQuantities(prev => {
      const newMap = new Map(prev);
      const mealMap = new Map(newMap.get(mealId) || new Map());
      const entry = mealMap.get(foodId);
      if (entry && !entry.locked) {
        // Find the food to get the new unit's grams
        let food;
        for (const kitchen of kitchens) {
          food = kitchen.foods.find(f => f.id === foodId);
          if (food) break;
        }
        
        if (food) {
          const newUnitGrams = food.servingUnits.find(u => u.name === unit)?.grams || 1;
          const oldUnitGrams = food.servingUnits.find(u => u.name === entry.selectedUnit)?.grams || 1;
          
          // Calculate the new quantity to maintain the same grams
          const currentGrams = entry.quantity * oldUnitGrams;
          const newQuantity = currentGrams / newUnitGrams;
          
          // Update the entry with new unit and adjusted quantity
          const updatedEntry = { 
            ...entry, 
            selectedUnit: unit,
            quantity: newQuantity,
            minQuantity: entry.minQuantity * oldUnitGrams / newUnitGrams,
            maxQuantity: entry.maxQuantity * oldUnitGrams / newUnitGrams
          };
          
          mealMap.set(foodId, updatedEntry);
          newMap.set(mealId, mealMap);
          
          // Update the text input to reflect the new quantity
          const key = `${mealId}:${foodId}`;
          setQuantityTextInputs(prev => {
            const newTextMap = new Map(prev);
            newTextMap.set(key, newQuantity.toFixed(1));
            return newTextMap;
          });
          
          // Update the last valid quantity
          setLastValidQuantities(prev => {
            const newValidMap = new Map(prev);
            newValidMap.set(key, newQuantity);
            return newValidMap;
          });
        }
      }
      return newMap;
    });
  };

  const handleLockToggle = (mealId: string, foodId: string) => {
    setMealFoodQuantities(prev => {
      const newMap = new Map(prev)
      const mealMap = new Map(newMap.get(mealId) || new Map())
      const entry = mealMap.get(foodId)
      if (entry) {
        mealMap.set(foodId, { ...entry, locked: !entry.locked })
        newMap.set(mealId, mealMap)
      }
      return newMap
    })
  }

  const handleInputFocus = (foodId: string, type: 'min' | 'max') => {
    nextFocusedInputRef.current = { foodId, type }
    setFocusedInput({ foodId, type })
    setFocusedContainer(foodId)
  }

  const handleInputBlur = (foodId: string, type: 'min' | 'max') => {
    InteractionManager.runAfterInteractions(() => {
      const nextInput = nextFocusedInputRef.current
      const isSwitchingToOtherInput = nextInput?.foodId === foodId && nextInput?.type !== type
      
      if (!isSwitchingToOtherInput) {
        setFocusedInput(null)
        setFocusedContainer(null)
      }
      
      nextFocusedInputRef.current = null
    })
  }

  const handleMinClick = (foodId: string) => {
    handleInputFocus(foodId, 'min')
    requestAnimationFrame(() => {
      minInputRef.current?.focus()
    })
  }

  const handleMaxClick = (foodId: string) => {
    handleInputFocus(foodId, 'max')
    requestAnimationFrame(() => {
      maxInputRef.current?.focus()
    })
  }

  const handleSelectedFoodsChange = (mealId: string, foodIds: string[]) => {
    setSelectedFoods(prev => {
      const newMap = new Map(prev);
      newMap.set(mealId, new Set(foodIds));
      return newMap;
    });
    setMealFoodQuantities(prev => {
      const newMap = new Map(prev);
      const mealMap = new Map(newMap.get(mealId) || new Map());
      // Add new foods
      foodIds.forEach(foodId => {
        if (!mealMap.has(foodId)) {
          let food;
          for (const kitchen of kitchens) {
            food = kitchen.foods.find(f => f.id === foodId);
            if (food) break;
          }
          if (food) {
            mealMap.set(foodId, {
              quantity: 1,
              minQuantity: 0,
              maxQuantity: 3,
              selectedUnit: food.servingUnits[0]?.name || 'g',
              locked: false,
            });
          }
        }
      });
      // Remove foods that are no longer selected
      Array.from(mealMap.keys()).forEach(fid => {
        if (!foodIds.includes(fid)) {
          mealMap.delete(fid);
        }
      });
      newMap.set(mealId, mealMap);
      return newMap;
    });
  }

  const getSelectedFoodsForMeal = (mealId: string) => {
    return selectedFoods.get(mealId) || new Set<string>()
  }

  const getAllSelectedFoodServings = () => {
    const allServings: any[] = []
    
    // Add planned foods only (logged foods are handled separately in app header)
    userMealPreferences.forEach(meal => {
      const selectedFoodIds = selectedFoods.get(meal.id) || new Set<string>()
      selectedFoodIds.forEach(foodId => {
        for (const kitchen of kitchens) {
          const food = kitchen.foods.find(f => f.id === foodId)
          if (food) {
            const q = mealFoodQuantities.get(meal.id)?.get(foodId) || {
              quantity: 1,
              minQuantity: 0,
              maxQuantity: 3,
              selectedUnit: food.servingUnits[0]?.name || 'g',
              locked: false,
            }
            const serving = {
              id: food.id,
              food_id: food.id,
              quantity: q.quantity,
              unit: {
                id: q.selectedUnit,
                name: q.selectedUnit,
                food_id: food.id,
                grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
              },
              food: food
            }
            allServings.push(serving)
            break
          }
        }
      })
    })
    
    return allServings
  }

  // Calculate meal plan macros using ultra-fast incremental updates
  const prevMealPlanRef = useRef<{
    selectedFoods: Map<string, Set<string>>;
    mealFoodQuantities: Map<string, Map<string, any>>;
  }>({ selectedFoods: new Map(), mealFoodQuantities: new Map() });

  // Ultra-fast meal plan macros calculation and sync
  useEffect(() => {
    const currentState = {
      selectedFoods: new Map(selectedFoods),
      mealFoodQuantities: new Map(mealFoodQuantities)
    };
    const prevState = prevMealPlanRef.current;

    // Calculate the difference and apply incremental updates
    let hasChanges = false;

    // Check for food selection changes
    for (const [mealId, currentFoodIds] of selectedFoods) {
      const prevFoodIds = prevState.selectedFoods.get(mealId) || new Set();
      
      // Find added foods
      for (const foodId of currentFoodIds) {
        if (!prevFoodIds.has(foodId)) {
          // Food was added - add its macros
          for (const kitchen of kitchens) {
            const food = kitchen.foods.find(f => f.id === foodId);
            if (food) {
              const q = mealFoodQuantities.get(mealId)?.get(foodId) || {
                quantity: 1,
                minQuantity: 0,
                maxQuantity: 3,
                selectedUnit: food.servingUnits[0]?.name || 'g',
                locked: false,
              };
              
              // Create a proper FoodServing object for optimized calculation
              const foodServing = {
                id: food.id,
                food_id: food.id,
                quantity: q.quantity,
                unit: {
                  id: q.selectedUnit,
                  name: q.selectedUnit,
                  food_id: food.id,
                  grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
                },
                food: food
              };
              
              // Calculate macros using the optimized function (includes weight multiplication)
              const foodMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
              addToMealPlan(foodMacros);
              hasChanges = true;
              break;
            }
          }
        }
      }
      
      // Find removed foods
      for (const foodId of prevFoodIds) {
        if (!currentFoodIds.has(foodId)) {
          // Food was removed - subtract its macros
          for (const kitchen of kitchens) {
            const food = kitchen.foods.find(f => f.id === foodId);
            if (food) {
              const prevQ = prevState.mealFoodQuantities.get(mealId)?.get(foodId) || {
                quantity: 1,
                minQuantity: 0,
                maxQuantity: 3,
                selectedUnit: food.servingUnits[0]?.name || 'g',
                locked: false,
              };
              
              // Create a proper FoodServing object for optimized calculation
              const foodServing = {
                id: food.id,
                food_id: food.id,
                quantity: prevQ.quantity,
                unit: {
                  id: prevQ.selectedUnit,
                  name: prevQ.selectedUnit,
                  food_id: food.id,
                  grams: food.servingUnits.find(u => u.name === prevQ.selectedUnit)?.grams || 1
                },
                food: food
              };
              
              // Calculate macros using the optimized function (includes weight multiplication)
              const foodMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
              subtractFromMealPlan(foodMacros);
              hasChanges = true;
              break;
            }
          }
        }
      }
    }

    // Check for quantity changes
    for (const [mealId, currentMealQuantities] of mealFoodQuantities) {
      const prevMealQuantities = prevState.mealFoodQuantities.get(mealId) || new Map();
      
      for (const [foodId, currentQ] of currentMealQuantities) {
        const prevQ = prevMealQuantities.get(foodId);
        
        if (prevQ && currentQ.quantity !== prevQ.quantity) {
          // Quantity changed - calculate and apply the difference
          for (const kitchen of kitchens) {
            const food = kitchen.foods.find(f => f.id === foodId);
            if (food) {
              const quantityDiff = currentQ.quantity - prevQ.quantity;
              
              if (quantityDiff !== 0) {
                // Create FoodServing objects for both old and new quantities
                const oldFoodServing = {
                  id: food.id,
                  food_id: food.id,
                  quantity: prevQ.quantity,
                  unit: {
                    id: prevQ.selectedUnit,
                    name: prevQ.selectedUnit,
                    food_id: food.id,
                    grams: food.servingUnits.find(u => u.name === prevQ.selectedUnit)?.grams || 1
                  },
                  food: food
                };
                
                const newFoodServing = {
                  id: food.id,
                  food_id: food.id,
                  quantity: currentQ.quantity,
                  unit: {
                    id: currentQ.selectedUnit,
                    name: currentQ.selectedUnit,
                    food_id: food.id,
                    grams: food.servingUnits.find(u => u.name === currentQ.selectedUnit)?.grams || 1
                  },
                  food: food
                };
                
                // Calculate the macro difference using optimized functions
                const oldMacros = calculateAdjustedMacrosOptimized(oldFoodServing, preferenceSet);
                const newMacros = calculateAdjustedMacrosOptimized(newFoodServing, preferenceSet);
                
                // Calculate the difference
                const macroDiff = Object.keys(newMacros).reduce((diff, key) => {
                  const change = (newMacros[key] || 0) - (oldMacros[key] || 0);
                  if (change !== 0) {
                    diff[key] = change;
                  }
                  return diff;
                }, {} as any);
                
                if (Object.keys(macroDiff).length > 0) {
                  // Always add the difference - it can be positive or negative
                  // The addToMealPlan function will handle both cases correctly
                  addToMealPlan(macroDiff);
                  hasChanges = true;
                }
              }
              break;
            }
          }
        }
      }
    }

    // Update the previous state reference
    prevMealPlanRef.current = currentState;

    if (hasChanges) {
      console.log('PlanDetailPage: Meal plan macros updated incrementally');
    }
  }, [selectedFoods, mealFoodQuantities, kitchens, addToMealPlan, subtractFromMealPlan, preferenceSet]);

  // Clear meal plan macros when leaving this page
  useEffect(() => {
    return () => {
      clearMealPlan();
    };
  }, [clearMealPlan]);

  // Helper function to optimize a single meal
  const optimizeSingleMeal = async (meal: any) => {
    const selectedFoodIds = selectedFoods.get(meal.id) || new Set();
    if (selectedFoodIds.size === 0) {
      alert(`No foods selected for ${meal.name}`);
      return;
    }

    const userPrefs = preferences || [];
    if (userPrefs.length === 0) {
      alert('No nutritional preferences set. Please set your preferences first.');
      return;
    }

    const macroNames = userPrefs.map(pref => pref.id);
    
    // Get foods for this specific meal
    const mealFoods: any[] = [];
    selectedFoodIds.forEach(foodId => {
      for (const kitchen of kitchens) {
        const food = kitchen.foods.find(f => f.id === foodId);
        if (food) {
          const q = mealFoodQuantities.get(meal.id)?.get(foodId);
          if (q) {
            mealFoods.push({
              mealId: meal.id,
              foodId: food.id,
              quantity: q.quantity,
              minQuantity: q.minQuantity,
              maxQuantity: q.maxQuantity,
              selectedUnit: q.selectedUnit,
              food: food,
              unit: {
                id: q.selectedUnit,
                name: q.selectedUnit,
                food_id: food.id,
                grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
              }
            });
          }
          break;
        }
      }
    });

    const mealSpecificPrefs = getMealSpecificPreferences(meal);
    if (!mealSpecificPrefs) {
      alert(`No preferences found for ${meal.name}`);
      return;
    }

    // Debug: Show meal-specific preferences before conversion
    console.log(`=== ${meal.name} Meal-Specific Preferences ===`);
    console.log('Original preferences:', preferences);
    console.log('Meal-specific preferences (after adjustments):', mealSpecificPrefs);
    console.log('===============================================');

    console.log(`Optimizing ${meal.name}:`);
    console.log('Original preferences:', preferences);
    console.log('Meal-specific preferences (with logged foods subtracted):', mealSpecificPrefs);
    console.log('Selected foods:', mealFoods.map(f => f.food.name));

    // Log initial error
    const initialError = calculateMealError(meal);
    console.log(`Initial weighted absolute error for ${meal.name}:`, initialError.error.toFixed(6));

    const foods = mealFoods.map(food => {
      const macroValues = macroNames.map(macroName => {
        return (food.food.macros as any)?.[macroName] || 0;
      });
      return {
        macroValues,
        unitGrams: food.unit.grams,
        quantity: food.quantity,
        minQuantity: food.minQuantity,
        maxQuantity: food.maxQuantity,
        locked: food.locked || false
      };
    });

    const optimizationPreferences = mealSpecificPrefs.map(pref => ({
      min_value: pref.min !== undefined ? pref.min : null,
      max_value: pref.max !== undefined ? pref.max : Infinity
    }));

    // Get daily max values for weighting
    const dailyMaxValues = userPrefs.map(pref => pref.max || 1);

    console.log('Optimization preferences:', optimizationPreferences);
    console.log('Daily max values for weighting:', dailyMaxValues);

    try {
      const mealResult = await optimizationApi.optimizeQuantities({
        foods,
        preferences: optimizationPreferences,
        macroNames,
        dailyMaxValues,
        maxIterations: 500
      });

      // Debug: Show calculated macros, preferences, and error
      console.log(`=== ${meal.name} Optimization Debug ===`);
      console.log('Macro Names:', macroNames);
      console.log('Optimization Preferences:', optimizationPreferences);
      console.log('Final Macros:', mealResult.finalMacros);
      console.log('Optimization Error:', mealResult.error);
      console.log('Optimized Quantities:', mealResult.optimizedQuantities);
      console.log('Original Quantities:', mealFoods.map(f => f.quantity));
      
      // Log final error
      const finalError = calculateMealError(meal);
      console.log(`Final weighted absolute error for ${meal.name}:`, finalError.error.toFixed(6));
      console.log(`Error improvement: ${(initialError.error - finalError.error).toFixed(6)}`);
      
      // Calculate what the planned foods contribute
      // const plannedMacros: any = {};
      // mealFoods.forEach((food, idx) => {
      //   const quantity = mealResult.optimizedQuantities[idx];
      //   const totalGrams = quantity * food.unit.grams;
      //   food.macroValues.forEach((valuePerGram: number, macroIndex: number) => {
      //     const macroName = macroNames[macroIndex];
      //     const totalValue = totalGrams * valuePerGram;
      //     plannedMacros[macroName] = (plannedMacros[macroName] || 0) + totalValue;
      //   });
      // });
      // console.log('Planned Food Macros:', plannedMacros);
      console.log('=====================================');

      // Update quantities for this meal
      setMealFoodQuantities(prev => {
        const newMap = new Map(prev);
        console.log(`Updating quantities for ${meal.name}:`);
        mealFoods.forEach((food, idx) => {
          const mealMap = new Map(newMap.get(meal.id) || new Map());
          const entry = mealMap.get(food.foodId);
          if (entry && !entry.locked) {
            const oldQuantity = entry.quantity;
            const newQuantity = mealResult.optimizedQuantities[idx];
            console.log(`  ${food.food.name}: ${oldQuantity} -> ${newQuantity}`);
            mealMap.set(food.foodId, { ...entry, quantity: newQuantity });
            newMap.set(meal.id, mealMap);
          }
        });
        return newMap;
      });

      alert(`${meal.name} optimized successfully! Error: ${mealResult.error.toFixed(4)}`);
    } catch (error) {
      console.error(`Optimization error for ${meal.name}:`, error);
      alert(`Failed to optimize ${meal.name}. Please try again.`);
    }
  };

  const optimizeQuantities = async () => {
    if (selectedFoods.size === 0) {
      alert('No foods selected for optimization');
      return;
    }
    setIsOptimizing(true);
    try {
      const userPrefs = preferences || [];
      if (userPrefs.length === 0) {
        alert('No nutritional preferences set. Please set your preferences first.');
        return;
      }
      const macroNames = userPrefs.map(pref => pref.id);
      
      // Global optimization: optimize all foods across all meals together
      console.log('Starting global optimization...');
      
      // Build a single list of all foods across all meals
      const allFoods: any[] = [];
      const foodToMealMap = new Map<string, string>(); // Map food index to meal ID
      let foodIndex = 0;
      
      userMealPreferences.forEach(meal => {
        const selectedFoodIds = selectedFoods.get(meal.id) || new Set();
        selectedFoodIds.forEach(foodId => {
          for (const kitchen of kitchens) {
            const food = kitchen.foods.find(f => f.id === foodId);
            if (food) {
              const q = mealFoodQuantities.get(meal.id)?.get(foodId);
              if (q) {
                allFoods.push({
                  mealId: meal.id,
                  foodId: food.id,
                  quantity: q.quantity,
                  minQuantity: q.minQuantity,
                  maxQuantity: q.maxQuantity,
                  selectedUnit: q.selectedUnit,
                  locked: q.locked,
                  food: food,
                  unit: {
                    id: q.selectedUnit,
                    name: q.selectedUnit,
                    food_id: food.id,
                    grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
                  }
                });
                foodToMealMap.set(foodIndex.toString(), meal.id);
                foodIndex++;
              }
              break;
            }
          }
        });
      });
      
      console.log(`Global optimization: ${allFoods.length} foods across ${userMealPreferences.length} meals`);
      
      // Calculate overall preferences accounting for logged foods
      const overallPrefs = getOverallPreferencesWithLoggedFoods();
      console.log('Overall preferences (after logged foods):', overallPrefs);
      
      // Prepare foods for optimization
      const foods = allFoods.map(food => {
        const macroValues = macroNames.map(macroName => {
          return (food.food.macros as any)?.[macroName] || 0;
        });
        return {
          macroValues,
          unitGrams: food.unit.grams,
          quantity: food.quantity,
          minQuantity: food.minQuantity,
          maxQuantity: food.maxQuantity,
          locked: food.locked || false
        };
      });
      
      // Convert preferences to optimization format
      const optimizationPreferences = overallPrefs.map(pref => ({
        min_value: pref.min !== undefined ? pref.min : null,
        max_value: pref.max !== undefined ? pref.max : null
      }));
      
      // Get daily max values for weighting
      const dailyMaxValues = userPrefs.map(pref => pref.max || 1);
      
      console.log('Global optimization preferences:', optimizationPreferences);
      console.log('Daily max values for weighting:', dailyMaxValues);
      
      // Log initial error
      let initialTotalError = 0;
      userMealPreferences.forEach(meal => {
        const mealError = calculateMealError(meal);
        initialTotalError += mealError.error;
      });
      console.log('Initial total error across all meals:', initialTotalError.toFixed(6));
      
      // Run global optimization
      const globalResult = await optimizationApi.optimizeQuantities({
        foods,
        preferences: optimizationPreferences,
        macroNames,
        dailyMaxValues,
        maxIterations: 2000
      });
      
      console.log('Global optimization result:', {
        error: globalResult.error,
        finalMacros: globalResult.finalMacros,
        optimizedQuantities: globalResult.optimizedQuantities
      });
      
      // Update quantities for all meals based on the global optimization
      setMealFoodQuantities(prev => {
        const newMap = new Map(prev);
        allFoods.forEach((food, idx) => {
          const mealId = food.mealId;
          const mealMap = new Map(newMap.get(mealId) || new Map());
          const entry = mealMap.get(food.foodId);
          if (entry && !entry.locked) {
            const newQuantity = globalResult.optimizedQuantities[idx];
            console.log(`${food.food.name} (${mealId}): ${entry.quantity} -> ${newQuantity}`);
            mealMap.set(food.foodId, { ...entry, quantity: newQuantity });
            newMap.set(mealId, mealMap);
          }
        });
        return newMap;
      });
      
      // Calculate and display final individual meal errors
      console.log('\n=== Final Individual Meal Error Analysis ===');
      let finalTotalError = 0;
      userMealPreferences.forEach(meal => {
        const mealError = calculateMealError(meal);
        console.log(`${meal.name} error: ${mealError.error.toFixed(6)}`);
        finalTotalError += mealError.error;
      });
      console.log(`Final total meal errors: ${finalTotalError.toFixed(6)}`);
      console.log(`Total error improvement: ${(initialTotalError - finalTotalError).toFixed(6)}`);
      
      alert(`Global optimization completed!\nTotal error improvement: ${(initialTotalError - finalTotalError).toFixed(4)}`);
    } catch (error) {
      console.error('Optimization error:', error);
      alert('Failed to optimize quantities. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  }

  const toggleFoodExpansion = (mealId: string, foodId: string) => {
    const key = `${mealId}:${foodId}`
    setExpandedFoods(prev => {
      const newSet = new Set<string>(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.clear()
        newSet.add(key)
      }
      return newSet
    })
  }

  const handleDeleteFood = (mealId: string, foodId: string) => {
    console.log(`Deleting food ${foodId} from meal ${mealId}`);
    console.log('Before deletion - selectedFoods:', Array.from(selectedFoods.entries()));
    
    setSelectedFoods(prev => {
      const newMap = new Map<string, Set<string>>(prev)
      const mealSelectedFoods = newMap.get(mealId) || new Set<string>()
      const newSelectedFoods = new Set<string>(mealSelectedFoods)
      newSelectedFoods.delete(foodId)
      newMap.set(mealId, newSelectedFoods)
      
      console.log('After deletion - new selectedFoods:', Array.from(newMap.entries()));
      return newMap
    })
    
    // Also remove from mealFoodQuantities to keep state consistent
    setMealFoodQuantities(prev => {
      const newMap = new Map(prev)
      const mealMap = new Map(newMap.get(mealId) || new Map())
      mealMap.delete(foodId)
      newMap.set(mealId, mealMap)
      
      console.log('After deletion - new mealFoodQuantities:', Array.from(newMap.entries()));
      return newMap
    })
  }

  const handleOpenSelectionModal = (mealId: string) => {
    setCurrentModalMealId(mealId)
    setShowSelectionModal(true)
  }

  const handleCloseSelectionModal = () => {
    setShowSelectionModal(false)
    setCurrentModalMealId(null)
  }

  const getMealFoodQuantity = (mealId: string, foodId: string) => {
    const value = mealFoodQuantities.get(mealId)?.get(foodId);
    return value || {
      quantity: 1,
      minQuantity: 0,
      maxQuantity: 3,
      selectedUnit: 'g',
      locked: false,
    };
  }

  // Helper function to safely get quantity with null safety
  const getSafeQuantity = (q: any) => {
    if (q && typeof q.quantity === 'number' && !isNaN(q.quantity)) {
      return q.quantity;
    }
    return 1; // Default fallback
  };

  // Helper function to safely get min quantity with null safety
  const getSafeMinQuantity = (q: any) => {
    if (q && typeof q.minQuantity === 'number' && !isNaN(q.minQuantity)) {
      return q.minQuantity;
    }
    return 0; // Default fallback
  };

  // Helper function to safely get max quantity with null safety
  const getSafeMaxQuantity = (q: any) => {
    if (q && typeof q.maxQuantity === 'number' && !isNaN(q.maxQuantity)) {
      return q.maxQuantity;
    }
    return 3; // Default fallback
  };

  // Helper function to calculate error for a meal
  const calculateMealError = (meal: any) => {
    const selectedFoodIds = selectedFoods.get(meal.id) || new Set();
    if (selectedFoodIds.size === 0) {
      return { error: 0, details: 'No foods selected' };
    }

    const userPrefs = preferences || [];
    if (userPrefs.length === 0) {
      return { error: 0, details: 'No preferences set' };
    }

    const macroNames = userPrefs.map(pref => pref.id);
    
    // Get current quantities for this meal
    const mealFoods: any[] = [];
    selectedFoodIds.forEach(foodId => {
      for (const kitchen of kitchens) {
        const food = kitchen.foods.find(f => f.id === foodId);
        if (food) {
          const q = mealFoodQuantities.get(meal.id)?.get(foodId);
          if (q) {
            mealFoods.push({
              foodId: food.id,
              quantity: q.quantity,
              unit: {
                id: q.selectedUnit,
                name: q.selectedUnit,
                food_id: food.id,
                grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
              },
              food: food
            });
          }
          break;
        }
      }
    });

    // Calculate current macros
    const currentMacros: any = {};
    mealFoods.forEach(food => {
      const totalGrams = food.quantity * food.unit.grams;
      Object.entries(food.food.macros || {}).forEach(([macroName, valuePerGram]) => {
        const totalValue = totalGrams * (valuePerGram as number);
        currentMacros[macroName] = (currentMacros[macroName] || 0) + totalValue;
      });
    });

    // Get meal-specific preferences
    const mealSpecificPrefs = getMealSpecificPreferences(meal);
    if (!mealSpecificPrefs) {
      return { error: 0, details: 'No preferences found for meal' };
    }

    // Calculate weighted squared error (matching backend logic exactly)
    let totalError = 0;
    const errorDetails: string[] = [];
    
    mealSpecificPrefs.forEach((pref, index) => {
      const macroName = macroNames[index];
      const currentValue = currentMacros[macroName] || 0;
      
      const minValue = pref.min;
      const maxValue = pref.max;
      
      // Get the daily maximum for this macro to calculate the weight
      const dailyMax = userPrefs[index]?.max || 1; // Use 1 as fallback to avoid division by zero
      const weight = 1 / dailyMax;
      
      // Handle min value constraints (independent of max)
      if (minValue !== null && minValue !== undefined) {
        if (minValue > 0 && currentValue < minValue) {
          // Below positive minimum - use squared error weighted by 1/daily_max
          const squaredError = (minValue - currentValue) * (minValue - currentValue);
          const weightedError = squaredError * weight;
          totalError += weightedError;
          errorDetails.push(`${macroName}: ${currentValue.toFixed(2)} < ${minValue} (squared error: ${squaredError.toFixed(2)}, weighted: ${weightedError.toFixed(4)})`);
        } else if (minValue <= 0 && currentValue > 0) {
          // Negative minimum means we've exceeded the target - penalize any positive consumption
          const exceededAmount = Math.abs(minValue);
          const penalty = currentValue * (1 + exceededAmount / dailyMax);
          const squaredError = penalty * penalty;
          const weightedError = squaredError * weight;
          totalError += weightedError;
          errorDetails.push(`${macroName}: ${currentValue.toFixed(2)} > 0 (exceeded by ${exceededAmount.toFixed(2)}, penalty: ${penalty.toFixed(2)}, weighted: ${weightedError.toFixed(4)})`);
        } else {
          // Within range or no violation for min
          errorDetails.push(`${macroName}: ${currentValue.toFixed(2)} (min OK)`);
        }
      } else {
        // No min constraint
        errorDetails.push(`${macroName}: ${currentValue.toFixed(2)} (no min constraint)`);
      }
      
      // Handle max value constraints (independent of min)
      if (maxValue !== null && maxValue !== undefined) {
        if (maxValue > 0 && currentValue > maxValue) {
          // Above positive maximum - use squared error weighted by 1/daily_max
          const squaredError = (currentValue - maxValue) * (currentValue - maxValue);
          const weightedError = squaredError * weight;
          totalError += weightedError;
          errorDetails.push(`${macroName}: ${currentValue.toFixed(2)} > ${maxValue} (squared error: ${squaredError.toFixed(2)}, weighted: ${weightedError.toFixed(4)})`);
        } else if (maxValue <= 0 && currentValue > 0) {
          // Negative maximum means we've exceeded the target - penalize any positive consumption
          const exceededAmount = Math.abs(maxValue);
          const penalty = currentValue * (1 + exceededAmount / dailyMax);
          const squaredError = penalty * penalty;
          const weightedError = squaredError * weight;
          totalError += weightedError;
          errorDetails.push(`${macroName}: ${currentValue.toFixed(2)} > 0 (exceeded by ${exceededAmount.toFixed(2)}, penalty: ${penalty.toFixed(2)}, weighted: ${weightedError.toFixed(4)})`);
        } else {
          // Within range or no violation for max
          errorDetails.push(`${macroName}: ${currentValue.toFixed(2)} (max OK)`);
        }
      } else {
        // No max constraint
        errorDetails.push(`${macroName}: ${currentValue.toFixed(2)} (no max constraint)`);
      }
    });

    return {
      error: totalError,
      details: errorDetails.join('\n'),
      currentMacros,
      targetPreferences: mealSpecificPrefs
    };
  };

  // Function to check and display meal error
  const checkMealError = (meal: any) => {
    const result = calculateMealError(meal);
    
    console.log(`=== ${meal.name} Error Analysis ===`);
    console.log('Total Error:', result.error.toFixed(6));
    console.log('Current Macros:', result.currentMacros);
    console.log('Target Preferences:', result.targetPreferences);
    console.log('Error Details:');
    console.log(result.details);
    console.log('=====================================');
    
    alert(`${meal.name} Error Analysis:\n\nTotal Error: ${result.error.toFixed(6)}\n\nError Details:\n${result.details}`);
  };

  if (loading || mealsLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mealList} contentContainerStyle={styles.mealListContent}>
        {userMealPreferences.map(meal => {
          const selectedFoodsForMeal = getSelectedFoodsForMeal(meal.id)
          
          return (
            <View key={meal.id} style={styles.mealSection}>
              <Pressable 
                style={styles.mealHeader}
                onPress={() => handleOpenSelectionModal(meal.id)}
              >
                <View style={styles.mealHeaderContent}>
                  <View style={styles.mealHeaderLeft}>
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <Text style={styles.mealStatus}>
                      {selectedFoodsForMeal.size} foods selected
                    </Text>
                  </View>
                  <MaterialIcons 
                    name="chevron-right" 
                    size={24} 
                    color={Colors.gray} 
                  />
                </View>
              </Pressable>
              
              {/* MacrosDisplay for this meal */}
              {selectedFoodsForMeal.size > 0 && (
                <View style={styles.macrosDisplayContainer}>
                  <View style={styles.macroLine} />
                  <MacrosDisplay 
                    radius={20} 
                    indicators={4} 
                    macroPreferences={getMealDisplayPreferences(meal)} 
                    macroValues={mealMacros[meal.id] || {}} 
                  />
                  <View style={styles.macroLine} />
                </View>
              )}
              
              <View style={styles.mealContent}>
                {selectedFoodsForMeal.size === 0 ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>No foods selected</Text>
                    <Pressable 
                      style={styles.addFirstFoodButton}
                      onPress={() => handleOpenSelectionModal(meal.id)}
                    >
                      <Text style={styles.addFirstFoodButtonText}>Add Foods</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.foodList}>
                    {kitchens.flatMap(kitchen => 
                      kitchen.foods.filter(food => selectedFoodsForMeal.has(food.id))
                        .map(food => ({ ...food, kitchenId: kitchen.id }))
                    ).map(food => {
                      const expandedKey = `${meal.id}:${food.id}`
                      const isExpanded = expandedFoods.has(expandedKey)
                      const q = getMealFoodQuantity(meal.id, food.id)
                      const quantityKey = `${meal.id}:${food.id}`
                      
                      const foodCard = (
                        <View style={styles.quantityItem}>
                          <Pressable 
                            style={styles.foodHeader}
                            onPress={() => toggleFoodExpansion(meal.id, food.id)}
                          >
                            <View style={styles.foodHeaderContent}>
                              <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="tail">
                                {food.name.charAt(0).toUpperCase() + food.name.slice(1)}
                              </Text>
                              {!isExpanded && (
                                <Text style={styles.summaryText} numberOfLines={1} ellipsizeMode="tail">
                                  {getSafeQuantity(q).toFixed(1)} {q.selectedUnit}
                                </Text>
                              )}
                              <MaterialIcons 
                                name={isExpanded ? "chevron-up" : "chevron-down"} 
                                size={20} 
                                color={Colors.gray} 
                              />
                            </View>
                          </Pressable>

                          {isExpanded && (
                            <View style={styles.expandedContent}>
                              <View style={styles.quantityUnitRow}>
                                <View style={styles.quantityLockRow}>
                                  <Pressable 
                                    style={styles.lockButton}
                                    onPress={() => handleLockToggle(meal.id, food.id)}
                                  >
                                    <MaterialIcons 
                                      name={q.locked ? "lock" : "lock-open"} 
                                      size={20} 
                                      color={q.locked ? Colors.orange : Colors.gray} 
                                    />
                                  </Pressable>
                                  <TextInput
                                    style={[
                                      styles.quantityTextInput,
                                      q.locked && styles.quantityTextInputLocked
                                    ]}
                                    value={quantityTextInputs.get(quantityKey) ?? getSafeQuantity(q).toFixed(1)}
                                    onChangeText={(text) => handleQuantityTextChange(meal.id, food.id, text)}
                                    keyboardType="numeric"
                                    selectionColor={Colors.blue}
                                    underlineColorAndroid="transparent"
                                    editable={!q.locked}
                                    autoCorrect={false}
                                    spellCheck={false}
                                    onBlur={() => handleQuantityTextBlur(meal.id, food.id)}
                                    onFocus={() => handleQuantityTextFocus(meal.id, food.id)}
                                  />
                                </View>
                                <View style={styles.unitPicker}>
                                  <Picker
                                    selectedValue={q.selectedUnit}
                                    onValueChange={(value: string) => handleUnitChange(meal.id, food.id, value)}
                                    style={styles.picker}
                                    enabled={!q.locked}
                                  >
                                    {food.servingUnits.map(unit => (
                                      <Picker.Item 
                                        key={unit.id} 
                                        label={unit.name} 
                                        value={unit.name} 
                                      />
                                    ))}
                                  </Picker>
                                </View>
                              </View>

                              <View style={styles.sliderContainer}>
                                {focusedContainer === food.id ? (
                                  <View style={styles.rangeInputContainer}>
                                    <TextInput
                                      ref={minInputRef}
                                      style={[
                                        styles.rangeInput,
                                        focusedInput?.foodId === food.id && focusedInput?.type === 'min' && styles.rangeInputFocused,
                                        q.locked && styles.rangeInputLocked,
                                        { outlineWidth: 0 } as any
                                      ]}
                                      value={getSafeMinQuantity(q).toString()}
                                      onChangeText={(text) => handleMinQuantityChange(meal.id, food.id, text)}
                                      keyboardType="numeric"
                                      selectionColor={Colors.blue}
                                      underlineColorAndroid="transparent"
                                      onFocus={() => handleInputFocus(food.id, 'min')}
                                      onBlur={() => handleInputBlur(food.id, 'min')}
                                      autoCorrect={false}
                                      spellCheck={false}
                                      editable={!q.locked}
                                    />
                                    <Text style={styles.rangeSeparator}>to</Text>
                                    <TextInput
                                      ref={maxInputRef}
                                      style={[
                                        styles.rangeInput,
                                        focusedInput?.foodId === food.id && focusedInput?.type === 'max' && styles.rangeInputFocused,
                                        q.locked && styles.rangeInputLocked,
                                        { outlineWidth: 0 } as any
                                      ]}
                                      value={getSafeMaxQuantity(q).toString()}
                                      onChangeText={(text) => handleMaxQuantityChange(meal.id, food.id, text)}
                                      keyboardType="numeric"
                                      selectionColor={Colors.blue}
                                      underlineColorAndroid="transparent"
                                      onFocus={() => handleInputFocus(food.id, 'max')}
                                      onBlur={() => handleInputBlur(food.id, 'max')}
                                      autoCorrect={false}
                                      spellCheck={false}
                                      editable={!q.locked}
                                    />
                                  </View>
                                ) : (
                                  <View style={styles.sliderRow}>
                                    <Pressable 
                                      onPress={() => !q.locked && handleMinClick(food.id)}
                                      style={styles.minMaxLabelContainer}
                                    >
                                      <Text style={q.locked ? styles.minMaxLabelLocked : styles.minMaxLabel}>{getSafeMinQuantity(q).toFixed(1)}</Text>
                                    </Pressable>
                                    <Slider
                                      style={styles.slider}
                                      minimumValue={getSafeMinQuantity(q)}
                                      maximumValue={getSafeMaxQuantity(q)}
                                      value={getSafeQuantity(q)}
                                      onValueChange={(value) => !q.locked && handleQuantityChange(meal.id, food.id, value)}
                                      minimumTrackTintColor={q.locked ? Colors.lightgray : Colors.green}
                                      maximumTrackTintColor={Colors.lightgray}
                                    />
                                    <Pressable 
                                      onPress={() => !q.locked && handleMaxClick(food.id)}
                                      style={styles.minMaxLabelContainer}
                                    >
                                      <Text style={q.locked ? styles.minMaxLabelLocked : styles.minMaxLabel}>{getSafeMaxQuantity(q).toFixed(1)}</Text>
                                    </Pressable>
                                  </View>
                                )}
                              </View>
                            </View>
                          )}
                        </View>
                      );

                      return isExpanded ? (
                        <View key={food.id}>
                          {foodCard}
                        </View>
                      ) : (
                        <Swipeable
                          key={food.id}
                          renderLeftActions={() => (
                            <View style={styles.deleteAction}>
                              <Pressable
                                style={styles.deleteButton}
                                onPress={() => handleDeleteFood(meal.id, food.id)}
                              >
                                <MaterialIcons name="delete" size={24} color={Colors.white} />
                              </Pressable>
                            </View>
                          )}
                        >
                          {foodCard}
                        </Swipeable>
                      );
                    })}
                    
                    {/* Optimize button for this meal - moved below food cards */}
                    <View style={styles.mealOptimizeContainer}>
                      <View style={styles.mealButtonRow}>
                        <Pressable 
                          style={styles.mealOptimizeButton}
                          onPress={() => optimizeSingleMeal(meal)}
                        >
                          <Text style={styles.mealOptimizeButtonText}>Optimize {meal.name}</Text>
                        </Pressable>
                        
                        <Pressable 
                          style={styles.mealCheckErrorButton}
                          onPress={() => checkMealError(meal)}
                        >
                          <Text style={styles.mealCheckErrorButtonText}>Check Error</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )
        })}
      </ScrollView>
      
      {/* Optimize button at the bottom */}
      <View style={styles.optimizeContainer}>
        <View style={styles.buttonRow}>
          <Pressable 
            style={[styles.optimizeButton, isOptimizing && styles.optimizeButtonDisabled]}
            onPress={optimizeQuantities}
            disabled={isOptimizing}
          >
            <Text style={[styles.optimizeButtonText, isOptimizing && styles.optimizeButtonTextDisabled]}>
              {isOptimizing ? 'Optimizing...' : 'Optimize All'}
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={saveMealPlan}
            disabled={isSaving}
          >
            <Text style={[styles.saveButtonText, isSaving && styles.saveButtonTextDisabled]}>
              {isSaving ? 'Saving & Redirecting...' : 'Save & Go Home'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Food Selection Modal */}
      {showSelectionModal && currentModalMealId && (
        <KitchenActivationModal
          isVisible={showSelectionModal}
          onClose={handleCloseSelectionModal}
          kitchen={{
            id: 'all-foods',
            name: `Select Foods for ${userMealPreferences.find(meal => meal.id === currentModalMealId)?.name || 'Meal'}`,
            foods: kitchens[0]?.foods.map(food => ({
              ...food,
              active: getSelectedFoodsForMeal(currentModalMealId).has(food.id),
              quantity: 1,
              minQuantity: 0,
              maxQuantity: 3,
              selectedUnit: food.servingUnits[0]?.name || 'g'
            })) || []
          }}
          onToggleFood={(foodId, currentActive) => {
            // Handle food selection
            const newSelectedFoods = new Set(getSelectedFoodsForMeal(currentModalMealId))
            if (currentActive) {
              newSelectedFoods.delete(foodId)
            } else {
              newSelectedFoods.add(foodId)
            }
            handleSelectedFoodsChange(currentModalMealId, Array.from(newSelectedFoods))
          }}
          onSelectedFoodsChange={(selectedFoodIds) => handleSelectedFoodsChange(currentModalMealId, selectedFoodIds)}
          selectedFoodIds={Array.from(getSelectedFoodsForMeal(currentModalMealId))}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  mealList: {
    flex: 1,
  },
  mealListContent: {
    gap: 16,
    paddingBottom: 20,
  },
  mealSection: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.coolgray,
  },
  mealHeader: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  mealHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealHeaderLeft: {
    flex: 1,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  mealStatus: {
    fontSize: 12,
    color: Colors.gray,
  },
  mealContent: {
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: Colors.white,
    paddingBottom: 16,
  },
  foodList: {
    gap: 8,
  },
  quantityItem: {
    padding: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
    gap: 8,
  },
  foodHeader: {
    width: '100%',
  },
  foodHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.black,
    flex: 1,
    marginRight: 8,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.gray,
    flex: 1,
    textAlign: 'right',
    marginRight: 8,
  },
  expandedContent: {
    padding: 12,
    gap: 8,
  },
  quantityUnitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  quantityText: {
    fontSize: 16,
    color: Colors.black,
  },
  unitPicker: {
    borderWidth: 1,
    borderColor: Colors.coolgray,
    borderRadius: 8,
    width: 100,
  },
  picker: {
    height: 35,
    margin: -8,
  },
  sliderContainer: {
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  minMaxLabelContainer: {
    minWidth: 40,
    alignItems: 'center',
    padding: 4,
  },
  minMaxLabel: {
    fontSize: 14,
    color: Colors.gray,
    minWidth: 40,
    textAlign: 'center',
  },
  rangeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
    alignSelf: 'flex-start',
    borderWidth: 0,
  },
  rangeInput: {
    fontSize: 14,
    color: Colors.black,
    borderBottomWidth: 3,
    borderBottomColor: Colors.black,
    padding: 4,
    width: 60,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  rangeInputFocused: {
    borderBottomColor: Colors.blue,
  },
  rangeSeparator: {
    fontSize: 14,
    color: Colors.gray,
  },
  deleteAction: {
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: Colors.orange,
    borderRadius: 8,
  },
  optimizeContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 16,
    marginBottom: 20,
  },
  optimizeButton: {
    padding: 12,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    alignItems: 'center',
  },
  optimizeButtonDisabled: {
    backgroundColor: Colors.lightgray,
  },
  optimizeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  optimizeButtonTextDisabled: {
    color: Colors.gray,
  },
  macrosDisplayContainer: {
    paddingHorizontal: 4,
    marginHorizontal: 16,
    marginTop: -8,
    marginBottom: 12,
  },
  macroLine: {
    height: 1,
    backgroundColor: Colors.coolgray,
    marginVertical: 8,
  },
  mealOptimizeContainer: {
    padding: 12,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  mealOptimizeButton: {
    padding: 12,
    backgroundColor: Colors.blue,
    borderRadius: 6,
    alignItems: 'center',
  },
  mealOptimizeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  emptyState: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
  },
  addFirstFoodButton: {
    padding: 12,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    alignItems: 'center',
  },
  addFirstFoodButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  quantityLockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  quantityTextInput: {
    fontSize: 14,
    color: Colors.black,
    borderBottomWidth: 3,
    borderBottomColor: Colors.black,
    padding: 4,
    width: 60,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  quantityTextInputLocked: {
    borderBottomColor: Colors.lightgray,
    color: Colors.gray,
  },
  lockButton: {
    padding: 4,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
  },
  sliderThumbLocked: {
    backgroundColor: Colors.lightgray,
  },
  rangeInputLocked: {
    borderBottomColor: Colors.lightgray,
  },
  minMaxLabelLocked: {
    color: Colors.gray,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  saveButton: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.green,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  saveButtonDisabled: {
    backgroundColor: Colors.lightgray,
  },
  saveButtonTextDisabled: {
    color: Colors.gray,
  },
  mealButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  mealCheckErrorButton: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.orange,
    borderRadius: 6,
    alignItems: 'center',
  },
  mealCheckErrorButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
}) 