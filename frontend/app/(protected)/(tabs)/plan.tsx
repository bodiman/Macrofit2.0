import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useUser } from '@/app/hooks/useUser'

export default function MealPlanPage() {
  const { userMealPreferences } = useUser()

  const handleCreateNewPlan = () => {
    // TODO: Create a new meal plan and navigate to it
    router.push('./plan-new')
  }

  const handleLoadPlan = () => {
    // TODO: Show list of existing meal plans
    router.push('./plan-list')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planning</Text>
      <Text style={styles.subtitle}>Create a new meal plan or load an existing one</Text>

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

        <Pressable 
          style={styles.optionCard}
          onPress={handleLoadPlan}
        >
          <MaterialIcons name="folder-open" size={32} color={Colors.blue} />
          <Text style={styles.optionTitle}>Load Plan</Text>
          <Text style={styles.optionDescription}>
            Continue working on a previously saved meal plan
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
})