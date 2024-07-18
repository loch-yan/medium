import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useUser from '@/hooks/auth/useUser'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const Header = () => {
  const router = useRouter()
  const {user} = useUser()

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const subscription = async () => {
      const cart: any = await AsyncStorage.getItem("cart");
      setCartItems(JSON.parse(cart));
    };
    subscription();
  }, []);

  const avatarSource = user?.avatar?.url 
  ? { uri: user.avatar.url } 
  : require("@/assets/icons/profile.png");

  return (
    <View style={styles.container}>
    <View style={styles.headerwrapper}>
    <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
      <Image source={avatarSource} style={styles.image}  />
    </TouchableOpacity>
    <View>
      <Text style={styles.helloText}>
        Hello,
      </Text>
      <Text style={styles.text}>
        {user?.name}
      </Text>
    </View>
    </View>
    <TouchableOpacity
        style={styles.bellButton}
        onPress={() => router.push("/(routes)/cart")}
      >
        <View>
          <Feather name="shopping-bag" size={26} color={"black"} />
          <View style={styles.bellContainer}>
            <Text style={{ color: "#fff", fontSize: 14 }}>
              {cartItems?.length}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    width: "90%"
  },
  headerwrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 30,
    height: 30,
    marginBottom: 8,
    borderRadius: 100
  },
  text: {
    fontSize: 16,
  },
  bellButton: {
    borderWidth: 1,
    borderColor: "#e1e2e5",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  bellContainer: {
    width: 10,
    height: 10,
    position: "absolute",
    borderRadius: 50,
    right: 0,
    top: 0
  },
  helloText: {color: "#7c7c80", fontSize: 14}
})