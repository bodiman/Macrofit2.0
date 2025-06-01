import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import Colors from '@/styles/colors'
import { useUser } from '@/app/hooks/useUser'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function MealPlanPage() {
  const { planId } = useLocalSearchParams()
  const { userMealPreferences } = useUser()

  const handleMealPress = (mealId: string) => {
    router.push(`/plan/${planId}/${mealId}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Plan</Text>
      <Text style={styles.subtitle}>Select a meal to plan</Text>

      <ScrollView style={styles.mealList}>
        {userMealPreferences.map(meal => (
          <Pressable
            key={meal.id}
            style={styles.mealCard}
            onPress={() => handleMealPress(meal.id)}
          >
            <View style={styles.mealCardContent}>
              <View>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>{meal.default_time}</Text>
              </View>
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
  mealList: {
    flex: 1,
  },
  mealCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.coolgray,
    overflow: 'hidden',
  },
  mealCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
}) 