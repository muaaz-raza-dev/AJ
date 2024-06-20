import { Route, Routes } from 'react-router-dom'
import LandingPage from './Landing/LandingPage.dash'
import ClassDetailsPage from './Detail Pages/Class/ClassDetailsPage.class'
import TeacherRegisteration from './Registeration/Teacher/TeacherRegisterationPage.dash'
const DashboardFile = () => {
  return (
    <Routes>
        <Route path='/teacher/register' element={<TeacherRegisteration/>}/>
        <Route path='/class/*' element={<ClassDetailsPage/>}/>
        <Route path='/' index element={<LandingPage/>}/>
    </Routes>
  )
}

export default DashboardFile