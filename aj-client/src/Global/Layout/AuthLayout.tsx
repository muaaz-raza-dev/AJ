import LoginFile from '@/Pages/Authentication/Login/LoginFile'
import { Route, Routes } from 'react-router-dom'

const AuthLayout = () => {
  return (
 <Routes>
<Route path='*' index element={<LoginFile/>}/>
 </Routes>
  )
}

export default AuthLayout
