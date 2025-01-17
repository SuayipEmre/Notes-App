import { useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { FirebaseError } from "firebase/app";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { colors } from "@/style/colors";
import firestore from '@react-native-firebase/firestore';

export default function index() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const signIn = async () => {
        setLoading(true)
        try {
            await auth().signInWithEmailAndPassword(email, password)
            Alert.alert('you are here')

        } catch (error) {
            const err = error as FirebaseError
            console.log(err.message)

        }
        setLoading(false)
    }

    const signUp = async () => {
        setLoading(true)

        try {
            await auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential: FirebaseAuthTypes.UserCredential) => {
                    saveUserToDB(userCredential)
                    Alert.alert('user  account  created!')
                })

        } catch (error) {
            const err = error as FirebaseError
            console.log(err.message)

        }
        setLoading(false)
    }

    const saveUserToDB = async (userCredential: FirebaseAuthTypes.UserCredential) => {

        try {
            await firestore().collection('Users').doc(userCredential.user.uid).set({
                displayName: userCredential.user.email?.split('@')[0],
                email: userCredential.user.email,
                photoURL: null,
                id: userCredential.user.uid,
                notes : []
      
            })
        } catch (error) {
            
        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder='email'
            />

            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder='password'
            />
            {
                loading ? <ActivityIndicator /> : <>

                    <Button onPress={signUp} title='create account' />
                    <Button onPress={signIn} title='Login' />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.black,



    },

    input: {
        borderWidth: 1,
        height: 50,
        borderColor: colors.brightOrange,
        width: '100%',
        color: colors.veryLightGray
    },
    button: {},
})
