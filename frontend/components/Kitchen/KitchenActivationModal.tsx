import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native'
import Colors from '@/styles/colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Food } from '@shared/types/foodTypes'
import { useState, useEffect } from 'react'

interface KitchenWithActiveFoods {
  id: string
  name: string
  description?: string
  foods: (Food & { 
    active: boolean  // database active state
    quantity: number
    minQuantity: number
    maxQuantity: number
    selectedUnit: string
  })[]
}

interface Props {
  isVisible: boolean
  onClose: () => void
  kitchen: KitchenWithActiveFoods
  onToggleFood: (foodId: string, currentActive: boolean) => void
  onSelectedFoodsChange: (selectedFoodIds: string[]) => void
}

export default function KitchenActivationModal({ 
  isVisible, 
  onClose, 
  kitchen, 
  onToggleFood,
  onSelectedFoodsChange 
}: Props) {
  // Track selected foods separately from active state
  const [selectedFoods, setSelectedFoods] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Initialize selected foods from kitchen's active foods
    const initialSelected = new Set(
      kitchen.foods.filter(food => food.active).map(food => food.id)
    )
    setSelectedFoods(initialSelected)
    // Notify parent of initial selection
    onSelectedFoodsChange(Array.from(initialSelected))
  }, [kitchen])

  const handleToggleFood = (foodId: string) => {
    setSelectedFoods(prev => {
      const newSelected = new Set(prev)
      if (newSelected.has(foodId)) {
        newSelected.delete(foodId)
      } else {
        newSelected.add(foodId)
      }
      // Notify parent of selection change
      onSelectedFoodsChange(Array.from(newSelected))
      return newSelected
    })
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{kitchen.name}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={Colors.gray} />
            </Pressable>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Select foods to include in this kitchen
            </Text>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.foodList}>
              {kitchen.foods.map(food => (
                <Pressable
                  key={food.id}
                  style={[styles.foodItem, selectedFoods.has(food.id) && styles.foodItemActive]}
                  onPress={() => handleToggleFood(food.id)}
                >
                  <Text style={[styles.foodName, selectedFoods.has(food.id) && styles.foodNameActive]}>
                    {food.name.charAt(0).toUpperCase() + food.name.slice(1)}
                  </Text>
                  <MaterialIcons 
                    name={selectedFoods.has(food.id) ? "check-circle" : "add-circle-outline"} 
                    size={20} 
                    color={selectedFoods.has(food.id) ? Colors.white : Colors.gray} 
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
  },
  closeButton: {
    padding: 4,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  foodList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 20,
    gap: 4,
  },
  foodItemActive: {
    backgroundColor: Colors.blue,
  },
  foodName: {
    fontSize: 14,
    color: Colors.black,
  },
  foodNameActive: {
    color: Colors.white,
  },
}) 