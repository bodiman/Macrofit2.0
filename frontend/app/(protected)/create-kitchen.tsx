import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import Colors from '@/styles/colors'
import { useState } from 'react'
import { useMenuApi } from '@/lib/api/menu'

export default function CreateKitchen() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const menuApi = useMenuApi()

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

        <TouchableOpacity 
          style={[styles.button, (!name.trim() || loading) && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={!name.trim() || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Create Kitchen'}
          </Text>
        </TouchableOpacity>
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