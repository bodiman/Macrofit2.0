import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function PlanListPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Plans</Text>
      <Text style={styles.subtitle}>Select a meal plan to continue</Text>
      
      {/* Placeholder for plan list */}
      <View style={styles.planList}>
        <Text style={styles.placeholder}>No meal plans found</Text>
        <Pressable 
          style={styles.createButton}
          onPress={() => router.push('./plan-new')}
        >
          <MaterialIcons name="plus" size={24} color={Colors.white} />
          <Text style={styles.createButtonText}>Create New Plan</Text>
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
  planList: {
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