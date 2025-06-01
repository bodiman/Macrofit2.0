import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import { useState } from 'react'
import { useUser } from '@/app/hooks/useUser'

export default function NewMealPlanPage() {
  const { userMealPreferences } = useUser()
  const [loading, setLoading] = useState(false)

  const handleCreatePlan = async () => {
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
      <Text style={styles.subtitle}>
        This will create a new meal plan with {userMealPreferences.length} meals based on your preferences
      </Text>

      <View style={styles.mealsList}>
        {userMealPreferences.map(meal => (
          <View key={meal.id} style={styles.mealItem}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealTime}>{meal.default_time}</Text>
          </View>
        ))}
      </View>

      <Pressable 
        style={[styles.createButton, loading && styles.createButtonDisabled]}
        onPress={handleCreatePlan}
        disabled={loading}
      >
        <Text style={styles.createButtonText}>
          {loading ? 'Creating...' : 'Create Meal Plan'}
        </Text>
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
  mealsList: {
    flex: 1,
    gap: 12,
  },
  mealItem: {
    backgroundColor: Colors.coolgray,
    padding: 16,
    borderRadius: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
    color: Colors.gray,
  },
  createButton: {
    backgroundColor: Colors.blue,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
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