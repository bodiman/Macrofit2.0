// hooks/useUser.ts
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { UserPreference, Meal as DatabaseBackedMeal, UserMealPreference } from '@shared/types/databaseTypes'; // Renamed Meal to avoid conflict
import { MacroPreferences } from '@/tempdata';
import { toMacroPreference } from '@/lib/utils/toMacroPreferences';
import storage from '@/app/storage/storage';
import eventBus from '@/app/storage/eventEmitter';
import { useApi } from '@/lib/api';
import { Meal as FoodTypeMeal, FoodServing, ServingUnit as SharedServingUnit } from '@shared/types/foodTypes'; // Kept for the structure from API
import { useSelectedDate } from '../(protected)/(tabs)/_layout';

// const defaultMeals: FoodTypeMeal[] = [
//   {
//       id: '0',
//       name: "Breakfast",
//       date: new Date(new Date().setHours(8, 0, 0, 0)),
//       time: new Date(new Date().setHours(8, 0, 0, 0)),
//       servings: [],
//   },
//   {
//       id: '1',
//       name: "Lunch",
//       date: new Date(new Date().setHours(13, 0, 0, 0)),
//       time: new Date(new Date().setHours(13, 0, 0, 0)),
//       servings: [],
//   },
//   {
//       id: '2',
//       name: "Dinner",
//       date: new Date(new Date().setHours(18, 0, 0, 0)),
//       time: new Date(new Date().setHours(18, 0, 0, 0)),
//       servings: []
//   }
// ]

type AppUser = {
  user_id: number;
  email: string;
  name: string | null;
};

const CACHED_PREFERENCES_KEY = 'cached_macro_preferences';
const CACHED_USER_MEAL_PREFERENCES_KEY = 'cached_user_meal_preferences';
const CACHED_MEALS_KEY = 'cached_meals_for_day'; // More specific caching for meals

function loadPreferences(): UserPreference[] {
  const cached = storage.getString(CACHED_PREFERENCES_KEY);
  return cached ? JSON.parse(cached) : [];
}

function loadUserMealPreferences(): UserMealPreference[] {
  const cached = storage.getString(CACHED_USER_MEAL_PREFERENCES_KEY);
  return cached ? JSON.parse(cached) : [];
}

function loadMeals(): FoodTypeMeal[] { // Expecting FoodTypeMeal structure from API/cache
  const cached = storage.getString(CACHED_MEALS_KEY);
  try {
    return cached ? JSON.parse(cached) : [];
  } catch (e) {
    console.error("Failed to parse cached meals:", e);
    return [];
  }
}

