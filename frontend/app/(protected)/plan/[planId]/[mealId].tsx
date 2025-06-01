import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useState, useEffect } from 'react'
import Colors from '@/styles/colors'
import { Food } from '@shared/types/foodTypes'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useMenuApi } from '@/lib/api/menu'
import QuantityAdjustment from '@/components/MealPlan/QuantityAdjustment'
import { useUser } from '@/app/hooks/useUser'

interface Kitchen {
  id: string
  name: string
  description?: string
  foods: Food[]
}

interface KitchenWithActiveFoods extends Kitchen {
  foods: (Food & { active: boolean })[]
}

export default function MealPlanningPage() {
  const { planId, mealId } = useLocalSearchParams()
  const [kitchens, setKitchens] = useState<KitchenWithActiveFoods[]>([])
  const [selectedKitchens, setSelectedKitchens] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [showQuantityAdjustment, setShowQuantityAdjustment] = useState(false)
  const [selectedFoods, setSelectedFoods] = useState<(Food & { active: boolean })[]>([])
  const menuApi = useMenuApi()
  const { userMealPreferences } = useUser()

  const selectedMeal = userMealPreferences.find(meal => meal.id === mealId)

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
              active: food.active
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

  const handleNext = () => {
    const activeFoods = kitchens
      .filter(kitchen => selectedKitchens.has(kitchen.id))
      .flatMap(kitchen => kitchen.foods.filter(food => food.active))
    setSelectedFoods(activeFoods)
    setShowQuantityAdjustment(true)
  }

  const handleBack = () => {
    setShowQuantityAdjustment(false)
  }

  const handleSave = async (foodsWithQuantities: any[]) => {
    try {
      // TODO: Save the meal plan with quantities
      console.log('Saving meal plan with quantities:', foodsWithQuantities)
      router.back()
    } catch (error) {
      console.error('Error saving meal plan:', error)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading kitchens...</Text>
      </View>
    )
  }

  if (showQuantityAdjustment) {
    return (
      <QuantityAdjustment
        foods={selectedFoods}
        onSave={handleSave}
        onBack={handleBack}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedMeal?.name}</Text>
      <Text style={styles.subtitle}>Select kitchens and foods for this meal</Text>
      
      <ScrollView style={styles.kitchenList}>
        {kitchens.map(kitchen => (
          <View key={kitchen.id} style={styles.kitchenCard}>
            <Pressable 
              style={styles.kitchenHeader}
              onPress={() => toggleKitchenSelection(kitchen.id)}
            >
              <View style={styles.kitchenHeaderContent}>
                <Text style={styles.kitchenName}>{kitchen.name}</Text>
                <MaterialIcons 
                  name={selectedKitchens.has(kitchen.id) ? "expand-less" : "expand-more"} 
                  size={24} 
                  color={Colors.black} 
                />
              </View>
            </Pressable>

            {selectedKitchens.has(kitchen.id) && (
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
            )}
          </View>
        ))}
      </ScrollView>

      <Pressable 
        style={[styles.nextButton, selectedKitchens.size === 0 && styles.nextButtonDisabled]}
        disabled={selectedKitchens.size === 0}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next: Adjust Quantities</Text>
      </Pressable>
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
  kitchenList: {
    flex: 1,
  },
  kitchenCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.coolgray,
    overflow: 'hidden',
  },
  kitchenHeader: {
    padding: 16,
    backgroundColor: Colors.coolgray,
  },
  kitchenHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  foodList: {
    padding: 16,
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
  nextButton: {
    backgroundColor: Colors.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}) 