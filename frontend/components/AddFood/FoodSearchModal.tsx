import { View, Text, Pressable, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { PropsWithChildren, useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Meal, FoodServing, ServingUnit } from '@shared/types/foodTypes';
import { UserMealPreference } from '@shared/types/databaseTypes';
import Colors from '@/styles/colors';
import AddFood from './AddFood';
import AnimatedModal from '../AnimatedModal';
import eventBus from '@/app/storage/eventEmitter';
import useShoppingCart from '@/app/hooks/useShoppingCart';
import { MacroPreference } from '@shared/types/macroTypes';
import FoodCard from './FoodCard';
import MacrosDisplay from '../MacroDisplay/MacrosDisplay';
import useMacros from '@/app/hooks/useMacros';

type Props = PropsWithChildren<{
    onClose: () => void,
    modalCloser: () => void,
    activeMeal: Meal | null,
    activeMealPreference: UserMealPreference | null,
    addFoodsToMeal: (mealId: string, updatedMeal: FoodServing[]) => Promise<void>
    dailyMacroPreferences: MacroPreference[]
}>;

export default function FoodSearchModal({ onClose, activeMeal, activeMealPreference, modalCloser, addFoodsToMeal, dailyMacroPreferences }: Props) {
    const { shoppingCart, setShoppingCart, clearCart } = useShoppingCart();
    const totalMacrosInCart = useMacros(shoppingCart);

    useEffect(() => {
        if (activeMeal !== null) {
            eventBus.emit('foodSearchModalOpen');
        }
    }, [activeMeal]);

    if (activeMeal === null) return null;

    const handleAddFood = (foodServing: FoodServing) => {
        setShoppingCart([...shoppingCart, foodServing]);
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
            modalCloser();
            addFoodsToMeal(activeMeal.id, shoppingCart).then(()=> {
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
                            macroPreferences={dailyMacroPreferences}
                            macroValues={totalMacrosInCart}
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
                        <TouchableOpacity 
                            style={[styles.button, shoppingCart.length === 0 && styles.buttonDisabled]} 
                            onPress={handleLog}
                            disabled={shoppingCart.length === 0}
                        >
                            <Text style={styles.buttonText}>Log</Text>
                        </TouchableOpacity>
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
        paddingBottom: 40,
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
        padding: 20,
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
});