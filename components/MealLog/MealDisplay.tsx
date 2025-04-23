import { FoodServing, Meal } from '@/tempdata'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { Svg, Circle, Text as SVGText } from 'react-native-svg';
import Colors from '@/styles/colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TableDisplay from './TableDisplay';
import { storage } from '@/app/storage/storage';
import React, { useEffect } from 'react';
import { eventBus } from '@/app/storage/eventEmitter';

const MyIcon = React.memo(() => (
    <Svg width="24" height="24" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45" fill={Colors.black} />
      <SVGText
        x="50"
        y="53"
        fontSize="90"
        fontWeight="bold"
        fill={Colors.white}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        +
      </SVGText>
    </Svg>
  ));


type Props = { 
    meal: Meal, 
    modalLauncher: ()=> void,
}

export default function MealDisplay({ meal, modalLauncher }: Props) {

    const handleDeleteFood = (food: FoodServing) => {
        const mealLog = storage.getString('meals')
        if (mealLog != null) {
            const allMeals = JSON.parse(mealLog) as Meal[];
            const selectedMeal = allMeals.find(item => item.id == meal.id)

            if (selectedMeal) {
                selectedMeal.foods = selectedMeal.foods.filter((item)=> (item.id != food.id));
                storage.set('meals', JSON.stringify(allMeals));
                eventBus.emit('mealsUpdated')
            }
        }
    }

    return (
        <View style={styles.mealContainer}>
            <View style={styles.mealHeader}>
                <Text key={meal.id} style={styles.mealTitle}>{meal.name}</Text>
                <Pressable onPress={modalLauncher}>
                    <MyIcon />
                </Pressable>
            </View>
            <View style={styles.foodContainer}>
                {
                meal.foods.map((food, idx)=> {
                    return (
                        <TableDisplay key={idx} foodServing={food} handleDeleteFood={()=>handleDeleteFood(food)}/>
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