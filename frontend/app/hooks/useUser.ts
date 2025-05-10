// hooks/useUser.ts
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { UserPreference } from '@shared/types/databaseTypes';
import { MacroPreferences } from '@/tempdata';
import { toMacroPreference } from '@/lib/utils/toMacroPreferences';
import storage from '@/app/storage/storage';
import eventBus from '@/app/storage/eventEmitter';
import { useApi } from '@/lib/api';

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

    eventBus.on('preferencesUpdated', handleUpdate);
    return () => {
      eventBus.off('preferencesUpdated', handleUpdate);
    };
  }, []);

  // Update macro preferences when preferences change
  useEffect(() => {
    setMacroPreferences(toMacroPreference(preferences));
  }, [preferences]);

  const createUser = async (userData: { email: string; name: string }) => {
    try {
      setLoading(true);
      const data = await api.post('/api/register', userData);
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
      const updatedPreference: UserPreference[] = await api.put('/api/user/preferences', {
        user_id: appUser.user_id,
        preferences: [preference],
      });
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
      const data = await api.get(`/api/user/preferences?user_id=${userId}`);
      setPreferencesState(data);
      storage.set(CACHED_PREFERENCES_KEY, JSON.stringify(data));
      eventBus.emit('preferencesUpdated');
    } catch (err) {
      console.error('Failed to fetch preferences:', err);
      setError('Failed to fetch preferences');
    }
  };

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
        setAppUser(res);
        if (res.user_id) {
          await fetchPreferences(res.user_id);
        }
      } catch (e: any) {
        if (e.message && e.message.includes('404')) {
          setNeedsRegistration(true);
        } else {
          console.log("this is the error you are looking for")
          console.log(e)
          // console.error('Failed to fetch app user:', e);
          setError('Failed to fetch user');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppUser();
  }, [isLoaded, clerkUser]);

  return { 
    appUser, 
    preferences: macroPreferences, 
    loading, 
    needsRegistration, 
    error, 
    clerkUser, 
    createUser, 
    updatePreference 
  };
}

export default useUser;