import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import { useState, useEffect } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface MealPlan {
  id: string
  name: string
  created_at: string
  meals: Array<{
    id: string
    name: string
    time: string
  }>
}

export default function MealPlanListPage() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMealPlans()
  }, [])

  const fetchMealPlans = async () => {
    try {
      // TODO: Fetch meal plans from the backend
      const mockPlans: MealPlan[] = [
        {
          id: '1',
          name: 'Week 1 Plan',
          created_at: '2024-03-20',
          meals: [
            { id: '1', name: 'Breakfast', time: '08:00' },
            { id: '2', name: 'Lunch', time: '12:00' },
            { id: '3', name: 'Dinner', time: '18:00' },
          ]
        }
      ]
      setMealPlans(mockPlans)
    } catch (error) {
      console.error('Error fetching meal plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlanPress = (planId: string) => {
    router.push(`/plan/${planId}`)
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading meal plans...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Meal Plans</Text>
      <Text style={styles.subtitle}>Select a meal plan to continue planning</Text>

      <ScrollView style={styles.planList}>
        {mealPlans.map(plan => (
          <Pressable
            key={plan.id}
            style={styles.planCard}
            onPress={() => handlePlanPress(plan.id)}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planDate}>
                Created on {new Date(plan.created_at).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.mealsList}>
              {plan.meals.map(meal => (
                <View key={meal.id} style={styles.mealItem}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </View>
              ))}
            </View>

            <View style={styles.planFooter}>
              <MaterialIcons name="chevron-right" size={24} color={Colors.gray} />
            </View>
          </Pressable>
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
  planList: {
    flex: 1,
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.coolgray,
    overflow: 'hidden',
  },
  planHeader: {
    padding: 16,
    backgroundColor: Colors.coolgray,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  planDate: {
    fontSize: 14,
    color: Colors.gray,
  },
  mealsList: {
    padding: 16,
    gap: 8,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
  },
  mealName: {
    fontSize: 16,
    color: Colors.black,
  },
  mealTime: {
    fontSize: 14,
    color: Colors.gray,
  },
  planFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.coolgray,
    alignItems: 'flex-end',
  },
}) 