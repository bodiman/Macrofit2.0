import { Text, View, StyleSheet, LayoutChangeEvent, FlatList, Dimensions } from "react-native"
import { MacroPreferences, Macros } from "@/tempdata"
import MacroIndicator from "./MacroIndicator"
import { MacroKey } from "@/tempdata"
import { useEffect, useState } from "react"

type Props = {
    macroPreferences: MacroPreferences,
    macroValues: Macros,
    radius: number,
    indicators: number
}

export default function MacrosDisplay({ macroPreferences, macroValues, radius, indicators }: Props) {
    // total width = 2 * radius * indicators + gap * (indicators - 1)
    const [containerWidth, setContainerWidth] = useState(Dimensions.get("window").width - 40);
    const [gap, setGap] = useState((containerWidth - 2 * radius * indicators) / (indicators - 1))

    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
        setGap(Math.max((width - 2 * radius * indicators) / (indicators - 1), 0))
    };

    const groupedMacros = (Object.keys(macroPreferences) as MacroKey[]).reduce<MacroKey[][]>((acc, item, index) => {
        if (!macroPreferences[item]) return acc;
        const groupIndex = Math.floor(index / indicators);
        if (!acc[groupIndex]) {
            acc[groupIndex] = [];
        }
        acc[groupIndex].push(item);
        return acc;
    }, []);

    const renderItem = ({ item }: { item: MacroKey[] }) => (
        <View style={[styles.macroContainer, { width: containerWidth, gap: gap }]}>
            {item.map((macro) => (
            macroPreferences[macro] &&
            <MacroIndicator
                key={macro}
                unit={macro}
                value={macroValues[macro] || 0}
                radius={radius}
                range={macroPreferences[macro]}
            />
            ))}
        </View>
    );

    return (
        <View style={{width: "100%"}} onLayout={onLayout}>
            <FlatList
                data={groupedMacros}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[styles.flatListContainer, { gap: gap }]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    macroContainer: {
        display: "flex",
        flexDirection: "row",
    },
    flatListContainer: {
        // gap: 20,
        // width: "20%",
        // justifyContent: "space-evenly",
        // backgroundColor: "red",
    }
}) 