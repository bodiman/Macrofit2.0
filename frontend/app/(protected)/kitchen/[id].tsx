import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Colors from '@/styles/colors'
import { useEffect, useState } from 'react'
import { useMenuApi } from '@/lib/api/menu'
import { Food } from '@shared/types/foodTypes'

export default function KitchenDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const menuApi = useMenuApi()

  useEffect(() => {
    loadKitchenFoods()
  }, [id])

  const loadKitchenFoods = async () => {
    try {
      const data = await menuApi.getMenuFoods(id)
      setFoods(data)
    } catch (error) {
      console.error('Error loading kitchen foods:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderFoodItem = ({ item }: { item: Food }) => (
    <View style={styles.foodItem}>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodMacros}>
        {Object.entries(item.macros)
          .map(([key, value]) => `${key}: ${value}g`)
          .join(' | ')}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.message}>Loading foods...</Text>
      ) : foods.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.message}>No foods in this kitchen yet</Text>
          <Text style={styles.subMessage}>Add foods to get started</Text>
        </View>
      ) : (
        <FlatList
          data={foods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
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
  list: {
    paddingBottom: 20,
  },
  foodItem: {
    backgroundColor: Colors.coolgray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  foodMacros: {
    fontSize: 14,
    color: Colors.gray,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
  },
}) 