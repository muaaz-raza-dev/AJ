import LoginFile from '@/Pages/Authentication/Login/LoginFile'
import { Route, Routes } from 'react-router-dom'

const AuthLayout = () => {
  return (
 <Routes>
<Route path='/auth' index element={<LoginFile/>}/>
<Route path='*' element={<LoginFile/>}/>
 </Routes>
  )
}

export default AuthLayout
