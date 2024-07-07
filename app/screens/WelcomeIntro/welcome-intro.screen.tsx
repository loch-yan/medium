import { View, Text, Image } from 'react-native'
import { Nunito_400Regular, Nunito_600SemiBold, useFonts } from '@expo-google-fonts/nunito'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { onBoardingSwiperType } from "@/types/global";
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from "react-native-app-intro-slider"
import { onboardingSwiperData } from '@/constants/constant';
import { useRouter } from 'expo-router';
import { commonStyles } from '@/styles/common/common.style';
import { styles } from '@/styles/onboarding/onboard';
import { welcomeStyles } from '@/styles/welcome/welcome.style';


const WelcomeIntroScreen = () => {
  const router = useRouter()
  let [fontsLoaded, fontError] = useFonts({
    Nunito_600SemiBold,
    Nunito_400Regular,
    Raleway_700Bold
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  const renderItem = ({ item }: { item: onBoardingSwiperType }) => {
    return <LinearGradient colors={["#e5ecf9", "#f6f7f9", "#e8eef9"]} style={{
      flex: 1, paddingHorizontal: 16
    }}>
      <View style={{ marginTop: 50 }}>
        <Image source={item.image} style={welcomeStyles.slideImage} />
        <Text style={[commonStyles.title, { fontFamily: "Raleway_700Bold" }]}>{item.title}</Text>
        <View style={{marginTop: 10}}>
        <Text style={[commonStyles.description, { fontFamily: "Nunito_600SemiBold" }]}>{item.description}</Text>
        </View>
      </View>
    </LinearGradient>
  }

  return (
    <AppIntroSlider renderItem={renderItem}
      data={onboardingSwiperData} onDone={() => router.push("/login")} onSkip={() => {
        router.push("/login")
      }}
      renderNextButton={() => {
        return <View style={commonStyles.welcomeStyleButton}>
          <Text style={[styles.buttonText, { fontFamily: "Nunito_400Regular" }]}>
            Next
          </Text>
        </View>
      }}
      renderDoneButton={() => {
        return <View style={commonStyles.welcomeStyleButton}>
          <Text style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}>
            Done
          </Text>
        </View>
      }}
      showSkipButton={false}
      dotStyle={commonStyles.dotStyle}
      bottomButton={true}
      activeDotStyle={commonStyles.activeDot}
      
    />
  )
}

export default WelcomeIntroScreen