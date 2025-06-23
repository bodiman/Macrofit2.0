import { View, Text } from "react-native";
import { useUser } from './hooks/useUser';
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function Register() {
    const { clerkUser, appUser, loading, error, createUser } = useUser();
    const [creatingUser, setCreatingUser] = useState(false);

    useEffect(() => {
        console.log("on register page")
        if (!clerkUser || error ) {
            router.replace('/landing');
        } else if (appUser) {
            router.replace('./(protected)/home');
        } else if (!creatingUser) {
            setCreatingUser(true);
            createUser({
                email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
                name: clerkUser.fullName ?? '',
            });
        }
    }, [appUser, clerkUser]);


    // if (loading) {
    //     return <Text>Loading...</Text>;
    // }

    return (
        <View>
            <Text>Register you cheapskate fucker</Text>
            <Text>{clerkUser?.fullName}</Text>
            <Text>{JSON.stringify(appUser)}</Text>
            <Text>{JSON.stringify(error)}</Text>
        </View>
    )
}