import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import Colors from '@/styles/colors';
import { MacroPreference } from '@/tempdata';
import { UserMealPreference as UserMealPreferenceType } from '@shared/types/databaseTypes';
import MacrosDisplay from './MacroDisplay/MacrosDisplay';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PlusIcon from './Icons/PlusIcon';
import { useAuth } from '@clerk/clerk-expo';
import { useUser } from '@/app/hooks/useUser';
import EditMacroModal from './Preferences/EditMacroModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useMetrics } from '@/lib/api/metrics';
import AddMacroModal from './Preferences/AddMacroModal';
import AddEditMealPreferenceModal from './Preferences/AddEditMealPreferenceModal';

export default function Preferences() {
    const { signOut } = useAuth();
    const {
        preferences,
        loading: userLoading,
        error: userError,
        updatePreference,
        appUser,
        addPreference,
        deletePreference,
        userMealPreferences,
        fetchUserMealPreferences,
        addUserMealPreference,
        updateUserMealPreference,
        deleteUserMealPreference,
    } = useUser();
    const { metrics, loading: metricsLoading, error: metricsError } = useMetrics();
    const insets = useSafeAreaInsets();
    const tabBarHeight = useBottomTabBarHeight();

    const [editingMacro, setEditingMacro] = useState<MacroPreference | null>(null);
    const [showAddMacroModal, setShowAddMacroModal] = useState(false);
    const [availableMacros, setAvailableMacros] = useState<Array<{ id: string; name: string; unit: string }>>([]);
    const [editingMealPreference, setEditingMealPreference] = useState<UserMealPreferenceType | null>(null);
    const [showAddEditMealPreferenceModal, setShowAddEditMealPreferenceModal] = useState(false);

    useEffect(() => {
        if (metrics) {
            setAvailableMacros(metrics);
        }
    }, [metrics]);

    const handleMacroChange = async (id: string, newRange: { min: number; max: number; unit: string }) => {
        try {
            await updatePreference({ metric_id: id, min_value: newRange.min, max_value: newRange.max });
        } catch (error) {
            console.error('Error updating macro preferences:', error);
        }
    };

    const handleDeleteMacro = async (id: string) => {
        if (!appUser) return;
        try {
            await deletePreference(id);
        } catch (error) {
            console.error('Error deleting macro preference:', error);
        }
    };

    const handleAddMacro = () => {
        setShowAddMacroModal(true);
    };

    const handleAddNewMacro = async (macro: { id: string; name: string; unit: string }, min: number, max: number) => {
        try {
            await addPreference({
                metric_id: macro.id,
                min_value: min,
                max_value: max,
            });
            setShowAddMacroModal(false);
        } catch (err) {
            console.error('Failed to add new macro preference:', err);
        }
    };

    const handleOpenAddMealPreferenceModal = () => {
        setEditingMealPreference(null);
        setShowAddEditMealPreferenceModal(true);
    };

    const handleOpenEditMealPreferenceModal = (preference: UserMealPreferenceType) => {
        setEditingMealPreference(preference);
        setShowAddEditMealPreferenceModal(true);
    };

    const handleDeleteMealPreference = async (preferenceId: string) => {
        try {
            await deleteUserMealPreference(preferenceId);
        } catch (error) {
            console.error('Error deleting meal preference:', error);
        }
    };

    const handleSaveMealPreference = async (data: Omit<UserMealPreferenceType, 'id' | 'user_id' | 'macroGoals' | 'display_order'>) => {
        try {
            if (editingMealPreference) {
                await updateUserMealPreference(editingMealPreference.id, data);
            } else {
                await addUserMealPreference(data);
            }
            setShowAddEditMealPreferenceModal(false);
            setEditingMealPreference(null);
        } catch (error) {
            console.error('Error saving meal preference:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut({ redirectUrl: '/landing' });
        } catch (err) {
            console.error('Error signing out:', err);
        }
    };

    const renderHeader = () => (
        <View>
            <Text style={styles.title}>Preferences</Text>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Daily Macro Goals</Text>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddMacro}>
                        <PlusIcon backgroundColor={Colors.black} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardListContainer}>
                    {preferences.map(goal => (
                        <MacroCard
                            key={goal.id}
                            goal={goal}
                            onDelete={() => handleDeleteMacro(goal.id)}
                            onPress={() => setEditingMacro(goal)}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Meal Definitions</Text>
                    <TouchableOpacity style={styles.addButton} onPress={handleOpenAddMealPreferenceModal}>
                        <PlusIcon backgroundColor={Colors.black} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardListContainer}>
                    {userMealPreferences.map(preference => (
                        <MealPreferenceCard
                            key={preference.id}
                            preference={preference}
                            onEdit={() => handleOpenEditMealPreferenceModal(preference)}
                            onDelete={() => handleDeleteMealPreference(preference.id)}
                        />
                    ))}
                </View>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <FlatList
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            />

            {editingMacro && (
                <EditMacroModal
                    visible={!!editingMacro}
                    onClose={() => setEditingMacro(null)}
                    macroName={editingMacro.name}
                    range={{ min: editingMacro.min ?? 0, max: editingMacro.max ?? 0, unit: editingMacro.unit }}
                    onSave={(newRange) => handleMacroChange(editingMacro.id, newRange)}
                />
            )}

            <AddMacroModal
                visible={showAddMacroModal}
                onClose={() => setShowAddMacroModal(false)}
                metrics={availableMacros}
                preferences={preferences}
                onSave={handleAddNewMacro}
            />

            {showAddEditMealPreferenceModal && (
                <AddEditMealPreferenceModal
                    visible={showAddEditMealPreferenceModal}
                    onClose={() => {
                        setShowAddEditMealPreferenceModal(false);
                        setEditingMealPreference(null);
                    }}
                    onSubmit={handleSaveMealPreference}
                    initialData={editingMealPreference}
                />
            )}
        </View>
    );
}

function MacroCard({ goal, onDelete, onPress }: { 
    goal: MacroPreference;
    onDelete: () => void;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardHeader}>
                <TouchableOpacity onPress={onDelete} style={styles.deleteIconContainer}>
                    <MaterialIcons name="delete" size={20} color={Colors.gray} />
                </TouchableOpacity>
                <Text style={styles.cardTitle}>{goal.name}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.target}>{goal.min ?? 'N/A'} - {goal.max ?? 'N/A'}</Text>
                <Text style={styles.unit}>{goal.unit}</Text>
            </View>
        </TouchableOpacity>
    );
}

