import { View, Text, ScrollView, StyleSheet } from "react-native"
import Colors from "@/styles/colors"

export default function ResultContent() {
    return (
        <View style={styles.resultContent}>
            <View style={{paddingTop: 0, /*borderBottomColor: Colors.black, borderBottomWidth: 1,*/}}>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{backgroundColor: Colors.coolgray,}}
                    contentContainerStyle={styles.tabContainer}
                >
                    <View style={[styles.tab, styles.selectedTab]}><Text style={styles.tabText}>All</Text></View>
                    <View style={styles.tab}><Text style={styles.tabText}>Common</Text></View>
                    <View style={styles.tab}><Text style={styles.tabText}>Clark Kerr Campus</Text></View>
                    <View style={styles.addTab}><Text style={styles.tabText}>+ Add</Text></View>
                </ScrollView>
                
                {/* <Text>Search Results for All Foods</Text> */}
            </View>
            <Text>This is the result content</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    resultContent: {
        backgroundColor: "white",
        width: "100%",
        height: 200,
        zIndex: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // padding: 20,
    },
    tabContainer: {
        gap: 1,
        // borderRadius: 20,
        paddingHorizontal: 5,
        paddingTop: 5,
        width: "100%",
        borderColor: Colors.gray,
        borderBottomWidth: 1,
    },
    tab: {
        // backgroundColor: Colors.coolgray,
        padding: 15,
        paddingHorizontal: 20,
        paddingVertical: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: Colors.gray,
        borderWidth: 1,
        borderBottomWidth: 0,
        alignContent: "center",
        justifyContent: "center",
        borderBottomLeftRadius: -5,
    },
    selectedTab: {
        backgroundColor: "white",
        borderBottomWidth: 0
    },
    addTab: {
        // backgroundColor: Colors.coolgray,
        padding: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    tabText: {
        fontSize: 14,
        fontWeight: 500,
    }
});