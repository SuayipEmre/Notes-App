import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '@/style/colors';
const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerTintColor: colors.veryLightGray,
                tabBarActiveTintColor: colors.brightOrange,
                tabBarStyle: {
                    backgroundColor: colors.black,
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <Entypo name="home"
                        size={24}
                        color={focused ? colors.brightOrange : colors.veryLightGray}
                    />
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',  
                    tabBarIcon: ({focused}) => <AntDesign name="user" size={24} color={focused ? colors.brightOrange : colors.veryLightGray}/>,
                }}
            />

            <Tabs.Screen name='(shared)' options={{
                href : null,
                tabBarStyle:{
                    display : 'none'
                }
            }} />
        </Tabs>
    )
}

export default TabLayout