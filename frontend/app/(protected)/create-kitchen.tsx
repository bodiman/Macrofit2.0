import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import { useState } from 'react'
import { useMenuApi } from '@/lib/api/menu'
import AddKitchenFoodModal from '@/components/Kitchen/AddKitchenFoodModal'
import { MacroPreference } from '@shared/types/macroTypes'
import { Food } from '@shared/types/foodTypes'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function CreateKitchen() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAddFoodModal, setShowAddFoodModal] = useState(false)
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([])
  const menuApi = useMenuApi()

  // TODO: Replace with actual preferences from user settings
  const mockPreferences: MacroPreference[] = [
    {
      id: '1',
      name: 'Calories',
      unit: 'kcal',
      min: 2000,
      max: 2500
    },
    {
      id: '2',
      name: 'Protein',
      unit: 'g',
      min: 150,
      max: 200
    }
  ]

  const handleCreate = async () => {
    if (!name.trim()) return

    setLoading(true)
    try {
      // TODO: Implement create kitchen API call
      router.replace('./(protected)/menus')
    } catch (error) {
      console.error('Error creating kitchen:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveFoods = (foods: Food[]) => {
    setSelectedFoods(foods)
  }

  const handleRemoveFood = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(food => food.id !== foodId))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Kitchen</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter kitchen name"
          placeholderTextColor={Colors.gray}
        />

        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter kitchen description"
          placeholderTextColor={Colors.gray}
          multiline
          numberOfLines={4}
        />

        <View style={styles.foodSection}>
          <View style={styles.foodHeader}>
            <Text style={styles.label}>Foods ({selectedFoods.length})</Text>
            <TouchableOpacity 
              style={[styles.addButton, (!name.trim() || loading) && styles.buttonDisabled]}
              onPress={() => setShowAddFoodModal(true)}
              disabled={!name.trim() || loading}
            >
              <Text style={styles.addButtonText}>Add Foods</Text>
            </TouchableOpacity>
          </View>

          {selectedFoods.length > 0 ? (
            <View style={styles.foodList}>
              {selectedFoods.map((item) => (
                <View key={item.id} style={styles.foodItem}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Pressable onPress={() => handleRemoveFood(item.id)}>
                    <MaterialIcons name="close" color={Colors.gray} size={20} />
                  </Pressable>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noFoodsText}>No foods added yet</Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.button, (!name.trim() || selectedFoods.length === 0 || loading) && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={!name.trim() || loading || selectedFoods.length === 0}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Create Kitchen'}
          </Text>
        </TouchableOpacity>
      </View>

      {showAddFoodModal && (
        <AddKitchenFoodModal
          onClose={() => setShowAddFoodModal(false)}
          kitchenName={name}
          preferences={mockPreferences}
          onSave={handleSaveFoods}
        />
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
    marginBottom: 20,
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.coolgray,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.black,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  foodSection: {
    marginTop: 20,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: Colors.blue,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  foodList: {
    maxHeight: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 4,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.coolgray,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  foodName: {
    fontSize: 16,
    color: Colors.black,
    textTransform: 'capitalize',
    marginRight: 8,
  },
  noFoodsText: {
    color: Colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}) 