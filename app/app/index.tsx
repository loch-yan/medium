import Loader from '@/components/ui/loader'
import useUser from '@/hooks/auth/useUser'
import { Redirect } from 'expo-router'

const index = () => {
  const {loading, user} = useUser()
  return (
    <>
    {
      loading ? (
      <Loader />
      ) : (
        <Redirect href={!user ? "/(routes)/onboarding": "/(tabs)"} />
      )
    }
    </>
  )
}

export default index
