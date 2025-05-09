import { View, Text, ScrollView, StyleSheet, Animated, FlatList, Pressable, ActivityIndicator } from "react-native"
import { useEffect, useRef, useState } from "react"
import Colors from "@/styles/colors"
import { searchAllFoods } from "@/api/foodSearch/route"
import { Food, FoodServing, Portion } from "@shared/types/foodTypes"
import SearchFoodCard from "./SearchFoodCard"
import storage from "@/app/storage/storage"
import { v4 as uuidv4 } from 'uuid';
import { servingUnits } from "@/tempdata"
import { useMenu } from "@/app/hooks/useMenu"
import MenuSpinner from "../Spinner/MenuSpinner"

type Props = {
    visible: boolean,
    closeModal: ()=> void,
    searchQuery: string,
    onAddToCart: (food: FoodServing) => void
}

export default function ResultContent({ visible, searchQuery, onAddToCart, closeModal }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedMenuId, setSelectedMenuId] = useState<string>('all');
    const [searchResults, setSearchResults] = useState<Food[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { menus, loading: menusLoading, searchMenuFoods, error } = useMenu();

    useEffect(() => {
        fadeAnim.setValue(0);

        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [fadeAnim, visible]);

    useEffect(() => {
        const fetchFoods = async () => {
            if (selectedMenuId === 'all' && searchQuery) {
                setIsLoading(true);
                try {
                    const results = await searchAllFoods(searchQuery);
                    setSearchResults(results);
                } catch (error) {
                    console.error('Error searching foods:', error);
                    setSearchResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else if (selectedMenuId) {
                setIsLoading(true);
                try {
                    const results = await searchMenuFoods(selectedMenuId, searchQuery);
                    setSearchResults(results);
                } catch (error) {
                    console.error('Error searching foods:', error);
                    setSearchResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSearchResults([]);
            }
        };

        fetchFoods();
    }, [searchQuery, selectedMenuId]);

    const handleAddFood = (food: Food, portion: Portion) => {
        const foodServing: FoodServing = {
            id: uuidv4(),
            food: food,
            portion: portion,
            servingUnits: servingUnits
        };
        onAddToCart(foodServing);
        closeModal();
    };

    return (
        <Animated.View style={[styles.resultContent, {display: visible ? "flex": "none", opacity: fadeAnim}]}>
            <Text style={styles.resultsDescription}>
                {searchQuery ? `Showing Results for "${searchQuery}"` : "Search for foods to add"}
            </Text>
            
            <View style={styles.menuPickerContainer}>
                <MenuSpinner
                    menus={menus}
                    selectedMenuId={selectedMenuId}
                    onSelect={setSelectedMenuId}
                    loading={menusLoading}
                />
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.calgold} />
                </View>
            ) : (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <SearchFoodCard 
                            food={item} 
                            onAdd={handleAddFood}
                        />
                    )}
                    contentContainerStyle={styles.resultsList}
                />
            )}

            <Pressable style={{width: "100%", height: 5000 }} onPress={()=>closeModal()}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    resultContent: {
        backgroundColor: Colors.white,
        width: "100%",
        zIndex: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
    resultsDescription: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        color: Colors.gray
    },
    resultsList: {
        padding: 10,
        gap: 10,
        paddingBottom: 40,
        backgroundColor: Colors.white,
    },
    menuPickerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
});