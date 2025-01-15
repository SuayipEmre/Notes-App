import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import store from "@/store/app/store";
export default function RootLayout() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  const router = useRouter()
  const segments = useSegments()


  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('user', user)
    setUser(user)
    if (initializing) setInitializing(false)

  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])
  console.log('segment  : ' + segments[0]);

  useEffect(() => {
    if (initializing) return

    if (user) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)');
    }
  }, [user, initializing]);

  if (initializing) return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }}>
      <ActivityIndicator />
    </View>
  )
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  )
}
