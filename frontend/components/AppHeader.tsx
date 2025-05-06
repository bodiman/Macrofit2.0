import Colors from "@/styles/colors"
import { Text, View, StyleSheet } from "react-native"
import Logo from "./Logo"
import MacrosDisplay from "./MacroDisplay/MacrosDisplay"
import { Macros } from "@/tempdata"
import { useEffect, useMemo, useState } from "react"
import useMacros from "@/app/hooks/useMacros"
import useMeals from "@/app/hooks/useMeals"
import storage from "@/app/storage/storage"
import eventBus from "@/app/storage/eventEmitter"
import useShoppingCart from "@/app/hooks/useShoppingCart"
import useUser from "@/app/hooks/useUser"

export default function AppHeader() {
    const { meals } = useMeals();
    const { preferences } = useUser();
    // const [shoppingCart, setShoppingCart] = useState(() => {
    //     const cachedCart = storage.getString('shoppingCart');
    //     return cachedCart ? JSON.parse(cachedCart) : [];
    // });
    const { shoppingCart, setShoppingCart } = useShoppingCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleCartUpdate = () => {
            const cachedCart = storage.getString('shoppingCart');
            setShoppingCart(cachedCart ? JSON.parse(cachedCart) : []);
        };

        const handleModalOpen = () => setIsModalOpen(true);
        const handleModalClose = () => setIsModalOpen(false);

        eventBus.on('shoppingCartUpdated', handleCartUpdate);
        eventBus.on('foodSearchModalOpen', handleModalOpen);
        eventBus.on('foodSearchModalClose', handleModalClose);

        return () => {
            eventBus.off('shoppingCartUpdated', handleCartUpdate);
            eventBus.off('foodSearchModalOpen', handleModalOpen);
            eventBus.off('foodSearchModalClose', handleModalClose);
        };
    }, []);

    const allFoodServings = useMemo(() => 
        meals.flatMap(meal => meal.foods),
        [meals]
    );
    
    const mealMacros = useMacros(allFoodServings);
    const cartMacros = useMacros(shoppingCart);

    const totalMacros = useMemo(() => {
        const combined: Macros = {};

        for (const [key, value] of Object.entries(mealMacros)) {
            combined[key] = (combined[key] || 0) + value;
        }
    
        
        // Only include cart macros when modal is open
        if (isModalOpen) {
            for (const [key, value] of Object.entries(cartMacros)) {
                combined[key] = (combined[key] || 0) + value;
            }
        }
        
        return combined;
    }, [mealMacros, cartMacros, isModalOpen]);

    return (
        <View style={styles.header}>
            <Logo size1={25} size2={25} theme={"dark"} />
            <View style={styles.globalMacroContainer}>
                <MacrosDisplay 
                    macroPreferences={preferences} 
                    macroValues={totalMacros}
                    indicators={4} 
                    radius={30} 
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
        zIndex: 1000,
    },
    globalMacroContainer: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
    },
})