// app/sso-callback.tsx

import { useEffect } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { Text } from 'react-native';
export default function SSOCallback() {
  const { signIn } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const test = await signIn?.reload();
      console.log("signIn", test);
    })();
  }, []);

  return <Redirect href="/(protected)/home"/>;
}
