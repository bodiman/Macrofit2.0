import { Text, View, StyleSheet, LayoutChangeEvent, FlatList, Dimensions } from "react-native"
import { myMacros } from "@/tempdata"
import { myMacroPreferences } from "@/tempdata"
import MacroIndicator from "./MacroIndicator"
import { MacroKey } from "@/tempdata"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ScrollView } from "react-native-gesture-handler"
import { useState } from "react"

export default function GlobalMacrosDisplay() {
    const windowWidth = Dimensions.get('window').width;

    const groupedMacros = (Object.keys(myMacroPreferences) as MacroKey[]).reduce<MacroKey[][]>((acc, item, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!acc[groupIndex]) {
            acc[groupIndex] = [];
        }
        acc[groupIndex].push(item);
        return acc;
    }, []);

    const renderItem = ({ item }: { item: MacroKey[] }) => (
        <View style={[styles.macroContainer, { width: windowWidth * 0.9 }]}>
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

    return (
        <FlatList
            data={groupedMacros}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
        />
    )
}

const styles = StyleSheet.create({
    macroContainer: {
        display: "flex",
        flexDirection: "row",
        width: 351,
        justifyContent: "space-between"
    },
    flatListContainer: {
        width: "100%",
        gap: 40
    }
})