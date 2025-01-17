import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/style/colors'
import { truncateText } from '@/utils/truncateText'
import Entypo from '@expo/vector-icons/Entypo';
import { wh } from '@/style/common';



type Props  =  {
    note : note
}

const NoteCard : React.FC<Props> = ({note}) => {
    return (
        <View style={styles.noteItem}>
            <View style={styles.note_header}>
                <Text style={styles.noteCategory}>{note.category}</Text>
                <Entypo name="dots-three-horizontal" size={24} color={colors.brightOrange} />
            </View>
            <Text style={styles.noteCategoryText}>{truncateText(note.note, 300)}</Text>
        </View>
    )
}

export default NoteCard

const styles = StyleSheet.create({

    noteItem: {
        width: '47%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: wh * 0.3,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        gap: 10,
    },
    note_header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noteCategory: {
        color: colors.brightOrange,
        fontSize: 10,
    },
    noteCategoryText: {
        color: colors.veryLightGray,
    },
})