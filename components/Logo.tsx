import { StyleSheet } from "react-native";
import { Text } from "react-native";
import Colors from "@/styles/colors";

export default function Logo({ size1, size2, theme }: { size1: number, size2: number, theme?: string }) {
    return (
        <Text style={styles.title}>
            <Text style={{fontSize: size1, color: theme === "dark" ? Colors.darkgray : Colors.lightgray}}>Macro</Text><Text style={{fontSize: size2, color: theme === "dark" ? Colors.orange : Colors.orange}}>Fit</Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 800,
    }
})