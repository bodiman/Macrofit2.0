import Colors from '@/styles/colors'
import { SignedIn, SignedOut, useAuth, useSSO } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { Slot, Stack, Tabs } from 'expo-router'
import { Text, View } from 'react-native'
import AppHeader from '@/components/AppHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react'
import FoodSelector from '@/components/AddFood/FoodSearchModal'
import useUser from '../hooks/useUser'

export default function Layout() {
  const { signOut } = useAuth();
  const { clerkUser, needsRegistration, error } = useUser();

  if (!clerkUser || error) {
    signOut();
    return <Redirect href="/landing" />
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
          <Tabs.Screen name='index' options={{
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