import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Entypo, FontAwesome, Fontisto, Ionicons, SimpleLineIcons } from "@expo/vector-icons"
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { loginScreenStyles } from '@/styles/loginscreen/loginstyles'
import { commonStyles } from '@/styles/common/common.style'
import { useRouter } from 'expo-router'
import axios from "axios"
import { SERVER_URL } from '@/utils/url'

const LoginScreen = () => {
  const router= useRouter()
  const [isPasswordVisible, setisPasswordVisible] = useState(false)
  const [buttonSpinner, setButtonSpinner] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const [required, setRequired] = useState("")
  const [error, setError] = useState({
    password: ""
  })

  const handlePasswordValidation = (value: string) => {
    const password = value
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValues = /(?=.{6,})/
    if (!passwordSpecialCharacter.test(password)) {
      setError({ ...error, password: "Enter atleast one special character" })
      setUserInfo({ ...userInfo, password: "" })
    } else if (!passwordOneNumber.test(password)) {
      setError({ ...error, password: "Enter atleast one number" })
      setUserInfo({ ...userInfo, password: "" })
    }
    else if (!passwordSixValues.test(password)) {
      setError({ ...error, password: "Enter atleast 6 characters" })
      setUserInfo({ ...userInfo, password: "" })
    } else {
      setError({ ...error, password: "" })
      setUserInfo({ ...userInfo, password: value })
    }
  }

  const handleSignIn = async () => {
    await axios.post(`${SERVER_URL}/login`, {
      email: userInfo.email,
      password: userInfo.password
     }).then((res) => {
      console.log(res)
     }).catch((error) => {
      console.log(error.message)
     })
  }


  return (
    <LinearGradient colors={["#e5ecf9", "#f6f7f9"]} style={{ flex: 1, marginTop: 10 }}>
      <ScrollView>
        <Image source={require("@/assets/auth/login.png")} style={loginScreenStyles.SignInImage} />
        <Text style={[loginScreenStyles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
          Welcome Back!
        </Text>
        <Text style={loginScreenStyles.loginText}>
          Login to your existing account of Medium
        </Text>
        <View style={loginScreenStyles.inputContainer}>
          <View>
            <TextInput style={[commonStyles.input, { paddingLeft: 40 }]} keyboardType='email-address' value={userInfo.email} placeholder='support@medium.com'
              onChangeText={(value) => setUserInfo({ ...userInfo, email: value })} />
            <Fontisto style={{ position: "absolute", left: 26, top: 17.8 }} name="email" size={20} color={"#a1a1a1"} />
            {required && (
              <View style={commonStyles.erroContainer}>
                <Entypo name='cross' size={18} color={"red"} />
              </View>
            )}
            <View style={{ marginTop: 12 }}>
              <TextInput style={commonStyles.input} keyboardType='default' secureTextEntry={!isPasswordVisible} defaultValue='' placeholder='******' onChangeText={(value) => handlePasswordValidation(value)} />
              <TouchableOpacity style={loginScreenStyles.visibleIcon} onPress={() => setisPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? (
                  <Ionicons name='eye-off-outline' size={23} color="#747474" />
                ) : (
                  <Ionicons name='eye-outline' size={23} color="#747474" />
                )}
              </TouchableOpacity>
              <SimpleLineIcons style={loginScreenStyles.icon} name='lock' size={20} color={"#a1a1a1"} />
            </View>
            {error.password && (
              <View style={[commonStyles.erroContainer, {top: 145}]}>
                <Entypo name='cross' size={10} color="red" />
                <Text style={loginScreenStyles.errorText}>{error.password}</Text>
                </View>
            )}
          </View>
            <TouchableOpacity onPress={() => router.push("/(routes)/forgot-password")}>
              <Text style={[loginScreenStyles.forgotSection, {fontFamily: "Nunito_600SemiBold"}]}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.buttonContainer} onPress={handleSignIn}>
              {
                buttonSpinner ? (
                  <ActivityIndicator size={"small"} color={"white"} />
                ) : (
                  <Text style={{color: "white", textAlign: "center", fontSize: 16, fontFamily: "Raleway_700Bold"}}>
                      Sign In
                  </Text>
                )
              }
            </TouchableOpacity>

              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",  marginTop: 15, gap:5}}>
                <TouchableOpacity>
              <FontAwesome name='google' size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
              <FontAwesome name='github' size={30} />
                </TouchableOpacity>
              
              </View>

            <View style={loginScreenStyles.signUpRedirect}>
              <Text style={{fontSize: 18}}>
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(routes)/sign-up")}>
              <Text style={{fontSize: 18, color: "#2467ec", marginLeft: 5, textDecorationLine: "underline"}}>
                Sign Up
              </Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default LoginScreen