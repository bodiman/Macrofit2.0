import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import Colors from '@/styles/colors';
import AnimatedModal from '../AnimatedModal';

type MacroRange = {
    min: number;
    max: number;
    unit: string;
};

type Props = {
    visible: boolean;
    onClose: () => void;
    macroName: string;
    range: MacroRange;
    onSave: (range: MacroRange) => void;
};

export default function EditMacroModal({ visible, onClose, macroName, range, onSave }: Props) {
    const [min, setMin] = useState(range.min.toString());
    const [max, setMax] = useState(range.max.toString());

    const handleSave = () => {
        const newRange = {
            min: parseInt(min) || 0,
            max: parseInt(max) || 0,
            unit: range.unit
        };
        onSave(newRange);
        onClose();
    };

    return (
        <AnimatedModal isVisible={visible} onClose={onClose}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Edit {macroName}</Text>
                
                <View style={styles.inputContainer}>
                    <View style={styles.rangeInput}>
                        <Text style={styles.label}>Minimum</Text>
                        <TextInput
                            style={styles.input}
                            value={min}
                            onChangeText={setMin}
                            keyboardType="numeric"
                            placeholder="Min"
                        />
                    </View>
                    
                    <View style={styles.rangeInput}>
                        <Text style={styles.label}>Maximum</Text>
                        <TextInput
                            style={styles.input}
                            value={max}
                            onChangeText={setMax}
                            keyboardType="numeric"
                            placeholder="Max"
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.cancelButton]} 
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.button, styles.saveButton]} 
                        onPress={handleSave}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AnimatedModal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 20,
        width: '80%',
        maxWidth: 400,
        marginTop: 20,
        marginHorizontal: 'auto',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 20,
    },
    rangeInput: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: Colors.gray,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.gray,
    },
    saveButton: {
        backgroundColor: Colors.blue,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
}); 