import { View, Text, Pressable, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { PropsWithChildren, useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Food, FoodServing } from '@shared/types/foodTypes';
import Colors from '@/styles/colors';
import AddFood from '../AddFood/AddFood';
import AnimatedModal from '../AnimatedModal';
import { MacroPreference } from '@shared/types/macroTypes';

type Props = PropsWithChildren<{
    onClose: () => void,
    kitchenName: string,
    preferences: MacroPreference[],
    onSave: (foods: Food[]) => void
}>;

export default function AddKitchenFoodModal({ onClose, kitchenName, preferences, onSave }: Props) {
    const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);

    const handleAddFood = (foodServing: FoodServing) => {
        const food = foodServing.food
        setSelectedFoods([...selectedFoods, food]);
    };

    const handleRemoveFood = (foodId: string) => {
        const updatedFoods = selectedFoods.filter(item => item.id !== foodId);
        setSelectedFoods(updatedFoods);
    };

    const handleSave = () => {
        onSave(selectedFoods);
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

                    <View style={styles.foodList}>
                        <FlatList 
                            data={selectedFoods}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.foodItem}>
                                    <View style={styles.foodTitleSection}>
                                        <Text style={styles.foodName}>
                                            {item.name}
                                        </Text>
                                        <Pressable onPress={() => handleRemoveFood(item.id)}>
                                            <MaterialIcons name="close" color={Colors.gray} size={24} />
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                            style={styles.list}
                            contentContainerStyle={styles.listContent}
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
    foodList: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.white,
        paddingBottom: 40,
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: 10,
        gap: 10,
    },
    foodItem: {
        backgroundColor: Colors.coolgray,
        borderRadius: 10,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 1
        },
        gap: 10,
    },
    foodTitleSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        flexShrink: 1,
        flexGrow: 1,
        width: "100%",
    },
    foodName: {
        textTransform: "capitalize",
        fontSize: 18,
        fontWeight: 600,
        color: Colors.black,
        flexGrow: 1
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