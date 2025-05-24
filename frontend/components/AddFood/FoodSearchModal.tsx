import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { PropsWithChildren, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Meal, FoodServing } from '@shared/types/foodTypes';
import { UserMealPreference } from '@shared/types/databaseTypes';
import Colors from '@/styles/colors';
import AddFood from './AddFood';
import AnimatedModal from '../AnimatedModal';
import eventBus from '@/app/storage/eventEmitter';
import useShoppingCart from '@/app/hooks/useShoppingCart';

type Props = PropsWithChildren<{
    onClose: () => void,
    modalCloser: () => void,
    activeMeal: Meal | null,
    activeMealPreference: UserMealPreference | null,
    addFoodsToMeal: (mealId: string, updatedMeal: FoodServing[]) => Promise<void>
}>;

export default function FoodSearchModal({ onClose, activeMeal, activeMealPreference, modalCloser, addFoodsToMeal }: Props) {
    const { shoppingCart, setShoppingCart, clearCart } = useShoppingCart();

    useEffect(() => {
        if (activeMeal !== null) {
            eventBus.emit('foodSearchModalOpen');
        }
    }, [activeMeal]);

    if (activeMeal === null) return null;

    const handleLog = () => {
        if (activeMeal) {
            // Add foods from shopping cart to the meal
            // const updatedMeal = {
            //     ...activeMeal,
            //     foods: [...activeMeal.servings, ...shoppingCart]
            // };
            
            // Update the meal
            addFoodsToMeal(activeMeal.id, shoppingCart).then(()=> {
                clearCart();
                modalCloser();
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
                    <AddFood
                        shoppingCart={shoppingCart}
                        setShoppingCart={setShoppingCart}
                        handleLog={handleLog}
                        activeMealPreference={activeMealPreference}
                    />
                </View>
            </View>
        </AnimatedModal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
      height: '100%',
      width: '100%',
    //   backgroundColor: "red",
    //   paddingHorizontal: 20,
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
        // bottom: 0
        // paddingBottom: 110,
        // maxHeight: '80%',
        // backgroundColor: "red",
    },
    buttonContainer: {
        width: "100%",
        margin: "auto",
        gap: 20,
        // paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.white,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        // elevation: 0,
    },
    button: {
        backgroundColor: Colors.blue,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: "auto",
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