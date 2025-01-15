import { StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors } from '@/style/colors'
import { wp } from '@/style/common'


type Props = {
    value: string,
    onChangeText: (value: string) => void,
    isSecure?: boolean,
    placeholder : string,
    isMultiline? : boolean
}
const Input: React.FC<Props> = ({ onChangeText, value, isSecure, placeholder, isMultiline }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isSecure}
            style={[styles.input, isMultiline ? {height : 200} : '']}
            autoCapitalize='none'
            placeholder={placeholder}
            placeholderTextColor={colors.veryLightGray}
            multiline={isMultiline}
        />
    )
}

export default Input

const styles = StyleSheet.create({
    input:{
        color : colors.veryLightGray,
        paddingVertical : 15,
        paddingHorizontal : 8,
        width : wp * 0.8,
        borderWidth : 1,
        borderColor : colors.veryLightGray,
        borderRadius : 10,
    },
})