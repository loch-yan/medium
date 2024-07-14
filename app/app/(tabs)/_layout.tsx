import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import useUser from '@/hooks/auth/useUser'

const TabsLayout = () => {
  const {loading, user} = useUser()
  console.log(user, "from my user hook")
  return (
    <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name="home/index" />
        <Tabs.Screen name="search/index" />
        <Tabs.Screen name="courses/index" />
        <Tabs.Screen name="profile/index" />
    </Tabs>
  )
}

export default TabsLayout