function MealPreferenceCard({ preference, onEdit, onDelete }: {
    preference: UserMealPreferenceType;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <View style={styles.card}> 
            <View style={styles.cardLeftContent}> 
                <Text style={styles.cardTitle}>{preference.name}</Text>
                <Text style={styles.mealTimeText}>Default Time: {preference.default_time}</Text>
            </View>
            <View style={styles.cardActions}> 
                <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                    <MaterialIcons name="edit" size={22} color={Colors.blue} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.deleteIconContainer}>
                    <MaterialIcons name="delete" size={22} color={Colors.middleorange} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightgray,
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 50,
    },
    footer: {
        paddingHorizontal: 15,
        marginTop: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        marginTop: 10,
        textAlign: 'center',
        color: Colors.calblue,
    },
    sectionContainer: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 25,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: Colors.coolgray,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.darkgray,
    },
    addButton: {
        padding: 5,
    },
    cardListContainer: {
    },
    card: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: Colors.lightgray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    cardLeftContent: {
        flex: 1,
        gap: 4,
    },
    mealTimeText: {
        fontSize: 14,
        color: Colors.mediumgray,
    },
    mealOrderText: {
        fontSize: 14,
        color: Colors.mediumgray,
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    editButton: {
        padding: 5,
    },
    deleteIconContainer: {
        padding: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    target: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
    },
    unit: {
        fontSize: 16,
        color: Colors.mediumgray,
    },
    logoutButton: {
        backgroundColor: Colors.orange,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
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
        alignItems: 'center',
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
        color: Colors.calblue,
    },
}); 