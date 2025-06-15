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
    active: boolean
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
}

export default function KitchenActivationModal({ isVisible, onClose, kitchen, onToggleFood }: Props) {
  const [localFoods, setLocalFoods] = useState(kitchen.foods)

  useEffect(() => {
    setLocalFoods(kitchen.foods)
  }, [kitchen])

  const handleToggleFood = (foodId: string, currentActive: boolean) => {
    // Optimistically update local state
    setLocalFoods(prevFoods => 
      prevFoods.map(food => 
        food.id === foodId ? { ...food, active: !currentActive } : food
      )
    )
    
    // Call the parent's toggle function
    onToggleFood(foodId, currentActive)
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

          <ScrollView style={styles.scrollView}>
            <View style={styles.foodList}>
              {localFoods.map(food => (
                <Pressable
                  key={food.id}
                  style={[styles.foodItem, food.active && styles.foodItemActive]}
                  onPress={() => handleToggleFood(food.id, food.active)}
                >
                  <Text style={[styles.foodName, food.active && styles.foodNameActive]}>
                    {food.name.charAt(0).toUpperCase() + food.name.slice(1)}
                  </Text>
                  <MaterialIcons 
                    name={food.active ? "check-circle" : "add-circle-outline"} 
                    size={20} 
                    color={food.active ? Colors.white : Colors.gray} 
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
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
  },
  closeButton: {
    padding: 4,
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