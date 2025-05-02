import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Colors from '@/styles/colors';
import { myMacroPreferences } from '@/tempdata';
import MacrosDisplay from './MacroDisplay/MacrosDisplay';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PlusIcon from './Icons/PlusIcon';
import { useAuth } from '@clerk/clerk-expo';
import EditMacroModal from './Preferences/EditMacroModal';

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
    const [macroGoals, setMacroGoals] = useState<MacroGoal[]>([
        { id: '1', name: 'Calories', min: 1800, max: 2200, unit: 'kcal' },
        { id: '2', name: 'Protein', min: 140, max: 180, unit: 'g' },
        { id: '3', name: 'Carbs', min: 200, max: 300, unit: 'g' },
        { id: '4', name: 'Fat', min: 50, max: 80, unit: 'g' }
    ]);

    const [mealPreferences, setMealPreferences] = useState<MealPreferences>({
        defaultMealNames: ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
    });

    const [editingMacro, setEditingMacro] = useState<MacroGoal | null>(null);

    const handleMacroChange = (id: string, newRange: { min: number; max: number; unit: string }) => {
        setMacroGoals(prev => 
            prev.map(goal => 
                goal.id === id ? { ...goal, ...newRange } : goal
            )
        );
    };

    const handleDeleteMacro = (id: string) => {
        setMacroGoals(prev => prev.filter(goal => goal.id !== id));
    };

    const handleAddMacro = () => {
        const newGoal: MacroGoal = {
            id: Date.now().toString(),
            name: 'New Goal',
            min: 0,
            max: 0,
            unit: 'g'
        };
        setMacroGoals(prev => [...prev, newGoal]);
    };

    const handleMealNameChange = (index: number, value: string) => {
        setMealPreferences(prev => {
            const newMealNames = [...prev.defaultMealNames];
            newMealNames[index] = value;
            return {
                ...prev,
                defaultMealNames: newMealNames
            };
        });
    };

    const handleLogout = async () => {
        try {
            await signOut({ redirectUrl: '/landing' });
        } catch (err) {
            console.error('Error signing out:', err);
        }
    };

    return (
        <View style={styles.container}>
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

            {/* <View style={styles.section}>
                <Text style={styles.sectionTitle}>Default Meal Names</Text>
                <View style={styles.mealInputs}>
                    {mealPreferences.defaultMealNames.map((name, index) => (
                        <MealNameInput
                            key={index}
                            value={name}
                            onChange={(value) => handleMealNameChange(index, value)}
                        />
                    ))}
                </View>
            </View> */}

            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

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
        padding: 20,
        // backgroundColor: 'transparent',
        flexGrow: 1,
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