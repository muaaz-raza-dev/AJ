import { useAppSelector } from "@/app/ReduxHooks"
import AuthLayout from "./Layout/AuthLayout"
import AppLoader from "./Loaders/AppLoader"
import useAuthenticate from "@/Hooks/Auth/useAuthenticate"
import {lazy} from "react"
import CustomSuspense from "./Middleware Hooks/CustomSuspense"
const MainLayout = lazy(()=> import('./Layout/MainLayout'));
const AJFile = () => {
  const {isLogined,isLoading} = useAppSelector(state=>state.credits)
  const {DarkMode} =useAppSelector(s=>s.global)
  useAuthenticate()
  return <main className={`${DarkMode&&"dark"} transition-colors`}>
    { isLoading ? <AppLoader/> :
     ( isLogined ? <CustomSuspense> <MainLayout/> </CustomSuspense> : <AuthLayout/>) }
    </main>
  
}

export default AJFile
