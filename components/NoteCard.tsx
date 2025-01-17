import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/style/colors'
import { truncateText } from '@/utils/truncateText'
import Entypo from '@expo/vector-icons/Entypo';
import { wh, wp } from '@/style/common';
type Props = {
    note: note,
    handleDeleteNote: (note: note) => void
}

const NoteOptions: React.FC<Props> = ({ note, handleDeleteNote }) => {
    return (
        <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => handleDeleteNote(note)}>
                <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
            <Text style={styles.optionText}>Edit</Text>
        </View>
    )
}

const NoteCard: React.FC<Props> = ({ note, handleDeleteNote }) => {
    const [isOptions, setIsOptions] = useState(false);

    const toggleOptions = () => setIsOptions(prev => !prev)


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.category}>{note.category}</Text>
                <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color={colors.brightOrange}
                    onPress={toggleOptions}
                />
            </View>
            <Text style={styles.note}>{truncateText(note.note, 300)}</Text>
            {isOptions && <NoteOptions note={note} handleDeleteNote={handleDeleteNote} />}
        </View>
    );
};


export default NoteCard

const styles = StyleSheet.create({

    container: {
        width: '47%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: wh * 0.3,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        gap: 10,
        position:'relative'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    category: {
        color: colors.brightOrange,
        fontSize: 10,
    },
    note: {
        color: colors.veryLightGray,
    },


    optionsContainer: {
        marginTop: 10,
        backgroundColor: colors.darkGray,
        borderRadius: 8,
        padding: 10,
        position :'absolute',
        top : -10,
        right : 0,
        width : wp * 0.2
    },
    optionText: {
        color: colors.brightOrange,
        fontSize: 12,
        marginVertical: 5,
    },
})