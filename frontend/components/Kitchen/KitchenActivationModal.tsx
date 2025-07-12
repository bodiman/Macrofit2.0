import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native'
import Colors from '@/styles/colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Food } from '@shared/types/foodTypes'
import { useState, useEffect, useRef } from 'react'
import AnimatedModal from '../AnimatedModal'

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
  selectedFoodIds: string[]
}

export default function KitchenActivationModal({ 
  isVisible, 
  onClose, 
  kitchen, 
  onToggleFood,
  onSelectedFoodsChange,
  selectedFoodIds
}: Props) {
  // Track selected foods separately from active state
  const [selectedFoods, setSelectedFoods] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const prevSelectedFoodIdsRef = useRef<string[]>([])

  useEffect(() => {
    // Check if selectedFoodIds have actually changed
    const currentIds = selectedFoodIds.sort().join(',')
    const prevIds = prevSelectedFoodIdsRef.current.sort().join(',')
    
    if (currentIds !== prevIds) {
      // Initialize selected foods from the passed selectedFoodIds
      const initialSelected = new Set(selectedFoodIds)
      setSelectedFoods(initialSelected)
      prevSelectedFoodIdsRef.current = [...selectedFoodIds]
    }
  }, [selectedFoodIds])

  // Debug logging
  // useEffect(() => {
  //   // console.log('KitchenActivationModal Debug:', {
  //   //   isVisible,
  //   //   kitchenId: kitchen?.id,
  //   //   kitchenName: kitchen?.name,
  //   //   foodsCount: kitchen?.foods?.length || 0,
  //   //   selectedFoodIds,
  //   //   selectedFoodsSize: selectedFoods.size
  //   // })
  // }, [isVisible, kitchen, selectedFoodIds, selectedFoods])

  const handleToggleFood = (foodId: string) => {
    console.log('Toggling food:', foodId)
    setSelectedFoods(prev => {
      const newSelected = new Set(prev)
      if (newSelected.has(foodId)) {
        newSelected.delete(foodId)
      } else {
        newSelected.add(foodId)
      }
      return newSelected
    })
    
    // Notify parent of selection change after state update
    const newSelected = new Set(selectedFoods)
    if (newSelected.has(foodId)) {
      newSelected.delete(foodId)
    } else {
      newSelected.add(foodId)
    }
    onSelectedFoodsChange(Array.from(newSelected))
  }

  // Early return if kitchen is not available
  if (!kitchen) {
    console.log('KitchenActivationModal: No kitchen data available')
    return null
  }

  return (
    <AnimatedModal isVisible={isVisible} onClose={onClose} zIndex={100}>
      <View style={styles.modalContent}>
        {/* Drag handle */}
        <View style={styles.dragHandle} />
        
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{kitchen.name}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color={Colors.gray} />
          </Pressable>
        </View>

        {/* Search bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search foods..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {selectedFoods.size} foods selected
          </Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          scrollEnabled={true}
          bounces={false}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.foodList}>
            {kitchen.foods && kitchen.foods.length > 0 ? (
              (() => {
                // Filter foods by search query
                const filteredFoods = searchQuery.trim().length === 0
                  ? kitchen.foods
                  : kitchen.foods.filter(food =>
                      food.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
                    )
                // Group foods by brand
                const foodsByBrand = filteredFoods.reduce((acc, food) => {
                  const brand = food.brand || 'Other';
                  if (!acc[brand]) {
                    acc[brand] = [];
                  }
                  acc[brand].push(food);
                  return acc;
                }, {} as Record<string, typeof kitchen.foods>);

                return Object.entries(foodsByBrand).map(([brand, foods]) => (
                  <View key={brand} style={styles.brandSection}>
                    <Text style={styles.brandTitle}>{brand}</Text>
                    <View style={styles.brandFoods}>
                      {foods.map(food => (
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
                  </View>
                ));
              })()
            ) : (
              <Text style={styles.noFoodsText}>No foods available in this kitchen</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </AnimatedModal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.coolgray,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.coolgray,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
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
    minHeight: 200,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  foodList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 20,
    gap: 4,
    minHeight: 40,
    maxWidth: "100%",
    marginRight: 8,
    marginBottom: 8,
  },
  foodItemActive: {
    backgroundColor: Colors.blue,
  },
  foodName: {
    fontSize: 14,
    color: Colors.black,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  foodNameActive: {
    color: Colors.white,
  },
  noFoodsText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    padding: 20,
  },
  brandSection: {
    width: '100%',
    marginRight: 16,
    marginBottom: 16,
    flexGrow: 1,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  brandFoods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  searchBarContainer: {
    paddingHorizontal: 0,
    paddingBottom: 8,
  },
  searchBar: {
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: Colors.black,
    marginBottom: 0,
  },
}) 