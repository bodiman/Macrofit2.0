import Colors from "@/styles/colors";
import { View, Text, TextInput, StyleSheet, Button, Pressable, TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { foodDataBase, Food, FoodServing, createInstance, myMacroPreferences, Portion } from "@/tempdata";
import { FlatList } from "react-native-gesture-handler";
import FoodCard from "./FoodCard";
import { useEffect, useState, } from "react";
import storage from "@/app/storage/storage";
import MacrosDisplay from "../MacroDisplay/MacrosDisplay";
import ResultContent from "./ResultContent";
import React from "react";
import { useMacros } from "@/app/hooks/useMacros";

type Props = {
    shoppingCart: FoodServing[],
    setShoppingCart: (cart: FoodServing[]) => void
}

export default function AddFood({ shoppingCart, setShoppingCart }: Props) {
    const foodDB: Food[] = Object.values(foodDataBase);
    const [displayResults, setDisplayResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const totalMacros = useMacros(shoppingCart);

    useEffect(()=> {
        const cachedShoppingCart = storage.getString('shoppingCart');
        if (cachedShoppingCart) {
            setShoppingCart(JSON.parse(cachedShoppingCart));
        }
    }, []);

    useEffect(() => {
        storage.set('shoppingCart', JSON.stringify(shoppingCart));
    }, [shoppingCart]);

    const handleAddToCart = (foodServing: FoodServing) => {
        setShoppingCart([...shoppingCart, foodServing]);
    };

    const handleRemoveFromCart = (foodId: string) => {
        const updatedCart = shoppingCart.filter(item => item.id !== foodId);
        setShoppingCart(updatedCart);
    };

    const handleUpdatePortion = (foodId: string, newPortion: Portion) => {
        const updatedCart = shoppingCart.map(item => {
            if (item.id === foodId) {
                return {
                    ...item,
                    portion: newPortion
                };
            }
            return item;
        });
        setShoppingCart(updatedCart);
    };

    return (
        <>
            <View style={styles.searchContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.searchBarContainer}>
                        <TextInput 
                            style={styles.searchBar} 
                            placeholder={"Search Foods to Add"} 
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onFocus={() => setDisplayResults(true)}
                        />
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" style={styles.iconContainer} />
                        </View>
                    </View>
                    

                    <Pressable style={{ zIndex: -5, display: displayResults? "flex": "none" }} onPress={()=>setDisplayResults(false)}>
                        <View style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%"}} />
                    </Pressable>
                    <View style={{position: "absolute", top: "100%", width: "100%"}}>
                        <ResultContent 
                            visible={displayResults} 
                            closeModal={()=>setDisplayResults(false)} 
                            searchQuery={searchQuery}
                            onAddToCart={handleAddToCart}
                        />
                    </View>
                </View>   
            </View>

            <View style={styles.shoppingCart}>
                <View style={styles.macroContainer}>
                    <MacrosDisplay 
                        macroPreferences={myMacroPreferences} 
                        macroValues={totalMacros}
                        indicators={4} 
                        radius={30} 
                    />
                </View>
                <FlatList 
                    data={shoppingCart}
                    keyExtractor={(item) => (item.id)}
                    renderItem={ ({ item }) =>{ 
                        return (
                            <FoodCard 
                                food={item}
                                onUpdatePortion={(portion) => handleUpdatePortion(item.id, portion)}
                                onRemove={() => handleRemoveFromCart(item.id)}
                            />
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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: Colors.lightgray,
    },
    searchContainer: {
        // paddingVertical: 20,
        alignContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        width: "80%",
    },
    searchText: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 5,
        // marginLeft: "20%"
    },
    headerContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        // gap: 10,
        marginHorizontal: "auto",
        alignItems: "center",
        zIndex: 5
        // borderRadius: 5,
        // marginTop: 20,
    },
    searchBar: {
        backgroundColor: Colors.white,
        // borderTopLeftRadius: 5,
        // borderBottomLeftRadius: 5,
        flexGrow: 1,
        padding: 10,
        borderColor: Colors.black,
        borderRightWidth: 1,
        // borderTopWidth: 0,
        // borderBottomWidth: 0,
        // marginHorizontal: "auto",
    },
    shoppingCart: {
        display: "flex",
        width: "80%",
        backgroundColor: Colors.white,
        marginHorizontal: "auto",
        marginTop: 20,
        bottom: 0,
        flexGrow: 1,
        borderRadius: 20,
        shadowColor: Colors.black,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 2,
            height: 2
        },
        overflow: "hidden",
        zIndex: -5
    },
    macroContainer: {
        // paddingTop: 20,
        // paddingHorizontal: 10,
        padding: 5,
        paddingHorizontal: 20,
        width: "100%",
        margin: "auto",
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        shadowColor: Colors.black,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 1
        }
    },
    searchBarContainer: {
        borderTopColor: Colors.black,
        borderWidth: 1,
        borderRadius: 5,
        overflow: "hidden",
        display: "flex",
        // flexDirection: "column",
        flexDirection: "row",
        flexGrow: 1,
    },
});