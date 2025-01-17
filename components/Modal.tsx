import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '@/style/colors'
import Button from './Button'
import Input from './Input'
import { setIsModalOpen, setNoteCategory, setNoteTitle, setNoteValue } from '@/store/features/notes/actions'
import { useIsModalOpen, useNoteCategory, useNoteTitle, useNoteValue } from '@/store/features/notes/hooks'
import { wh } from '@/style/common'
import Modal from "react-native-modal";
import AntDesign from '@expo/vector-icons/AntDesign';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getUserDocument } from '@/utils/getUserDocument'

const NoteModal = () => {
    const isModalOpen = useIsModalOpen()
    const noteTitle = useNoteTitle()
    const noteValue = useNoteValue()
    const noteCategory = useNoteCategory()

    const currentUser: FirebaseAuthTypes.User | null = auth().currentUser


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }


    const handleResetForm = () => {
        setNoteTitle('')
        setNoteValue('')
        setNoteCategory('')
    }


    const handleCreateNote = async () => {
        try {
            const dbRef = await getUserDocument(currentUser)
            console.log(dbRef.exists);
            
            if (dbRef.exists) {
                const userData = dbRef.data()
                console.log('user data : ', userData);

                const currentNotes = userData?.notes ?? []

                const updatedNotes = [
                    ...currentNotes,
                    {
                        title: noteTitle,
                        category: noteCategory,
                        note: noteValue
                    }
                ]
                dbRef.ref.update({
                    notes: updatedNotes
                })
                console.log('db ref', dbRef)
                handleResetForm()
            }
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <KeyboardAvoidingView
            behavior='padding'>

            <Modal
                isVisible={isModalOpen}
                style={styles.modal}
            >

                <View style={styles.header}>
                    <AntDesign name="closecircle" size={30} color={colors.brightOrange} onPress={toggleModal} />
                </View>

                <View style={styles.content}>


                    <Input onChangeText={setNoteTitle} value={noteTitle} placeholder='title' />
                    <Input onChangeText={setNoteCategory} value={noteCategory} placeholder='category e.g education' />
                    <Input onChangeText={setNoteValue} value={noteValue} placeholder='note' isMultiline />

                    <View style={styles.buttonsContainer}>
                        <Button onPress={handleCreateNote} title='Create A Note' />
                        <Button onPress={handleResetForm} title='Reset' />
                    </View>

                </View>
            </Modal>
        </KeyboardAvoidingView>

    )
}

export default NoteModal

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        right: 0,
        height: wh * 0.8,
        bottom: 0,
        left: 0,
        backgroundColor: colors.darkGray,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,

    },
    header: {
        position: 'absolute',
        top: 10,
        right: 10,

    },
    content: {
        alignItems: 'center',
        gap: 15,
    },
    buttonsContainer: {
        width: '100%',
        paddingHorizontal: 15,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})