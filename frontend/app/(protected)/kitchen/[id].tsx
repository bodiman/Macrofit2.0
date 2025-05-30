import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Colors from '@/styles/colors'
import { useEffect, useState } from 'react'
import { useMenuApi } from '@/lib/api/menu'
import { Food } from '@shared/types/foodTypes'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function KitchenDetail() {
  const { id } = useLocalSearchParams()
  const [kitchen, setKitchen] = useState<{ name: string; description: string; foods: Food[] } | null>(null)
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
            foods
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
          <View style={styles.descriptionSection}>
            <Text style={styles.description}>{kitchen.description}</Text>
          </View>
        ) : null}

        <View style={styles.foodSection}>
          <View style={styles.foodHeader}>
            <Text style={styles.label}>Foods ({kitchen.foods.length})</Text>
          </View>

          {kitchen.foods.length > 0 ? (
            <ScrollView 
              style={styles.foodListContainer}
              contentContainerStyle={styles.foodListContent}
            >
              <View style={styles.foodList}>
                {kitchen.foods.map((item) => (
                  <View key={item.id} style={styles.foodItem}>
                    <Text style={styles.foodName}>{item.name}</Text>
                  </View>
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
    marginBottom: 20,
  },
  form: {
    flex: 1,
    gap: 12,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.coolgray,
    padding: 12,
    borderRadius: 8,
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
}) 