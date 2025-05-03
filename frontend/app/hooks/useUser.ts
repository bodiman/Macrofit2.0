// hooks/useUser.ts
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';

type UserPreference = {
  id: number;
  user_id: number;
  metric_id: number;
  min_value: number | null;
  max_value: number | null;
  metric: {
    id: number;
    name: string;
    unit: string;
    description: string | null;
  };
};

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
    } catch (err) {
      console.error('Failed to register app user:', err);
      setError('Failed to register user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences: Array<{
    metric_id: number;
    min_value: number | null;
    max_value: number | null;
  }>) => {
    if (!appUser) return;

    try {
      // setLoading(true);
      const res = await fetch(`${serverAddress}/api/user/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: appUser.user_id,
          preferences,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update preferences');
      }

      const updatedPreferences = await res.json();
      console.log(updatedPreferences);
      console.log('--------------------------------');
      console.log('updatedPreferences');
      
      setPreferences(updatedPreferences);
    } catch (err) {
      console.error('Failed to update preferences:', err);
      setError('Failed to update preferences');
    } finally {
      // setLoading(false);
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

        // console.log("res", res);
        if (res.status === 404) {
          setNeedsRegistration(true);
        } else {
          const data = await res.json();
          // console.log("data", data);
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

  return { appUser, preferences, loading, needsRegistration, error, clerkUser, createUser, updatePreferences };
}

export default useUser;