import Colors from '@/styles/colors'
import { FoodServing } from '@/tempdata'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useRef } from 'react';
import UnitSpinner from '../Spinner/UnitSpinner';
import { v4 as uuidv4 } from 'uuid';
import { ServingUnit } from '@shared/types/foodTypes';

type Props = {
    food: FoodServing,
    onUpdatePortion: (quantity: number, unit: ServingUnit) => void,
    onRemove: () => void
}

export default function FoodCard({ food, onUpdatePortion, onRemove }: Props) {
    const [unit, setUnit] = useState<ServingUnit>(food.unit);
    const [quantity, setQuantity] = useState(food.quantity);
    const [stringQuantity, setStringQuantity] = useState(food.quantity.toString());

    const handleQuantityChange = (val: string) => {
        setStringQuantity(val);
        try {
            const newQuantity = parseFloat(val);
            const displayQuantity = newQuantity.toString() !== "NaN" ? newQuantity : 0;
            
            setQuantity(displayQuantity);
            if (onUpdatePortion) {
                onUpdatePortion(displayQuantity, unit);
            }
        } catch {
            setQuantity(0);
        }
    };

    const handleUnitChange = (newUnit: ServingUnit) => {
        setUnit(newUnit);
        if (onUpdatePortion) {
            onUpdatePortion(quantity, newUnit);
        }
    };

    return (
        <View style={styles.foodCardContainer}>
            <View style={styles.foodTitleSection} >
                <Pressable onPress={onRemove}>
                    <Ionicons name="close" size={24} color="black" />
                </Pressable>
                <Text style={styles.foodTitle}>
                    {food.food.name}
                </Text>
            </View>
            <View style={styles.foodStatsContainer}>
                <TextInput 
                    style={styles.portionBox}
                    value={stringQuantity}
                    onChangeText={handleQuantityChange}
                    keyboardType="numeric"
                />
                <UnitSpinner 
                    foodItem={food} 
                    unit={unit} 
                    setUnit={handleUnitChange} 
                />
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
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 1
        },
        gap: 10,
        // backgroundColor: "blue",
    },
    foodTitleSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flexShrink: 1,   // Allow the text to shrink when space is tight
        flexGrow: 1,
        width: "100%",
    },
    foodTitle: {
        textTransform: "capitalize",
        fontSize: 18,
        fontWeight: 600,
        color: Colors.black,
        flexGrow: 1
    },
    foodStatsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
        marginLeft: 25,
        // marginRight: 20,
        // width: "100%",
    },
    portionBox: {
        backgroundColor: "white",
        flexGrow: 0,
        width: 50,
        paddingHorizontal: 2,
        // paddingHorizontal: 10,
        height: 30,
        borderRadius: 5,
        marginHorizontal: 10,
        textAlign: "center"
    }
});