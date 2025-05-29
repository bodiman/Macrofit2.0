import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useMenuApi } from '@/lib/api/menu'
import { useEffect, useState } from 'react'
import { Kitchen } from '@shared/types/kitchenTypes'
import Colors from '@/styles/colors'
import { Link } from 'expo-router'

export default function Page() {
  const [kitchens, setKitchens] = useState<Kitchen[]>([])
  const [loading, setLoading] = useState(true)
  const menuApi = useMenuApi()

  useEffect(() => {
    loadKitchens()
  }, [])

  const loadKitchens = async () => {
    setLoading(false);
    // try {
    //   const data = await menuApi.getMenus()
    //   setKitchens(data)
    // } catch (error) {
    //   console.error('Error loading kitchens:', error)
    // } finally {
    //   setLoading(false)
    // }
  }

  const renderKitchenItem = ({ item }: { item: Kitchen }) => (
    <Link href={`../(protected)/kitchen/${item.id}`} asChild>
      <TouchableOpacity style={styles.kitchenItem}>
        <Text style={styles.kitchenName}>{item.name}</Text>
        {item.description && (
          <Text style={styles.kitchenDescription}>{item.description}</Text>
        )}
        <Text style={styles.foodCount}>{item.foods.length} foods</Text>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Kitchens ({kitchens.length})</Text>
        <Link href="../(protected)/create-kitchen" asChild>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Kitchen</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {loading ? (
        <Text style={styles.message}>Loading kitchens...</Text>
      ) : kitchens.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.message}>You have no kitchens yet</Text>
          <Text style={styles.subMessage}>Create your first kitchen to start adding foods</Text>
        </View>
      ) : (
        <FlatList
          data={kitchens}
          renderItem={renderKitchenItem}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  createButton: {
    backgroundColor: Colors.orange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 20,
  },
  kitchenItem: {
    backgroundColor: Colors.coolgray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  kitchenName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  kitchenDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  foodCount: {
    fontSize: 14,
    color: Colors.orange,
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