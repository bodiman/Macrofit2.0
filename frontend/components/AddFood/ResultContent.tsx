import { View, Text, ScrollView, StyleSheet, Animated, FlatList, Pressable, ActivityIndicator } from "react-native"
import { useEffect, useRef, useState } from "react"
import Colors from "@/styles/colors"
import MenuTabs, { type  Tab } from "../Tabs/MenuTabs"
import { searchFoods } from "@/api/foodSearch/route"
import { Food, FoodServing, Portion } from "@shared/types/foodTypes"
import SearchFoodCard from "./SearchFoodCard"
import storage from "@/app/storage/storage"
import { v4 as uuidv4 } from 'uuid';
import { servingUnits } from "@/tempdata"

type Props = {
    visible: boolean,
    closeModal: ()=> void,
    searchQuery: string,
    onAddToCart: (food: FoodServing) => void
}

export default function ResultContent({ visible, searchQuery, onAddToCart, closeModal }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selected, setSelected] = useState(0);
    const [searchResults, setSearchResults] = useState<Food[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            if (searchQuery) {
                setIsLoading(true);
                try {
                    const results = await searchFoods(searchQuery);
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
    }, [searchQuery]);

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

    const tabs: Tab[] = [
        {
            id: 0,
            name: "All",
        },
        {
            id: 1,
            name: "Clark Kerr Campus",
        },
        {
            id: 2,
            name: "Crossroads",
        },
        {
            id: 3,
            name: "Foothill",
        },
        {
            id: 4,
            name: "Cafe 3",
        },
        {
            id: 5,
            name: "+ Add Menu",
        }
    ]

    return (
        <Animated.View style={[styles.resultContent, {display: visible ? "flex": "none", opacity: fadeAnim}]}>
            <Text style={styles.resultsDescription}>
                {searchQuery ? `Showing Results for "${searchQuery}"` : "Search for foods to add"}
            </Text>
            
            <View style={styles.menuTabsContainer}>
                <MenuTabs tabs={tabs} selected={selected} setSelected={(tab: number)=>setSelected(tab)} />
            </View>

            <View style={{flex: 1}}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={Colors.blue} />
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
            </View>

            <Pressable style={{width: "100%", height: 5000}} onPress={()=>closeModal()}/>
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
        backgroundColor: Colors.white,
    },
    menuTabsContainer: {
        // backgroundColor: "red",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
});