import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native'
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignOutButton } from '@/components/SignOutButton'
import { Meal } from '@/tempdata'
import { FoodServing } from '@shared/types/foodTypes';
import MealDisplay from '@/components/MealLog/MealDisplay'
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import FoodSearchModal from '@/components/AddFood/FoodSearchModal';
import EditFoodModal from '@/components/EditFood/EditFoodModal';
import 'react-native-get-random-values';
import eventBus from '@/app/storage/eventEmitter';
import { useUser } from '../hooks/useUser';
import { ServingUnit } from '@shared/types/foodTypes';

export default function Page() {
  const { 
    meals, 
    addFoodsToMeal, 
    updateFoodPortion
  } = useUser();

  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const [editingFood, setEditingFood] = useState<FoodServing | null>(null);
    // Open the food search modal for a specific meal
  const openFoodSearch = (meal: Meal) => {
    setActiveMeal(meal);
  }

  // Close the food search modal
  const closeFoodSearch = () => {
      // Close the modal
      eventBus.emit('foodSearchModalClose');
      setActiveMeal(null);
  }

  return (
      <View style={styles.parentReference}>
          <FlatList
            style={styles.mealContent}
            data={meals}
            keyExtractor={(meal: Meal) => meal.id}
            renderItem={({ item }: { item: Meal }) => (
              <MealDisplay 
                meal={item} 
                modalLauncher={() => openFoodSearch(item)}
                onFoodPress={(food) => setEditingFood(food)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 40 }}
          />
          <FoodSearchModal 
            activeMeal={activeMeal} 
            modalCloser={closeFoodSearch} 
            onClose={closeFoodSearch}
            addFoodsToMeal={addFoodsToMeal}
          />
          {editingFood && (
            <EditFoodModal
              foodServing={editingFood}
              onClose={() => setEditingFood(null)}
              onUpdatePortion={(quantity: number, unit: ServingUnit) => {
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
    display: "flex",
    height: "100%"
  },
  macroContainer: {

  },
  mealContent: {
    // paddingVertical: 200,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  }
})