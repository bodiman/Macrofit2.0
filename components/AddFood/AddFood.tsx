import Colors from "@/styles/colors";
import { View, Text, TextInput, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { foodDataBase, Food } from "@/tempdata";
import { FlatList } from "react-native-gesture-handler";
import FoodCard from "./FoodCard";

export default function AddFood() {
    const displayData: Food[] = Object.values(foodDataBase);

    return (
        <>
            <View style={styles.searchContainer}>
                {/* <Text style={styles.searchText}>Search</Text> */}
                <View style={styles.searchBarContainer}>
                    <TextInput style={styles.searchBar} />
                    <View style={styles.iconContainer}>
                        <Ionicons name="filter-sharp" size={24} color="black"  /> 
                        <MaterialCommunityIcons name="barcode-scan" size={24} color="black" style={styles.iconContainer} />
                    </View>
                </View>   
            </View>

            <View style={styles.shoppingCart}>
                <FlatList 
                    data={displayData}
                    renderItem={ ({item}) =>{ 
                        return (
                            <FoodCard food={item}></FoodCard>
                        )}
                    }
                    contentContainerStyle={{
                        gap: 10,
                        padding: 20
                    }}
                />
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        // backgroundColor: Colors.coolgray
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingRight: 5,
    },
    searchContainer: {
        paddingVertical: 20,
        alignContent: "center"
    },
    searchText: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 5,
        // marginLeft: "20%"
    },
    searchBarContainer: {
        display: "flex",
        width: "80%",
        flexDirection: "row",
        gap: 10,
        marginHorizontal: "auto",
        backgroundColor: Colors.lightgray,
        borderRadius: 5,
    },
    searchBar: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        flexGrow: 1,
        padding: 5,
        borderColor: Colors.black,
        borderWidth: 1,
        marginHorizontal: "auto"
    },
    shoppingCart: {
        display: "flex",
        width: "80%",
        backgroundColor: Colors.white,
        marginHorizontal: "auto",
        bottom: 0,
        flexGrow: 1,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});