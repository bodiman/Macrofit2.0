import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack, Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import Colors from '@/styles/colors'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Constants from 'expo-constants';
import { UserProvider } from './context/UserContext';
import { GlobalMacrosProvider } from '@/context/GlobalMacrosContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider 
        publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY ?? ''}
        tokenCache={tokenCache}
      >
        <UserProvider>
          <GlobalMacrosProvider>
            <Stack 
              screenOptions={{
                headerShown: false, 
                contentStyle: {
                  // backgroundColor: Colors.white, 
                }
              }}
            />
          </GlobalMacrosProvider>
        </UserProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  )
}