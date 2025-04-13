import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ this one
import { SignOutButton } from '@/components/SignOutButton'
import { Meal, meals } from '@/tempdata'
import MealDisplay from '@/components/MealDisplay'

export default function Page() {
  const { user } = useUser()

  return (
      <View style={styles.parentReference}>
        <SignedIn>
          <FlatList
            style={styles.mealContent}
            data={meals}
            keyExtractor={(meal: Meal) => meal.name}
            renderItem={({ item }: { item: Meal }) => <MealDisplay meal={ item }/>}
            ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
            showsVerticalScrollIndicator={false}
          />
        </SignedIn>
      </View>
  )
}

const styles = StyleSheet.create({
  parentReference: {
    display: "flex",
    height: "100%"
  },
  macroContainer: {

  },
  mealContent: {
    paddingVertical: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  }
})