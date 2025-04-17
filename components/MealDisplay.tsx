import { Meal } from '@/tempdata'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { Svg, Circle, Text as SVGText } from 'react-native-svg';
import Colors from '@/styles/colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TableDisplay from './TableDisplay';
import React, { useEffect } from 'react';

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


export default function MealDisplay({ meal, modalLauncher }: { meal: Meal, modalLauncher: ()=> void }) {

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
                        <TableDisplay key={idx} name={food.name} macros={food.macros} portion={ food.portion } />
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