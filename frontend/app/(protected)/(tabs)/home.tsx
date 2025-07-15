import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, ScrollView, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignOutButton } from '@/components/SignOutButton'
import { Meal, FoodServing, ServingUnit as SharedServingUnit } from '@shared/types/foodTypes';
import MealDisplay from '@/components/MealLog/MealDisplay'
import { Platform } from 'react-native';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import FoodSearchModal from '@/components/AddFood/FoodSearchModal';
import EditFoodModal from '@/components/EditFood/EditFoodModal';
import 'react-native-get-random-values';
import eventBus from '@/app/storage/eventEmitter';
import useUser from '@/app/hooks/useUser';
import { useSelectedDate } from './_layout';
import { UserMealPreference } from '@shared/types/databaseTypes';
import Colors from '@/styles/colors';
import CalendarHeader from '@/components/CalendarHeader';
import MacrosDisplay from '@/components/MacroDisplay/MacrosDisplay';
import { calculateAllMacrosOptimized, calculateAdjustedMacrosOptimized } from '@/utils/optimizedMacroCalculation';
import { useGlobalMacrosSync } from '@/hooks/useGlobalMacrosSync';
import { useMealPlans } from '../../../hooks/useMealPlans';
import useShoppingCart from '@/app/hooks/useShoppingCart';

// Operation queue types
interface PendingOperation {
  id: string;
  type: 'delete' | 'add' | 'update';
  promise: Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
  rollback?: () => void; // Function to rollback optimistic updates
  description: string; // Human-readable description for error messages
}

