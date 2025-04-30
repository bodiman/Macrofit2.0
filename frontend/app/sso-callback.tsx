// app/sso-callback.tsx

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

export default function SSOCallback() {
  const { signIn } = useSignIn();
  const router = useRouter();

  console.log('sso-callback');

  useEffect(() => {
    (async () => {
      await signIn?.reload();
    })();
  }, []);

  return null;
}
