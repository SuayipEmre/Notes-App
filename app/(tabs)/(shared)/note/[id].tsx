import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {  useNotes } from '@/store/features/notes/hooks'
import { colors } from '@/style/colors'
import {setNotes } from '@/store/features/notes/actions'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getUserDocument } from '@/utils/getUserDocument'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

const NoteDetail = () => {
    const { id } = useLocalSearchParams()
    const notes = useNotes()
    const currentNote = notes?.find(item => item.id == Number(id))
    const currentUser: FirebaseAuthTypes.User | null = auth().currentUser
    const [noteTitle, setNoteTitle] = useState('')
    const [noteValue, setNoteValue] = useState('')
    const [noteCategory, setNoteCategory] = useState('')
    const router = useRouter()


    useEffect(() => {
        setNoteTitle(currentNote?.title!)
        setNoteCategory(currentNote?.category!)
        setNoteValue(currentNote?.note!)
    }, [currentNote, id])


    const handleSubmit = async () => {
        const dbRef = await getUserDocument(currentUser)
        if (
            noteTitle == currentNote?.title &&
            noteCategory == currentNote?.category &&
            noteValue == currentNote.note
        ) return Alert.alert('No Changes', 'The form has not been updated.');

        // Remove the note with the matching id
        const updatedNotes = notes?.filter(item => item.id != Number(id))

        const updatedNote = {
            id: Number(id),
            title: noteTitle,
            category: noteCategory,
            note: noteValue,
        }

        const newNotes = [...updatedNotes!, updatedNote]

        if (dbRef.exists) {
            try {
                await dbRef.ref.update({
                    notes: newNotes
                })

                setNotes(newNotes)
                router.back()
            } catch (error) {
                Alert.alert('Error', 'An error occured')
            }
        }

    }

    const handleGoBack = () => {
        router.push('/(tabs)')
    }

    return (
        <SafeAreaView style={styles.contaier}>


            <TouchableOpacity style={styles.header} onPress={() => handleGoBack()}>
                <Ionicons name="arrow-back-outline" size={24} color={colors.brightOrange} />
                <Text style={{ color: colors.lightGray }}>Go Back</Text>
            </TouchableOpacity>


            <View style={styles.formContainer}>
                <TextInput
                    value={noteTitle}
                    onChangeText={setNoteTitle}
                    style={styles.input}
                />

                <TextInput
                    value={noteCategory}
                    onChangeText={setNoteCategory}
                    style={styles.input}
                />

                <TextInput
                    value={noteValue}
                    onChangeText={setNoteValue}
                    style={styles.input}
                    multiline
                />

            </View>

            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NoteDetail

const styles = StyleSheet.create({
    contaier: {
        backgroundColor: colors.black,
        flex: 1,
        paddingHorizontal: 12,

    },
    header: {
        color: colors.veryLightGray,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 15,
    },
    formContainer: {
        gap: 50,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        color: colors.veryLightGray
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        backgroundColor: colors.darkGray,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.veryLightGray,

    },
})