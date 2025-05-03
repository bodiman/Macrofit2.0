import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import Colors from '@/styles/colors';
import { myMacroPreferences } from '@/tempdata';
import MacrosDisplay from './MacroDisplay/MacrosDisplay';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PlusIcon from './Icons/PlusIcon';
import { useAuth } from '@clerk/clerk-expo';
import { useUser } from '@/app/hooks/useUser';
import EditMacroModal from './Preferences/EditMacroModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type MacroGoal = {
    id: string;
    name: string;
    min: number;
    max: number;
    unit: string;
};

type MealPreferences = {
    defaultMealNames: string[];
};

export default function Preferences() {
    const { signOut } = useAuth();
    const { preferences, loading, error, updatePreferences } = useUser();
    const insets = useSafeAreaInsets();
    const tabBarHeight = useBottomTabBarHeight();

    function formattedMacroGoals(): MacroGoal[] {
        // console.log('preferences');
        // console.log("--------------------------------");
        // preferences.forEach(pref => {
        //     console.log(pref);
        // });
        // console.log(preferences);

        return preferences.map(goal => ({
            id: goal.id.toString(),
            name: goal.metric.name,
            min: goal.min_value ?? 0,
            max: goal.max_value ?? 0,
            unit: goal.metric.unit
        }));
    }
    
    const [macroGoals, setMacroGoals] = useState<MacroGoal[]>(formattedMacroGoals());

    const [mealPreferences, setMealPreferences] = useState<MealPreferences>({
        defaultMealNames: ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
    });

    const [editingMacro, setEditingMacro] = useState<MacroGoal | null>(null);

    useEffect(() => {
        setMacroGoals(formattedMacroGoals());
    }, [preferences]);

    const handleMacroChange = async (id: string, newRange: { min: number; max: number; unit: string }) => {
        try {
            const updatedPreferences = preferences.map(pref => {
                if (pref.id.toString() === id) {
                    return {
                        ...pref,
                        min_value: newRange.min,
                        max_value: newRange.max,
                        metric_id: pref.metric_id,
                        metric: pref.metric // Preserve the metric information
                    };
                }
                return pref;
            });
            
            await updatePreferences(updatedPreferences);
            setMacroGoals(formattedMacroGoals());
        } catch (error) {
            console.error('Error updating macro preferences:', error);
        }
    };

    const handleDeleteMacro = (id: string) => {
        // setMacroGoals(prev => prev.filter(goal => goal.id !== id));
    };

    const handleAddMacro = () => {
        
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
            <View style={styles.section}>
                <View style={styles.macroContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Macro Goals</Text>
                        <TouchableOpacity 
                            style={styles.addButton}
                            onPress={handleAddMacro}
                        >
                            <PlusIcon backgroundColor={Colors.black} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.macroCards}>
                        {macroGoals.map(goal => (
                            <MacroCard
                                key={goal.id}
                                goal={goal}
                                onDelete={() => handleDeleteMacro(goal.id)}
                                onPress={() => setEditingMacro(goal)}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
            >
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
                    range={{ min: editingMacro.min, max: editingMacro.max, unit: editingMacro.unit }}
                    onSave={(newRange) => handleMacroChange(editingMacro.id, newRange)}
                />
            )}
        </View>
    );
}

function MacroCard({ goal, onDelete, onPress }: { 
    goal: MacroGoal;
    onDelete: () => void;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardHeader}>
                <TouchableOpacity onPress={onDelete}>
                    <MaterialIcons name="delete" size={20} color={Colors.gray} />
                </TouchableOpacity>
                <Text style={styles.cardTitle}>{goal.name}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.target}>{goal.min}-{goal.max}</Text>
                <Text style={styles.unit}>{goal.unit}</Text>
            </View>
        </TouchableOpacity>
    );
}

function MealNameInput({ value, onChange }: { 
    value: string; 
    onChange: (value: string) => void;
}) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Meal Name"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 50,
    },
    footer: {
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    addButton: {
        width: 25,
        height: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    macroContainer: {
        backgroundColor: "#F0F8FF",
        borderRadius: 12,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        overflow: 'hidden',

        marginVertical: 8,
        borderWidth: 3,
        borderColor: '#DDE4EA',
    },
    macroCards: {
        gap: 1,
    },
    card: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: Colors.gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    target: {
        fontSize: 16,
        fontWeight: '600',
    },
    unit: {
        fontSize: 16,
        color: Colors.gray,
    },
    mealInputs: {
        gap: 8,
    },
    inputContainer: {
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: Colors.orange,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
}); 