import { Text, View, StyleSheet } from "react-native"
import { myMacros } from "@/tempdata"
import { myMacroPreferences } from "@/tempdata"
import MacroIndicator from "./MacroIndicator"
import { MacroKey } from "@/tempdata"

export default function GlobalMacrosDisplay() {
    return (
        <View style={styles.macroContainer}>
            {
                (Object.keys(myMacroPreferences) as MacroKey[]).map( (key) => (
                    <MacroIndicator key={key} unit={key} value={myMacros[key]} range={myMacroPreferences[key]} />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    macroContainer: {
        marginTop: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        overflow: "hidden",
    }
})