import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import Colors from '@/styles/colors';
import AnimatedModal from '../AnimatedModal';
import { MacroPreference } from '@/tempdata';

interface AddMacroModalProps {
    visible: boolean;
    onClose: () => void;
    metrics: Array<{ id: string; name: string; unit: string }>;
    preferences: MacroPreference[];
    onSave: (macro: { id: string; name: string; unit: string }, min: number, max: number) => void;
}

export default function AddMacroModal({ visible, onClose, metrics, preferences, onSave }: AddMacroModalProps) {
    const [filter, setFilter] = useState('');

    const availableMacros = metrics
        .filter(macro => macro.name.toLowerCase().includes(filter.toLowerCase()))
        .filter(macro => !preferences.some(pref => pref.id === macro.id));

    const handleMacroPress = (macro: { id: string; name: string; unit: string }) => {
        onSave(macro, 0, 0);
        onClose();
    };

    return (
        <AnimatedModal isVisible={visible} onClose={onClose}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add New Macro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Filter macros..."
                    value={filter}
                    onChangeText={setFilter}
                />
                <FlatList
                    data={availableMacros}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.macroOption}
                            onPress={() => handleMacroPress(item)}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    style={{ maxHeight: 200 }}
                />
                <View style={styles.modalButtons}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
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
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 8,
    },
    macroOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: Colors.orange,
        padding: 10,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
}); 