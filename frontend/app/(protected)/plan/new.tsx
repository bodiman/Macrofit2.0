import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import { useState, useMemo } from 'react'
import { useUser } from '@/app/hooks/useUser'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface Meal {
  id: string
  name: string
  time: string
  distribution_percentage: number
}

export default function NewMealPlanPage() {
  const { userMealPreferences } = useUser()
  const [loading, setLoading] = useState(false)
  const [meals, setMeals] = useState<Meal[]>(() => 
    userMealPreferences.map(pref => ({
      id: pref.id,
      name: pref.name,
      time: pref.default_time,
      distribution_percentage: (pref.distribution_percentage || 0) * 100
    }))
  )

  const totalDistribution = useMemo(() => 
    meals.reduce((sum, meal) => sum + meal.distribution_percentage, 0),
    [meals]
  )

  const handleAddMeal = () => {
    const newMeal: Meal = {
      id: `new-${Date.now()}`,
      name: '',
      time: '12:00',
      distribution_percentage: 0
    }
    setMeals([...meals, newMeal])
  }

  const handleRemoveMeal = (mealId: string) => {
    setMeals(meals.filter(meal => meal.id !== mealId))
  }

  const handleUpdateMeal = (mealId: string, updates: Partial<Meal>) => {
    setMeals(meals.map(meal => 
      meal.id === mealId ? { ...meal, ...updates } : meal
    ))
  }

  const handleUpdateDistribution = (mealId: string, percentage: number) => {
    // Ensure percentage is between 0 and 100
    const validPercentage = Math.max(0, Math.min(100, percentage))
    
    setMeals(meals.map(meal => 
      meal.id === mealId ? { ...meal, distribution_percentage: validPercentage } : meal
    ))
  }

  const handleCreatePlan = async () => {
    if (meals.length === 0) {
      // TODO: Show error message
      return
    }

    setLoading(true)
    try {
      // TODO: Create a new meal plan in the backend
      const planId = 'new-plan-id' // This should come from the backend
      router.replace(`/plan/${planId}`)
    } catch (error) {
      console.error('Error creating meal plan:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Meal Plan</Text>
      <Text style={styles.subtitle}>Customize your meals and their distribution</Text>

      <ScrollView style={styles.mealsList}>
        {meals.map(meal => (
          <View key={meal.id} style={styles.mealItem}>
            <View style={styles.mealHeader}>
              <TextInput
                style={styles.mealNameInput}
                value={meal.name}
                onChangeText={(text) => handleUpdateMeal(meal.id, { name: text })}
                placeholder="Meal name"
                placeholderTextColor={Colors.gray}
              />
              <Pressable 
                style={styles.removeButton}
                onPress={() => handleRemoveMeal(meal.id)}
              >
                <MaterialIcons name="close" size={20} color={Colors.gray} />
              </Pressable>
            </View>

            <View style={styles.mealDetails}>
              <View style={styles.timeContainer}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  style={styles.timeInput}
                  value={meal.time}
                  onChangeText={(text) => handleUpdateMeal(meal.id, { time: text })}
                  placeholder="HH:MM"
                  placeholderTextColor={Colors.gray}
                />
              </View>

              <View style={styles.distributionContainer}>
                <Text style={styles.label}>% Daily Macros</Text>
                <View style={styles.distributionInput}>
                  <TextInput
                    style={styles.percentageInput}
                    value={meal.distribution_percentage.toString()}
                    onChangeText={(text) => {
                      const value = parseFloat(text) || 0
                      handleUpdateDistribution(meal.id, value)
                    }}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={Colors.gray}
                  />
                  <Text style={styles.percentageSymbol}>%</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <Pressable 
          style={styles.addMealCard}
          onPress={handleAddMeal}
        >
          <MaterialIcons name="add" size={24} color={Colors.gray} />
          <Text style={styles.addMealText}>Add Meal</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.distributionTotal}>
          Total Distribution: {totalDistribution}%
        </Text>

        <Pressable 
          style={[
            styles.createButton, 
            (loading || meals.length === 0) && styles.createButtonDisabled
          ]}
          onPress={handleCreatePlan}
          disabled={loading || meals.length === 0}
        >
          <Text style={styles.createButtonText}>
            {loading ? 'Creating...' : 'Create Meal Plan'}
          </Text>
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
  mealsList: {
    flex: 1,
    gap: 16,
  },
  mealItem: {
    backgroundColor: Colors.coolgray,
    padding: 16,
    borderRadius: 8,
    gap: 12,
    marginBottom: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealNameInput: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  mealDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  timeContainer: {
    flex: 1,
  },
  distributionContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  timeInput: {
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
    color: Colors.black,
  },
  distributionInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 4,
  },
  percentageInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
  },
  percentageSymbol: {
    fontSize: 16,
    color: Colors.gray,
    marginLeft: 4,
  },
  footer: {
    gap: 12,
    marginTop: 20,
  },
  addMealCard: {
    backgroundColor: Colors.coolgray,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.coolgray,
    borderStyle: 'dashed',
  },
  addMealText: {
    fontSize: 16,
    color: Colors.gray,
    fontWeight: '600',
  },
  distributionTotal: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: Colors.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}) 