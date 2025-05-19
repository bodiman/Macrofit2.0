import Colors from '@/styles/colors'
import { Food, ServingUnit } from '@shared/types/foodTypes'
import { servingUnits } from '@/tempdata'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import UnitSpinner from '../Spinner/UnitSpinner';
import useUser from '@/app/hooks/useUser';

type Props = {
    food: Food,
    onAdd: (food: Food, quantity: number, unit: ServingUnit) => void
}

export default function SearchFoodCard({ food, onAdd }: Props) {
    const [unit, setUnit] = useState<ServingUnit>(food.servingUnits[0]);
    const { preferences } = useUser();

    const handleAdd = () => {
        onAdd(food, 0, unit);
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