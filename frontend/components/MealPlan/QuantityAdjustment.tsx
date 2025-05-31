import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
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

  const handleQuantityChange = (foodId: string, value: number) => {
    setAdjustedFoods(prev => prev.map(food => 
      food.id === foodId ? { ...food, quantity: value } : food
    ))
  }

  const handleMinQuantityChange = (foodId: string, value: number) => {
    setAdjustedFoods(prev => prev.map(food => 
      food.id === foodId ? { ...food, minQuantity: value } : food
    ))
  }

  const handleMaxQuantityChange = (foodId: string, value: number) => {
    setAdjustedFoods(prev => prev.map(food => 
      food.id === foodId ? { ...food, maxQuantity: value } : food
    ))
  }

  const handleUnitChange = (foodId: string, unit: string) => {
    setAdjustedFoods(prev => prev.map(food => 
      food.id === foodId ? { ...food, selectedUnit: unit } : food
    ))
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
              <Text style={styles.sliderLabel}>Minimum</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                value={food.minQuantity}
                onValueChange={(value: number) => handleMinQuantityChange(food.id, value)}
                minimumTrackTintColor={Colors.blue}
                maximumTrackTintColor={Colors.coolgray}
              />
              <Text style={styles.sliderValue}>{food.minQuantity.toFixed(1)}</Text>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Maximum</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                value={food.maxQuantity}
                onValueChange={(value: number) => handleMaxQuantityChange(food.id, value)}
                minimumTrackTintColor={Colors.blue}
                maximumTrackTintColor={Colors.coolgray}
              />
              <Text style={styles.sliderValue}>{food.maxQuantity.toFixed(1)}</Text>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Quantity</Text>
              <Slider
                style={styles.slider}
                minimumValue={food.minQuantity}
                maximumValue={food.maxQuantity}
                value={food.quantity}
                onValueChange={(value: number) => handleQuantityChange(food.id, value)}
                minimumTrackTintColor={Colors.green}
                maximumTrackTintColor={Colors.coolgray}
              />
              <Text style={styles.sliderValue}>{food.quantity.toFixed(1)}</Text>
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
  sliderLabel: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
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