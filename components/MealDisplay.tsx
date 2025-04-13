import { Meal } from '@/tempdata'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Colors from '@/styles/colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TableDisplay from './TableDisplay';

export default function MealDisplay({ meal }: { meal: Meal }) {
    const handleAddFood = ()=> {
        alert(`Adding food to ${meal.name}`);
    }

    return (
        <View style={styles.mealContainer}>
            <View style={styles.mealHeader}>
                <Text key={meal.id} style={styles.mealTitle}>{meal.name}</Text>
                <Pressable onPress={handleAddFood}>
                    <FontAwesome name="plus-circle" size={24} color={Colors.black} />
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
        elevation: 5, // this is ignored on iOS
    },
    mealHeader: {
        backgroundColor: Colors.lightgray,
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