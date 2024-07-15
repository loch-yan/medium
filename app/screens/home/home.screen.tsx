import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { commonStyles } from '@/styles/common/common.style'
import Header from '@/components/header/header'
import SearchInput from '@/components/search/search.input'
import HomeBannerSlider from '@/components/home/home.banner'

const HomeScreen = () => {
  return (
    <LinearGradient colors={["#e5ecf9", "#f6f7f9"]} style={{flex:1, paddingTop: 3}}>
    <Header />
      <SearchInput />
    <ScrollView showsVerticalScrollIndicator={false} >
      <HomeBannerSlider />
      {/* <AllCourses /> */}
    </ScrollView>
    </LinearGradient>
  )
}

export default HomeScreen
