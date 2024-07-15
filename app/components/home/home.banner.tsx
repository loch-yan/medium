import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from "react-native-swiper"
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { BannerData } from '@/constants/constant'

const HomeBannerSlider = () => {
  
  return (
    <View style={styles.container}>
    <Swiper dotStyle={styles.dot} activeDotStyle={styles.activeDot} autoplay={true} autoplayTimeout={5}>
    {BannerData.map((item, index) => (
      <View key={index} style={styles.slide}>
        <Image source={item.bannerImageUrl!}
            style={{ width: 400, height: 250 }}
         />
      </View>
    ))}
    </Swiper>
    </View>
  )
}

export default HomeBannerSlider

const styles = StyleSheet.create({
container: {
  marginTop: 12,
  height: heightPercentageToDP("35%"),
  marginHorizontal: 16
},
slide: {flex:1},
dot: {
  backgroundColor: "#c6c7cc",
  width:10,
  height: 10,
  borderRadius: 5,
  marginHorizontal: 3
},
activeDot: {
  backgroundColor: "#2467ec",
  width:10,
  height: 10,
  borderRadius: 5,
  marginHorizontal: 3
}
})