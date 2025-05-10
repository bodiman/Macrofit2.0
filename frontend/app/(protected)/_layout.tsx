import { SignedIn, SignedOut, useAuth, useSSO } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
import AppHeader from '@/components/AppHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useUser from '../hooks/useUser'
import { useEffect } from 'react';

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

  if (!clerkUser || error) {
    console.log("no clerk user or error")
    if (error) {
      console.log("error", error)
    }
    // signOut();
    // return <Redirect href="/landing" />
    return <Text>
      {error ? error : "No clerk user"}
    </Text>
  }

  if (needsRegistration) {
    return <Redirect href="/register" />
  }

  return (
  <View style={{flex: 1}}>
    <SignedIn>
        <AppHeader />
        
        <Tabs screenOptions={{headerShown: false}}>
          <Tabs.Screen name='menus' options={{
            title: "Menus",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
          }} />
          <Tabs.Screen name='home' options={{
            title: "Home",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }} />
          <Tabs.Screen name='plan' options={{
            title: "Plan",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="target" size={24} color={color} />,
          }} />
          <Tabs.Screen name='preferences' options={{
            title: "Preferences",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
          }} />
        </Tabs>
    </SignedIn>
    <SignedOut>
        <Redirect href={"/landing"}></Redirect>
    </SignedOut>
  </View>
  )
}