import { Route, Routes } from 'react-router-dom'
import ClassRegisterationPage from './Registeration/ClassRegisterationPage.dash'
import LandingPage from './Landing/LandingPage.dash'
const DashboardFile = () => {
  return (
    <Routes>
        <Route path='/register' element={<ClassRegisterationPage/>}/>
        <Route path='/' index element={<LandingPage/>}/>
    </Routes>
  )
}

export default DashboardFile