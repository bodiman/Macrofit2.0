import Colors from "@/styles/colors"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Logo from "./Logo"
import MacrosDisplay from "./MacroDisplay/MacrosDisplay"
import { Macros } from "@/tempdata"
import { useEffect, useMemo, useState } from "react"
import useMacros from "@/app/hooks/useMacros"
import storage from "@/app/storage/storage"
import eventBus from "@/app/storage/eventEmitter"
import useShoppingCart from "@/app/hooks/useShoppingCart"
import useUser from "@/app/hooks/useUser"
import Svg, { Polygon } from "react-native-svg"

// Wide Up Arrow
export function WideUpArrow({ width = 10, height = 10, color = 'black' }) {
    return (
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Polygon
          points={`${width / 2},0 0,${height} ${width},${height}`}
          fill={color}
        />
      </Svg>
    );
  }
  
  // Wide Down Arrow
  export function WideDownArrow({ width = 10, height = 10, color = 'black' }) {
    return (
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Polygon
          points={`0,0 ${width},0 ${width / 2},${height}`}
          fill={color}
        />
      </Svg>
    );
  }

export default function AppHeader() {
    const { preferences, meals } = useUser();
    const { shoppingCart, setShoppingCart } = useShoppingCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMacros, setShowMacros] = useState(true);
    const [mealPlanMacros, setMealPlanMacros] = useState({});

    useEffect(() => {
        const handleCartUpdate = () => {
            const cachedCart = storage.getString('shoppingCart');
            setShoppingCart(cachedCart ? JSON.parse(cachedCart) : []);
        };

        const handleModalOpen = () => setIsModalOpen(true);
        const handleModalClose = () => setIsModalOpen(false);
        const handleMealPlanMacrosUpdate = (macros: any) => {
            setMealPlanMacros(macros);
        };

        eventBus.on('shoppingCartUpdated', handleCartUpdate);
        eventBus.on('foodSearchModalOpen', handleModalOpen);
        eventBus.on('foodSearchModalClose', handleModalClose);
        eventBus.on('mealPlanMacrosUpdated', handleMealPlanMacrosUpdate);

        return () => {
            eventBus.off('shoppingCartUpdated', handleCartUpdate);
            eventBus.off('foodSearchModalOpen', handleModalOpen);
            eventBus.off('foodSearchModalClose', handleModalClose);
            eventBus.off('mealPlanMacrosUpdated', handleMealPlanMacrosUpdate);
        };
    }, []);

    const allFoodServings = useMemo(() => 
        meals.flatMap(meal => meal.servings),
        [meals]
    );
    
    const mealMacros = useMacros(allFoodServings);
    const cartMacros = useMacros(shoppingCart);

    const totalMacros = useMemo(() => {
        const combined: Macros = {};

        for (const [key, value] of Object.entries(mealMacros)) {
            combined[key] = (combined[key] || 0) + value;
        }
    
        // Include meal plan macros
        for (const [key, value] of Object.entries(mealPlanMacros)) {
            combined[key] = (combined[key] || 0) + (value as number);
        }
    
        // Only include cart macros when modal is open
        if (isModalOpen) {
            for (const [key, value] of Object.entries(cartMacros)) {
                combined[key] = (combined[key] || 0) + value;
            }
        }
        
        return combined;
    }, [mealMacros, cartMacros, mealPlanMacros, isModalOpen]);

    return (
        <View style={styles.header}>
            <TouchableOpacity 
                style={styles.toggleContainer}
                onPress={() => setShowMacros(!showMacros)}
            >   
                <Logo size1={25} size2={25} theme={"dark"} />
                <View style={[{transform: showMacros ? [{ translateY: 9 }] : [{ translateY: -5 }]}]}>
                    {!showMacros ? <WideUpArrow /> : <WideDownArrow />}
                </View>
            </TouchableOpacity>

            <View style={styles.globalMacroContainer}>
                {showMacros && (
                    <MacrosDisplay 
                        macroPreferences={preferences} 
                        macroValues={totalMacros}
                        indicators={4} 
                        radius={35} 
                    />
                )}
            </View>
        </View>        
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.white,
        // padding: 10,
        paddingHorizontal: 20,
        // paddingBottom: 10,
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
        alignItems: 'center',
        paddingBottom: 5,
    },
    toggleButton: {
        // borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: Colors.gray,
        borderRadius: 2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    toggleButtonText: {
        color: Colors.gray,
        fontSize: 12,
        // alignSelf: 'center',
    },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingVertical: 2,
        // transform: [{ translateX: -15 }],
    },
    toggleIcon: {
        // width: 15,
        // height: 15,
    },
});