import Colors from "@/styles/colors"
import { Text, View, StyleSheet } from "react-native"
import Logo from "./Logo"
import GlobalMacrosDisplay from "./GlobalMacrosDisplay"
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function AppHeader() {
    return (
            <View style={styles.header}>
                <Logo size1={25} size2={25} theme={"dark"} />
                <View style={styles.globalMacroContainer}>
                    <GlobalMacrosDisplay />
                </View>           
            </View>        
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: Colors.white,
        padding: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomColor: 'rgba(0, 0, 0, 0.25)',
        borderBottomWidth: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    globalMacroContainer: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
    },
})