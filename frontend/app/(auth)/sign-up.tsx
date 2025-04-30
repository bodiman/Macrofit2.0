import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Platform } from 'react-native'
import Colors from '@/styles/colors'
import { router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useSignUp, useSSO } from '@clerk/clerk-expo'

export default function SignUpPage() {
  const { signUp, isLoaded } = useSignUp()
  const { startSSOFlow } = useSSO()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const onSignUp = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) return

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        router.replace('/redirect')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: Platform.OS === 'web' 
          ? window.location.origin 
          : 'exp://localhost:19000',
      })

      if (createdSessionId) {
        setActive?.({ session: createdSessionId })
        router.replace('/redirect')
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <>
          <TouchableOpacity 
            style={styles.googleButton} 
            onPress={onGoogleSignIn}
          >
            <FontAwesome name="google" size={24} color={Colors.black} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
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
          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/sign-in')}>
            <Text style={styles.linkText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </>
      )}

      {pendingVerification && (
        <>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity style={styles.button} onPress={onPressVerify}>
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </>
      )}
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
