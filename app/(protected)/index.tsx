import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native'
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ this one
import { SignOutButton } from '@/components/SignOutButton'
import { Meal } from '@/tempdata'
import MealDisplay from '@/components/MealLog/MealDisplay'
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import FoodSelector from '@/components/AddFood/FoodSearchModal';
import { storage, meals as defaultMeals } from '../storage/storage';

export default function Page() {
  const [searchMeal, setSearchMeal] = useState<Meal | null>(null);
  const [ meals, setMeals ] = useState(defaultMeals);

  useEffect(() => {
    storage.set('meals', JSON.stringify(defaultMeals));
  }, []);

  const launchModal = (meal: Meal)=> {
    setSearchMeal(meal);
  }

  return (
      <View style={styles.parentReference}>
        <SignedIn>
          <FlatList
            style={styles.mealContent}
            data={meals}
            keyExtractor={(meal: Meal) => meal.id}
            renderItem={({ item }: { item: Meal }) => <MealDisplay meal={ item } modalLauncher={()=>launchModal(item)} />}
            ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
            showsVerticalScrollIndicator={false}
          />
          <FoodSelector activeMeal={searchMeal} onClose={()=>setSearchMeal(null)}></FoodSelector>
        </SignedIn>
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
    paddingVertical: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  }
})