import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native'
import { useState } from 'react'
import { Food } from '@shared/types/foodTypes'
import Colors from '@/styles/colors'
import Slider from '@react-native-community/slider'
import { Picker } from '@react-native-picker/picker'

interface FoodWithQuantity extends Food {
  active: boolean
  quantity: number
  minQuantity: number
  maxQuantity: number
  selectedUnit: string
}

interface Props {
  foods: (Food & { active: boolean })[]
  onSave: (foods: FoodWithQuantity[]) => void
  onBack: () => void
}

export default function QuantityAdjustment({ foods, onSave, onBack }: Props) {
  const [adjustedFoods, setAdjustedFoods] = useState<FoodWithQuantity[]>(
    foods.filter(f => f.active).map(food => ({
      ...food,
      quantity: 1,
      minQuantity: 0,
      maxQuantity: 10,
      selectedUnit: food.servingUnits[0]?.name || 'g'
    }))
  )
  const [editingMin, setEditingMin] = useState<string | null>(null)
  const [editingMax, setEditingMax] = useState<string | null>(null)

  const handleQuantityChange = (foodId: string, value: number) => {
    setAdjustedFoods(prev => prev.map(food => 
      food.id === foodId ? { ...food, quantity: value } : food
    ))
  }

  const handleMinQuantityChange = (foodId: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setAdjustedFoods(prev => prev.map(food => {
        if (food.id === foodId) {
          const newMin = Math.max(0, Math.min(numValue, food.maxQuantity))
          return { 
            ...food, 
            minQuantity: newMin,
            quantity: Math.max(newMin, food.quantity)
          }
        }
        return food
      }))
    }
  }

  const handleMaxQuantityChange = (foodId: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setAdjustedFoods(prev => prev.map(food => {
        if (food.id === foodId) {
          const newMax = Math.max(numValue, food.minQuantity)
          return { 
            ...food, 
            maxQuantity: newMax,
            quantity: Math.min(newMax, food.quantity)
          }
        }
        return food
      }))
    }
  }

  const handleUnitChange = (foodId: string, unit: string) => {
    setAdjustedFoods(prev => prev.map(food => 
      food.id === foodId ? { ...food, selectedUnit: unit } : food
    ))
  }

  const renderMinMaxInput = (food: FoodWithQuantity, isMin: boolean) => {
    const isEditing = isMin ? editingMin === food.id : editingMax === food.id
    const value = isMin ? food.minQuantity : food.maxQuantity
    const setEditing = isMin ? setEditingMin : setEditingMax
    const handleChange = isMin ? handleMinQuantityChange : handleMaxQuantityChange

    if (isEditing) {
      return (
        <TextInput
          style={styles.minMaxInput}
          value={value.toString()}
          onChangeText={(text) => handleChange(food.id, text)}
          onBlur={() => setEditing(null)}
          keyboardType="numeric"
          autoFocus
        />
      )
    }

    return (
      <Pressable onPress={() => setEditing(food.id)}>
        <Text style={styles.minMaxLabel}>{value.toFixed(1)}</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adjust Quantities</Text>
      <Text style={styles.subtitle}>Set minimum and maximum quantities for each food</Text>

      <ScrollView style={styles.foodList}>
        {adjustedFoods.map(food => (
          <View key={food.id} style={styles.foodCard}>
            <Text style={styles.foodName}>{food.name}</Text>
            
            <View style={styles.unitPicker}>
              <Picker
                selectedValue={food.selectedUnit}
                onValueChange={(value: string) => handleUnitChange(food.id, value)}
                style={styles.picker}
              >
                {food.servingUnits.map(unit => (
                  <Picker.Item 
                    key={unit.id} 
                    label={unit.name} 
                    value={unit.name} 
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>Range</Text>
                <View style={styles.minMaxContainer}>
                  {renderMinMaxInput(food, true)}
                  <Text style={styles.minMaxSeparator}>-</Text>
                  {renderMinMaxInput(food, false)}
                </View>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={food.minQuantity}
                maximumValue={food.maxQuantity}
                value={food.quantity}
                onValueChange={(value: number) => handleQuantityChange(food.id, value)}
                minimumTrackTintColor={Colors.green}
                maximumTrackTintColor={Colors.coolgray}
              />
              <Text style={styles.quantityValue}>Quantity: {food.quantity.toFixed(1)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
        <Pressable 
          style={styles.saveButton}
          onPress={() => onSave(adjustedFoods)}
        >
          <Text style={styles.saveButtonText}>Save Meal Plan</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 20,
  },
  foodList: {
    flex: 1,
  },
  foodCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.coolgray,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  unitPicker: {
    borderWidth: 1,
    borderColor: Colors.coolgray,
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 40,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: Colors.gray,
  },
  minMaxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  minMaxLabel: {
    fontSize: 14,
    color: Colors.gray,
  },
  minMaxInput: {
    fontSize: 14,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 4,
    padding: 4,
    width: 60,
    textAlign: 'center',
  },
  minMaxSeparator: {
    fontSize: 14,
    color: Colors.gray,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  quantityValue: {
    fontSize: 14,
    color: Colors.black,
    textAlign: 'right',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: Colors.coolgray,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    backgroundColor: Colors.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}) 