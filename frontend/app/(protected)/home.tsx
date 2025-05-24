import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native'
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignOutButton } from '@/components/SignOutButton'
import { Meal, FoodServing, ServingUnit as SharedServingUnit } from '@shared/types/foodTypes';
import MealDisplay from '@/components/MealLog/MealDisplay'
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import FoodSearchModal from '@/components/AddFood/FoodSearchModal';
import EditFoodModal from '@/components/EditFood/EditFoodModal';
import 'react-native-get-random-values';
import eventBus from '@/app/storage/eventEmitter';
import { useUser } from '../hooks/useUser';
import { UserMealPreference } from '@shared/types/databaseTypes';
import Colors from '@/styles/colors';

export default function Page() {
  const { 
    meals, 
    addFoodsToMeal, 
    deleteFoodFromMeal,
    updateFoodPortion,
    userMealPreferences,
  } = useUser();

  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const [activeMealPreferenceDetails, setActiveMealPreferenceDetails] = useState<UserMealPreference | null>(null);
  const [editingFood, setEditingFood] = useState<FoodServing | null>(null);

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

  return (
      <View style={styles.parentReference}>
          <FlatList
            style={styles.mealContent}
            data={meals}
            keyExtractor={(item: Meal) => item.id}
            renderItem={({ item }: { item: Meal }) => (
              <MealDisplay 
                meal={item} 
                modalLauncher={() => openFoodSearch(item)}
                onFoodPress={(food) => setEditingFood(food)}
                handleDeleteFood={(serving: FoodServing) => deleteFoodFromMeal(item.id, serving.id)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 40 }}
          />
          <FoodSearchModal 
            activeMeal={activeMeal} 
            activeMealPreference={activeMealPreferenceDetails}
            modalCloser={closeFoodSearch} 
            onClose={closeFoodSearch}
            addFoodsToMeal={addFoodsToMeal}
          />
          {editingFood && (
            <EditFoodModal
              foodServing={editingFood}
              onClose={() => setEditingFood(null)}
              onUpdatePortion={(quantity: number, unit: SharedServingUnit) => {
                if (editingFood) {
                  updateFoodPortion(editingFood.id, quantity, unit);
                }
              }}
            />
          )}
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