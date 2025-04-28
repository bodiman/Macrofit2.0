import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native'
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignOutButton } from '@/components/SignOutButton'
import { Meal } from '@/tempdata'
import MealDisplay from '@/components/MealLog/MealDisplay'
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import FoodSearchModal from '@/components/AddFood/FoodSearchModal';
import { useMeals } from '../hooks/useMeals';

export default function Page() {
  const { 
    meals, 
    activeMeal, 
    updateMeal, 
    openFoodSearch, 
    closeFoodSearch 
  } = useMeals();

  return (
      <View style={styles.parentReference}>
        <SignedIn>
          <FlatList
            style={styles.mealContent}
            data={meals}
            keyExtractor={(meal: Meal) => meal.id}
            renderItem={({ item }: { item: Meal }) => (
              <MealDisplay 
                meal={item} 
                modalLauncher={() => openFoodSearch(item)} 
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
            showsVerticalScrollIndicator={false}
          />
          <FoodSearchModal 
            activeMeal={activeMeal} 
            modalCloser={closeFoodSearch} 
            onClose={closeFoodSearch}
            onUpdateMeal={updateMeal}
          />
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