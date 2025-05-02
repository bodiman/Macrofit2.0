import { View, Text } from "react-native";
import { useUser } from './hooks/useUser';
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function Register() {
    const { clerkUser, appUser, loading, error, createUser } = useUser();
    const [creatingUser, setCreatingUser] = useState(false);

    useEffect(() => {
        if (!clerkUser) {
            router.replace('/landing');
        } else if (appUser) {
            router.replace('/');
        } else if (!creatingUser) {
            console.log("creating user");
            setCreatingUser(true);
            createUser({
                email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
                name: clerkUser.fullName ?? '',
            });
        }
    }, [appUser, clerkUser]);


    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <Text>Register you cheapskate fucker</Text>
        </View>
    )
}