import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { Slot } from 'expo-router'
import { Text } from 'react-native'

export default function Layout() {

  return (
  <>
    <SignedIn>
        <Slot />
    </SignedIn>
    <SignedOut>
        <Redirect href={"/landing"}></Redirect>
    </SignedOut>
  </>
  )
}