import { SignedIn, SignedOut, useAuth, useSSO } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'
import { View, Text } from 'react-native'
import useUser from '../hooks/useUser'

export default function Layout() {
  const { signOut } = useAuth();
  const { clerkUser, needsRegistration, error, loading} = useUser();

  if (loading) {
    return (<Text>
        Loading...

        { loading ? "loading" : "not loading"}

        {JSON.stringify(clerkUser)}

        {JSON.stringify(error)}
      </Text>)
  }

  if (error) {
    if (error) {
      console.log("error", error)
    }
    
    return <Text>
      {error ? error : "No clerk user"}
    </Text>
  }

  if (!clerkUser) {
    return <Redirect href="/landing" />
  }

  if (needsRegistration) {
    return <Redirect href="/register" />
  }

  return (
  <View style={{flex: 1}}>
    <SignedIn>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="plan" options={{ headerShown: false }} />
          <Stack.Screen 
            name="create-kitchen" 
            options={{ 
              presentation: 'modal',
              title: 'Create Kitchen'
            }} 
          />
          <Stack.Screen 
            name="kitchen/[id]" 
            options={{ 
              presentation: 'modal',
              title: 'Kitchen Details'
            }} 
          />
        </Stack>
    </SignedIn>
    <SignedOut>
        <Redirect href={"/landing"}></Redirect>
    </SignedOut>
  </View>
  )
}