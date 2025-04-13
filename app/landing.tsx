import { Text, View, StyleSheet, Button, Pressable } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';

import { SignedOut, SignedIn } from "@/lib/clerk"
import { Link, Redirect } from "expo-router"
import Colors from "@/styles/colors"
import Logo from "@/components/Logo"

export default function Landing() {
    return (
        <LinearGradient 
            colors={[Colors.coolgray, Colors.lightgray]} 
            style={styles.container}   
            locations={[0, 0.8, 1]}
        >
            <SignedOut>
                <View style={styles.logoContainer}>
                    <Logo size1={60} size2={60} theme={"dark"} />
                    <Text style={styles.subtitle}>Lock The Fuck In</Text>
                </View>
                
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}>
                        <Link href="../(auth)/sign-in" style={styles.buttonText}>
                            Log In
                        </Link>
                    </Pressable>

                    <Pressable style={styles.button}>
                        <Link href="../(auth)/sign-up" style={styles.buttonText}>
                            Sign Up
                        </Link>
                    </Pressable>
                </View>

                

            </SignedOut>

            <SignedIn>
                <Redirect href={"/"} />
            </SignedIn>
        </LinearGradient>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 40,
        flexGrow: 2,
    },
    subtitle: {
        color: Colors.black,
        alignItems: "center",
        fontSize: 19,
        padding: 15,
        fontWeight: 600
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignContent: "flex-start",
        alignItems: "center",
        width: "100%",
        padding: 20,
        gap: 20,
        flexGrow: 1,
        // backgroundColor: "blue"
    },
    button: {
        backgroundColor: Colors.blue,
        textAlign: "center",
        alignContent: "center",
        padding: 10,
        borderRadius: 10,
        width: 200,
    },
    buttonText: {
        textAlign: "center", 
        fontSize: 20,
        fontWeight: 500,
        color: Colors.black
    },
})