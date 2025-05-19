import { View, Text, ScrollView, StyleSheet, Animated, FlatList, Pressable, ActivityIndicator } from "react-native"
import { useEffect, useRef, useState } from "react"
import Colors from "@/styles/colors"
import { useFoodSearchApi } from "@/lib/api/foodSearch"
import { Food, FoodServing, ServingUnit } from "@shared/types/foodTypes"
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
    const { searchAllFoods } = useFoodSearchApi();
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
                    console.log("results", results)
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

    const handleAddFood = (food: Food, quantity: number, unit: ServingUnit) => {

        const foodServing: FoodServing = {
            id: uuidv4(),
            food: food,
            quantity: quantity,
            unit: food.servingUnits[0]
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
                <View style={{width: "100%", height: "100%",}}>
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <SearchFoodCard 
                                food={item} 
                                onAdd={handleAddFood}
                            />
                        )}
                        contentContainerStyle={{backgroundColor: Colors.white, gap: 10, paddingBottom: 120}}
                        style={{flexGrow: 1}}
                        scrollEnabled={true}
                    />
                </View>

                
            )}

            {/* <Pressable style={{width: "100%", height: 5000 }} onPress={()=>closeModal()}/> */}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    resultContent: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        // backgroundColor: "pink",
        height: "100%",
        backgroundColor: Colors.white,
        width: "100%",
        zIndex: 10,
        elevation: 10,
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
        // backgroundColor: Colors.white,
        backgroundColor: "red",
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