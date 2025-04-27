import { View, Text, ScrollView, StyleSheet, Animated } from "react-native"
import { useEffect, useRef } from "react"
import Colors from "@/styles/colors"

type Props = {
    visible: boolean
}

export default function ResultContent({visible}: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Start fully transparent

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

    return (
        <Animated.View style={[styles.resultContent, {display: visible ? "flex": "none", opacity: fadeAnim}]}>
            <Text>Showing Results for All Foods</Text>

                
            {/* <Text>This is the result content</Text> */}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    resultContent: {
        backgroundColor: "#F0FFF7",
        width: "100%",
        height: 200,
        zIndex: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 1,
        }
        // padding: 20,
    },
});