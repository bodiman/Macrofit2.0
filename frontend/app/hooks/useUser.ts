// hooks/useUser.ts
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { UserPreference } from '@shared/types/databaseTypes';
import { MacroPreferences } from '@/tempdata';
import { toMacroPreference } from '@/lib/utils/toMacroPreferences';
import storage from '@/app/storage/storage';
import eventBus from '@/app/storage/eventEmitter';

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

  const { user: clerkUser, isLoaded } = useClerkUser();
  const { getToken } = useAuth();

  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [preferences, setPreferencesState] = useState<UserPreference[]>(loadPreferences());
  const [macroPreferences, setMacroPreferences] = useState<MacroPreferences>([]);
  const [loading, setLoading] = useState(false);
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
      const res = await fetch(`${serverAddress}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error('Failed to create user');
      }

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
      const res = await fetch(`${serverAddress}/api/user/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: appUser.user_id,
          preferences: [preference],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update preferences');
      }

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
      const res = await fetch(`${serverAddress}/api/user/preferences?user_id=${userId}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch preferences');
      }

      const data = await res.json();
      setPreferencesState(data);
      storage.set(CACHED_PREFERENCES_KEY, JSON.stringify(data));
      eventBus.emit('preferencesUpdated');
    } catch (err) {
      console.error('Failed to fetch preferences:', err);
      setError('Failed to fetch preferences');
    }
  };

  useEffect(() => {
    if (!isLoaded || !clerkUser) return;

    const fetchAppUser = async () => {
      try {
        const params = new URLSearchParams({
          email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
        });

        const res = await fetch(`${serverAddress}/api/user?${params.toString()}`, {
          method: 'GET',
        });

        if (res.status === 404) {
          setNeedsRegistration(true);
        } else {
          const data = await res.json();
          setAppUser(data);
          if (data.user_id) {
            await fetchPreferences(data.user_id);
          }
        }
      } catch (e) {
        console.error('Failed to fetch app user:', e);
        setError('Failed to fetch user');
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