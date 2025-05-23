// hooks/useUser.ts
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { UserPreference, Meal } from '@shared/types/databaseTypes';
import { MacroPreferences, ServingUnit } from '@/tempdata';
import { toMacroPreference } from '@/lib/utils/toMacroPreferences';
import storage from '@/app/storage/storage';
import eventBus from '@/app/storage/eventEmitter';
import { useApi } from '@/lib/api';
import { Meal as TempMeal } from '@shared/types/foodTypes';
import { FoodServing } from '@shared/types/foodTypes';

const defaultMeals: TempMeal[] = [
  {
      id: '0',
      name: "Breakfast",
      date: new Date(new Date().setHours(8, 0, 0, 0)),
      time: new Date(new Date().setHours(8, 0, 0, 0)),
      servings: [],
  },
  {
      id: '1',
      name: "Lunch",
      date: new Date(new Date().setHours(13, 0, 0, 0)),
      time: new Date(new Date().setHours(13, 0, 0, 0)),
      servings: [],
  },
  {
      id: '2',
      name: "Dinner",
      date: new Date(new Date().setHours(18, 0, 0, 0)),
      time: new Date(new Date().setHours(18, 0, 0, 0)),
      servings: []
  }
]


type AppUser = {
  user_id: number;
  email: string;
  name: string | null;
};

const CACHED_PREFERENCES_KEY = 'cached_macro_preferences';

function loadPreferences(): UserPreference[] {
  const cached = storage.getString(CACHED_PREFERENCES_KEY);
  return cached ? JSON.parse(cached) : [];
}

function loadMeals(): TempMeal[] {
  const cached = storage.getString('meals');
  return cached ? JSON.parse(cached) : [];
}

