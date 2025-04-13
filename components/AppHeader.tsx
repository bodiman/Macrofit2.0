import Colors from "@/styles/colors"
import { Text, View, StyleSheet } from "react-native"
import Logo from "./Logo"


export default function AppHeader() {
    return (
        <View style={styles.header}>
            <Logo size1={30} size2={30} theme={"dark"} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: Colors.white,
        padding: 20,
        borderBottomColor: 'rgba(0, 0, 0, 0.25)',
        borderBottomWidth: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }
})