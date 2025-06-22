import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { View } from 'react-native'
import AppHeader from '@/components/AppHeader'

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen 
          name='menus' 
          options={{
            title: "Menus",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
          }} 
        />
        <Tabs.Screen 
          name='home' 
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }} 
        />
        <Tabs.Screen 
          name='plan' 
          options={{
            title: "Plan",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="target" size={24} color={color} />,
          }} 
        />
        <Tabs.Screen 
          name='preferences' 
          options={{
            title: "Preferences",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
          }} 
        />
        <Tabs.Screen 
          name='plan-list' 
          options={{
            href: null, // Hide from tab bar
          }} 
        />
        <Tabs.Screen 
          name='plan-new' 
          options={{
            href: null, // Hide from tab bar
          }} 
        />
        <Tabs.Screen 
          name='plan-detail' 
          options={{
            href: null, // Hide from tab bar
          }} 
        />
      </Tabs>
    </View>
  )
} 