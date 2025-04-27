import { View, Text, ScrollView, StyleSheet, Animated } from "react-native"
import { useEffect, useRef, useState } from "react"
import Colors from "@/styles/colors"
import MenuTabs, { type  Tab } from "../Tabs/MenuTabs"

type Props = {
    visible: boolean,
    closeModal: ()=> void
}

export default function ResultContent({ visible, closeModal }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Start fully transparent
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        fadeAnim.setValue(0);

        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,              // Fade to fully opaque
                duration: 200,           // Over 500ms
                useNativeDriver: true,   // Always use native driver for opacity
            }).start();
        }
    }, [fadeAnim, visible]);

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
            name: "+ Add Menu",
        }
    ]

    return (
        <Animated.View style={[styles.resultContent, {display: visible ? "flex": "none", opacity: fadeAnim}]}>
            <Text style={styles.resultsDescription}>Showing Results for All Foods</Text>
            
            <MenuTabs tabs={tabs} selected={selected} setSelected={(tab: number)=>setSelected(tab)} />
                
            {/* <Text>This is the result content</Text> */}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    resultContent: {
        backgroundColor: "#F0FFF7",
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
        paddingHorizontal: 20
    }
});