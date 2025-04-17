import Colors from '@/styles/colors'
import { FoodPreview } from '@/tempdata'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    food: FoodPreview
}

export default function FoodCard({ food }: Props) {
    return (
        <View style={styles.foodCardContainer}>
            <Ionicons name="close" size={24} color="black" />
            <Text style={styles.foodTitle}>
                {food.name}
            </Text>
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
        gap: 15,
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 1
        }
        // justifyContent: "space-between"
    },
    foodTitle: {
        textTransform: "capitalize",
        fontSize: 18,
        fontWeight: 600,
        color: Colors.black
    }
});