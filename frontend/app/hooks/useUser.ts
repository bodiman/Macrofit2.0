// hooks/useUser.ts
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { UserPreference } from '@/types/userTypes';
import { MacroPreferences } from '@/tempdata';
import { toMacroPreference } from '@/lib/utils/toMacroPreferences';

type AppUser = {
  user_id: number;
  email: string;
  name: string | null;
};

export function useUser() {
  const serverAddress = Constants.expoConfig?.extra?.SERVER_ADDRESS;

  const { user: clerkUser, isLoaded } = useClerkUser();
  const { getToken } = useAuth();

  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [preferences, setPreferences] = useState<UserPreference[]>([]);
  const [macroPreferences, setMacroPreferences] = useState<MacroPreferences>([]);
  const [loading, setLoading] = useState(true);
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const [error, setError] = useState<null | string>(null);

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
      setPreferences(data.user.macroPreferences);
      setMacroPreferences(toMacroPreference(data.user.macroPreferences));
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
      console.log(updatedPreference[0].metric_id);
      
      // console.log(preferences);
      const updatedPreferences = preferences.map(p => 
        p.metric_id === updatedPreference[0].metric_id ? updatedPreference[0] : p
      );

      setPreferences(updatedPreferences);
      setMacroPreferences(toMacroPreference(updatedPreferences));
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
      setPreferences(data);
      setMacroPreferences(toMacroPreference(data));
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