export default function Page() {
  const {
    appUser,
    addFoodsToMeal,
    deleteFoodFromMeal,
    updateFoodPortion,
    userMealPreferences,
    preferences,
    rawPreferences,
    getMeals
  } = useUser();

  const { selectedDate } = useSelectedDate();
  const { syncLoggedMealsMacros, addToLoggedMeals, subtractFromLoggedMeals } = useGlobalMacrosSync();
  const { setShoppingCart } = useShoppingCart();
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const [activeMealPreferenceDetails, setActiveMealPreferenceDetails] = useState<UserMealPreference | null>(null);
  const [editingFood, setEditingFood] = useState<FoodServing | null>(null);
  // Replace mealsData with two separate states
  const [serverMealsData, setServerMealsData] = useState<{
    meals: Meal[];
    mealPlans: any[];
    macros: any;
  }>({ meals: [], mealPlans: [], macros: {} });
  const [optimisticMealsData, setOptimisticMealsData] = useState(serverMealsData);
  const [mealsLoading, setMealsLoading] = useState(false);

  // Add dual-state for global macros
  const [serverGlobalMacros, setServerGlobalMacros] = useState({});
  const [optimisticGlobalMacros, setOptimisticGlobalMacros] = useState(serverGlobalMacros);

  const { mealPlans, updateMealPlansWithLoggedMeals, updateMealPlansAfterLogging } = useMealPlans(optimisticMealsData.mealPlans);

  // Operation queue to prevent race conditions
  const operationQueueRef = useRef<PendingOperation[]>([]);
  const isProcessingQueueRef = useRef(false);
  const originalMealsDataRef = useRef(serverMealsData); // Store original state for rollback

  // Process the operation queue with proper error handling and rollback
  const processOperationQueue = useCallback(async () => {
    if (isProcessingQueueRef.current || operationQueueRef.current.length === 0) {
      return;
    }

    isProcessingQueueRef.current = true;
    let operations: PendingOperation[] = [];

    try {
      // Store current state for potential rollback
      originalMealsDataRef.current = { ...serverMealsData };
      
      // Wait for all pending operations to complete
      operations = [...operationQueueRef.current];
      operationQueueRef.current = [];

      console.log(`Processing ${operations.length} pending operations...`);

      // Wait for all operations to complete
      await Promise.all(operations.map(op => op.promise));

      // Instead of re-fetching meals (which could overwrite optimistic updates),
      // just recalculate macros from the current state to ensure consistency
      if (serverMealsData.meals.length > 0) {
        console.log('All operations complete, recalculating macros from current state...');
        const totalMacros = calculateAllMacrosOptimized(serverMealsData.meals, rawPreferences);
        setServerMealsData(prevData => ({ ...prevData, macros: totalMacros }));
        // Do not set global macros here; only do so in fetch and optimisticUpdate
      } else {
        // Do NOT reset macros to zero if there are no meals
        console.log('No meals in state after operation; skipping macro recalculation.');
      }

      // Resolve all operations
      operations.forEach(op => op.resolve(undefined));
      console.log('✅ All operations completed successfully');
      
    } catch (error) {
      console.error('❌ Error processing operation queue:', error);
      
      // Rollback all optimistic updates
      console.log('🔄 Rolling back optimistic updates...');
      setServerMealsData(originalMealsDataRef.current);
      setServerGlobalMacros(originalMealsDataRef.current.macros); // Rollback server global macros
      syncLoggedMealsMacros(originalMealsDataRef.current.macros);
      
      // Execute rollback functions for each operation
      operations.forEach((op: PendingOperation) => {
        if (op.rollback) {
          try {
            op.rollback();
          } catch (rollbackError) {
            console.error('Rollback failed for operation:', op.description, rollbackError);
          }
        }
      });
      
      // Alert the user about the failure
      const failedOperations = operations.map((op: PendingOperation) => op.description).join(', ');
      alert(`Failed to save changes: ${failedOperations}\n\nYour changes have been reverted. Please try again.`);
      
      // Reject all operations
      operations.forEach((op: PendingOperation) => op.reject(error));
    } finally {
      isProcessingQueueRef.current = false;
    }
  }, [serverMealsData, rawPreferences, syncLoggedMealsMacros]);

  // Add operation to queue with rollback support
  const addToOperationQueue = useCallback((operation: Omit<PendingOperation, 'resolve' | 'reject'>) => {
    return new Promise((resolve, reject) => {
      const queuedOperation: PendingOperation = {
        ...operation,
        resolve,
        reject
      };
      
      operationQueueRef.current.push(queuedOperation);
      
      // Process queue after a short delay to allow batching
      setTimeout(() => {
        processOperationQueue();
      }, 50);
    });
  }, [processOperationQueue]);

  // On fetch, update both states
  useEffect(() => {
    if (appUser && selectedDate) {
      setMealsLoading(true);
      getMeals(appUser.user_id, selectedDate)
        .then((fetched) => {
          const totalMacros = calculateAllMacrosOptimized(fetched.meals, rawPreferences);
          const newData = { meals: fetched.meals, mealPlans: fetched.mealPlans, macros: totalMacros };
          setServerMealsData(newData);
          setOptimisticMealsData(newData);
          setServerGlobalMacros(totalMacros);
          setOptimisticGlobalMacros(totalMacros);
          syncLoggedMealsMacros(totalMacros);
        })
        .catch(error => {
          console.error('Failed to fetch meals:', error);
        })
        .finally(() => setMealsLoading(false));
    } else {
      setServerMealsData({ meals: [], mealPlans: [], macros: {} });
      setOptimisticMealsData({ meals: [], mealPlans: [], macros: {} });
      setServerGlobalMacros({});
      setOptimisticGlobalMacros({});
      syncLoggedMealsMacros({});
      setMealsLoading(false);
    }
  }, [appUser, selectedDate, rawPreferences]);

  // Cleanup effect to process any remaining operations when selectedDate changes
  useEffect(() => {
    return () => {
      // Process any remaining operations when component unmounts or selectedDate changes
      if (operationQueueRef.current.length > 0) {
        console.log('Processing remaining operations on cleanup...');
        processOperationQueue();
      }
    };
  }, [selectedDate, processOperationQueue]);

  // Update meal plans with logged meals data
  useEffect(() => {
    updateMealPlansWithLoggedMeals(optimisticMealsData.meals);
  }, [optimisticMealsData.meals]); // Removed updateMealPlansWithLoggedMeals from dependencies

  // Open the food search modal for a specific meal
  const openFoodSearch = (meal: Meal) => {
    setActiveMeal(meal);
    // Find the corresponding UserMealPreference
    const matchingUmp = userMealPreferences.find(ump => ump.name === meal.name);
    if (matchingUmp) {
      setActiveMealPreferenceDetails(matchingUmp);
    } else {
      console.warn(`No UserMealPreference found for meal name: ${meal.name}`);
      setActiveMealPreferenceDetails(null); // Or handle as an error / default
    }
  }

  // Close the food search modal
  const closeFoodSearch = () => {
      eventBus.emit('foodSearchModalClose');
      setActiveMeal(null);
      setActiveMealPreferenceDetails(null); // Clear preference details on close
  }

  // Handle planned food press - add to shopping cart and open modal
  const handlePlannedFoodPress = (foodServing: FoodServing, meal: Meal) => {
    // Add the planned food to the shopping cart
    const plannedFoodWithQuantity = {
      ...foodServing,
      quantity: Number(foodServing.quantity) || 0
    };
    
    // Use the shopping cart hook to add the food
    setShoppingCart([plannedFoodWithQuantity]);
    
    // Open the modal for the meal
    setActiveMeal(meal);
    // Find the corresponding UserMealPreference
    const matchingUmp = userMealPreferences.find(ump => ump.name === meal.name);
    if (matchingUmp) {
      setActiveMealPreferenceDetails(matchingUmp);
    }
  };

  // Helper function to get planned foods for a meal
  const getPlannedFoodsForMeal = useCallback((mealId: string) => {
    const mealPlan = mealPlans.get(mealId);
    
    if (!mealPlan) {
      return [];
    }
    
    const plannedFoods = mealPlan.servings
      .filter((serving: any) => (serving.remainingQuantity || 0) > 0)
      .map((serving: any) => {
        // Transform macros from database format to frontend format
        const transformedMacros: Record<string, number> = {};
        if (serving.food.macros && Array.isArray(serving.food.macros)) {
          serving.food.macros.forEach((macro: any) => {
            if (macro.metric && macro.metric.id) {
              transformedMacros[macro.metric.id] = macro.value;
            }
          });
        }
        
        return {
          foodServing: {
            id: serving.id,
            food: {
              id: serving.food.id,
              name: serving.food.name,
              brand: serving.food.brand,
              macros: transformedMacros, // Use transformed macros
              servingUnits: [{
                id: serving.unit.id,
                name: serving.unit.name,
                grams: serving.unit.grams,
                food_id: serving.food.id
              }]
            },
            quantity: serving.remainingQuantity,
            unit: {
              id: serving.unit.id,
              name: serving.unit.name,
              grams: serving.unit.grams,
              food_id: serving.food.id
            }
          },
          remainingQuantity: serving.remainingQuantity,
          isBeingReduced: serving.remainingQuantity < serving.originalQuantity
        };
      });
    
    return plannedFoods;
  }, [mealPlans]);

  // Handle food deletion with optimistic update
  // const handleDeleteFood = async (mealId: string, foodServingId: string) => {
  //   // Find the food being deleted to calculate its macros
  //   const meal = serverMealsData.meals.find(m => m.id === mealId);
  //   const foodServing = meal?.servings.find(s => s.id === foodServingId);
    
  //   if (foodServing) {
  //     // Convert preferences to Set for the optimized function
  //     const preferenceSet = new Set(rawPreferences.map(pref => pref.metric_id));
  //     // Calculate the macros being removed
  //     const removedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
  //     // Ultra-fast update - subtract the macros immediately
  //     subtractFromLoggedMeals(removedMacros);
  //   }

  //   // Optimistic update - remove the food from local state immediately
  //   setServerMealsData(prevData => ({
  //     meals: prevData.meals.map(meal => 
  //       meal.id === mealId 
  //         ? { ...meal, servings: meal.servings.filter(serving => serving.id !== foodServingId) }
  //         : meal
  //     ),
  //     macros: prevData.macros // Keep existing macros for now
  //   }));

  //   // Make the API call
  //   await deleteFoodFromMeal(mealId, foodServingId);
    
  //   // Re-fetch meals to ensure consistency and update macros
  //   if (appUser && selectedDate) {
  //     const fetchedMeals = await getMeals(appUser.user_id, selectedDate);
  //     const totalMacros = calculateAllMacrosOptimized(fetchedMeals, rawPreferences);
  //     setServerMealsData({ meals: fetchedMeals, macros: totalMacros });
  //     // Update global macros with the final result
  //     syncLoggedMealsMacros(totalMacros);
  //   }
  // };

  // Optimistic update helpers
  const optimisticUpdate = async (updateFn: (prev: typeof optimisticMealsData) => typeof optimisticMealsData, apiCall: Promise<any>) => {
    // Update UI immediately and recalculate macros from the next state
    setOptimisticMealsData(prev => {
      const next = updateFn(prev);
      const totalMacros = calculateAllMacrosOptimized(next.meals, rawPreferences);
      return { ...next, macros: totalMacros };
    });
    try {
      await apiCall;
      // Optionally, refetch or merge server data here
    } catch (err) {
      // On failure, revert UI
      setOptimisticMealsData(serverMealsData);
      setOptimisticGlobalMacros(serverGlobalMacros);
      syncLoggedMealsMacros(serverGlobalMacros);
      alert('Failed to save changes. Changes reverted.');
    }
  };

  // Side effect: keep global macros in sync with optimisticMealsData.macros
  useEffect(() => {
    setOptimisticGlobalMacros(optimisticMealsData.macros);
    syncLoggedMealsMacros(optimisticMealsData.macros);
  }, [optimisticMealsData.macros]);

  // Example: handleAddFoodsToMeal with optimistic update
  const handleAddFoodsToMeal = async (mealId: string, foodsToAdd: FoodServing[]) => {
    await optimisticUpdate(
      prev => ({
        ...prev,
        meals: prev.meals.map(meal =>
          meal.id === mealId
            ? { ...meal, servings: [...meal.servings, ...foodsToAdd.map(food => ({ ...food, quantity: Number(food.quantity) || 0 }))] }
            : meal
        ),
        // mealPlans and macros will be recalculated below
      }),
      addFoodsToMeal(mealId, foodsToAdd)
    );
  };

  // Handle updating food portion with optimistic update
  const handleUpdateFoodPortion = async (servingId: string, quantity: number, unit: SharedServingUnit) => {
    // Find the food being updated to calculate the macro difference
    const oldServing = optimisticMealsData.meals.flatMap(m => m.servings).find(s => s.id === servingId);
    const newServing = oldServing ? { ...oldServing, quantity, unit } : null;
    
    if (oldServing && newServing) {
      // Convert preferences to Set for the optimized function
      const preferenceSet = new Set(rawPreferences.map(pref => pref.metric_id));
      const oldMacros = calculateAdjustedMacrosOptimized(oldServing, preferenceSet);
      const newMacros = calculateAdjustedMacrosOptimized(newServing, preferenceSet);
      
      // Calculate the difference
      const macroDiff = Object.keys(newMacros).reduce((diff, key) => {
        const change = (newMacros[key] || 0) - (oldMacros[key] || 0);
        if (change !== 0) {
          diff[key] = change;
        }
        return diff;
      }, {} as any);
      
      // Ultra-fast update - apply the difference immediately
      if (Object.keys(macroDiff).length > 0) {
        // Always add the difference - it can be positive or negative
        // The addToLoggedMeals function will handle both cases correctly
        addToLoggedMeals(macroDiff);
      }
    }

    // Optimistic update - update the serving in local state immediately
    setOptimisticMealsData(prev => ({
      meals: prev.meals.map(meal => ({
        ...meal,
        servings: meal.servings.map(serving => 
          serving.id === servingId 
            ? { ...serving, quantity, unit }
            : serving
        )
      })),
      mealPlans: prev.mealPlans,
      macros: prev.macros // Keep existing macros for now
    }));

    // Queue the API operation
    await addToOperationQueue({
      id: `update-${servingId}-${Date.now()}`,
      type: 'update',
      promise: updateFoodPortion(servingId, quantity, unit),
      rollback: () => {
        // If update fails, revert the local state
        setOptimisticMealsData(prev => ({
          meals: prev.meals.map(meal => ({
            ...meal,
            servings: meal.servings.map(serving => 
              serving.id === servingId 
                ? oldServing // Revert to original serving
                : serving
            ).filter((serving): serving is FoodServing => serving !== undefined)
          })),
          mealPlans: prev.mealPlans,
          macros: prev.macros // Keep existing macros for now
        }));
        
        // Revert macro updates
        if (oldServing && newServing) {
          const preferenceSet = new Set(rawPreferences.map(pref => pref.metric_id));
          const oldMacros = calculateAdjustedMacrosOptimized(oldServing, preferenceSet);
          const newMacros = calculateAdjustedMacrosOptimized(newServing, preferenceSet);
          
          // Calculate the difference and revert it
          const macroDiff = Object.keys(newMacros).reduce((diff, key) => {
            const change = (newMacros[key] || 0) - (oldMacros[key] || 0);
            if (change !== 0) {
              diff[key] = -change; // Revert the change
            }
            return diff;
          }, {} as any);
          
          if (Object.keys(macroDiff).length > 0) {
            addToLoggedMeals(macroDiff);
          }
        }
      },
      description: `Update serving ${servingId} to ${quantity} ${unit.name}`
    });
  };

  // Memoized callback functions to prevent unnecessary re-renders
  const memoizedOpenFoodSearch = useCallback((meal: Meal) => {
    setActiveMeal(meal);
    // Find the corresponding UserMealPreference
    const matchingUmp = userMealPreferences.find(ump => ump.name === meal.name);
    if (matchingUmp) {
      setActiveMealPreferenceDetails(matchingUmp);
    } else {
      console.warn(`No UserMealPreference found for meal name: ${meal.name}`);
      setActiveMealPreferenceDetails(null); // Or handle as an error / default
    }
  }, [userMealPreferences]);

  const memoizedOnFoodPress = useCallback((food: FoodServing) => {
    setEditingFood(food);
  }, []);

  const memoizedHandleDeleteFood = useCallback(async (mealId: string, foodServingId: string) => {
    // Find the food being deleted to calculate its macros
    const meal = optimisticMealsData.meals.find(m => m.id === mealId);
    const foodServing = meal?.servings.find(s => s.id === foodServingId);
    
    if (foodServing) {
      // Convert preferences to Set for the optimized function
      const preferenceSet = new Set(rawPreferences.map(pref => pref.metric_id));
      // Calculate the macros being removed
      const removedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
      // Ultra-fast update - subtract the macros immediately
      subtractFromLoggedMeals(removedMacros);
    }

    // Optimistic update - remove the food from local state immediately
    setOptimisticMealsData(prev => ({
      meals: prev.meals.map(meal => 
        meal.id === mealId 
          ? { ...meal, servings: meal.servings.filter(serving => serving.id !== foodServingId) }
          : meal
      ),
      mealPlans: prev.mealPlans,
      macros: prev.macros // Keep existing macros for now
    }));

    // Queue the API operation
    await addToOperationQueue({
      id: `delete-${mealId}-${foodServingId}-${Date.now()}`,
      type: 'delete',
      promise: deleteFoodFromMeal(mealId, foodServingId),
      rollback: () => {
        // If delete fails, revert the local state
        if (foodServing) {
          setOptimisticMealsData(prev => ({
            meals: prev.meals.map(meal => 
              meal.id === mealId 
                ? { ...meal, servings: [...meal.servings, foodServing] } // Revert by adding back
                : meal
            ),
            mealPlans: prev.mealPlans,
            macros: prev.macros // Keep existing macros for now
          }));
          
          // Revert macro updates
          const preferenceSet = new Set(rawPreferences.map(pref => pref.metric_id));
          const removedMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
          addToLoggedMeals(removedMacros);
        }
      },
      description: `Delete food serving ${foodServingId} from meal ${mealId}`
    });
  }, [optimisticMealsData.meals, rawPreferences, subtractFromLoggedMeals, deleteFoodFromMeal, addToOperationQueue]);

  const memoizedHandlePlannedFoodPress = useCallback((foodServing: FoodServing, meal: Meal) => {
    // Add the planned food to the shopping cart
    const plannedFoodWithQuantity = {
      ...foodServing,
      quantity: Number(foodServing.quantity) || 0
    };
    
    // Use the shopping cart hook to add the food
    setShoppingCart([plannedFoodWithQuantity]);
    
    // Open the modal for the meal
    setActiveMeal(meal);
    // Find the corresponding UserMealPreference
    const matchingUmp = userMealPreferences.find(ump => ump.name === meal.name);
    if (matchingUmp) {
      setActiveMealPreferenceDetails(matchingUmp);
    }
  }, [userMealPreferences, setShoppingCart]);

  // Memoized key extractor
  const keyExtractor = useCallback((item: Meal) => item.id, []);

  // Memoized render item function
  const renderMealItem = useCallback(({ item }: { item: Meal }) => (
    <MealDisplay 
      meal={item} 
      modalLauncher={() => memoizedOpenFoodSearch(item)}
      onFoodPress={memoizedOnFoodPress}
      handleDeleteFood={(serving: FoodServing) => memoizedHandleDeleteFood(item.id, serving.id)}
      plannedFoods={getPlannedFoodsForMeal(item.id)}
      onPlannedFoodPress={(foodServing) => memoizedHandlePlannedFoodPress(foodServing, item)}
    />
  ), [memoizedOpenFoodSearch, memoizedOnFoodPress, memoizedHandleDeleteFood, memoizedHandlePlannedFoodPress, getPlannedFoodsForMeal]);

  useEffect(() => {
    // console.log("mealsHome", serverMealsData.meals);
  }, [optimisticMealsData.meals]);

  return (
      <View style={styles.parentReference}>
          {mealsLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={Colors.blue} />
            </View>
          ) : (
            <FlatList
              style={styles.mealContent}
              data={optimisticMealsData.meals}
              keyExtractor={keyExtractor}
              renderItem={renderMealItem}
              ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40, paddingTop: 40 }}
            />
          )}
          <FoodSearchModal 
            activeMeal={activeMeal} 
            activeMealPreference={activeMealPreferenceDetails}
            modalCloser={closeFoodSearch} 
            onClose={closeFoodSearch}
            addFoodsToMeal={handleAddFoodsToMeal}
            dailyMacroPreferences={preferences}
          />
          {editingFood && (
            <EditFoodModal
              foodServing={editingFood}
              onClose={() => setEditingFood(null)}
              onUpdatePortion={(quantity: number, unit: SharedServingUnit) => {
                if (editingFood) {
                  handleUpdateFoodPortion(editingFood.id, quantity, unit);
                }
              }}
            />
          )}
          {/* Debug: Show JSON of meals */}
          {/* <View style={{padding: 10}}>
            <Text style={{fontSize: 10, color: 'gray'}} selectable>
              {JSON.stringify(serverMealsData.meals, null, 2)}
            </Text>
            <Text>{selectedDate.toISOString()}</Text>
          </View> */}
      </View>
  )
}

const styles = StyleSheet.create({
  parentReference: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.white, 
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white, 
  },
  mealContent: {
    flex: 1,
    // backgroundColor: "red",
    paddingHorizontal: 20,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});