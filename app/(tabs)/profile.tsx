import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import { colors } from '@/style/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
const Profile = () => {
    const user = auth().currentUser

    console.log(user);
    
    return (
        <SafeAreaView style={styles.container}>


            <View>

            </View>

            <View style={styles.signOutContainer}>
                <Text style={styles.signOutText}>Sign Out</Text>
                <AntDesign name="logout" size={24} color={colors.brightOrange} onPress={() => auth().signOut()} />
            </View>
        </SafeAreaView>
    )
}

export default Profile


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        paddingHorizontal: 12,
    },

    signOutContainer:{
        flexDirection : 'row',
        alignItems:'center',
        gap:10,
    },
    signOutText:{
        color : colors.veryLightGray,
        fontSize : 20,
    },
    signOutButton: {},
})