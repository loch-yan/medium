import { LinearGradient } from 'expo-linear-gradient'
import AnimatedLoader from "react-native-animated-loader"

const Loader = () => {
  return (
    <LinearGradient colors={["#e5ecf9", "#f6f7f9"]} style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
        <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={{width: 250, height: 250}}
        speed={1.5}
        source={require("@/assets/animation/loading.json")}
        />
    </LinearGradient>
  )
}

export default Loader