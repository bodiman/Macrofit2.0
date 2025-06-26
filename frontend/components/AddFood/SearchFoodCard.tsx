import Colors from '@/styles/colors'
import { Food, ServingUnit } from '@shared/types/foodTypes'
import { servingUnits } from '@/tempdata'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import UnitSpinner from '../Spinner/UnitSpinner';
import useUser from '@/app/hooks/useUser';
import { MacroPreference } from '@shared/types/macroTypes';

type Props = {
    food: Food,
    preferences: MacroPreference[],
    onAdd: (food: Food, quantity: number, unit: ServingUnit) => void
}

export default function SearchFoodCard({ food, preferences, onAdd }: Props) {

    // console.log("food", food)
    const [unit, setUnit] = useState<ServingUnit | undefined>(() => {
        if (food.servingUnits && food.servingUnits.length > 0 && food.servingUnits[0].grams !== undefined) {
            return food.servingUnits[0];
        }
        console.warn(`Food item "${food.name}" (id: ${food.id}) has no valid serving units or the first unit is missing 'grams'. Defaulting to undefined.`);
        return undefined;
    });

    const handleAdd = () => {
        if (unit) { // Only call onAdd if a valid unit is set
            onAdd(food, 1, unit); // Default quantity to 1 instead of 0
        } else {
            console.error(`Cannot add food "${food.name}" to cart: no valid serving unit selected or available.`);
            // Optionally, show a user-facing error here
        }
    };

    return (
        <TouchableOpacity 
            style={styles.foodCardContainer}
            onPress={handleAdd}
        >
            <View style={styles.foodTitleSection}>
                <Text style={styles.foodTitle}>
                    {food.name}
                </Text>
            </View>
            <View style={styles.brandContainer}>
                <Text style={styles.foodBrand}>
                    {food.brand.replace("-", " ")}
                </Text>
            </View>
            <View style={styles.macrosContainer}>
                {
                    preferences.map((preference) => {
                        return (
                            <Text style={styles.macroText} key={preference.id}>
                                {preference.name}: {(food.macros[preference.id] || 0).toFixed(2)}
                            </Text>
                        )
                    })
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    foodCardContainer: {
        backgroundColor: Colors.coolgray,
        borderRadius: 10,
        padding: 15,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 1
        },
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
        fontWeight: "600",
        color: Colors.black,
    },
    brandContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: -12,
    },
    foodBrand: {
        fontSize: 14,
        color: Colors.gray,
        textTransform: "capitalize",
    },
    macrosContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    macroText: {
        fontSize: 14,
        color: Colors.gray,
    },
}); 