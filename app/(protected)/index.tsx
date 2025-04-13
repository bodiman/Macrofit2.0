import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { meals } from '@/tempdata'
import MealDisplay from '@/components/MealDisplay'

export default function Page() {
  const { user } = useUser()

  return (
    <View>
      <SignedIn>
        { 
          meals.map(meal => (
            <MealDisplay meal={meal} />
          ))
        }
      </SignedIn>
    </View>
  )
}