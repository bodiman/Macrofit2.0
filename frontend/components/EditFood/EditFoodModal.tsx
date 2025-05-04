import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FoodServing, Portion, MacroPreferences } from '@/tempdata';
import Colors from '@/styles/colors';
import { useState, useMemo } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import UnitSpinner from '../Spinner/UnitSpinner';
import AnimatedModal from '../AnimatedModal';
import useMacros from '@/app/hooks/useMacros';
import { MacroPreference } from '@/types/macroTypes';
import useUser from '@/app/hooks/useUser';

type Props = {
    food: FoodServing;
    onClose: () => void;
    onUpdatePortion: (portion: Portion) => void;
};

export default function EditFoodModal({ food, onClose, onUpdatePortion }: Props) {
    const [unit, setUnit] = useState(food.portion.unit);
    const [quantity, setQuantity] = useState(food.portion.quantity);
    const [stringQuantity, setStringQuantity] = useState(food.portion.quantity.toString());
    const { preferences } = useUser();
    
    const currentFoodServing = useMemo(() => ({
        ...food,
        portion: {
            unit,
            quantity
        }
    }), [food, unit, quantity]);

    const adjustedMacros = useMacros([currentFoodServing]);

    const handleQuantityChange = (val: string) => {
        setStringQuantity(val);
        try {
            const newQuantity = parseFloat(val);
            setQuantity(newQuantity);
            onUpdatePortion({
                unit,
                quantity: newQuantity
            });
        } catch {
            setQuantity(0);
        }
    };

    const handleUnitChange = (newUnit: typeof unit) => {
        setUnit(newUnit);
        onUpdatePortion({
            unit: newUnit,
            quantity
        });
    };

    const renderMacroRow = (preference: MacroPreference) => {
        const value = adjustedMacros[preference.id] || 0;
        const unit = preference.unit;
        
        return (
            <View style={styles.macroRow} key={preference.id}>
                <Text style={styles.macroLabel}>{preference.name}:</Text>
                <Text style={styles.macroValue}>{value}{unit}</Text>
            </View>
        );
    };

    return (
        <AnimatedModal isVisible={true} onClose={onClose} zIndex={100}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{food.food.name}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.quantityInput}
                            value={stringQuantity}
                            onChangeText={handleQuantityChange}
                            keyboardType="numeric"
                        />
                        <UnitSpinner 
                            foodItem={food}
                            unit={unit}
                            setUnit={handleUnitChange}
                        />
                    </View>
                    <View style={styles.macrosContainer}>
                        {preferences.map(renderMacroRow)}
                    </View>
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AnimatedModal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        width: '80%',
        maxWidth: 400,
        marginHorizontal: 'auto',
        marginVertical: 20,
        backgroundColor: Colors.coolgray,
        borderRadius: 10,
        overflow: 'hidden',
    },
    titleContainer: {
        backgroundColor: Colors.gray,
        padding: 15,
        alignItems: 'center',
    },
    title: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '600',
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
        gap: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    quantityInput: {
        backgroundColor: Colors.white,
        width: 80,
        height: 40,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
    },
    macrosContainer: {
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 5,
        padding: 15,
    },
    macroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    macroLabel: {
        fontSize: 16,
        color: Colors.black,
    },
    macroValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
    },
    closeButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
}); 