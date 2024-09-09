import { useAppSelector } from "@/app/ReduxHooks"
import AuthLayout from "./Layout/AuthLayout"
import AppLoader from "./Loaders/AppLoader"
import useAuthenticate from "@/Hooks/Auth/useAuthenticate"
import MainLayout from "./Layout/MainLayout"
const AJFile = () => {
  const {isLogined,isLoading} = useAppSelector(state=>state.credits)
  const {DarkMode} =useAppSelector(s=>s.global)
  useAuthenticate()
  return <main className={`${DarkMode&&"dark"} transition-colors`}>
    { isLoading ? <AppLoader/> : ( isLogined ?  <MainLayout/> : <AuthLayout/>) }
    </main>
  
}

export default AJFile
