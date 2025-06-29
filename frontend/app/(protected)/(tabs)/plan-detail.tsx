import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, InteractionManager } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import Colors from '@/styles/colors'
import { useUser } from '@/app/hooks/useUser'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useState, useEffect, useRef } from 'react'
import { useMenuApi } from '@/lib/api/menu'
import { useOptimizationApi } from '@/lib/api/optimization'
import { Food } from '@shared/types/foodTypes'
import Slider from '@react-native-community/slider'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import KitchenActivationModal from '@/components/Kitchen/KitchenActivationModal'
import eventBus from '@/app/storage/eventEmitter'
import useMacros from '@/app/hooks/useMacros'
import { Swipeable } from 'react-native-gesture-handler'

interface Kitchen {
  id: string
  name: string
  description?: string
  foods: Food[]
}

interface KitchenWithActiveFoods extends Kitchen {
  foods: (Food & { 
    active: boolean
    quantity: number
    minQuantity: number
    maxQuantity: number
    selectedUnit: string
  })[]
}

type Tab = 'kitchen' | 'quantity'

export default function PlanDetailPage() {
  const { planId } = useLocalSearchParams()
  const { userMealPreferences, preferences } = useUser()
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(new Set())
  const [expandedFoods, setExpandedFoods] = useState<Set<string>>(new Set())
  const [kitchens, setKitchens] = useState<KitchenWithActiveFoods[]>([])
  const [selectedKitchens, setSelectedKitchens] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('kitchen')
  const [editingMin, setEditingMin] = useState<string | null>(null)
  const [editingMax, setEditingMax] = useState<string | null>(null)
  const [focusedContainer, setFocusedContainer] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState<{ foodId: string, type: 'min' | 'max' } | null>(null)
  const [selectedKitchen, setSelectedKitchen] = useState<KitchenWithActiveFoods | null>(null)
  const [showKitchenModal, setShowKitchenModal] = useState(false)
  const [selectedFoods, setSelectedFoods] = useState<Map<string, Set<string>>>(new Map())
  const [activeMealId, setActiveMealId] = useState<string | null>(null)
  const [activeMeals, setActiveMeals] = useState<Set<string>>(new Set())
  const [currentModalMealId, setCurrentModalMealId] = useState<string | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const menuApi = useMenuApi()
  const optimizationApi = useOptimizationApi()
  const minInputRef = useRef<TextInput>(null)
  const maxInputRef = useRef<TextInput>(null)
  const nextFocusedInputRef = useRef<{ foodId: string, type: 'min' | 'max' } | null>(null)

  useEffect(() => {
    fetchKitchens()
  }, [])

  const fetchKitchens = async () => {
    try {
      const data = await menuApi.getMenus()
      const kitchensWithActiveFoods = await Promise.all(
        data.map(async (kitchen) => {
          const foods = await menuApi.getMenuFoods(kitchen.id)
          return {
            ...kitchen,
            foods: foods.map(food => ({
              ...food.food,
              active: food.active,
              quantity: 1,
              minQuantity: 0,
              maxQuantity: 10,
              selectedUnit: food.food.servingUnits[0]?.name || 'g'
            }))
          }
        })
      )
      setKitchens(kitchensWithActiveFoods)
      
      // Initialize selected foods based on active state when page loads
      const initialSelectedFoods = new Map<string, Set<string>>()
      // Initialize each meal with an empty set of selected foods
      userMealPreferences.forEach(meal => {
        initialSelectedFoods.set(meal.id, new Set<string>())
      })
      setSelectedFoods(initialSelectedFoods)
      
      // Expand all meals by default
      const allMealIds = new Set(userMealPreferences.map(meal => meal.id))
      setExpandedMeals(allMealIds)
      setActiveMeals(allMealIds)
    } catch (error) {
      console.error('Error fetching kitchens:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMealExpansion = (mealId: string) => {
    setExpandedMeals(prev => {
      const newSet = new Set(prev)
      if (newSet.has(mealId)) {
        newSet.delete(mealId)
        // Remove from active meals when collapsed
        setActiveMeals(prevActive => {
          const newActive = new Set(prevActive)
          newActive.delete(mealId)
          return newActive
        })
      } else {
        newSet.add(mealId)
        // Add to active meals when expanded
        setActiveMeals(prevActive => {
          const newActive = new Set(prevActive)
          newActive.add(mealId)
          return newActive
        })
      }
      return newSet
    })
  }

  const toggleFoodSelection = async (kitchenId: string, foodId: string, currentActive: boolean) => {
    try {
      const updatedFood = await menuApi.toggleFoodActive(kitchenId, foodId, !currentActive)
      setKitchens(prev => prev.map(kitchen => {
        if (kitchen.id === kitchenId) {
          return {
            ...kitchen,
            foods: kitchen.foods.map(food => 
              food.id === foodId ? { ...food, active: !currentActive } : food
            )
          }
        }
        return kitchen
      }))
    } catch (error) {
      console.error('Error toggling food active state:', error)
    }
  }

  const handleQuantityChange = (kitchenId: string, foodId: string, value: number) => {
    setKitchens(prev => prev.map(kitchen => {
      if (kitchen.id === kitchenId) {
        return {
          ...kitchen,
          foods: kitchen.foods.map(food => 
            food.id === foodId ? { ...food, quantity: value } : food
          )
        }
      }
      return kitchen
    }))
  }

  const handleMinQuantityChange = (kitchenId: string, foodId: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setKitchens(prev => prev.map(kitchen => {
        if (kitchen.id === kitchenId) {
          return {
            ...kitchen,
            foods: kitchen.foods.map(food => {
              if (food.id === foodId) {
                const newMin = Math.max(0, Math.min(numValue, food.maxQuantity))
                return { 
                  ...food, 
                  minQuantity: newMin,
                  quantity: Math.max(newMin, food.quantity)
                }
              }
              return food
            })
          }
        }
        return kitchen
      }))
    }
  }

  const handleMaxQuantityChange = (kitchenId: string, foodId: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setKitchens(prev => prev.map(kitchen => {
        if (kitchen.id === kitchenId) {
          return {
            ...kitchen,
            foods: kitchen.foods.map(food => {
              if (food.id === foodId) {
                const newMax = Math.max(numValue, food.minQuantity)
                return { 
                  ...food, 
                  maxQuantity: newMax,
                  quantity: Math.min(newMax, food.quantity)
                }
              }
              return food
            })
          }
        }
        return kitchen
      }))
    }
  }

  const handleUnitChange = (kitchenId: string, foodId: string, unit: string) => {
    setKitchens(prev => prev.map(kitchen => {
      if (kitchen.id === kitchenId) {
        return {
          ...kitchen,
          foods: kitchen.foods.map(food => 
            food.id === foodId ? { ...food, selectedUnit: unit } : food
          )
        }
      }
      return kitchen
    }))
  }

  const handleInputFocus = (foodId: string, type: 'min' | 'max') => {
    nextFocusedInputRef.current = { foodId, type }
    setFocusedInput({ foodId, type })
    setFocusedContainer(foodId)
    setEditingMin(foodId)
    setEditingMax(foodId)
  }

  const handleInputBlur = (foodId: string, type: 'min' | 'max') => {
    InteractionManager.runAfterInteractions(() => {
      const nextInput = nextFocusedInputRef.current
      const isSwitchingToOtherInput = nextInput?.foodId === foodId && nextInput?.type !== type
      
      if (!isSwitchingToOtherInput) {
        setFocusedInput(null)
        setFocusedContainer(null)
        setEditingMin(null)
        setEditingMax(null)
      }
      
      nextFocusedInputRef.current = null
    })
  }

  const handleMinClick = (foodId: string) => {
    handleInputFocus(foodId, 'min')
    requestAnimationFrame(() => {
      minInputRef.current?.focus()
    })
  }

  const handleMaxClick = (foodId: string) => {
    handleInputFocus(foodId, 'max')
    requestAnimationFrame(() => {
      maxInputRef.current?.focus()
    })
  }

  const toggleKitchenSelection = (kitchenId: string) => {
    setSelectedKitchens(prev => {
      const newSet = new Set(prev)
      if (newSet.has(kitchenId)) {
        newSet.delete(kitchenId)
      } else {
        newSet.add(kitchenId)
      }
      return newSet
    })
  }

  const handleKitchenPress = (kitchen: KitchenWithActiveFoods, mealId: string) => {
    console.log('handleKitchenPress called:', {
      kitchenId: kitchen.id,
      kitchenName: kitchen.name,
      foodsCount: kitchen.foods.length,
      mealId
    })
    setSelectedKitchen(kitchen)
    setCurrentModalMealId(mealId)
    setShowKitchenModal(true)
  }

  const handleCloseKitchenModal = () => {
    console.log('handleCloseKitchenModal called')
    setShowKitchenModal(false)
    setSelectedKitchen(null)
    setCurrentModalMealId(null)
  }

  const handleSelectedFoodsChange = (foodIds: string[]) => {
    console.log('handleSelectedFoodsChange called:', foodIds)
    if (!currentModalMealId) return
    
    const newSelectedFoods = new Set<string>(foodIds)
    setSelectedFoods(prev => {
      const newMap = new Map<string, Set<string>>(prev)
      newMap.set(currentModalMealId, newSelectedFoods)
      return newMap
    })
  }

  const getSelectedFoodsForMeal = (mealId: string) => {
    return selectedFoods.get(mealId) || new Set<string>()
  }

  const getAllSelectedFoodServings = () => {
    const allServings: any[] = []
    
    // Get all selected foods from all meals (not just active ones)
    userMealPreferences.forEach(meal => {
      const selectedFoodIds = selectedFoods.get(meal.id) || new Set<string>()
      selectedFoodIds.forEach(foodId => {
        // Find the food in kitchens
        for (const kitchen of kitchens) {
          const food = kitchen.foods.find(f => f.id === foodId)
          if (food) {
            // Create a serving object with the selected quantity and unit
            const serving = {
              id: food.id,
              food_id: food.id,
              quantity: food.quantity,
              unit: {
                id: food.selectedUnit,
                name: food.selectedUnit,
                food_id: food.id,
                grams: food.servingUnits.find(u => u.name === food.selectedUnit)?.grams || 1
              },
              food: food
            }
            allServings.push(serving)
            break // Found the food, no need to check other kitchens
          }
        }
      })
    })
    
    return allServings
  }

  const mealPlanMacros = useMacros(getAllSelectedFoodServings())

  // Emit meal plan macros to AppHeader whenever they change
  useEffect(() => {
    eventBus.emit('mealPlanMacrosUpdated', mealPlanMacros)
  }, [mealPlanMacros])

  const optimizeQuantities = async () => {
    const selectedFoods = getAllSelectedFoodServings()
    if (selectedFoods.length === 0) {
      alert('No foods selected for optimization')
      return
    }

    setIsOptimizing(true)
    
    try {
      // Get user preferences
      const userPrefs = preferences || []
      
      if (userPrefs.length === 0) {
        alert('No nutritional preferences set. Please set your preferences first.')
        return
      }
      
      // Get all unique macro names from user preferences
      const macroNames = userPrefs.map(pref => pref.id)
      
      // Convert selected foods to simplified numerical format
      const foods = selectedFoods.map(food => {
        // Find the food in kitchens to get min/max constraints
        let minQuantity = 0;
        let maxQuantity = 10;
        
        for (const kitchen of kitchens) {
          const kitchenFood = kitchen.foods.find(f => f.id === food.id);
          if (kitchenFood) {
            minQuantity = kitchenFood.minQuantity;
            maxQuantity = kitchenFood.maxQuantity;
            break;
          }
        }
        
        // Extract macro values in the same order as macroNames
        const macroValues = macroNames.map(macroName => {
          return (food.food.macros as any)?.[macroName] || 0;
        });
        
        return {
          macroValues,
          unitGrams: food.unit.grams,
          quantity: food.quantity,
          minQuantity,
          maxQuantity
        }
      })
      
      // Convert preferences to the simplified format
      const optimizationPreferences = userPrefs.map(pref => ({
        min_value: pref.min || 0,
        max_value: pref.max || Infinity
      }))
      
      console.log('Sending optimization request:', {
        foods,
        preferences: optimizationPreferences,
        macroNames
      })
      
      // Call backend optimization with simplified data
      const result = await optimizationApi.optimizeQuantities({
        foods,
        preferences: optimizationPreferences,
        macroNames
      })
      
      console.log('Optimization result:', result)
      
      // Apply optimized quantities
      setKitchens(prev => prev.map(kitchen => ({
        ...kitchen,
        foods: kitchen.foods.map(food => {
          const foodIndex = selectedFoods.findIndex(f => f.id === food.id)
          if (foodIndex !== -1) {
            return { ...food, quantity: result.optimizedQuantities[foodIndex] }
          }
          return food
        })
      })))
      
      alert(`Quantities optimized successfully! Final error: ${result.error.toFixed(4)}`)
    } catch (error) {
      console.error('Optimization error:', error)
      alert('Failed to optimize quantities. Please try again.')
    } finally {
      setIsOptimizing(false)
    }
  }

  const toggleFoodExpansion = (foodId: string) => {
    setExpandedFoods(prev => {
      const newSet = new Set<string>()
      if (!prev.has(foodId)) {
        newSet.add(foodId)
      }
      return newSet
    })
  }

  const handleDeleteFood = (mealId: string, foodId: string) => {
    setSelectedFoods(prev => {
      const newMap = new Map<string, Set<string>>(prev)
      const mealSelectedFoods = newMap.get(mealId) || new Set<string>()
      const newSelectedFoods = new Set<string>(mealSelectedFoods)
      newSelectedFoods.delete(foodId)
      newMap.set(mealId, newSelectedFoods)
      return newMap
    })
  }

  const renderKitchenTab = (mealId: string) => {
    // Debug logging for modal rendering
    if (selectedKitchen && showKitchenModal) {
      console.log('Rendering KitchenActivationModal with props:', {
        isVisible: showKitchenModal,
        kitchenId: selectedKitchen.id,
        kitchenName: selectedKitchen.name,
        foodsCount: selectedKitchen.foods.length,
        currentModalMealId,
        selectedFoodIds: currentModalMealId ? Array.from(getSelectedFoodsForMeal(currentModalMealId)) : []
      })
    }

    return (
      <View style={styles.tabContent}>
        <View style={styles.kitchenList}>
          {kitchens.map(kitchen => (
            <Pressable
              key={kitchen.id}
              style={styles.kitchenItem}
              onPress={() => handleKitchenPress(kitchen, mealId)}
            >
              <Text style={styles.kitchenName}>{kitchen.name}</Text>
              <MaterialIcons 
                name="chevron-right" 
                size={24} 
                color={Colors.gray} 
              />
            </Pressable>
          ))}
        </View>
      </View>
    )
  }

  const renderQuantityTab = (mealId: string) => (
    <View style={styles.tabContent}>
      <View style={styles.kitchenList}>
        {kitchens.map(kitchen => {
          const selectedFoodsForKitchen = kitchen.foods.filter(food => 
            getSelectedFoodsForMeal(mealId).has(food.id)
          )
          
          return (
            <View key={kitchen.id} style={styles.kitchenSection}>
              <Text style={styles.kitchenName}>{kitchen.name}</Text>
              {selectedFoodsForKitchen.length === 0 ? (
                <Text style={styles.noFoodsMessage}>No foods selected for this kitchen</Text>
              ) : (
                <View style={styles.foodList}>
                  {selectedFoodsForKitchen.map(food => {
                    const isExpanded = expandedFoods.has(food.id);
                    const foodCard = (
                      <View style={styles.quantityItem}>
                        <Pressable 
                          style={styles.foodHeader}
                          onPress={() => toggleFoodExpansion(food.id)}
                        >
                          <View style={styles.foodHeaderContent}>
                            <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="tail">
                              {food.name.charAt(0).toUpperCase() + food.name.slice(1)}
                            </Text>
                            {!isExpanded && (
                              <Text style={styles.summaryText} numberOfLines={1} ellipsizeMode="tail">
                                {food.quantity.toFixed(1)} {food.selectedUnit}
                              </Text>
                            )}
                            <MaterialIcons 
                              name={isExpanded ? "chevron-up" : "chevron-down"} 
                              size={20} 
                              color={Colors.gray} 
                            />
                          </View>
                        </Pressable>

                        {isExpanded && (
                          <View style={styles.expandedContent}>
                            <View style={styles.quantityUnitRow}>
                              <Text style={styles.quantityText}>{food.quantity.toFixed(1)}</Text>
                              <View style={styles.unitPicker}>
                                <Picker
                                  selectedValue={food.selectedUnit}
                                  onValueChange={(value: string) => handleUnitChange(kitchen.id, food.id, value)}
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
                            </View>

                            <View style={styles.sliderContainer}>
                              {focusedContainer === food.id ? (
                                <View style={styles.rangeInputContainer}>
                                  <TextInput
                                    ref={minInputRef}
                                    style={[
                                      styles.rangeInput,
                                      focusedInput?.foodId === food.id && focusedInput?.type === 'min' && styles.rangeInputFocused,
                                      { outlineWidth: 0 } as any
                                    ]}
                                    value={food.minQuantity.toString()}
                                    onChangeText={(text) => handleMinQuantityChange(kitchen.id, food.id, text)}
                                    keyboardType="numeric"
                                    selectionColor={Colors.blue}
                                    underlineColorAndroid="transparent"
                                    onFocus={() => handleInputFocus(food.id, 'min')}
                                    onBlur={() => handleInputBlur(food.id, 'min')}
                                    autoCorrect={false}
                                    spellCheck={false}
                                  />
                                  <Text style={styles.rangeSeparator}>to</Text>
                                  <TextInput
                                    ref={maxInputRef}
                                    style={[
                                      styles.rangeInput,
                                      focusedInput?.foodId === food.id && focusedInput?.type === 'max' && styles.rangeInputFocused,
                                      { outlineWidth: 0 } as any
                                    ]}
                                    value={food.maxQuantity.toString()}
                                    onChangeText={(text) => handleMaxQuantityChange(kitchen.id, food.id, text)}
                                    keyboardType="numeric"
                                    selectionColor={Colors.blue}
                                    underlineColorAndroid="transparent"
                                    onFocus={() => handleInputFocus(food.id, 'max')}
                                    onBlur={() => handleInputBlur(food.id, 'max')}
                                    autoCorrect={false}
                                    spellCheck={false}
                                  />
                                </View>
                              ) : (
                                <React.Fragment>
                                  <View style={styles.sliderRow}>
                                    <Pressable 
                                      onPress={() => handleMinClick(food.id)}
                                      style={styles.minMaxLabelContainer}
                                    >
                                      <Text style={styles.minMaxLabel}>{food.minQuantity.toFixed(1)}</Text>
                                    </Pressable>
                                    <Slider
                                      style={styles.slider}
                                      minimumValue={food.minQuantity}
                                      maximumValue={food.maxQuantity}
                                      value={food.quantity}
                                      onValueChange={(value) => handleQuantityChange(kitchen.id, food.id, value)}
                                      minimumTrackTintColor={Colors.green}
                                      maximumTrackTintColor={Colors.lightgray}
                                    />
                                    <Pressable 
                                      onPress={() => handleMaxClick(food.id)}
                                      style={styles.minMaxLabelContainer}
                                    >
                                      <Text style={styles.minMaxLabel}>{food.maxQuantity.toFixed(1)}</Text>
                                    </Pressable>
                                  </View>
                                </React.Fragment>
                              )}
                            </View>
                          </View>
                        )}
                      </View>
                    );

                    return isExpanded ? (
                      <View key={food.id}>
                        {foodCard}
                      </View>
                    ) : (
                      <Swipeable
                        key={food.id}
                        renderLeftActions={() => (
                          <View style={styles.deleteAction}>
                            <Pressable
                              style={styles.deleteButton}
                              onPress={() => handleDeleteFood(mealId, food.id)}
                            >
                              <MaterialIcons name="delete" size={24} color={Colors.white} />
                            </Pressable>
                          </View>
                        )}
                      >
                        {foodCard}
                      </Swipeable>
                    );
                  })}
                </View>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading kitchens...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Meal Plan</Text>
      <Text style={styles.subtitle}>Plan your meals for the day</Text> */}

      <ScrollView style={styles.mealList} contentContainerStyle={styles.mealListContent}>
        {userMealPreferences.map(meal => (
          <View key={meal.id} style={styles.mealSection}>
            <Pressable 
              style={styles.mealHeader}
              onPress={() => {
                toggleMealExpansion(meal.id)
                setActiveMealId(meal.id)
              }}
            >
              <View style={styles.mealHeaderContent}>
                <View>
                  <Text style={styles.mealName}>{meal.name}</Text>
                </View>
                <MaterialIcons 
                  name={expandedMeals.has(meal.id) ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color={Colors.black} 
                />
              </View>
            </Pressable>

            {expandedMeals.has(meal.id) && (
              <View style={styles.mealContent}>
                <View style={styles.tabs}>
                  <Pressable
                    style={[styles.tab, activeTab === 'kitchen' && styles.activeTab]}
                    onPress={() => setActiveTab('kitchen')}
                  >
                    <Text style={[styles.tabText, activeTab === 'kitchen' && styles.activeTabText]}>
                      Kitchen
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.tab, activeTab === 'quantity' && styles.activeTab]}
                    onPress={() => setActiveTab('quantity')}
                  >
                    <Text style={[styles.tabText, activeTab === 'quantity' && styles.activeTabText]}>
                      Quantities
                    </Text>
                  </Pressable>
                </View>

                {activeTab === 'kitchen' ? renderKitchenTab(meal.id) : renderQuantityTab(meal.id)}
              </View>
            )}
          </View>
        ))}
        
        {/* Optimize button at the bottom of the scrollable content */}
        <View style={styles.optimizeContainer}>
          <Pressable 
            style={[styles.optimizeButton, isOptimizing && styles.optimizeButtonDisabled]}
            onPress={optimizeQuantities}
            disabled={isOptimizing}
          >
            <Text style={[styles.optimizeButtonText, isOptimizing && styles.optimizeButtonTextDisabled]}>
              {isOptimizing ? 'Optimizing...' : 'Optimize Quantities'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Kitchen Activation Modal - moved to root level for full screen display */}
      {selectedKitchen && (
        <KitchenActivationModal
          isVisible={showKitchenModal}
          onClose={handleCloseKitchenModal}
          kitchen={selectedKitchen}
          onToggleFood={(foodId, currentActive) => 
            toggleFoodSelection(selectedKitchen.id, foodId, currentActive)
          }
          onSelectedFoodsChange={handleSelectedFoodsChange}
          selectedFoodIds={currentModalMealId ? Array.from(getSelectedFoodsForMeal(currentModalMealId)) : []}
        />
      )}
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
  mealList: {
    flex: 1,
  },
  mealListContent: {
    gap: 16,
  },
  mealSection: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.coolgray,
  },
  mealHeader: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  mealHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 0,
  },
  mealTime: {
    fontSize: 14,
    color: Colors.gray,
  },
  mealContent: {
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: Colors.white,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.coolgray,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.blue,
  },
  tabText: {
    fontSize: 16,
    color: Colors.gray,
  },
  activeTabText: {
    color: Colors.blue,
    fontWeight: '600',
  },
  tabContent: {
    gap: 16,
  },
  kitchenList: {
    gap: 8,
  },
  kitchenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
  },
  kitchenName: {
    fontSize: 16,
    color: Colors.black,
    // textDecorationLine: 'underline',
    fontWeight: '600',
  },
  selectedKitchensSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  kitchenSection: {
    gap: 8,
    marginBottom: 16,
  },
  kitchenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeButton: {
    padding: 4,
  },
  foodList: {
    gap: 8,
  },
  foodItem: {
    padding: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodItemActive: {
    backgroundColor: Colors.green,
  },
  foodHeader: {
    width: '100%',
  },
  foodHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.black,
    flex: 1,
    marginRight: 8,
  },
  quantityItem: {
    padding: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
    gap: 8,
  },
  quantityText: {
    fontSize: 16,
    color: Colors.black,
  },
  unitPicker: {
    borderWidth: 1,
    borderColor: Colors.coolgray,
    borderRadius: 8,
    width: 100,
  },
  picker: {
    height: 35,
    margin: -8,
  },
  sliderContainer: {
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  minMaxLabel: {
    fontSize: 14,
    color: Colors.gray,
    minWidth: 40,
    textAlign: 'center',
  },
  rangeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
    alignSelf: 'flex-start',
    borderWidth: 0,
  },
  rangeInput: {
    fontSize: 14,
    color: Colors.black,
    borderBottomWidth: 3,
    borderBottomColor: Colors.black,
    padding: 4,
    width: 60,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  rangeInputFocused: {
    borderBottomColor: Colors.blue,
  },
  rangeSeparator: {
    fontSize: 14,
    color: Colors.gray,
  },
  minMaxLabelContainer: {
    minWidth: 40,
    alignItems: 'center',
    padding: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandedContent: {
    padding: 12,
    gap: 8,
  },
  quantityUnitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  summaryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.gray,
    flex: 1,
    textAlign: 'right',
    marginRight: 8,
  },
  noFoodsMessage: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 8,
  },
  optimizeContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 16,
    marginBottom: 20,
  },
  optimizeButton: {
    padding: 12,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    alignItems: 'center',
  },
  optimizeButtonDisabled: {
    backgroundColor: Colors.lightgray,
  },
  optimizeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  optimizeButtonTextDisabled: {
    color: Colors.gray,
  },
  deleteAction: {
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: Colors.orange,
    borderRadius: 8,
  },
}) 