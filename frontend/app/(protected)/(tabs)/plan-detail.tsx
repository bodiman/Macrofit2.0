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
import { useFoodSearchApi } from '@/lib/api/foodSearch'

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

// Filter types
interface Filter {
  id: string
  type: 'kitchen' | 'calories' | 'protein' | 'carbs' | 'fat' | 'name' | 'macro'
  operator: 'equals' | 'contains' | 'less_than' | 'greater_than' | 'between'
  value: string | number | [number, number]
  label: string
}

type FlowStep = 'filters' | 'quantities'

export default function PlanDetailPage() {
  const { planId } = useLocalSearchParams()
  const { userMealPreferences, preferences } = useUser()
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(new Set())
  const [expandedFoods, setExpandedFoods] = useState<Set<string>>(new Set())
  const [kitchens, setKitchens] = useState<KitchenWithActiveFoods[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMin, setEditingMin] = useState<string | null>(null)
  const [editingMax, setEditingMax] = useState<string | null>(null)
  const [focusedContainer, setFocusedContainer] = useState<string | null>(null)
  const [focusedInput, setFocusedInput] = useState<{ foodId: string, type: 'min' | 'max' } | null>(null)
  const [selectedFoods, setSelectedFoods] = useState<Map<string, Set<string>>>(new Map())
  const [activeMealId, setActiveMealId] = useState<string | null>(null)
  const [activeMeals, setActiveMeals] = useState<Set<string>>(new Set())
  const [isOptimizing, setIsOptimizing] = useState(false)
  
  // Flow state
  const [currentStep, setCurrentStep] = useState<FlowStep>('filters')
  const [showSelectionModal, setShowSelectionModal] = useState(false)
  const [currentModalMealId, setCurrentModalMealId] = useState<string | null>(null)
  
  const menuApi = useMenuApi()
  const optimizationApi = useOptimizationApi()
  const minInputRef = useRef<TextInput>(null)
  const maxInputRef = useRef<TextInput>(null)
  const nextFocusedInputRef = useRef<{ foodId: string, type: 'min' | 'max' } | null>(null)
  const foodSearchApi = useFoodSearchApi()

  const [mealFoodQuantities, setMealFoodQuantities] = useState<
    Map<string, Map<string, { quantity: number; minQuantity: number; maxQuantity: number; selectedUnit: string }>>
  >(new Map())

  useEffect(() => {
    fetchKitchens()
  }, [])

  // Apply filters whenever filters change
  useEffect(() => {
    // No longer needed since we're showing all foods
  }, [kitchens])

  const fetchKitchens = async () => {
    try {
      const allFoods = await foodSearchApi.getAllFoods()
      
      // Create a single "All Foods" kitchen with all foods
      const allFoodsKitchen = {
        id: 'all-foods',
        name: 'All Foods',
        description: 'All available foods',
        foods: allFoods.map(food => ({
          ...food,
          active: true,
          quantity: 1,
          minQuantity: 0,
          maxQuantity: 10,
          selectedUnit: food.servingUnits[0]?.name || 'g'
        }))
      }
      
      setKitchens([allFoodsKitchen])
      
      // Initialize selected foods for each meal
      const initialSelectedFoods = new Map<string, Set<string>>()
      
      userMealPreferences.forEach(meal => {
        initialSelectedFoods.set(meal.id, new Set<string>())
      })
      
      setSelectedFoods(initialSelectedFoods)
      
      // Expand all meals by default
      const allMealIds = new Set(userMealPreferences.map(meal => meal.id))
      setExpandedMeals(allMealIds)
      setActiveMeals(allMealIds)
    } catch (error) {
      console.error('Error fetching foods:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyAllFilters = () => {
    // No longer needed since we're showing all foods
  }

  const applyFiltersForMeal = (meal: any): Food[] => {
    // No longer needed since we're showing all foods
    return []
  }

  const getFilteredFoodsForMeal = (mealId: string): Food[] => {
    // No longer needed since we're showing all foods
    return []
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

  const handleQuantityChange = (mealId: string, foodId: string, value: number) => {
    setMealFoodQuantities(prev => {
      const newMap = new Map(prev)
      const mealMap = new Map(newMap.get(mealId) || new Map())
      const entry = mealMap.get(foodId)
      if (entry) {
        mealMap.set(foodId, { ...entry, quantity: value })
        newMap.set(mealId, mealMap)
      }
      return newMap
    })
  }

  const handleMinQuantityChange = (mealId: string, foodId: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setMealFoodQuantities(prev => {
        const newMap = new Map(prev)
        const mealMap = new Map(newMap.get(mealId) || new Map())
        const entry = mealMap.get(foodId)
        if (entry) {
          const newMin = Math.max(0, Math.min(numValue, entry.maxQuantity))
          mealMap.set(foodId, {
            ...entry,
            minQuantity: newMin,
            quantity: Math.max(newMin, entry.quantity),
          })
          newMap.set(mealId, mealMap)
        }
        return newMap
      })
    }
  }

  const handleMaxQuantityChange = (mealId: string, foodId: string, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setMealFoodQuantities(prev => {
        const newMap = new Map(prev)
        const mealMap = new Map(newMap.get(mealId) || new Map())
        const entry = mealMap.get(foodId)
        if (entry) {
          const newMax = Math.max(numValue, entry.minQuantity)
          mealMap.set(foodId, {
            ...entry,
            maxQuantity: newMax,
            quantity: Math.min(newMax, entry.quantity),
          })
          newMap.set(mealId, mealMap)
        }
        return newMap
      })
    }
  }

  const handleUnitChange = (mealId: string, foodId: string, unit: string) => {
    setMealFoodQuantities(prev => {
      const newMap = new Map(prev)
      const mealMap = new Map(newMap.get(mealId) || new Map())
      const entry = mealMap.get(foodId)
      if (entry) {
        mealMap.set(foodId, { ...entry, selectedUnit: unit })
        newMap.set(mealId, mealMap)
      }
      return newMap
    })
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

  type HandleSelectedFoodsChange = (mealId: string, foodIds: string[]) => void;
  const handleSelectedFoodsChange: HandleSelectedFoodsChange = (mealId, foodIds) => {
    setSelectedFoods(prev => {
      const newMap = new Map(prev);
      newMap.set(mealId, new Set(foodIds));
      return newMap;
    });
    setMealFoodQuantities(prev => {
      const newMap = new Map(prev);
      const mealMap = new Map(newMap.get(mealId) || new Map());
      // Add new foods
      foodIds.forEach(foodId => {
        if (!mealMap.has(foodId)) {
          let food;
          for (const kitchen of kitchens) {
            food = kitchen.foods.find(f => f.id === foodId);
            if (food) break;
          }
          if (food) {
            mealMap.set(foodId, {
              quantity: 1,
              minQuantity: 0,
              maxQuantity: 10,
              selectedUnit: food.servingUnits[0]?.name || 'g',
            });
          }
        }
      });
      // Remove foods that are no longer selected
      Array.from(mealMap.keys()).forEach(fid => {
        if (!foodIds.includes(fid)) {
          mealMap.delete(fid);
        }
      });
      newMap.set(mealId, mealMap);
      console.log('mealFoodQuantities after update:', Array.from(newMap.entries()));
      return newMap;
    });
  }

  const getSelectedFoodsForMeal = (mealId: string) => {
    return selectedFoods.get(mealId) || new Set<string>()
  }

  const getAllSelectedFoodServings = () => {
    const allServings: any[] = []
    userMealPreferences.forEach(meal => {
      const selectedFoodIds = selectedFoods.get(meal.id) || new Set<string>()
      selectedFoodIds.forEach(foodId => {
        for (const kitchen of kitchens) {
          const food = kitchen.foods.find(f => f.id === foodId)
          if (food) {
            const q = mealFoodQuantities.get(meal.id)?.get(foodId) || {
              quantity: 1,
              minQuantity: 0,
              maxQuantity: 10,
              selectedUnit: food.servingUnits[0]?.name || 'g',
            }
            const serving = {
              id: food.id,
              food_id: food.id,
              quantity: q.quantity,
              unit: {
                id: q.selectedUnit,
                name: q.selectedUnit,
                food_id: food.id,
                grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
              },
              food: food
            }
            allServings.push(serving)
            break
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
    // Build selectedFoodList using per-meal, per-food quantities
    const selectedFoodList: any[] = [];
    userMealPreferences.forEach(meal => {
      const selectedFoodIds = selectedFoods.get(meal.id) || new Set();
      selectedFoodIds.forEach(foodId => {
        for (const kitchen of kitchens) {
          const food = kitchen.foods.find(f => f.id === foodId);
          if (food) {
            const q = mealFoodQuantities.get(meal.id)?.get(foodId);
            if (q) {
              selectedFoodList.push({
                mealId: meal.id,
                foodId: food.id,
                quantity: q.quantity,
                minQuantity: q.minQuantity,
                maxQuantity: q.maxQuantity,
                selectedUnit: q.selectedUnit,
                food: food,
                unit: {
                  id: q.selectedUnit,
                  name: q.selectedUnit,
                  food_id: food.id,
                  grams: food.servingUnits.find(u => u.name === q.selectedUnit)?.grams || 1
                }
              });
            }
            break;
          }
        }
      });
    });
    if (selectedFoodList.length === 0) {
      alert('No foods selected for optimization');
      return;
    }
    setIsOptimizing(true);
    try {
      const userPrefs = preferences || [];
      if (userPrefs.length === 0) {
        alert('No nutritional preferences set. Please set your preferences first.');
        return;
      }
      const macroNames = userPrefs.map(pref => pref.id);
      const foods = selectedFoodList.map(food => {
        // Extract macro values in the same order as macroNames
        const macroValues = macroNames.map(macroName => {
          return (food.food.macros as any)?.[macroName] || 0;
        });
        return {
          macroValues,
          unitGrams: food.unit.grams,
          quantity: food.quantity,
          minQuantity: food.minQuantity,
          maxQuantity: food.maxQuantity
        };
      });
      const optimizationPreferences = userPrefs.map(pref => ({
        min_value: pref.min || 0,
        max_value: pref.max || Infinity
      }));
      const result = await optimizationApi.optimizeQuantities({
        foods,
        preferences: optimizationPreferences,
        macroNames
      });
      setKitchens(prev => prev.map(kitchen => ({
        ...kitchen,
        foods: kitchen.foods.map(food => {
          // Find the optimized quantity for this food in any meal
          const idx = selectedFoodList.findIndex(f => f.foodId === food.id);
          if (idx !== -1) {
            return { ...food, quantity: result.optimizedQuantities[idx] };
          }
          return food;
        })
      })));
      setMealFoodQuantities(prev => {
        const newMap = new Map(prev);
        selectedFoodList.forEach((food, idx) => {
          const mealMap = new Map(newMap.get(food.mealId) || new Map());
          const entry = mealMap.get(food.foodId);
          if (entry) {
            mealMap.set(food.foodId, { ...entry, quantity: result.optimizedQuantities[idx] });
            newMap.set(food.mealId, mealMap);
          }
        });
        return newMap;
      });
      alert(`Quantities optimized successfully! Final error: ${result.error.toFixed(4)}`);
    } catch (error) {
      console.error('Optimization error:', error);
      alert('Failed to optimize quantities. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  }

  const toggleFoodExpansion = (mealId: string, foodId: string) => {
    const key = `${mealId}:${foodId}`
    setExpandedFoods(prev => {
      const newSet = new Set<string>(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.clear()
        newSet.add(key)
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

  const handleOpenSelectionModal = (mealId: string) => {
    setCurrentModalMealId(mealId)
    setShowSelectionModal(true)
  }

  const handleCloseSelectionModal = () => {
    setShowSelectionModal(false)
    setCurrentModalMealId(null)
  }

  const canProceedToQuantities = () => {
    // Check if any meal has at least one food selected
    return userMealPreferences.some(meal => {
      const selectedFoodsForMeal = getSelectedFoodsForMeal(meal.id)
      return selectedFoodsForMeal.size > 0
    })
  }

  const renderFiltersStep = () => (
    <View style={styles.stepContainer}>
      <ScrollView style={styles.mealList} contentContainerStyle={styles.mealListContent}>
        {userMealPreferences.map(meal => {
          const selectedFoodsForMeal = getSelectedFoodsForMeal(meal.id)
          
          return (
            <View key={meal.id} style={styles.mealSection}>
              <Pressable 
                style={styles.mealHeader}
                onPress={() => handleOpenSelectionModal(meal.id)}
              >
                <View style={styles.mealHeaderContent}>
                  <View>
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <Text style={styles.mealStatus}>
                      {selectedFoodsForMeal.size} foods selected
                    </Text>
                  </View>
                  <MaterialIcons 
                    name="chevron-right" 
                    size={24} 
                    color={Colors.gray} 
                  />
                </View>
              </Pressable>
            </View>
          )
        })}
      </ScrollView>
      
      {/* Continue button at the bottom of the scrollable content */}
      <View style={styles.continueContainer}>
        <Pressable 
          style={[styles.continueButton, !canProceedToQuantities() && styles.continueButtonDisabled]}
          onPress={() => {
            if (canProceedToQuantities()) {
              setCurrentStep('quantities')
            }
          }}
          disabled={!canProceedToQuantities()}
        >
          <Text style={[styles.continueButtonText, !canProceedToQuantities() && styles.continueButtonTextDisabled]}>
            Continue to Quantities
          </Text>
        </Pressable>
      </View>
    </View>
  )

  const renderQuantitiesStep = () => (
    <View style={styles.stepContainer}>
      <ScrollView style={styles.mealList} contentContainerStyle={styles.mealListContent}>
        {userMealPreferences.map(meal => {
          const selectedFoodsForMeal = getSelectedFoodsForMeal(meal.id)
          
          return (
            <View key={meal.id} style={styles.mealSection}>
              <View style={styles.mealHeader}>
                <View style={styles.mealHeaderContent}>
                  <View>
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <Text style={styles.mealStatus}>
                      {selectedFoodsForMeal.size} foods selected
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.mealContent}>
                <View style={styles.foodList}>
                  {kitchens.flatMap(kitchen => 
                    kitchen.foods.filter(food => selectedFoodsForMeal.has(food.id))
                      .map(food => ({ ...food, kitchenId: kitchen.id }))
                  ).map(food => {
                    const expandedKey = `${meal.id}:${food.id}`
                    const isExpanded = expandedFoods.has(expandedKey)
                    const q = getMealFoodQuantity(meal.id, food.id)
                    const foodCard = (
                      <View style={styles.quantityItem}>
                        <Pressable 
                          style={styles.foodHeader}
                          onPress={() => toggleFoodExpansion(meal.id, food.id)}
                        >
                          <View style={styles.foodHeaderContent}>
                            <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="tail">
                              {food.name.charAt(0).toUpperCase() + food.name.slice(1)}
                            </Text>
                            {!isExpanded && (
                              <Text style={styles.summaryText} numberOfLines={1} ellipsizeMode="tail">
                                {q.quantity.toFixed(1)} {q.selectedUnit}
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
                              <Text style={styles.quantityText}>{q.quantity.toFixed(1)}</Text>
                              <View style={styles.unitPicker}>
                                <Picker
                                  selectedValue={q.selectedUnit}
                                  onValueChange={(value: string) => handleUnitChange(meal.id, food.id, value)}
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
                                    value={q.minQuantity.toString()}
                                    onChangeText={(text) => handleMinQuantityChange(meal.id, food.id, text)}
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
                                    value={q.maxQuantity.toString()}
                                    onChangeText={(text) => handleMaxQuantityChange(meal.id, food.id, text)}
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
                                      <Text style={styles.minMaxLabel}>{q.minQuantity.toFixed(1)}</Text>
                                    </Pressable>
                                    <Slider
                                      style={styles.slider}
                                      minimumValue={q.minQuantity}
                                      maximumValue={q.maxQuantity}
                                      value={q.quantity}
                                      onValueChange={(value) => handleQuantityChange(meal.id, food.id, value)}
                                      minimumTrackTintColor={Colors.green}
                                      maximumTrackTintColor={Colors.lightgray}
                                    />
                                    <Pressable 
                                      onPress={() => handleMaxClick(food.id)}
                                      style={styles.minMaxLabelContainer}
                                    >
                                      <Text style={styles.minMaxLabel}>{q.maxQuantity.toFixed(1)}</Text>
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
                              onPress={() => handleDeleteFood(meal.id, food.id)}
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
              </View>
            </View>
          )
        })}
      </ScrollView>
      
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
    </View>
  )

  const getMealFoodQuantity = (mealId: string, foodId: string) => {
    const value = mealFoodQuantities.get(mealId)?.get(foodId);
    console.log('getMealFoodQuantity:', { mealId, foodId, value });
    return value || {
      quantity: 1,
      minQuantity: 0,
      maxQuantity: 10,
      selectedUnit: 'g',
    };
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading kitchens...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Flow Navigation Header */}
      <View style={styles.flowHeader}>
        <View style={styles.flowSteps}>
          <Pressable 
            style={styles.flowStepContainer}
            onPress={() => setCurrentStep('filters')}
          >
            <View style={[styles.flowStepDot, currentStep === 'filters' && styles.flowStepDotActive]} />
            <Text style={[styles.flowStepLabel, currentStep === 'filters' && styles.flowStepLabelActive]}>
              Select Foods
            </Text>
          </Pressable>
          <View style={styles.flowStepLine} />
          <Pressable 
            style={styles.flowStepContainer}
            onPress={() => {
              if (canProceedToQuantities()) {
                setCurrentStep('quantities')
              }
            }}
          >
            <View style={[styles.flowStepDot, currentStep === 'quantities' && styles.flowStepDotActive]} />
            <Text style={[styles.flowStepLabel, currentStep === 'quantities' && styles.flowStepLabelActive]}>
              Quantities
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Render current step */}
      {currentStep === 'filters' ? renderFiltersStep() : renderQuantitiesStep()}

      {/* Food Selection Modal */}
      {showSelectionModal && currentModalMealId && (
        <KitchenActivationModal
          isVisible={showSelectionModal}
          onClose={handleCloseSelectionModal}
          kitchen={{
            id: 'all-foods',
            name: `Select Foods for ${userMealPreferences.find(meal => meal.id === currentModalMealId)?.name || 'Meal'}`,
            foods: kitchens[0]?.foods.map(food => ({
              ...food,
              active: getSelectedFoodsForMeal(currentModalMealId).has(food.id),
              quantity: 1,
              minQuantity: 0,
              maxQuantity: 10,
              selectedUnit: food.servingUnits[0]?.name || 'g'
            })) || []
          }}
          onToggleFood={(foodId, currentActive) => {
            // Handle food selection
            const newSelectedFoods = new Set(getSelectedFoodsForMeal(currentModalMealId))
            if (currentActive) {
              newSelectedFoods.delete(foodId)
            } else {
              newSelectedFoods.add(foodId)
            }
            handleSelectedFoodsChange(currentModalMealId, Array.from(newSelectedFoods))
          }}
          onSelectedFoodsChange={(selectedFoodIds) => handleSelectedFoodsChange(currentModalMealId, selectedFoodIds)}
          selectedFoodIds={Array.from(getSelectedFoodsForMeal(currentModalMealId))}
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
  filterSection: {
    gap: 16,
  },
  filterList: {
    gap: 8,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
  },
  filterLabel: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
  },
  removeFilterButton: {
    padding: 4,
  },
  clearFiltersButton: {
    padding: 12,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  filterOptions: {
    gap: 8,
  },
  filterOption: {
    padding: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterOptionText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
  },
  previewSection: {
    gap: 16,
  },
  previewList: {
    flexDirection: 'row',
    gap: 8,
  },
  previewItem: {
    padding: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
  },
  previewFoodName: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
  },
  previewKitchenName: {
    fontSize: 14,
    color: Colors.gray,
  },
  previewMoreText: {
    fontSize: 16,
    color: Colors.gray,
    fontWeight: '600',
  },
  selectButton: {
    padding: 12,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonDisabled: {
    backgroundColor: Colors.lightgray,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  flowHeader: {
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  flowSteps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  flowStepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flowStepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.coolgray,
  },
  flowStepDotActive: {
    backgroundColor: Colors.blue,
  },
  flowStepLabel: {
    fontSize: 16,
    color: Colors.gray,
  },
  flowStepLabelActive: {
    color: Colors.blue,
    fontWeight: '600',
  },
  flowStepLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.coolgray,
  },
  flowNavigation: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 16,
    marginBottom: 20,
  },
  stepContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  stepHeader: {
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  mealStatus: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
  },
  noFiltersText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 8,
  },
  continueContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 16,
    marginBottom: 20,
  },
  continueButton: {
    padding: 12,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: Colors.lightgray,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  continueButtonTextDisabled: {
    color: Colors.gray,
  },
}) 