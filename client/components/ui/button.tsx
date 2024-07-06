import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonStyles } from '@/styles/common/common.style'

const Button = ({title, onPress}: {title: string, onPress: () => void}) => {

  const {width} = Dimensions.get("window")

  return (
    <TouchableOpacity style={[commonStyles.buttonContainer, {width: width - 130}]} onPress={() => onPress()}  >
      <Text style={{color: "white", fontSize: 18, fontWeight: "600"}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})