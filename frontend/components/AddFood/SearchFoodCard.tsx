import Colors from '@/styles/colors'
import { Food, Unit, Portion, servingUnits } from '@/tempdata'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import UnitSpinner from '../Spinner/UnitSpinner';

type Props = {
    food: Food,
    onAdd: (food: Food, portion: Portion) => void
}

export default function SearchFoodCard({ food, onAdd }: Props) {
    const [unit, setUnit] = useState<Unit>(servingUnits[0]);
    const [quantity, setQuantity] = useState(0);
    const [stringQuantity, setStringQuantity] = useState('0');

    const handleAdd = () => {
        const portion: Portion = {
            unit,
            quantity: parseFloat(stringQuantity) || 0
        };
        onAdd(food, portion);
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
                <Text>
                    {JSON.stringify(food.macros)}
                </Text>
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