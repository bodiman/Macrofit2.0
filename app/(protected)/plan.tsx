import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Text, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'

export default function Page() {

  return (
    <View>
      <SignedIn>
        <Text>This are the meal plan</Text>
      </SignedIn>
    </View>
  )
}