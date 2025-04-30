import Colors from "@/styles/colors"
import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native"

export type Tab = {
    id: number,
    name: string
}

type Props = {
    tabs: Tab[],
    selected: number,
    setSelected: (tab: number)=> void
}

export default function MenuTabs({ tabs, selected, setSelected }: Props) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
            {tabs.map(tab=> (
                <View key={tab.id} style={[styles.tab, tab.id == selected ? styles.selectedTab: null]}>
                    <Pressable onPress={()=>setSelected(tab.id)}>
                        <Text style={{}}>{tab.name}</Text>
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderBottomColor: Colors.coolgray,
        borderBottomWidth: 2,
    },
    tab: {
        paddingHorizontal: 10,
        padding: 5,
    },
    selectedTab: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 4
    },
});