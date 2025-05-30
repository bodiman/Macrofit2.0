import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Colors from '@/styles/colors'
import { useEffect, useState } from 'react'
import { useMenuApi } from '@/lib/api/menu'
import { Food } from '@shared/types/foodTypes'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface KitchenWithFoods {
  name: string
  description: string
  foods: (Food & { active: boolean })[]
}

export default function KitchenDetail() {
  const { id } = useLocalSearchParams()
  const [kitchen, setKitchen] = useState<KitchenWithFoods | null>(null)
  const [loading, setLoading] = useState(true)
  const menuApi = useMenuApi()

  useEffect(() => {
    const fetchKitchen = async () => {
      try {
        const foods = await menuApi.getMenuFoods(id as string)
        const menus = await menuApi.getMenus()
        const kitchenData = menus.find(menu => menu.id === id)
        if (kitchenData) {
          setKitchen({
            name: kitchenData.name,
            description: kitchenData.description || '',
            foods: foods.map(food => ({
              ...food.food,
              active: food.active
            }))
          })
        }
      } catch (error) {
        console.error('Error fetching kitchen:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchKitchen()
  }, [id])

  const handleToggleActive = async (foodId: string, currentActive: boolean) => {
    try {
      const updatedFood = await menuApi.toggleFoodActive(id as string, foodId, !currentActive)
      setKitchen(prev => {
        if (!prev) return null
        return {
          ...prev,
          foods: prev.foods.map(food => 
            food.id === foodId ? { ...food, active: !currentActive } : food
          )
        }
      })
    } catch (error) {
      console.error('Error toggling food active state:', error)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!kitchen) {
    return (
      <View style={styles.container}>
        <Text>Kitchen not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{kitchen.name}</Text>
      
      <View style={styles.form}>
        {kitchen.description ? (
          <Text style={styles.description}>{kitchen.description}</Text>
        ) : null}

        <View style={styles.foodSection}>
          <View style={styles.foodHeader}>
            <Text style={styles.title}>Foods ({kitchen.foods.length})</Text>
          </View>

          {kitchen.foods.length > 0 ? (
            <ScrollView 
              style={styles.foodListContainer}
              contentContainerStyle={styles.foodListContent}
            >
              <View style={styles.foodList}>
                {kitchen.foods.map((item) => (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.foodItem,
                      item.active && styles.foodItemActive
                    ]}
                    onPress={() => handleToggleActive(item.id, item.active)}
                  >
                    <Text style={styles.foodName}>{item.name}</Text>
                    <MaterialIcons 
                      name={item.active ? "check-circle" : "radio-button-unchecked"} 
                      size={24} 
                      color={item.active ? Colors.green : Colors.gray} 
                    />
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text style={styles.noFoodsText}>No foods in this kitchen</Text>
          )}
        </View>
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
  },
  form: {
    flex: 1,
    gap: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.black,
    paddingVertical: 12,
  },
  foodSection: {
    flex: 1,
    marginTop: 20,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodListContainer: {
    flex: 1,
  },
  foodListContent: {
    flexGrow: 1,
  },
  foodList: {
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
    minWidth: '100%',
  },
  foodItemActive: {
    backgroundColor: '#E8F5E9', // Light green background for active foods
  },
  foodName: {
    fontSize: 16,
    color: Colors.black,
    textTransform: 'capitalize',
    marginHorizontal: 4,
  },
  noFoodsText: {
    color: Colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
}) 