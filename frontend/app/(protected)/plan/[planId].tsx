import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, InteractionManager } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import Colors from '@/styles/colors'
import { useUser } from '@/app/hooks/useUser'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useState, useEffect, useRef } from 'react'
import { useMenuApi } from '@/lib/api/menu'
import { Food } from '@shared/types/foodTypes'
import Slider from '@react-native-community/slider'
import { Picker } from '@react-native-picker/picker'
import React from 'react'

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

type Tab = 'kitchens' | 'quantities'

export default function MealPlanPage() {
  const { planId } = useLocalSearchParams()
  const { userMealPreferences } = useUser()
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(new Set())
  const [kitchens, setKitchens] = useState<KitchenWithActiveFoods[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('kitchens')
  const [editingMin, setEditingMin] = useState<string | null>(null)
  const [editingMax, setEditingMax] = useState<string | null>(null)
  const [focusedContainer, setFocusedContainer] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState<{ foodId: string, type: 'min' | 'max' } | null>(null)
  const menuApi = useMenuApi()
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
    } catch (error) {
      console.error('Error fetching kitchens:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMealExpansion = (mealId: string) => {
    setExpandedMeals(prev => {
      const newSet = new Set<string>()
      if (!prev.has(mealId)) {
        newSet.add(mealId)
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

  const renderKitchenTab = () => (
    <View style={styles.tabContent}>
      {kitchens.map(kitchen => (
        <View key={kitchen.id} style={styles.kitchenSection}>
          <Text style={styles.kitchenName}>{kitchen.name}</Text>
          <View style={styles.foodList}>
            {kitchen.foods.map(food => (
              <Pressable
                key={food.id}
                style={[styles.foodItem, food.active && styles.foodItemActive]}
                onPress={() => toggleFoodSelection(kitchen.id, food.id, food.active)}
              >
                <Text style={styles.foodName}>{food.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </View>
  )

  const renderQuantitiesTab = () => (
    <View style={styles.tabContent}>
      {kitchens.map(kitchen => (
        <View key={kitchen.id} style={styles.kitchenSection}>
          <Text style={styles.kitchenName}>{kitchen.name}</Text>
          <View style={styles.foodList}>
            {kitchen.foods.filter(food => food.active).map(food => (
              <View key={food.id} style={styles.quantityItem}>
                <View style={styles.foodHeader}>
                  <Text style={styles.foodName}>{food.name.charAt(0).toUpperCase() + food.name.slice(1)}</Text>
                </View>
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
            ))}
          </View>
        </View>
      ))}
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
      <Text style={styles.title}>Meal Plan</Text>
      <Text style={styles.subtitle}>Plan your meals for the day</Text>

      <ScrollView style={styles.mealList}>
        {userMealPreferences.map(meal => (
          <View key={meal.id} style={styles.mealSection}>
            <Pressable 
              style={styles.mealHeader}
              onPress={() => toggleMealExpansion(meal.id)}
            >
              <View style={styles.mealHeaderContent}>
                <View>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealTime}>{meal.default_time}</Text>
                </View>
                <MaterialIcons 
                  name={expandedMeals.has(meal.id) ? "expand-less" : "expand-more"} 
                  size={24} 
                  color={Colors.black} 
                />
              </View>
            </Pressable>

            {expandedMeals.has(meal.id) && (
              <View style={styles.mealContent}>
                <View style={styles.tabs}>
                  <Pressable
                    style={[styles.tab, activeTab === 'kitchens' && styles.activeTab]}
                    onPress={() => setActiveTab('kitchens')}
                  >
                    <Text style={[styles.tabText, activeTab === 'kitchens' && styles.activeTabText]}>
                      Kitchens
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.tab, activeTab === 'quantities' && styles.activeTab]}
                    onPress={() => setActiveTab('quantities')}
                  >
                    <Text style={[styles.tabText, activeTab === 'quantities' && styles.activeTabText]}>
                      Quantities
                    </Text>
                  </Pressable>
                </View>

                {activeTab === 'kitchens' ? renderKitchenTab() : renderQuantitiesTab()}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
    color: Colors.gray,
  },
  mealContent: {
    padding: 16,
    gap: 16,
    backgroundColor: Colors.white,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.coolgray,
    marginBottom: 16,
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
  kitchenSection: {
    gap: 8,
  },
  kitchenName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
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
  foodName: {
    fontSize: 16,
    color: Colors.black,
    flex: 1,
  },
  quantityItem: {
    padding: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
    gap: 8,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityUnitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
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
}) 