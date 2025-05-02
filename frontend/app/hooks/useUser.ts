// hooks/useUser.ts
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';

type AppUser = {
  id: number;
  email: string;
  name: string;
  // Add other fields from your Prisma user model here
};

export function useUser() {
  const { user: clerkUser, isLoaded } = useClerkUser();
  const { getToken } = useAuth();


  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!isLoaded || !clerkUser) return;

    const fetchAppUser = async () => {
      try {
        const params = new URLSearchParams({
            email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
            name: clerkUser.fullName ?? '',
            externalId: clerkUser.id,
        });

        console.log("params", params.toString());

        const res = await fetch(`http://10.58.250.107:5050/api/users?${params.toString()}`, {
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

  return { appUser, loading, needsRegistration, error, clerkUser };
}

export default useUser;