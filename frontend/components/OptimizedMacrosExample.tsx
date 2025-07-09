import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGlobalMacrosSync } from '@/hooks/useGlobalMacrosSync';
import { calculateAdjustedMacrosOptimized } from '@/utils/optimizedMacroCalculation';
import Colors from '@/styles/colors';

// Example showing ultra-fast incremental macro updates
export default function OptimizedMacrosExample() {
  const { 
    addToMealPlan, 
    subtractFromMealPlan, 
    clearMealPlan 
  } = useGlobalMacrosSync();
  
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);

  // Example foods with their macros
  const availableFoods = [
    {
      id: '1',
      name: 'Chicken Breast',
      macros: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }
    },
    {
      id: '2', 
      name: 'Brown Rice',
      macros: { calories: 216, protein: 5, carbs: 45, fat: 1.8 }
    },
    {
      id: '3',
      name: 'Broccoli',
      macros: { calories: 55, protein: 3.7, carbs: 11, fat: 0.6 }
    }
  ];

  // Clear macros when component unmounts
  useEffect(() => {
    return () => {
      clearMealPlan();
    };
  }, [clearMealPlan]);

  // Ultra-fast add food (just add the macros directly)
  const addFood = (food: any) => {
    setSelectedFoods(prev => [...prev, food]);
    // INSTANT UPDATE - just add the macros
    addToMealPlan(food.macros);
  };

  // Ultra-fast remove food (just subtract the macros directly)
  const removeFood = (foodId: string) => {
    const foodToRemove = selectedFoods.find(f => f.id === foodId);
    if (foodToRemove) {
      setSelectedFoods(prev => prev.filter(f => f.id !== foodId));
      // INSTANT UPDATE - just subtract the macros
      subtractFromMealPlan(foodToRemove.macros);
    }
  };

  // Ultra-fast quantity change (calculate difference and add/subtract)
  const changeQuantity = (foodId: string, newQuantity: number) => {
    const food = selectedFoods.find(f => f.id === foodId);
    if (food) {
      const oldQuantity = food.quantity || 1;
      const quantityDiff = newQuantity - oldQuantity;
      
      if (quantityDiff !== 0) {
        // Calculate the macro difference
        const macroDiff = Object.entries(food.macros).reduce((acc, [key, value]) => {
          acc[key] = (value as number) * quantityDiff;
          return acc;
        }, {} as any);

        // INSTANT UPDATE - just add/subtract the difference
        if (quantityDiff > 0) {
          addToMealPlan(macroDiff);
        } else {
          subtractFromMealPlan(macroDiff);
        }

        // Update local state
        setSelectedFoods(prev => prev.map(f => 
          f.id === foodId ? { ...f, quantity: newQuantity } : f
        ));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ultra-Fast Macro Updates</Text>
      <Text style={styles.subtitle}>
        Changes are reflected instantly in the global display above!
      </Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Foods:</Text>
        {availableFoods.map(food => (
          <Pressable 
            key={food.id}
            style={styles.foodButton}
            onPress={() => addFood(food)}
          >
            <Text style={styles.foodButtonText}>
              + {food.name} ({food.macros.calories} cal)
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Foods:</Text>
        {selectedFoods.map(food => (
          <View key={food.id} style={styles.selectedFood}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodMacros}>
                {food.macros.calories} cal, {food.macros.protein}g protein
              </Text>
            </View>
            <View style={styles.quantityControls}>
              <Pressable 
                style={styles.quantityButton}
                onPress={() => changeQuantity(food.id, (food.quantity || 1) - 1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{food.quantity || 1}</Text>
              <Pressable 
                style={styles.quantityButton}
                onPress={() => changeQuantity(food.id, (food.quantity || 1) + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
              <Pressable 
                style={styles.removeButton}
                onPress={() => removeFood(food.id)}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </Pressable>
            </View>
          </View>
        ))}
        {selectedFoods.length === 0 && (
          <Text style={styles.emptyText}>No foods selected</Text>
        )}
      </View>

      <Text style={styles.note}>
        💡 Performance: Each action only does simple addition/subtraction - no recalculation!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  foodButton: {
    padding: 12,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedFood: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  foodMacros: {
    fontSize: 12,
    color: Colors.gray,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.blue,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.orange,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  note: {
    fontSize: 12,
    color: Colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
}); 