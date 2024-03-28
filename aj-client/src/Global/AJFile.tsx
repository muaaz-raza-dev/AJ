import { useAppSelector } from "@/app/ReduxHooks"
import AuthLayout from "./Layout/AuthLayout"
import MainLayout from "./Layout/MainLayout"
import AppLoader from "./Loaders/AppLoader"
import useAuthenticate from "@/Hooks/Auth/useAuthenticate"

const AJFile = () => {
  const {isLogined,isLoading} = useAppSelector(state=>state.credits)
  useAuthenticate()
  return (
    <>
    {
      isLogined?
      <MainLayout/>:
      <AuthLayout/>
    }
{
  isLoading&&<AppLoader/>
}
    </>
  )
}

export default AJFile
