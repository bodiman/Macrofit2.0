import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UserMealPreference } from '@shared/types/databaseTypes';
import Colors from '@/styles/colors';

type AddEditMealPreferenceModalProps = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<UserMealPreference, 'id' | 'user_id' | 'macroGoals' | 'display_order'>) => void;
    initialData?: UserMealPreference | null;
};

const AddEditMealPreferenceModal: React.FC<AddEditMealPreferenceModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [name, setName] = useState('');
    const [defaultTime, setDefaultTime] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDefaultTime(initialData.default_time);
        } else {
            setName('');
            setDefaultTime('');
        }
    }, [initialData, visible]);

    const handleSubmit = () => {
        if (!name.trim() || !defaultTime.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
            alert('Please enter a valid name and default time (HH:MM).');
            return;
        }

        onSubmit({
            name: name.trim(),
            default_time: defaultTime,
        });
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {initialData ? 'Edit Meal Preference' : 'Add Meal Preference'}
                    </Text>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Meal Name (e.g., Breakfast)"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Default Time (HH:MM, e.g., 08:00)"
                        value={defaultTime}
                        onChangeText={setDefaultTime}
                        keyboardType="numbers-and-punctuation"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'stretch',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.calblue, 
    },
    input: {
        height: 45,
        borderColor: Colors.lightgray,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: Colors.white,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 15,
        minWidth: 100,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.coolgray, 
    },
    saveButton: {
        backgroundColor: Colors.orange, 
    },
    buttonText: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 16,
    },
});

export default AddEditMealPreferenceModal; 