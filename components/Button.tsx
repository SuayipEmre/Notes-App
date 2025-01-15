
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '@/style/colors'


type Props = {
    title : string,
    onPress : () => void
}
const Button : React.FC<Props> = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container:{
        borderWidth : 1,
        borderColor : colors.brightOrange,
        paddingVertical : 5,
        paddingHorizontal:  15,
        borderRadius : 8,
    },
    text:{
        color : colors.veryLightGray,
    },
})