import Colors from "@/styles/colors"
import { ScrollView, Text, StyleSheet, View, Pressable, FlatList } from "react-native"

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
        // <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
        //     {tabs.map(tab=> (
        //         <View key={tab.id} style={[styles.tab, tab.id == selected ? styles.selectedTab: null]}>
        //             <Pressable onPress={()=>setSelected(tab.id)}>
        //                 <Text style={styles.tabText}>{tab.name}</Text>
        //             </Pressable>
        //         </View>
        //     ))}
        // </ScrollView>
        <FlatList
            style={{
                width: "100%",
            }}
            data={tabs}
            keyExtractor={(item: Tab) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
            renderItem={({ item }: { item: Tab }) => (
                <View style={[styles.tab, item.id === selected ? styles.selectedTab : null]}>
                    <Pressable onPress={() => setSelected(item.id)}>
                        <Text style={styles.tabText}>{item.name}</Text>
                    </Pressable>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        paddingHorizontal: 20,
        marginBottom: 0,
        borderBottomColor: Colors.coolgray,
        borderBottomWidth: 2,
    },
    tab: {
        paddingHorizontal: 10,
        // padding: 10,
        padding: 5,
    },
    selectedTab: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 4
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.black
    }
});