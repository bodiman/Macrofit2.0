import Colors from '@/styles/colors'
import { FoodPreview } from '@/tempdata'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import UnitSpinner from './UnitSpinner';

type Props = {
    food: FoodPreview
}

export default function FoodCard({ food }: Props) {
    return (
        <View style={styles.foodCardContainer}>
            <View style={styles.foodTitleSection}>
                <Ionicons name="close" size={24} color="black" />
                <Text style={styles.foodTitle}>
                    {food.name}
                </Text>
            </View>
            <View style={styles.foodStatsContainer}>
                <TextInput style={styles.portionBox}></TextInput>
                <UnitSpinner></UnitSpinner>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    foodCardContainer: {
        backgroundColor: Colors.coolgray,
        borderRadius: 10,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 1
        },
        // backgroundColor: "blue",
    },
    foodTitleSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    foodTitle: {
        textTransform: "capitalize",
        fontSize: 18,
        fontWeight: 600,
        color: Colors.black
    },
    foodStatsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // paddingHorizontal: 20,
        // backgroundColor: "red",
    },
    portionBox: {
        backgroundColor: "white",
        flexGrow: 0,
        width: 40,
        height: 30,
        borderRadius: 5,
        marginHorizontal: 10,
        textAlign: "center"
    }
});