export function useUser() {
  const { user: clerkUser, isLoaded } = useClerkUser();
  const api = useApi();

  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [preferences, setPreferencesState] = useState<UserPreference[]>(loadPreferences());
  const [userMealPreferences, setUserMealPreferencesState] = useState<UserMealPreference[]>(loadUserMealPreferences());
  const [macroPreferences, setMacroPreferences] = useState<MacroPreferences>([]);
  const [loading, setLoading] = useState(true);
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Remove meals state and useEffect for auto-fetching

  // Sync preferences when external changes happen
  useEffect(() => {
    const handleUserPrefsUpdate = () => {
      const updated = loadPreferences();
      setPreferencesState(prev => {
        const prevStr = JSON.stringify(prev);
        const nextStr = JSON.stringify(updated);
        return prevStr === nextStr ? prev : updated;
      });
    };

    const handleUserMealPrefsUpdate = () => {
      const updated = loadUserMealPreferences();
      setUserMealPreferencesState(prev => {
        const prevStr = JSON.stringify(prev);
        const nextStr = JSON.stringify(updated);
        return prevStr === nextStr ? prev : updated;
      });
    };

    const handleMealsUpdate = () => {
      const updated = loadMeals();
      // setMeals(updated); // This line is removed
    };

    eventBus.on('preferencesUpdated', handleUserPrefsUpdate);
    eventBus.on('userMealPreferencesUpdated', handleUserMealPrefsUpdate);
    eventBus.on('mealsUpdated', handleMealsUpdate);
    return () => {
      eventBus.off('preferencesUpdated', handleUserPrefsUpdate);
      eventBus.off('userMealPreferencesUpdated', handleUserMealPrefsUpdate);
      eventBus.off('mealsUpdated', handleMealsUpdate);
    };
  }, []);

  // Update macro preferences when preferences change
  useEffect(() => {
    setMacroPreferences(toMacroPreference(preferences));
  }, [preferences]);

  const createUser = async (userData: { email: string; name: string }) => {
    try {
        setLoading(true);
      const res = await api.post('/api/register', userData);
      // console.log("res", res);
      const data = await res.json();
      setAppUser(data.user);
      // Assuming registration might also return initial general preferences and meal preferences
      if (data.user.macroPreferences) {
        setPreferencesState(data.user.macroPreferences);
        storage.set(CACHED_PREFERENCES_KEY, JSON.stringify(data.user.macroPreferences));
        eventBus.emit('preferencesUpdated');
      }
      // If registration provides default meal preferences, handle them here
      // For now, we expect fetchUserMealPreferences to be called after user is set
        } catch (err) {
            console.error('Failed to register app user:', err);
            setError('Failed to register user');
            return null;
        } finally {
            setLoading(false);
        }
    };

  const updatePreference = async (preference: {
    metric_id: string;
    min_value: number | null;
    max_value: number | null;
  }) => {
    if (!appUser) return;
    try {
      const res = await api.put('/api/user/preferences', {
        user_id: appUser.user_id,
        preferences: [preference],
      });
      const updatedPreferenceData: UserPreference[] = await res.json(); // API returns an array
      if (updatedPreferenceData && updatedPreferenceData.length > 0) {
          const updatedPreference = updatedPreferenceData[0];
          const updatedPreferences = preferences.map(p => 
            p.metric_id === updatedPreference.metric_id ? updatedPreference : p
          );
          setPreferencesState(updatedPreferences);
          storage.set(CACHED_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
          eventBus.emit('preferencesUpdated');
      }
    } catch (err) {
      console.error('Failed to update preferences:', err);
      setError('Failed to update preferences');
    }
  };

  const fetchPreferences = async (userId: number) => {
    try {
      const res = await api.get(`/api/user/preferences?user_id=${userId}`);
      const data = await res.json();
      setPreferencesState(data);
      storage.set(CACHED_PREFERENCES_KEY, JSON.stringify(data));
      eventBus.emit('preferencesUpdated');
    } catch (err) {
      console.error('Failed to fetch preferences:', err);
      setError('Failed to fetch preferences');
    }
  };

  const deletePreference = async (metric_id: string) => {
    if (!appUser) return;
    try {
      await api.delete(`/api/user/preferences?user_id=${appUser.user_id}&metric_id=${metric_id}`);
      const updatedPreferences = preferences.filter(p => p.metric_id !== metric_id);
      setPreferencesState(updatedPreferences);
      storage.set(CACHED_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      eventBus.emit('preferencesUpdated');
    } catch (err) {
      console.error('Failed to delete preference:', err);
      setError('Failed to delete preference');
    }
  };

  const addPreference = async ({metric_id, min_value, max_value}: {metric_id: string, min_value: number, max_value: number}): Promise<UserPreference | null> => {
    if (!appUser) {
        console.error('addPreference: No appUser found, cannot add preference.');
        setError('User not available to add preference.');
        return null;
    }
    try {
      const response = await api.post('/api/user/preferences', {
        user_id: appUser.user_id,
        metric_id,
        min_value,
        max_value
      });
      const newPreference: UserPreference = await response.json();
      setPreferencesState(prevPreferences => [...prevPreferences, newPreference]);
      storage.set(CACHED_PREFERENCES_KEY, JSON.stringify([...preferences, newPreference])); // Note: 'preferences' here might be stale, consider using the updated state
      eventBus.emit('preferencesUpdated');
      return newPreference; // Return the new preference
    } catch (err) {
      console.error('Failed to add new macro preference:', err);
      setError('Failed to add new macro preference');
      return null; // Return null on error
    }
  };

  const fetchUserMealPreferences = async (userId: number) => {
    try {
      const res = await api.get(`/api/user/meal-preferences?user_id=${userId}`);
      const data: UserMealPreference[] = await res.json();
      setUserMealPreferencesState(data);
      storage.set(CACHED_USER_MEAL_PREFERENCES_KEY, JSON.stringify(data));
      eventBus.emit('userMealPreferencesUpdated');
    } catch (err) {
      console.error('Failed to fetch user meal preferences:', err);
      setError('Failed to fetch user meal preferences');
    }
  };

  // Export getMeals function
  const getMeals = async (userId: number, date: Date) => {
    try {
      const dateString = date.toISOString().split('T')[0];
      const res = await api.get(`/api/user/meals?user_id=${userId}&date=${dateString}`);
      const data: FoodTypeMeal[] = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch meals:', err);
      setError('Failed to fetch meals');
      return [];
    }
  };

  // Fetch meals for the selected date whenever it changes
  const { selectedDate } = useSelectedDate();
  useEffect(() => {
    if (appUser && selectedDate) {
      // fetchMeals(appUser.user_id, selectedDate); // This line is removed
    }
  }, [appUser, selectedDate]);

  useEffect(() => {
    if (!isLoaded || !clerkUser) {
      setLoading(false);
      return;
    }

    const fetchAppUserAndData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
            email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
        });
        const res = await api.get(`/api/user?${params.toString()}`);
        const user = await res.json();
        setAppUser(user);
        if (user.user_id) {
          // Fetch all necessary data once user_id is available
          await Promise.all([
            fetchPreferences(user.user_id),
            fetchUserMealPreferences(user.user_id),
            // fetchMeals(user.user_id, new Date()) // Fetch for today initially - REMOVED
          ]);
        }
      } catch (e: any) {
        if (e.message && e.message.includes('404')) {
          setNeedsRegistration(true);
        } else {
          console.error('Failed to fetch app user or related data:', e);
          setError('Failed to fetch user data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppUserAndData();
  }, [isLoaded, clerkUser]); // api should be stable, fetchX functions depend on appUser or passed params


  const deleteFoodFromMeal = async (mealId: string, foodServingId: string) => {
    try {
      await api.delete(`/api/user/meals/servings/${foodServingId}`);
      eventBus.emit('mealsUpdated');
    } catch (err) {
      eventBus.emit('mealsUpdated');
      console.error('Failed to delete food from meal:', err);
      setError('Failed to delete food from meal');
    }
  };

  const addFoodsToMeal = async (mealId: string, foodsToAdd: FoodServing[]) => {
    // No local meals state to update
    try {
      await api.post(`/api/user/meals/${mealId}/servings`, {
        foodServings: foodsToAdd
      });
      eventBus.emit('mealsUpdated');
    } catch (err) {
      eventBus.emit('mealsUpdated');
      console.error('Failed to add foods to meal:', err);
      setError('Failed to add foods to meal');
    }
  };

  const updateFoodPortion = async (servingId: string, quantity: number, unit: SharedServingUnit, newStatus?: 'PLANNED' | 'LOGGED') => {
    if (!appUser) return;
    try {
      const payload: any = {
        quantity: quantity,
        unit: { id: unit.id }, 
      };
      if (newStatus) {
        payload.status = newStatus;
      }
      await api.put(`/api/user/meals/servings/${servingId}`, payload);
      eventBus.emit('mealsUpdated');
    } catch (err) {
      eventBus.emit('mealsUpdated');
      console.error('Failed to update food portion:', err);
      setError('Failed to update food portion');
    }
  };

  // CRUD for UserMealPreferences (Meal Slots)
  const addUserMealPreference = async (preferenceData: Omit<UserMealPreference, 'id' | 'user_id' | 'macroGoals' | 'display_order'>) => {
    if (!appUser) return null;
    const originalPreferences = userMealPreferences;
    try {
      const response = await api.post('/api/user/meal-preferences', {
        ...preferenceData,
      });
      const newPreference: UserMealPreference = await response.json();
      const updatedPreferences = [...originalPreferences, newPreference].sort((a, b) => {
        return a.default_time.localeCompare(b.default_time);
      });
      setUserMealPreferencesState(updatedPreferences);
      storage.set(CACHED_USER_MEAL_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      eventBus.emit('userMealPreferencesUpdated');

      // Optimistically update meals for today
      // await fetchMeals(appUser.user_id, new Date()); // This line is removed

      return newPreference;
    } catch (err) {
      console.error('Failed to add user meal preference:', err);
      setError('Failed to add user meal preference');
      return null;
    }
  };

  const updateUserMealPreference = async (preferenceId: string, updateData: Partial<Omit<UserMealPreference, 'id' | 'user_id' | 'macroGoals' | 'display_order'>>) => {
    if (!appUser) return null;
    const originalPreferences = userMealPreferences;
    try {
      const response = await api.put(`/api/user/meal-preferences/${preferenceId}`, updateData);
      const updatedPreference: UserMealPreference = await response.json();
      const updatedPreferences = originalPreferences
        .map(p => p.id === preferenceId ? updatedPreference : p)
        .sort((a, b) => {
            return a.default_time.localeCompare(b.default_time);
        });
      setUserMealPreferencesState(updatedPreferences);
      storage.set(CACHED_USER_MEAL_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      eventBus.emit('userMealPreferencesUpdated');
      // Optimistically update meals for today
      // await fetchMeals(appUser.user_id, new Date()); // This line is removed

      return updatedPreference;
    } catch (err) {
      console.error('Failed to update user meal preference:', err);
      setError('Failed to update user meal preference');
      return null;
    }
  };

  const deleteUserMealPreference = async (preferenceId: string) => {
    if (!appUser) return;
    const originalPreferences = userMealPreferences;
    try {
      await api.delete(`/api/user/meal-preferences/${preferenceId}`);
      const updatedPreferences = originalPreferences.filter(p => p.id !== preferenceId);
      setUserMealPreferencesState(updatedPreferences);
      storage.set(CACHED_USER_MEAL_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      eventBus.emit('userMealPreferencesUpdated');

      // Optimistically update meals for today
      if (appUser) { // Check appUser again just in case, though outer check should cover
        console.log("Fetching meals from deleteUserMealPreference")
        // await fetchMeals(appUser.user_id, new Date()); // This line is removed
      }

    } catch (err) {
      console.error('Failed to delete user meal preference:', err);
      setError('Failed to delete user meal preference');
    }
  };

  return { 
    // General
    loading,
    error, 

    // User
    appUser, 
    needsRegistration, 
    clerkUser, 
    createUser, 

    // Preferences (General)
    preferences: macroPreferences, 
    rawPreferences: preferences, // Add raw preferences for macro calculations
    updatePreference, 
    deletePreference,
    addPreference,

    // User Meal Preferences (Meal Slots)
    userMealPreferences, // Exposed state
    fetchUserMealPreferences,
    addUserMealPreference,
    updateUserMealPreference,
    deleteUserMealPreference,

    // Meals & Servings
    // meals, // Removed from exports
    addFoodsToMeal,
    deleteFoodFromMeal,
    updateFoodPortion,
    getMeals, // Added getMeals to exports
  };
}

export default useUser;