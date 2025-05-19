import { Macros, } from "@/tempdata";
import { FoodServing, Food } from "@shared/types/foodTypes";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Colors from "@/styles/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Svg, Circle, Text as SVGText } from 'react-native-svg';
import React from 'react'

const MyIcon = React.memo(() => (
    <Svg width="24" height="24" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="40" fill={Colors.orange} />
      <SVGText
        x="29"
        y="52"
        fontSize="90"
        fontWeight="bold"
        fill={Colors.white}
        textAnchor="middle"
        alignmentBaseline="middle"
        transform="scale(1.75, 1)"
      >
        -
      </SVGText>
    </Svg>
  ));

const calculateAdjustedCalories = (foodServing: FoodServing): number => {
    const { food, quantity, unit } = foodServing;

    console.log("foodServing", food.macros)
    const baseCalories = food.macros.calories || 0;
    const gramsInPortion = quantity * unit.grams;
    return Math.round(baseCalories * gramsInPortion);
};

type Props = {
    foodServing: FoodServing,
    handleDeleteFood: ()=> void,
    onPress?: () => void
}

export default function TableRow({ foodServing, handleDeleteFood, onPress }: Props) {
    const adjustedCalories = calculateAdjustedCalories(foodServing);

    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.tableName}>
                    { foodServing.food.name } 
                    <View><Text style={styles.portion}>{ foodServing.quantity } { foodServing.unit.name }</Text></View>
                </Text>
                <Text style={styles.tableDatum}>
                    { adjustedCalories }
                </Text>
                <Pressable style={styles.deleteIcon} onPress={handleDeleteFood}>
                    <MyIcon></MyIcon>
                </Pressable>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingHorizontal: 20,
        height: "auto",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        borderTopColor: Colors.darkgray,
        borderTopWidth: 1,
        backgroundColor: Colors.white,
    },
    tableName: {
        flex: 1,
        fontSize: 18,
        display: "flex",
        flexDirection: "column",
        textTransform: "capitalize"
    },
    tableDatum: {
        fontSize: 18,
        paddingHorizontal: 50
    },
    deleteIcon: {

    },
    portion: {
        color: Colors.gray,
        fontSize: 12,
    }
})