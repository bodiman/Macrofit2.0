import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, ScrollView, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignOutButton } from '@/components/SignOutButton'
import { Meal, FoodServing, ServingUnit as SharedServingUnit } from '@shared/types/foodTypes';
import MealDisplay from '@/components/MealLog/MealDisplay'
import { Platform } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
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
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const [activeMealPreferenceDetails, setActiveMealPreferenceDetails] = useState<UserMealPreference | null>(null);
  const [editingFood, setEditingFood] = useState<FoodServing | null>(null);
  const [mealsData, setMealsData] = useState<{
    meals: Meal[];
    macros: any;
  }>({ meals: [], macros: {} });
  const [mealsLoading, setMealsLoading] = useState(false);

  // Fetch meals when selectedDate or appUser changes
  useEffect(() => {
    if (appUser && selectedDate) {
      setMealsLoading(true);
      getMeals(appUser.user_id, selectedDate)
        .then((fetchedMeals) => {
          // Use optimized batch calculation
          const totalMacros = calculateAllMacrosOptimized(fetchedMeals, rawPreferences);
          // Update both meals and macros in single state change
          setMealsData({ meals: fetchedMeals, macros: totalMacros });
          // Immediately sync with global macros display
          syncLoggedMealsMacros(totalMacros);
        })
        .finally(() => setMealsLoading(false));
    } else {
      setMealsData({ meals: [], macros: {} });
      syncLoggedMealsMacros({});
      setMealsLoading(false);
    }
  }, [appUser, selectedDate, rawPreferences, syncLoggedMealsMacros]);

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

  // Handle food deletion with optimistic update
  const handleDeleteFood = async (mealId: string, foodServingId: string) => {
    // Find the food being deleted to calculate its macros
    const meal = mealsData.meals.find(m => m.id === mealId);
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
    setMealsData(prevData => ({
      meals: prevData.meals.map(meal => 
        meal.id === mealId 
          ? { ...meal, servings: meal.servings.filter(serving => serving.id !== foodServingId) }
          : meal
      ),
      macros: prevData.macros // Keep existing macros for now
    }));

    // Make the API call
    await deleteFoodFromMeal(mealId, foodServingId);
    
    // Re-fetch meals to ensure consistency and update macros
    if (appUser && selectedDate) {
      const fetchedMeals = await getMeals(appUser.user_id, selectedDate);
      const totalMacros = calculateAllMacrosOptimized(fetchedMeals, rawPreferences);
      setMealsData({ meals: fetchedMeals, macros: totalMacros });
      // Update global macros with the final result
      syncLoggedMealsMacros(totalMacros);
    }
  };

  // Handle adding foods with optimistic update
  const handleAddFoodsToMeal = async (mealId: string, foodsToAdd: FoodServing[]) => {
    // Convert preferences to Set for the optimized function
    const preferenceSet = new Set(rawPreferences.map(pref => pref.metric_id));
    // Calculate the macros being added
    const addedMacros = foodsToAdd.reduce((total, foodServing) => {
      const foodMacros = calculateAdjustedMacrosOptimized(foodServing, preferenceSet);
      Object.entries(foodMacros).forEach(([key, value]) => {
        if (value) {
          total[key] = (total[key] || 0) + value;
        }
      });
      return total;
    }, {} as any);
    
    // Ultra-fast update - add the macros immediately
    addToLoggedMeals(addedMacros);

    // Optimistic update - add foods to local state immediately
    setMealsData(prevData => ({
      meals: prevData.meals.map(meal => 
        meal.id === mealId 
          ? { ...meal, servings: [...meal.servings, ...foodsToAdd] }
          : meal
      ),
      macros: prevData.macros // Keep existing macros for now
    }));

    // Make the API call
    await addFoodsToMeal(mealId, foodsToAdd);
    
    // Re-fetch meals to ensure consistency and update macros
    if (appUser && selectedDate) {
      const fetchedMeals = await getMeals(appUser.user_id, selectedDate);
      const totalMacros = calculateAllMacrosOptimized(fetchedMeals, rawPreferences);
      setMealsData({ meals: fetchedMeals, macros: totalMacros });
      // Update global macros with the final result
      syncLoggedMealsMacros(totalMacros);
    }
  };

  // Handle updating food portion with optimistic update
  const handleUpdateFoodPortion = async (servingId: string, quantity: number, unit: SharedServingUnit) => {
    // Find the food being updated to calculate the macro difference
    const oldServing = mealsData.meals.flatMap(m => m.servings).find(s => s.id === servingId);
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
    setMealsData(prevData => ({
      meals: prevData.meals.map(meal => ({
        ...meal,
        servings: meal.servings.map(serving => 
          serving.id === servingId 
            ? { ...serving, quantity, unit }
            : serving
        )
      })),
      macros: prevData.macros // Keep existing macros for now
    }));

    // Make the API call
    await updateFoodPortion(servingId, quantity, unit);
    
    // Re-fetch meals to ensure consistency and update macros
    if (appUser && selectedDate) {
      const fetchedMeals = await getMeals(appUser.user_id, selectedDate);
      const totalMacros = calculateAllMacrosOptimized(fetchedMeals, rawPreferences);
      setMealsData({ meals: fetchedMeals, macros: totalMacros });
      // Update global macros with the final result
      syncLoggedMealsMacros(totalMacros);
    }
  };

  useEffect(() => {
    console.log("mealsHome", mealsData.meals);
  }, [mealsData.meals]);

  return (
      <View style={styles.parentReference}>
          {mealsLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={Colors.blue} />
            </View>
          ) : (
            <FlatList
              style={styles.mealContent}
              data={mealsData.meals}
              keyExtractor={(item: Meal) => item.id}
              renderItem={({ item }: { item: Meal }) => (
                <MealDisplay 
                  meal={item} 
                  modalLauncher={() => openFoodSearch(item)}
                  onFoodPress={(food) => setEditingFood(food)}
                  handleDeleteFood={(serving: FoodServing) => handleDeleteFood(item.id, serving.id)}
                />
              )}
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
              {JSON.stringify(mealsData.meals, null, 2)}
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