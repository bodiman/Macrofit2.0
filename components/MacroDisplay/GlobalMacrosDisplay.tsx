import { Text, View, StyleSheet, LayoutChangeEvent, FlatList, Dimensions, Platform, ScaledSize } from "react-native"
import { Macros, myMacros, MacroPreferences } from "@/tempdata"
import { myMacroPreferences } from "@/tempdata"
import MacroIndicator from "./MacroIndicator"
import { MacroKey } from "@/tempdata"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ScrollView } from "react-native-gesture-handler"
import { useState, useEffect } from "react"

type Props = {
    macroPreferences: MacroPreferences
}

export default function GlobalMacrosDisplay({ macroPreferences }: Props) {
    const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

    useEffect(() => {
        const onChange = ({ window }: { window: ScaledSize }) => {
            setWindowWidth(window.width);
        };

        const subscription = Dimensions.addEventListener("change", onChange);

        return () => subscription.remove(); // Clean up on unmount
    }, []);

    const groupedMacros = (Object.keys(macroPreferences) as MacroKey[]).reduce<MacroKey[][]>((acc, item, index) => {
        if(!macroPreferences[item]) return acc;

        const groupIndex = Math.floor(index / 3);
        if (!acc[groupIndex]) {
            acc[groupIndex] = [];
        }

        acc[groupIndex].push(item);
        return acc;
    }, []);

    const renderItem = ({ item }: { item: MacroKey[] }) => (
        <View style={[styles.macroContainer, { width: windowWidth - 40, gap: (windowWidth - 340) / 2 }]}>
            {item.map((macro) => (
                macroPreferences[macro] &&
                <MacroIndicator
                    key={macro}
                    unit={macro}
                    value={myMacros[macro]}
                    range={macroPreferences[macro]}
                />
            ))}
        </View>
    );

    const renderItemWeb = ({ macro }: { macro: MacroKey }) => (
             macroPreferences[macro] &&
            <MacroIndicator
                key={macro}
                unit={macro}
                value={myMacros[macro]}
                range={macroPreferences[macro]}
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
            contentContainerStyle={[styles.flatListContainer, { gap: (windowWidth - 340) / 2 }]}
        />
    )
}

const styles = StyleSheet.create({
    macroContainer: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between"
    },
    flatListContainer: {
        // gap: 20,
        // width: "20%",
        // justifyContent: "space-evenly",
        // backgroundColor: "red",
    }
})