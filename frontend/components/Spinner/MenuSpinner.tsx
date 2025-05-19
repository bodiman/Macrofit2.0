import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from '@/styles/colors';
import { Kitchen } from '@shared/types/kitchenTypes';

interface Props {
    menus: Kitchen[];
    selectedMenuId: string;
    onSelect: (menuId: string) => void;
    loading?: boolean;
}

export default function MenuSpinner({ menus, selectedMenuId, onSelect, loading = false }: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedMenu = selectedMenuId === 'all' 
        ? { id: 'all', name: 'All Dining Halls' }
        : menus.find(menu => menu.id === selectedMenuId);

    console.log(menus)
    const allMenus = [
        { id: 'all', name: 'All Dining Halls' },
        ...menus
    ];

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => setModalVisible(true)}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : selectedMenu ? selectedMenu.name : 'Select a dining hall'}
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Select Dining Hall</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={allMenus}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.menuItem,
                                        item.id === selectedMenuId && styles.selectedMenuItem
                                    ]}
                                    onPress={() => {
                                        onSelect(item.id);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.menuItemText,
                                        item.id === selectedMenuId && styles.selectedMenuItemText
                                    ]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    button: {
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    buttonText: {
        fontSize: 16,
        color: Colors.black,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    closeButton: {
        fontSize: 20,
        color: Colors.gray,
        padding: 5,
    },
    menuItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
    },
    selectedMenuItem: {
        backgroundColor: Colors.calgold + '20', // 20 is for opacity
    },
    menuItemText: {
        fontSize: 16,
        color: Colors.black,
    },
    selectedMenuItemText: {
        color: Colors.calgold,
        fontWeight: 'bold',
    },
}); 