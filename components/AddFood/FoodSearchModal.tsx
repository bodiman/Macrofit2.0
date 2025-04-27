import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Meal } from '@/tempdata';
import Colors from '@/styles/colors';
import { useEffect } from 'react';
import AddFood from './AddFood';
import { TouchableOpacity } from 'react-native';

type Props = PropsWithChildren<{
    // isVisible: boolean;
    onClose: () => void,
    modalCloser: () => void,
    activeMeal: Meal | null
  }>;

export default function FoodSearchModal({ onClose, activeMeal, modalCloser }: Props) {

    if (activeMeal === null) return;

    return (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{activeMeal.name}</Text>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#fff" size={22} />
              </Pressable>
            </View>
              <AddFood />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={modalCloser}>
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
    buttonText: {
        fontSize: 18,
        fontWeight: 600,
        color: Colors.white,
        margin: "auto"
    }
  });