export function useUser() {
  const serverAddress = Constants.expoConfig?.extra?.SERVER_ADDRESS;
  // console.log("server Address", serverAddress)

  const { user: clerkUser, isLoaded } = useClerkUser();
  const api = useApi();

  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [preferences, setPreferencesState] = useState<UserPreference[]>(loadPreferences());
  const [macroPreferences, setMacroPreferences] = useState<MacroPreferences>([]);
  const [loading, setLoading] = useState(true);
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [meals, setMeals] = useState<TempMeal[]>(defaultMeals);

  // Sync preferences when external changes happen
  useEffect(() => {
    const handleUpdate = () => {
      const updated = loadPreferences();

      setPreferencesState(prev => {
        const prevStr = JSON.stringify(prev);
        const nextStr = JSON.stringify(updated);
        return prevStr === nextStr ? prev : updated;
      });
    };

    const handleMealsUpdate = () => {
      const updated = loadMeals();
      setMeals(updated);
    }

    eventBus.on('preferencesUpdated', handleUpdate);
    eventBus.on('mealsUpdated', handleMealsUpdate);
    return () => {
      eventBus.off('preferencesUpdated', handleUpdate);
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
      setPreferencesState(data.user.macroPreferences);
      storage.set(CACHED_PREFERENCES_KEY, JSON.stringify(data.user.macroPreferences));
      eventBus.emit('preferencesUpdated');
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
      const updatedPreference: UserPreference[] = await res.json();
      const updatedPreferences = preferences.map(p => 
        p.metric_id === updatedPreference[0].metric_id ? updatedPreference[0] : p
      );
      setPreferencesState(updatedPreferences);
      storage.set(CACHED_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      eventBus.emit('preferencesUpdated');
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

      // console.log("adding preference", response)
      const newPreference = await response.json();
      setPreferencesState([...preferences, newPreference]);
    } catch (err) {
      console.error('Failed to add new macro preference:', err);
      setError('Failed to add new macro preference');
    }
  };

  const fetchMeals = async (userId: number, date: Date) => {
    const res = await api.get(`/api/user/meals?user_id=${userId}&date=${date}`);
    let data = await res.json();
    const meals_to_create = [];

    for (const meal of defaultMeals) {
      const mealData = data.find((m: Meal) => m.name === meal.name);
      // console.log("meal", meal)
      if (!mealData) {
        meals_to_create.push(meal);
      }
    }

    if (meals_to_create.length > 0) {
      const created_response = await api.post('/api/user/meals', {
        user_id: userId,
        meals: meals_to_create
      });
      const created = await created_response.json();
      data = [...data, ...created].sort((a, b) => a.time - b.time);
    }
    
    setMeals(data);
  }

  useEffect(() => {
    if (!isLoaded || !clerkUser) {
      setLoading(false);
      return;
    }

    const fetchAppUser = async () => {
      try {
        const params = new URLSearchParams({
          email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
        });
        const res = await api.get(`/api/user?${params.toString()}`);
        const user = await res.json();
        setAppUser(user);
        if (user.user_id) {
          await fetchPreferences(user.user_id);
          await fetchMeals(user.user_id, new Date());
        }
      } catch (e: any) {
        if (e.message && e.message.includes('404')) {
          setNeedsRegistration(true);
        } else {
          console.error('Failed to fetch app user:', e);
          setError('Failed to fetch user');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppUser();
  }, [isLoaded, clerkUser]);


  const deleteFoodFromMeal = async (mealId: string, foodId: string) => {
    const updatedMeals = meals.map(meal => {
      if (meal.id === mealId) {
        return {
          ...meal,
          servings: meal.servings.filter(serving => serving.id !== foodId)  
        };
      }
      return meal;
    });

    const originalMeals = meals;

    setMeals(updatedMeals);
    storage.set('meals', JSON.stringify(updatedMeals));
    eventBus.emit('mealsUpdated');

    try {
      await api.delete(`/api/user/meals/servings/${foodId}`);
    } catch (err) {
      setMeals(originalMeals);
      storage.set('meals', JSON.stringify(originalMeals));
      eventBus.emit('mealsUpdated');
      console.log(originalMeals)
      console.error('Failed to delete food from meal:', err);
      setError('Failed to delete food from meal');
    }
  };

  // Add foods to a meal
  // make a request to the server to create a new FoodServing associated with a particular meal
  // update the local state to reflect the new FoodServing
  const addFoodsToMeal = async (mealId: string, foodsToAdd: FoodServing[]) => {

      //update local state to reflect the new FoodServing
      const updatedMeals = meals.map(meal => {
        if (meal.id === mealId) {
          return {
            ...meal,
            servings: [...meal.servings, ...foodsToAdd]
          };
        }
        return meal;
      });

      const originalMeals = meals;

      storage.set('meals', JSON.stringify(updatedMeals));
      eventBus.emit('mealsUpdated');

      try {
        // make a post request to the server to add the foods to the meal
        await api.post(`/api/user/meals/${mealId}/servings`, {
          foodServings: foodsToAdd
        });
      } catch (err) {
        // set local state to reflect the original state
        storage.set('meals', JSON.stringify(originalMeals));
        eventBus.emit('mealsUpdated');

        console.error('Failed to add foods to meal:', err);
        setError('Failed to add foods to meal');
      }
  };

  // Update a food's portion in a meal
  const updateFoodPortion = async (servingId: string, quantity: number, unit: ServingUnit) => {
      const updatedMeals = meals.map(meal => {
          const updatedFoods = meal.servings.map(serving => {
              if (serving.id === servingId) {
                  return {
                      ...serving,
                      quantity,
                      unit
                  };
              }
              return serving;
          });
          return {
              ...meal,
              servings: updatedFoods
          };
      });
      storage.set('meals', JSON.stringify(updatedMeals));
      eventBus.emit('mealsUpdated');

      try {
        await api.put(`/api/user/meals/servings/${servingId}`, {
          quantity: quantity ? quantity : 0,
          unit,
        });
      } catch (err) {
        console.error('Failed to update food portion:', err);
        setError('Failed to update food portion');
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

    // Preferences
    preferences: macroPreferences, 
    updatePreference, 
    deletePreference,
    addPreference,

    // Meals
    meals,
    addFoodsToMeal,
    deleteFoodFromMeal,
    updateFoodPortion,
    
  };
}

export default useUser;