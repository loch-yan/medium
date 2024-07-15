import React from 'react'
import { Tabs } from 'expo-router'
import useUser from '@/hooks/auth/useUser'
import { Image } from 'react-native'

const TabsLayout = () => {
    const {user} = useUser()
  return (
    <Tabs screenOptions={({route}) => ({
      tabBarIcon: ({color}) => {
        let iconName;
        if(route.name === "index"){
          iconName = require("@/assets/icons/house.png")
        } else if(route.name === "search/index")
          iconName = require("@/assets/icons/search.png")
          else if(route.name === "courses/index")
            iconName = require("@/assets/icons/course.png")
          else if(route.name === "profile/index")
            iconName = user?.avatar ||  require("@/assets/icons/profile.png")
        return <Image source={iconName} style={{width: 25, height: 25, tintColor: color}} />
      }, headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        display: route.name === 'example' ? 'none' : 'flex',
      },
      
    })}>
        <Tabs.Screen name="index"  />
        <Tabs.Screen name="search/index" />
        <Tabs.Screen name="courses/index" />
        <Tabs.Screen name="profile/index" />
    </Tabs>
  )
}

export default TabsLayout