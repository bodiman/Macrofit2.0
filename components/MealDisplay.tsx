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
        <>
            <View style={styles.mealHeader}>
                <Text key={meal.id} style={styles.mealTitle}>{meal.name}</Text>
                <Pressable onPress={handleAddFood}>
                    <FontAwesome name="plus-circle" size={24} color={Colors.black} />
                </Pressable>
            </View>
            <View style={styles.mealContainer}>
                {
                meal.foods.map(food=> {
                    return (
                        <TableDisplay name={food.name} macros={food.macros} portion={ food.portion } />
                    )
                })
                }
            </View>
        </>
        
        
    )
}

const styles = StyleSheet.create({
    mealHeader: {
        backgroundColor: Colors.lightgray,
        padding: 10,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mealTitle: {
        fontSize: 20,
        fontWeight: 500,
        color: Colors.black
    },
    mealContainer: {
        backgroundColor: Colors.white
    }
})