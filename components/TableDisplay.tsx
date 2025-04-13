import { Food, Macros, Portion } from "@/tempdata";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Colors from "@/styles/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TableRow({ name, portion, macros }: { name: string, portion: Portion, macros: Macros}) {
    const handleDeleteFood = ()=> {
        alert("Shut the fuck up")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tableName}>
                { name } 
                <View><Text style={styles.portion}>{ portion.quantity } { portion.unit.name }</Text></View>
            </Text>
            <Text style={styles.tableDatum}>
                { macros.calories }
            </Text>
            <Pressable style={styles.deleteIcon} onPress={handleDeleteFood}>
                <FontAwesome name="minus-circle" size={24} color={Colors.orange} />
            </Pressable>
        </View>
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
        borderBottomColor: Colors.darkgray,
        borderBottomWidth: 1
    },
    tableName: {
        flex: 1,
        fontSize: 18,
        display: "flex",
        flexDirection: "column"
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