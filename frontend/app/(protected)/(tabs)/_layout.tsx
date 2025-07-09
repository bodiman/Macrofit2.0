import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { View, ActivityIndicator } from 'react-native'
import CalendarHeader from '@/components/CalendarHeader'
import MacrosDisplay from '@/components/MacroDisplay/MacrosDisplay'
import useUser from '@/app/hooks/useUser'
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import Colors from '@/styles/colors'
import { Meal } from '@shared/types/foodTypes'
import { calculateAllMacrosOptimized } from '@/utils/optimizedMacroCalculation'
import eventBus from '@/app/storage/eventEmitter'

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
  const { preferences, rawPreferences, appUser, getMeals } = useUser();
  const [mealsData, setMealsData] = useState<{
    meals: Meal[];
    macros: any;
  }>({ meals: [], macros: {} });
  const [mealsLoading, setMealsLoading] = useState(false);
  const [mealPlanMacros, setMealPlanMacros] = useState({});

  // Fetch meals when selectedDate or appUser changes
  useEffect(() => {
    if (appUser && selectedDate) {
      setMealsLoading(true);
      getMeals(appUser.user_id, selectedDate)
        .then((fetchedMeals) => {
          // Use optimized batch calculation
          const totalMacros = calculateAllMacrosOptimized(fetchedMeals, rawPreferences);
          // Update both meals and macros in single state change
          setMealsData({ meals: fetchedMeals, macros: totalMacros });
        })
        .finally(() => setMealsLoading(false));
    } else {
      setMealsData({ meals: [], macros: {} });
      setMealsLoading(false);
    }
  }, [appUser, selectedDate, rawPreferences]);

  // Listen for meal updates from other pages
  useEffect(() => {
    const handleMealsUpdated = () => {
      if (appUser && selectedDate) {
        setMealsLoading(true);
        getMeals(appUser.user_id, selectedDate)
          .then((fetchedMeals) => {
            const totalMacros = calculateAllMacrosOptimized(fetchedMeals, rawPreferences);
            setMealsData({ meals: fetchedMeals, macros: totalMacros });
          })
          .finally(() => setMealsLoading(false));
      }
    };

    const handleMealPlanMacrosUpdate = (macros: any) => {
      setMealPlanMacros(macros);
    };

    eventBus.on('mealsUpdated', handleMealsUpdated);
    eventBus.on('mealPlanMacrosUpdated', handleMealPlanMacrosUpdate);
    
    return () => {
      eventBus.off('mealsUpdated', handleMealsUpdated);
      eventBus.off('mealPlanMacrosUpdated', handleMealPlanMacrosUpdate);
    };
  }, [appUser, selectedDate, rawPreferences]);

  // Combine actual meals macros with meal plan macros
  const totalMacros = useMemo(() => {
    const combined: any = {};

    // Add actual meals macros
    for (const [key, value] of Object.entries(mealsData.macros)) {
      combined[key] = (combined[key] || 0) + value;
    }

    // Add meal plan macros
    for (const [key, value] of Object.entries(mealPlanMacros)) {
      combined[key] = (combined[key] || 0) + (value as number);
    }

    return combined;
  }, [mealsData.macros, mealPlanMacros]);

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
            {mealsLoading && (
              <View style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                justifyContent: 'center', 
                alignItems: 'center',
                borderRadius: 8
              }}>
                <ActivityIndicator size="small" color={Colors.blue} />
              </View>
            )}
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