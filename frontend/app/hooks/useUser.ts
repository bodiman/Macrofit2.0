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
  const serverAddress = Constants.expoConfig?.extra?.SERVER_ADDRESS;
  const { user: clerkUser, isLoaded } = useClerkUser();
  const api = useApi();

  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [preferences, setPreferencesState] = useState<UserPreference[]>(loadPreferences());
  const [userMealPreferences, setUserMealPreferencesState] = useState<UserMealPreference[]>(loadUserMealPreferences());
  const [macroPreferences, setMacroPreferences] = useState<MacroPreferences>([]);
  const [loading, setLoading] = useState(true);
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [meals, setMeals] = useState<FoodTypeMeal[]>(loadMeals()); // Initialize with cached or empty

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
      setMeals(updated);
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

  const addPreference = async ({metric_id, min_value, max_value}: {metric_id: string, min_value: number, max_value: number}) => {
    if (!appUser) return;
    try {
      const response = await api.post('/api/user/preferences', {
        user_id: appUser.user_id,
        metric_id,
        min_value,
        max_value
      });
      const newPreference = await response.json();
      setPreferencesState([...preferences, newPreference]);
      storage.set(CACHED_PREFERENCES_KEY, JSON.stringify([...preferences, newPreference]));
      eventBus.emit('preferencesUpdated');
    } catch (err) {
      console.error('Failed to add new macro preference:', err);
      setError('Failed to add new macro preference');
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

  const fetchMeals = async (userId: number, date: Date) => {
    try {
      // The backend GET /api/user/meals now handles upserting based on UserMealPreference
      // and cleaning up old, empty, non-preferred meals.
      const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const res = await api.get(`/api/user/meals?user_id=${userId}&date=${dateString}`);
      const data: FoodTypeMeal[] = await res.json();
      
      setMeals(data); // Directly set the meals from the API response
      storage.set(CACHED_MEALS_KEY, JSON.stringify(data));
      eventBus.emit('mealsUpdated');
    } catch (err) {
        console.error('Failed to fetch meals:', err);
        setError('Failed to fetch meals');
    }
  };

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
            fetchMeals(user.user_id, new Date()) // Fetch for today initially
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
    const originalMeals = meals;
    const updatedMeals = meals.map(meal => {
      if (meal.id === mealId) {
        return {
          ...meal,
          servings: meal.servings.filter(serving => serving.id !== foodServingId)  
        };
      }
      return meal;
    });

    setMeals(updatedMeals);
    storage.set(CACHED_MEALS_KEY, JSON.stringify(updatedMeals));
    eventBus.emit('mealsUpdated');

    try {
      await api.delete(`/api/user/meals/servings/${foodServingId}`);
    } catch (err) {
      setMeals(originalMeals); // Revert on error
      storage.set(CACHED_MEALS_KEY, JSON.stringify(originalMeals));
      eventBus.emit('mealsUpdated');
      console.error('Failed to delete food from meal:', err);
      setError('Failed to delete food from meal');
    }
  };

  const addFoodsToMeal = async (mealId: string, foodsToAdd: FoodServing[]) => {
      const originalMeals = meals;
      // Optimistically update UI
      const updatedMeals = meals.map(meal => {
        if (meal.id === mealId) {
          // Ensure IDs are unique if generating client-side before sending to backend
          // For now, assuming backend generates IDs or they are passed correctly
          return {
            ...meal,
            servings: [...meal.servings, ...foodsToAdd]
          };
        }
        return meal;
      });

      setMeals(updatedMeals);
      storage.set(CACHED_MEALS_KEY, JSON.stringify(updatedMeals));
      eventBus.emit('mealsUpdated');

      try {
        // API expects an array of food servings
        const response = await api.post(`/api/user/meals/${mealId}/servings`, {
          foodServings: foodsToAdd
        });
        // Optionally, update local state with response from server (e.g., if IDs are generated server-side)
        // For now, refetching meals or relying on optimistic update.
        // Consider a full refetch if IDs change or for data consistency:
        // if (appUser) await fetchMeals(appUser.user_id, new Date(updatedMeals.find(m => m.id === mealId)!.date));

      } catch (err) {
        setMeals(originalMeals); // Revert on error
        storage.set(CACHED_MEALS_KEY, JSON.stringify(originalMeals));
        eventBus.emit('mealsUpdated');
        console.error('Failed to add foods to meal:', err);
        setError('Failed to add foods to meal');
      }
  };

  const updateFoodPortion = async (servingId: string, quantity: number, unit: SharedServingUnit) => {
      const originalMeals = meals;
      const updatedMeals = meals.map(meal => {
          const updatedServings = meal.servings.map(serving => {
              if (serving.id === servingId) {
                  return {
                      ...serving,
                      quantity,
                      unit // Assuming unit structure matches what API expects or is part of serving
                  };
              }
              return serving;
          });
          return {
              ...meal,
              servings: updatedServings
          };
      });
      
      setMeals(updatedMeals);
      storage.set(CACHED_MEALS_KEY, JSON.stringify(updatedMeals));
      eventBus.emit('mealsUpdated');

      try {
        await api.put(`/api/user/meals/servings/${servingId}`, {
          quantity: quantity !== undefined ? quantity : 0, // ensure quantity is not undefined
          unit: { id: unit.id }, // Send only the unit ID if that's what the backend expects to link
        });
      } catch (err) {
        setMeals(originalMeals); // Revert on error
        storage.set(CACHED_MEALS_KEY, JSON.stringify(originalMeals));
        eventBus.emit('mealsUpdated');
        console.error('Failed to update food portion:', err);
        setError('Failed to update food portion');
      }
  };

  // CRUD for UserMealPreferences (Meal Slots)
  const addUserMealPreference = async (preferenceData: Omit<UserMealPreference, 'id' | 'user_id' | 'macroGoals'>) => {
    if (!appUser) return null;
    const originalPreferences = userMealPreferences;
    // Optimistic update: generate a temporary ID for UI rendering if needed, or wait for backend response
    // For simplicity, we'll add after backend confirmation for now.
    try {
      const response = await api.post('/api/user/meal-preferences', {
        ...preferenceData,
        // user_id is added by the backend based on authenticated session
      });
      const newPreference: UserMealPreference = await response.json();
      const updatedPreferences = [...originalPreferences, newPreference].sort((a, b) => a.display_order - b.display_order);
      setUserMealPreferencesState(updatedPreferences);
      storage.set(CACHED_USER_MEAL_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      eventBus.emit('userMealPreferencesUpdated');
      return newPreference;
    } catch (err) {
      // Revert optimistic update if it was done: setUserMealPreferencesState(originalPreferences);
      console.error('Failed to add user meal preference:', err);
      setError('Failed to add user meal preference');
      return null;
    }
  };

  const updateUserMealPreference = async (preferenceId: string, updateData: Partial<Omit<UserMealPreference, 'id' | 'user_id' | 'macroGoals'>>) => {
    if (!appUser) return null;
    const originalPreferences = userMealPreferences;
    try {
      const response = await api.put(`/api/user/meal-preferences/${preferenceId}`, updateData);
      const updatedPreference: UserMealPreference = await response.json();
      const updatedPreferences = originalPreferences.map(p => p.id === preferenceId ? updatedPreference : p).sort((a, b) => a.display_order - b.display_order);
      setUserMealPreferencesState(updatedPreferences);
      storage.set(CACHED_USER_MEAL_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      eventBus.emit('userMealPreferencesUpdated');
      return updatedPreference;
    } catch (err) {
      // Revert: setUserMealPreferencesState(originalPreferences);
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
      // No need to re-sort here as order of remaining items doesn't change
      setUserMealPreferencesState(updatedPreferences);
      storage.set(CACHED_USER_MEAL_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      eventBus.emit('userMealPreferencesUpdated');
    } catch (err) {
      // Revert: setUserMealPreferencesState(originalPreferences);
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
    meals,
    fetchMeals, // Expose if manual refresh by date is needed
    addFoodsToMeal,
    deleteFoodFromMeal,
    updateFoodPortion,
  };
}

export default useUser;