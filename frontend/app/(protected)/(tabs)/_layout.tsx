import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { View } from 'react-native'
import CalendarHeader from '@/components/CalendarHeader'
import MacrosDisplay from '@/components/MacroDisplay/MacrosDisplay'
import useUser from '@/app/hooks/useUser'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Colors from '@/styles/colors'
import { useGlobalMacros } from '@/context/GlobalMacrosContext'

// Context for global selected date
const SelectedDateContext = createContext<{
  selectedDate: Date,
  setSelectedDate: (date: Date) => void
}>({ selectedDate: new Date(), setSelectedDate: () => {} });

export function useSelectedDate() {
  return useContext(SelectedDateContext);
}

export default function TabsLayout() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    now.setHours(0,0,0,0);
    return now;
  });
  const { preferences } = useUser();
  
  // Use global macros context - only for display, not management
  const { totalMacros } = useGlobalMacros();

  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <CalendarHeader selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <View style={{backgroundColor: Colors.white, paddingBottom: 10, paddingHorizontal: 20}}>
          <View style={{ paddingTop: 10, position: 'relative' }}>
            <MacrosDisplay 
              macroPreferences={preferences} 
              macroValues={totalMacros}
              indicators={4}
              radius={35}
            />
          </View>
        </View>
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
    </SelectedDateContext.Provider>
  )
} 