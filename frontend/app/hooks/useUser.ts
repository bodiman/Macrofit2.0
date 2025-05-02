// hooks/useUser.ts
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';

type AppUser = {
  id: number;
  email: string;
  name: string;
  // Add other fields from your Prisma user model here
};

export function useUser() {

  const serverAddress = Constants.expoConfig?.extra?.SERVER_ADDRESS;

  const { user: clerkUser, isLoaded } = useClerkUser();
  const { getToken } = useAuth();

  const [appUser, setAppUser] = useState<AppUser | null>(null);
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

            const user = await res.json();
            setAppUser(user);

        } catch (err) {
            console.error('Failed to register app user:', err);
            setError('Failed to register user');
            return null;
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    if (!isLoaded || !clerkUser) return;

    const fetchAppUser = async () => {
      try {
        const params = new URLSearchParams({
            email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
            name: clerkUser.fullName ?? '',
            externalId: clerkUser.id,
        });

        const res = await fetch(`${serverAddress}/api/users?${params.toString()}`, {
          method: 'GET',
        });


        if (res.status === 404) {
          setNeedsRegistration(true);
        } else {
          const data = await res.json();
          setAppUser(data.user);
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

  return { appUser, loading, needsRegistration, error, clerkUser, createUser };
}

export default useUser;