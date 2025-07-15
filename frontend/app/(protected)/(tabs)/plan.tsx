import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useUser } from '@/app/hooks/useUser'
import { useSelectedDate } from './_layout'
import { useState } from 'react'
import { useMealPlanApi } from '@/lib/api/mealPlan'

export default function MealPlanPage() {
  const { appUser } = useUser()
  const { selectedDate } = useSelectedDate()
  const [isLoadingMealPlans, setIsLoadingMealPlans] = useState(false)
  const mealPlanApi = useMealPlanApi()

  const handleProceedToPlanDetail = async () => {
    if (!appUser) {
      alert('User not found');
      return;
    }

    setIsLoadingMealPlans(true);
    
    try {
      // Load existing meal plans for the selected date
      const mealPlansData = await mealPlanApi.getMealPlans(appUser.user_id, selectedDate);
      console.log('Loaded meal plans for plan-detail:', mealPlansData);
      
      // Navigate to plan-detail page with the loaded meal plans
      router.push({
        pathname: './plan-detail',
        params: {
          initialMealPlans: JSON.stringify(mealPlansData)
        }
      });
    } catch (error) {
      console.error('Failed to load meal plans:', error);
      // Navigate anyway with empty meal plans
      router.push({
        pathname: './plan-detail',
        params: {
          initialMealPlans: JSON.stringify([])
        }
      });
    } finally {
      setIsLoadingMealPlans(false);
    }
  }

  const handleConfigurePreferences = () => {
    // Placeholder for future macro preferences configuration
    alert('Macro preferences configuration will be available soon!')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planning</Text>
      <Text style={styles.subtitle}>Choose what you'd like to do</Text>

      <ScrollView style={styles.content}>
        {/* Main Action Options */}
        <View style={styles.optionsContainer}>
          <Pressable 
            style={styles.optionCard}
            onPress={handleProceedToPlanDetail}
            disabled={isLoadingMealPlans}
          >
            {isLoadingMealPlans ? (
              <ActivityIndicator size="small" color={Colors.blue} />
            ) : (
              <MaterialIcons name="restaurant-menu" size={32} color={Colors.blue} />
            )}
            <Text style={styles.optionTitle}>
              {isLoadingMealPlans ? 'Loading...' : 'Plan Meals'}
            </Text>
            <Text style={styles.optionDescription}>
              Create or edit meal plans for {selectedDate.toLocaleDateString()}
            </Text>
          </Pressable>

          <Pressable 
            style={styles.optionCard}
            onPress={handleConfigurePreferences}
          >
            <MaterialIcons name="settings" size={32} color={Colors.gray} />
            <Text style={styles.optionTitle}>Configure Preferences</Text>
            <Text style={styles.optionDescription}>
              Set up your macro preferences and meal planning settings
            </Text>
          </Pressable>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Meal Planning</Text>
          <Text style={styles.infoText}>
            Use the meal planning feature to create optimized meal plans based on your nutritional goals. 
            You can select foods, set quantities, and use our optimization algorithm to find the best 
            combination for your macro targets.
          </Text>
        </View>
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
  content: {
    flex: 1,
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
  infoSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.lightgray,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 24,
  },
})