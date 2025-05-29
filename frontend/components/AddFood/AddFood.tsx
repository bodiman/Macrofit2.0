import Colors from "@/styles/colors";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FoodServing } from "@shared/types/foodTypes";
import { useEffect, useRef, useState } from "react";
import ResultContent from "./ResultContent";
import { MacroPreference } from "@shared/types/macroTypes";

type Props = {
    onAddFood: (foodServing: FoodServing) => void
    preferences: MacroPreference[]
}

export default function AddFood({ onAddFood, preferences }: Props) {
    const [displayResults, setDisplayResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchBarRef = useRef<TextInput>(null);

    const handleCloseResults = () => {
        setDisplayResults(false);
        searchBarRef.current?.blur();
    };

    return (
        <View style={[styles.container, displayResults && styles.containerExpanded]}>
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
                        preferences={preferences}
                        visible={displayResults} 
                        closeModal={()=>handleCloseResults()} 
                        searchQuery={searchQuery}
                        onAddToCart={onAddFood}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        zIndex: 1,
    },
    containerExpanded: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    searchContainer: {
        padding: 10,
        width: "100%",
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
    iconContainer: {
        padding: 10,
        backgroundColor: Colors.lightgray,
    },
    resultsContainer: {
        position: 'absolute',
        top: 65,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
});