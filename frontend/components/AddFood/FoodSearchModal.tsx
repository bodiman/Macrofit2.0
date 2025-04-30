import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { PropsWithChildren, useState, useEffect, act } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Meal, FoodServing } from '@/tempdata';
import Colors from '@/styles/colors';
import AddFood from './AddFood';
import storage from '@/app/storage/storage';
import AnimatedModal from '../AnimatedModal';
import { eventBus } from '@/app/storage/eventEmitter';

type Props = PropsWithChildren<{
    onClose: () => void,
    modalCloser: () => void,
    activeMeal: Meal | null,
    onUpdateMeal: (updatedMeal: Meal) => void
}>;

export default function FoodSearchModal({ onClose, activeMeal, modalCloser, onUpdateMeal }: Props) {
    const [shoppingCart, setShoppingCart] = useState<FoodServing[]>([]);

    useEffect(() => {
        if (activeMeal !== null) {
            eventBus.emit('foodSearchModalOpen');
        }
    }, [activeMeal]);

    if (activeMeal === null) return null;

    const handleLog = () => {
        if (activeMeal) {
            // Add foods from shopping cart to the meal
            const updatedMeal = {
                ...activeMeal,
                foods: [...activeMeal.foods, ...shoppingCart]
            };
            
            // Update the meal
            onUpdateMeal(updatedMeal);
            
            // Clear the shopping cart
            setShoppingCart([]);
            storage.set('shoppingCart', JSON.stringify([]));
            eventBus.emit('shoppingCartUpdated');
            
            modalCloser();
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
                    <AddFood 
                        shoppingCart={shoppingCart}
                        setShoppingCart={setShoppingCart}
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
        </AnimatedModal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
      height: '100%',
      width: '100%',
      paddingHorizontal: 20,
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
        maxHeight: '80%',
    },
    buttonContainer: {
        width: "80%",
        margin: "auto",
        gap: 20,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between"
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
    }
});