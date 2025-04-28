import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Meal, FoodServing } from '@/tempdata';
import Colors from '@/styles/colors';
import { useEffect } from 'react';
import AddFood from './AddFood';
import { TouchableOpacity } from 'react-native';
import storage from '@/app/storage/storage';

type Props = PropsWithChildren<{
    // isVisible: boolean;
    onClose: () => void,
    modalCloser: () => void,
    activeMeal: Meal | null,
    onUpdateMeal: (updatedMeal: Meal) => void
  }>;

export default function FoodSearchModal({ onClose, activeMeal, modalCloser, onUpdateMeal }: Props) {
    const [shoppingCart, setShoppingCart] = useState<FoodServing[]>([]);

    if (activeMeal === null) return;

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
            
            // Close the modal
            modalCloser();
        }
    };

    return (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{activeMeal.name}</Text>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#fff" size={22} />
              </Pressable>
            </View>
              <AddFood 
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
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
        </Modal>
      );
}

const styles = StyleSheet.create({
    modalContent: {
      height: '80%',
      width: '100%',
      backgroundColor: Colors.coolgray,
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
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
    buttonContainer: {
      width: "80%",
      margin: "auto",
      // backgroundColor: "red",
      gap: 20,
      paddingVertical: 20,
      // paddingTop: 10,
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
        backgroundColor: Colors.coolgray,
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 600,
        color: Colors.white,
        margin: "auto"
    }
  });