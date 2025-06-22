import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function PlanNewPage() {
  const handleCreatePlan = () => {
    // Create a new plan and navigate to it
    const planId = 'new-plan-' + Date.now() // Generate a temporary ID
    router.push(`./plan-detail?planId=${planId}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Meal Plan</Text>
      <Text style={styles.subtitle}>Set up your meal plan preferences</Text>
      
      <View style={styles.content}>
        <Text style={styles.placeholder}>Plan creation form will go here</Text>
        <Pressable 
          style={styles.createButton}
          onPress={handleCreatePlan}
        >
          <MaterialIcons name="check" size={24} color={Colors.white} />
          <Text style={styles.createButtonText}>Create Plan</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}) 