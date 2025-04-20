import Colors from '@/styles/colors'
import { FoodServing, Unit } from '@/tempdata'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useRef } from 'react';
import UnitSpinner from '../Spinner/UnitSpinner';

type Props = {
    food: FoodServing
}

export default function FoodCard({ food }: Props) {
    const [unit, setUnit] = useState<Unit>(food.servingUnits[0]);
    const [quantity, setQuantity] = useState(0);
    const [stringQuantity, setStringQuantity] = useState('0');

    return (
        <View style={styles.foodCardContainer}>
            <View style={styles.foodTitleSection} >
                <Ionicons name="close" size={24} color="black" />
                <Text style={styles.foodTitle}>
                    {food.food.name}
                </Text>
            </View>
            <View style={styles.foodStatsContainer}>
                <TextInput 
                    style={styles.portionBox}
                    value={stringQuantity}
                    onChangeText={(val)=> {
                        setStringQuantity(val)
                        try {
                            setQuantity(parseFloat(stringQuantity))
                        } catch {
                            
                        }
                    }}
                ></TextInput>
                <UnitSpinner foodItem={food} unit={unit} setUnit={setUnit} ></UnitSpinner>
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