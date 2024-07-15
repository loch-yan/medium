import {  ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '@/components/header/header'
import SearchInput from '@/components/search/search.input'
import HomeBannerSlider from '@/components/home/home.banner'
import AllCourses from '@/components/courses/all.courses'

const HomeScreen = () => {
  return (
    <LinearGradient colors={["#e5ecf9", "#f6f7f9"]} style={{flex:1, paddingTop: 20}}>
    <Header />
      <SearchInput />
    <ScrollView showsVerticalScrollIndicator={false} >
      <HomeBannerSlider />
    </ScrollView>
      <AllCourses />
    </LinearGradient>
  )
}

export default HomeScreen
