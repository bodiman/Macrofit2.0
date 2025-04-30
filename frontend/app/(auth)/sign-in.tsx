import { SignIn } from '@clerk/clerk-expo/web'
import { View, StyleSheet } from 'react-native'

export default function SignInPage() {
  return <View style={styles.container}>
    <SignIn fallbackRedirectUrl={"/redirect"} signUpUrl={"/sign-up"} />
  </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: "100%",
        alignItems: "center",
    }
})
