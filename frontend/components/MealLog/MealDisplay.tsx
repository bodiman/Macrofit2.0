import { FoodServing, Meal } from '@shared/types/foodTypes'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Colors from '@/styles/colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TableDisplay from './TableDisplay';
import storage from '@/app/storage/storage';
import React, { useEffect } from 'react';
import eventBus from '@/app/storage/eventEmitter';
import PlusIcon from '@/components/Icons/PlusIcon';

type Props = { 
    meal: Meal, 
    modalLauncher: ()=> void,
    onFoodPress: (food: FoodServing) => void,
    handleDeleteFood: (food: FoodServing) => void,
}

export default function MealDisplay({ meal, modalLauncher, onFoodPress, handleDeleteFood }: Props) {
    // const handleDeleteFood = (food: FoodServing) => {
    //     const mealLog = storage.getString('meals')
    //     if (mealLog != null) {
    //         const allMeals = JSON.parse(mealLog) as Meal[];
    //         const selectedMeal = allMeals.find(item => item.id == meal.id)

    //         if (selectedMeal) {
    //             selectedMeal.servings = selectedMeal.servings.filter((item)=> (item.id != food.id));
    //             storage.set('meals', JSON.stringify(allMeals));
    //             eventBus.emit('mealsUpdated')
    //         }
    //     }
    // }

    return (
        <View style={styles.mealContainer}>
            <View style={styles.mealHeader}>
                <Text key={meal.id} style={styles.mealTitle}>{meal.name}</Text>
                <Pressable onPress={modalLauncher}>
                    <PlusIcon backgroundColor={Colors.black} />
                </Pressable>
            </View>
            <View style={styles.foodContainer}>
                {
                meal.servings.map((food, idx)=> {
                    return (
                        <TableDisplay 
                            key={idx} 
                            foodServing={food} 
                            handleDeleteFood={()=>handleDeleteFood(food)}
                            onPress={() => onFoodPress(food)}
                        />
                    )
                })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mealContainer: {
        display: "flex",
        overflow: "hidden",
        borderRadius: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 }, // no z-axis, only x/y
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5, // this is ignored on iOS
    },
    mealHeader: {
        backgroundColor: Colors.coolgray,
        padding: 15,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    mealTitle: {
        fontSize: 22,
        fontWeight: 700,
        color: Colors.black,
    },
    foodContainer: {
        display: "flex",
        flexDirection: "column",
        // backgroundColor: Colors.white,
        backgroundColor: "red"
    }
})