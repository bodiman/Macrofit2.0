import { View, Text, Pressable, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { PropsWithChildren, useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FoodServing, ServingUnit } from '@shared/types/foodTypes';
import Colors from '@/styles/colors';
import AddFood from '../AddFood/AddFood';
import AnimatedModal from '../AnimatedModal';
import FoodCard from '../AddFood/FoodCard';
import { MacroPreference } from '@shared/types/macroTypes';

type Props = PropsWithChildren<{
    onClose: () => void,
    kitchenName: string,
    preferences: MacroPreference[]
}>;

export default function AddKitchenFoodModal({ onClose, kitchenName, preferences }: Props) {
    const [selectedFoods, setSelectedFoods] = useState<FoodServing[]>([]);

    const handleAddFood = (foodServing: FoodServing) => {
        setSelectedFoods([...selectedFoods, foodServing]);
    };

    const handleRemoveFromCart = (foodId: string) => {
        const updatedFoods = selectedFoods.filter(item => item.id !== foodId);
        setSelectedFoods(updatedFoods);
    };

    const handleUpdatePortion = (foodId: string, quantity: number, unit: ServingUnit) => {
        const updatedFoods = selectedFoods.map(item => {
            if (item.id === foodId) {
                return {
                    ...item,
                    quantity,
                    unit
                };
            }
            return item;
        });
        setSelectedFoods(updatedFoods);
    };

    const handleSave = () => {
        // TODO: Implement saving foods to kitchen
        console.log('Saving foods to kitchen:', selectedFoods);
        onClose();
    };

    return (
        <AnimatedModal isVisible={true} onClose={onClose} zIndex={100}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Add Foods to {kitchenName}</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <View style={styles.contentContainer}>
                    <AddFood
                        preferences={preferences}
                        onAddFood={handleAddFood}
                    />

                    <View style={styles.shoppingCart}>
                        <FlatList 
                            data={selectedFoods}
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
                            style={[styles.button, selectedFoods.length === 0 && styles.buttonDisabled]} 
                            onPress={handleSave}
                            disabled={selectedFoods.length === 0}
                        >
                            <Text style={styles.buttonText}>Save</Text>
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