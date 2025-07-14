import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Meal, FoodServing, ServingUnit } from '@shared/types/foodTypes';
import { UserMealPreference } from '@shared/types/databaseTypes';
import { MacroPreferences } from '@/tempdata';
import AnimatedModal from '../AnimatedModal';
import AddFood from './AddFood';
import FoodCard from './FoodCard';
import MacrosDisplay from '../MacroDisplay/MacrosDisplay';
import Colors from '@/styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useShoppingCart from '@/app/hooks/useShoppingCart';
import eventBus from '@/app/storage/eventEmitter';
import { useGlobalMacrosSync } from '@/hooks/useGlobalMacrosSync';
import { calculateAllMacrosOptimized } from '@/utils/optimizedMacroCalculation';
import useUser from '@/app/hooks/useUser';

interface Props {
    onClose: () => void;
    activeMeal: Meal | null;
    activeMealPreference: UserMealPreference | null;
    modalCloser: () => void;
    addFoodsToMeal: (mealId: string, foodsToAdd: FoodServing[]) => Promise<void>;
    dailyMacroPreferences: MacroPreferences;
}

export default function FoodSearchModal({ onClose, activeMeal, activeMealPreference, modalCloser, addFoodsToMeal, dailyMacroPreferences }: Props) {
    const { shoppingCart, setShoppingCart, clearCart } = useShoppingCart();
    const { rawPreferences } = useUser();
    const { syncShoppingCartMacros, clearShoppingCart, openShoppingCart, closeShoppingCart } = useGlobalMacrosSync();

    // Calculate cart macros using optimized function
    const cartMacros = useMemo(() => {
        if (shoppingCart.length === 0) return {};
        
        // Create a meal-like structure for the cart
        const cartMeal = {
            id: 'cart',
            name: 'Cart',
            servings: shoppingCart
        };
        
        const macros = calculateAllMacrosOptimized([cartMeal], rawPreferences);
        console.log(`🛒 Cart macros calculated:`, { cartItems: shoppingCart.length, macros });
        return macros;
    }, [shoppingCart, rawPreferences]);

    // Calculate display macros (cart + logged foods) for user experience
    const displayMacros = useMemo(() => {
        if (!activeMeal) return cartMacros;
        
        // Start with cart macros
        const totalMacros = { ...cartMacros };
        
        // Add logged foods macros
        activeMeal.servings.forEach((foodServing: FoodServing) => {
            const adjustedMacros = calculateAllMacrosOptimized([{ id: 'logged', name: 'Logged', servings: [foodServing] }], rawPreferences);
            Object.entries(adjustedMacros).forEach(([key, value]) => {
                if (value) {
                    totalMacros[key] = (totalMacros[key] || 0) + value;
                }
            });
        });
        
        return totalMacros;
    }, [cartMacros, activeMeal, rawPreferences]);

    const adjustedPreferences = useMemo(() => {
        const distributionPercentage = activeMealPreference?.distribution_percentage;
        if (!distributionPercentage) return dailyMacroPreferences;
        
        return dailyMacroPreferences.map(pref => ({
            ...pref,
            min: pref.min ? (pref.min * distributionPercentage) : undefined,
            max: pref.max ? (pref.max * distributionPercentage): undefined
        }));
    }, [dailyMacroPreferences, activeMealPreference]);

    useEffect(() => {
        if (activeMeal !== null) {
            eventBus.emit('foodSearchModalOpen');
        }
    }, [activeMeal]);

    // Open shopping cart when modal opens
    useEffect(() => {
        if (activeMeal === null) return;
        
        console.log(`🛒 FoodSearchModal: Opening shopping cart, syncing macros:`, cartMacros);
        openShoppingCart();
        // Sync current shopping cart macros when modal opens
        syncShoppingCartMacros(cartMacros);
        return () => {
            console.log(`🛒 FoodSearchModal: Closing shopping cart, clearing macros`);
            closeShoppingCart();
            clearShoppingCart(); // Clear shopping cart macros only
        };
    }, [activeMeal, openShoppingCart, closeShoppingCart, clearShoppingCart, syncShoppingCartMacros, cartMacros]);

    if (activeMeal === null) return null;

    const handleAddFood = (foodServing: FoodServing) => {
        // Ensure the quantity is preserved correctly
        const foodWithQuantity = {
            ...foodServing,
            quantity: Number(foodServing.quantity) || 0
        };
        setShoppingCart([...shoppingCart, foodWithQuantity]);
    };

    const handleRemoveFromCart = (foodId: string) => {
        const updatedCart = shoppingCart.filter(item => item.id !== foodId);
        setShoppingCart(updatedCart);
    };

    const handleUpdatePortion = (foodId: string, quantity: number, unit: ServingUnit) => {
        const updatedCart = shoppingCart.map(item => {
            if (item.id === foodId) {
                return {
                    ...item,
                    quantity,
                    unit
                };
            }
            return item;
        });
        setShoppingCart(updatedCart);
    };

    const handleLog = () => {
        if (activeMeal) {
            // Clear shopping cart macros immediately to prevent double counting
            clearShoppingCart();
            modalCloser();
            
            // Ensure all quantities are preserved correctly
            const foodsWithQuantities = shoppingCart.map(food => ({
                ...food,
                quantity: Number(food.quantity) || 0
            }));
            
            addFoodsToMeal(activeMeal.id, foodsWithQuantities).then(()=> {
                clearCart();
            });
        }
    };

    return (
        <AnimatedModal isVisible={true} onClose={onClose} zIndex={100}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{activeMeal.name}</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.macroContainer}>
                        <MacrosDisplay 
                            macroPreferences={adjustedPreferences}
                            macroValues={displayMacros}
                            indicators={4} 
                            radius={30} 
                        />
                    </View>

                    <AddFood
                        preferences={dailyMacroPreferences}
                        onAddFood={handleAddFood}
                    />

                    <View style={styles.shoppingCart}>
                        <FlatList 
                            data={shoppingCart}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <FoodCard 
                                    food={item}
                                    onUpdatePortion={(quantity: number, unit: ServingUnit) => handleUpdatePortion(item.id, quantity, unit)}
                                    onRemove={() => handleRemoveFromCart(item.id)}
                                />
                            )}
                            style={styles.cartList}
                            contentContainerStyle={styles.cartContent}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable 
                            style={[styles.button, shoppingCart.length === 0 && styles.buttonDisabled]}
                            onPress={handleLog}
                            disabled={shoppingCart.length === 0}
                        >
                            <Text style={styles.buttonText}>Log Foods</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </AnimatedModal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: '100%',
        width: '100%',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
    },
    titleContainer: {
        backgroundColor: Colors.gray,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 600,
    },
    contentContainer: {
        flex: 1,
        zIndex: 2,
        backgroundColor: Colors.white,
    },
    macroContainer: {
        padding: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        zIndex: 1000,
    },
    shoppingCart: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.white,
        paddingBottom: 60,
    },
    cartList: {
        flex: 1,
    },
    cartContent: {
        padding: 10,
        gap: 10,
    },
    buttonContainer: {
        width: "100%",
        margin: "auto",
        gap: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.white,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        padding: 10,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: Colors.blue,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "100%",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 600,
        color: Colors.white,
        margin: "auto"
    },
    plannedFoodMessage: {
        padding: 15,
        backgroundColor: Colors.lightgray,
        borderRadius: 8,
        margin: 10,
        alignItems: 'center',
    },
    plannedFoodText: {
        fontSize: 16,
        fontWeight: 600,
        color: Colors.darkgray,
    },
    plannedFoodSubtext: {
        fontSize: 14,
        color: Colors.gray,
        marginTop: 5,
    },
});