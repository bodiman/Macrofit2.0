import Colors from "@/styles/colors";
import { View, Text, TextInput, StyleSheet, Button, Pressable, TouchableOpacity, ScrollView, Platform } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Food, FoodServing, myMacroPreferences, Portion } from "@/tempdata";
import { FlatList } from "react-native";
import FoodCard from "./FoodCard";
import { useEffect, useState, useRef } from "react";
import storage from "@/app/storage/storage";
import MacrosDisplay from "../MacroDisplay/MacrosDisplay";
import ResultContent from "./ResultContent";
import React from "react";
import useMacros from "@/app/hooks/useMacros";
import { eventBus } from "@/app/storage/eventEmitter";

type Props = {
    shoppingCart: FoodServing[],
    setShoppingCart: (cart: FoodServing[]) => void
}

export default function AddFood({ shoppingCart, setShoppingCart }: Props) {
    const [displayResults, setDisplayResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const totalMacros = useMacros(shoppingCart);
    const searchBarRef = useRef<TextInput>(null);

    useEffect(()=> {
        const cachedShoppingCart = storage.getString('shoppingCart');
        if (cachedShoppingCart) {
            setShoppingCart(JSON.parse(cachedShoppingCart));
        }
    }, []);

    useEffect(() => {
        storage.set('shoppingCart', JSON.stringify(shoppingCart));
        eventBus.emit('shoppingCartUpdated');
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

    const handleCloseResults = () => {
        setDisplayResults(false);
        searchBarRef.current?.blur();
    };

    return (
        <View style={styles.container}>
            <View style={styles.macroContainer}>
                <MacrosDisplay 
                    macroPreferences={myMacroPreferences} 
                    macroValues={totalMacros}
                    indicators={4} 
                    radius={30} 
                />
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.searchBarContainer}>
                        <TextInput 
                            ref={searchBarRef}
                            style={styles.searchBar} 
                            placeholder={"Search Foods to Add"} 
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onFocus={() => setDisplayResults(true)}
                        />
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
                        </View>
                    </View>
                </View>   
            </View>

            {displayResults && (
                <View style={[styles.resultsContainer]}>
                    <ResultContent 
                        visible={displayResults} 
                        closeModal={()=>handleCloseResults()} 
                        searchQuery={searchQuery}
                        onAddToCart={handleAddToCart}
                    />
                </View>
            )}

            <View style={styles.shoppingCart}>
                <FlatList 
                    data={shoppingCart}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <FoodCard 
                            food={item}
                            onUpdatePortion={(portion) => handleUpdatePortion(item.id, portion)}
                            onRemove={() => handleRemoveFromCart(item.id)}
                        />
                    )}
                    style={styles.cartList}
                    contentContainerStyle={styles.cartContent}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    macroContainer: {
        padding: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        zIndex: 1000,
    },
    iconContainer: {
        padding: 10,
        backgroundColor: Colors.lightgray,
    },
    searchContainer: {
        padding: 10,
        width: "100%",
    },
    searchText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    headerContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    searchBar: {
        flex: 1,
        padding: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    resultsContainer: {
        position: 'absolute',
        top: 140,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    shoppingCart: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.white,
    },
    cartList: {
        flex: 1,
    },
    cartContent: {
        padding: 10,
        gap: 10,
    },
});