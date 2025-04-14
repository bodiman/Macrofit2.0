import { Text, View, StyleSheet, LayoutChangeEvent, FlatList, Dimensions, Platform, ScaledSize } from "react-native"
import { myMacros } from "@/tempdata"
import { myMacroPreferences } from "@/tempdata"
import MacroIndicator from "./MacroIndicator"
import { MacroKey } from "@/tempdata"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ScrollView } from "react-native-gesture-handler"
import { useState, useEffect } from "react"

export default function GlobalMacrosDisplay() {
    const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

    useEffect(() => {
        const onChange = ({ window }: { window: ScaledSize }) => {
        setWindowWidth(window.width);
        };

        const subscription = Dimensions.addEventListener("change", onChange);

        return () => subscription.remove(); // Clean up on unmount
    }, []);

    const groupedMacros = (Object.keys(myMacroPreferences) as MacroKey[]).reduce<MacroKey[][]>((acc, item, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!acc[groupIndex]) {
            acc[groupIndex] = [];
        }
        acc[groupIndex].push(item);
        return acc;
    }, []);

    const renderItem = ({ item }: { item: MacroKey[] }) => (
        <View style={[styles.macroContainer, { width: windowWidth - 40 }]}>
            {item.map((macro) => (
            <MacroIndicator
                key={macro}
                unit={macro}
                value={myMacros[macro]}
                range={myMacroPreferences[macro]}
            />
            ))}
        </View>
    );

    const renderItemWeb = ({ item }: { item: MacroKey }) => (
            <MacroIndicator
                key={item}
                unit={item}
                value={myMacros[item]}
                range={myMacroPreferences[item]}
            />
    );

    // return (
    //     <FlatList
    //         data={(Object.keys(myMacroPreferences) as MacroKey[])}
    //         keyExtractor={(_, i) => i.toString()}
    //         renderItem={renderItemWeb}
    //         horizontal
    //         showsHorizontalScrollIndicator={false}
    //         contentContainerStyle={styles.flatListContainer}
    //     />
    // )

    return (
        <FlatList
            data={groupedMacros}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.flatListContainer, {gap: (windowWidth - 300) / 3}]}
        />
    )
}

const styles = StyleSheet.create({
    macroContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
    },
    flatListContainer: {
        // gap: 20,
        backgroundColor: "red",
        // width: "100%",
        // justifyContent: "space-evenly",
        // backgroundColor: "red",
    }
})