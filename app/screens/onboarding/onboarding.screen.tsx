import {  Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useFonts,Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'


import { styles } from '@/styles/onboarding/onboard'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

const OnBoardingScreen = () => {
  const router = useRouter()
  let  [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_700Bold,
    Nunito_400Regular
  })

  if(!fontsLoaded && !fontError) {
    return null
  }

  return (
    <LinearGradient locations={[0, 1.0]}  colors={['#e5ecf9', '#f6f7f9']} style={styles.gradient}>
    <View style={styles.background}>
      <View style={styles.firstContainer}>
        <Image style={styles.logo} source={require('@/assets/logo/M.png')} />
        <View style={styles.titleWrapper}>
          <Text style={[styles.titleText, { fontFamily: 'Raleway_700Bold' }]}>
            Start Learning With
          </Text>
          <Text style={[styles.titleText, { fontFamily: 'Raleway_700Bold' }]}>
            Medium
          </Text>
        </View>
        <View style={styles.textDescWrapper}>
          <Text style={styles.textDsc}>
        Explore a variety of interaction lesson, video, quizze & assignment
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(routes)/welcome-intro")} style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Getting Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
  )
}

export default OnBoardingScreen
