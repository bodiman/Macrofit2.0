import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Text, ScrollView } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import Preferences from '@/components/Preferences'

export default function Page() {

  return (
      <Preferences />
  )
}