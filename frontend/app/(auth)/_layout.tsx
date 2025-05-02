import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import Colors from '@/styles/colors'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    // return <Redirect href={'/'} />
  }

  return <Stack screenOptions={{
    contentStyle: {
      backgroundColor: Colors.white
    }
  }}>
    <Stack.Screen name="sign-in" options={{title: "Sign In"}}/>
    <Stack.Screen name="sign-up" options={{title: "Sign Up"}}/>
  </Stack>
}