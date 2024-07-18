
import  { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@/types/global'

const useUser = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>()
    const [error, seterror] = useState("")
    const [refetch, setRefetch] = useState(false)
    useEffect(() => {
        const subscription = async() => {

            const accessToken = await AsyncStorage.getItem("access_token")
            const refreshToken = await AsyncStorage.getItem("refresh_token")

            await axios.get("http://192.168.29.154:8000/api/v1/me", {
                headers: {
                   "access-token":accessToken,
                   "refresh-token": refreshToken
                }
            }).then((res) => {
                setUser(res.data.user)
                setLoading(false)
            }).catch((error) => {
                console.log(error.message)
                seterror(error.message)
                setLoading(false)
            })
        }
        subscription()
    }, [refetch])
  return {
    loading, user, error, setRefetch, refetch
  }
}

export default useUser