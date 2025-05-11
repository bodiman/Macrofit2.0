import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Platform } from 'react-native'
import Colors from '@/styles/colors'
import { router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useSignIn, useSSO } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking';
import { useClerk } from '@clerk/clerk-expo';

import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn()
  const { startSSOFlow } = useSSO()
  const { redirectToSignIn } = useClerk();
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const onSignIn = async () => {
    if (!isLoaded) return

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // if (completeSignIn.status === 'complete') {
      //   router.replace('/(protected)/home')
      // }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onGoogleSignIn = useCallback(() => {
    // conditionally handle platform stuff to circumvent web browser popup blocking issues
    if (Platform.OS === 'web') {
      redirectToSignIn({
        redirectUrl: Linking.createURL('sso-callback'),
      });
    } else {
      startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: Linking.createURL('sso-callback'),
      })
        .then(({ createdSessionId, setActive }) => {
          if (createdSessionId) {
            setActive?.({ session: createdSessionId });
            router.replace('/(protected)/home');
          }
        })
        .catch((err) => {
          console.error('OAuth error', err);
        });
    }
  }, [redirectToSignIn, startSSOFlow]);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={onGoogleSignIn}
      >
        <FontAwesome name="google" size={24} color={Colors.black} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(email) => setEmailAddress(email)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/sign-up')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  googleButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray,
  },
  dividerText: {
    marginHorizontal: 10,
    color: Colors.gray,
  },
  linkText: {
    color: Colors.blue,
    fontSize: 14,
    marginTop: 10,
  },
})
