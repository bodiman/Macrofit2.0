import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack, Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import Colors from '@/styles/colors'
import { View } from 'react-native'


export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
        <Stack 
          screenOptions={{
            headerShown: false, 
            contentStyle: {
                backgroundColor: Colors.gray, 
                height: "100%", 
                width: "100%"
              }
          }}
        />

    </ClerkProvider>
  )
}