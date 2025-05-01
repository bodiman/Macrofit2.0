import { View, Text, ScrollView, StyleSheet, Animated, FlatList } from "react-native"
import { useEffect, useRef, useState } from "react"
import Colors from "@/styles/colors"
import MenuTabs, { type  Tab } from "../Tabs/MenuTabs"
import { searchFoods } from "@/api/foodSearch/route"
import { Food, FoodServing, Portion, Unit, servingUnits } from "@/tempdata"
import SearchFoodCard from "./SearchFoodCard"
import storage from "@/app/storage/storage"
import { v4 as uuidv4 } from 'uuid';

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
        if (searchQuery) {
            const results = searchFoods(searchQuery);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
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
        gap: 10
    },
    menuTabsContainer: {
        // backgroundColor: "red",
    }
});