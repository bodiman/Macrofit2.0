import Colors from "@/styles/colors"
import { Text, View, StyleSheet } from "react-native"
import Logo from "./Logo"
import MacrosDisplay from "./MacroDisplay/MacrosDisplay"
import { myMacroPreferences } from "@/tempdata"
import { useEffect, useMemo } from "react"
import { useMacros } from "@/app/hooks/useMacros"
import { useMeals } from "@/app/hooks/useMeals"

export default function AppHeader() {
    const { meals } = useMeals();
    const allFoodServings = useMemo(() => 
        meals.flatMap(meal => meal.foods),
        [meals]
    );
    const totalMacros = useMacros(allFoodServings);

    return (
        <View style={styles.header}>
            <Logo size1={25} size2={25} theme={"dark"} />
            <View style={styles.globalMacroContainer}>
                <MacrosDisplay 
                    macroPreferences={myMacroPreferences} 
                    macroValues={totalMacros}
                    indicators={3} 
                    radius={50} 
                />
            </View>  
        </View>        
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.white,
        padding: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomColor: 'rgba(0, 0, 0, 0.25)',
        borderBottomWidth: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    globalMacroContainer: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
    },
})