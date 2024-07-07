import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { VerifyScreenStyles } from '@/styles/verifyscreen/verifyscreenstyles'
import Button from '@/components/ui/button'
import { useRouter } from 'expo-router'

const VerifyScreen = () => {
  const router = useRouter()
  const [code, setCode] = useState(new Array(4).fill(''))
  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()))

  const handleInput = (text: any, index: any) => {
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (text && index < 3) {
      inputs.current[index + 1].current.focus()
    }
    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus()
    }
  }

  const handleSubmit = () => {
    
  }

  return (
    <View style={VerifyScreenStyles.container}>
      <Text style={VerifyScreenStyles.headerText}>
        Verification Code
      </Text>
      <Text style={VerifyScreenStyles.subText}>We have sent the verification code to your email</Text>
      <View style={VerifyScreenStyles.inputContainer}>
        {code.map((_, index) => (
          <TextInput
           key={index}
            style={VerifyScreenStyles.inputBox} keyboardType='number-pad'
            maxLength={1} 
            onChangeText={(text) => handleInput(text, index)}
            value={code[index]}
            ref={inputs.current[index]} 
            autoFocus={index === 0}
            />
        ))}
      </View>
      <View style={{marginTop: 8}}>

        <Button title='Submit' onPress={handleSubmit} />
      </View>
      <TouchableOpacity onPress={() =>  router.push("/(routes)/login")}>
        <Text style={{fontSize: 18, paddingTop: 18, fontWeight: "500"}}>Go back to Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}

export default VerifyScreen