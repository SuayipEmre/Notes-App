import React from 'react'
import { Stack, Tabs } from 'expo-router'

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout