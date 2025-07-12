import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useUser } from '@/app/hooks/useUser'
import { useSelectedDate } from './_layout'
import { useMealPlans } from '../../../hooks/useMealPlans'
import { useEffect, useState } from 'react'

export default function MealPlanPage() {
  const { appUser, getMeals } = useUser()
  const { selectedDate } = useSelectedDate()
  const [mealsData, setMealsData] = useState<{
    meals: any[];
    mealPlans: any[];
  }>({ meals: [], mealPlans: [] });
  const [loading, setLoading] = useState(false);
  const { mealPlans } = useMealPlans(mealsData.mealPlans);

  useEffect(() => {
    if (appUser && selectedDate) {
      setLoading(true);
      getMeals(appUser.user_id, selectedDate)
        .then((fetched) => {
          setMealsData({ meals: fetched.meals, mealPlans: fetched.mealPlans });
        })
        .catch(error => {
          console.error('Failed to fetch meals:', error);
        })
        .finally(() => setLoading(false));
    } else {
      setMealsData({ meals: [], mealPlans: [] });
      setLoading(false);
    }
  }, [appUser, selectedDate]);

  const handleCreateNewPlan = () => {
    router.push('./plan-detail')
  }

  const handleLoadPlan = (mealPlanId: string) => {
    router.push(`./plan-detail?planId=${mealPlanId}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Plans</Text>
      <Text style={styles.subtitle}>Create a new meal plan or load an existing one</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.blue} />
          <Text style={styles.loadingText}>Loading meal plans...</Text>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {/* Saved Meal Plans */}
          {Array.from(mealPlans.values()).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Saved Plans for {selectedDate.toLocaleDateString()}</Text>
              {Array.from(mealPlans.values()).map(plan => (
                <Pressable 
                  key={plan.id}
                  style={styles.mealPlanCard}
                  onPress={() => handleLoadPlan(plan.id)}
                >
                  <View style={styles.mealPlanHeader}>
                    <MaterialIcons name="restaurant" size={24} color={Colors.blue} />
                    <View style={styles.mealPlanInfo}>
                      <Text style={styles.mealPlanName}>{plan.meal.name}</Text>
                      <Text style={styles.mealPlanDetails}>
                        {plan.servings.length} foods planned
                      </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color={Colors.gray} />
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.optionsContainer}>
            <Pressable 
              style={styles.optionCard}
              onPress={handleCreateNewPlan}
            >
              <MaterialIcons name="add-circle-outline" size={32} color={Colors.blue} />
              <Text style={styles.optionTitle}>Create New Plan</Text>
              <Text style={styles.optionDescription}>
                Start fresh with a new meal plan based on your preferences
              </Text>
            </Pressable>

            {Array.from(mealPlans.values()).length === 0 && (
              <View style={styles.emptyState}>
                <MaterialIcons name="folder-open" size={48} color={Colors.gray} />
                <Text style={styles.emptyStateTitle}>No meal plans yet</Text>
                <Text style={styles.emptyStateText}>
                  Create your first meal plan to get started with meal planning
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
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
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.coolgray,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 12,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: Colors.gray,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  mealPlanCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.coolgray,
    marginBottom: 10,
  },
  mealPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mealPlanInfo: {
    flex: 1,
    marginLeft: 10,
  },
  mealPlanName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  mealPlanDetails: {
    fontSize: 14,
    color: Colors.gray,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: 15,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 5,
  },
})