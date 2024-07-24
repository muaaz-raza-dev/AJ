import { Route, Routes } from 'react-router-dom'
import LandingPage from './Landing/LandingPage.dash'
import ClassDetailsPage from './Detail Pages/Class/ClassDetailsPage.class'
import TeacherRegisteration from './Registeration/Teacher/TeacherRegisterationPage.dash'
import ClassRegisterationFile from './Registeration/Class/ClassRegisterationFile.class'
const DashboardFile = () => {
  return (
    <Routes>
        <Route path='/teacher/register' element={<TeacherRegisteration/>}/>
        <Route path='/class/register' element={<ClassRegisterationFile/>}/>
        <Route path='/class/edit/:id' element={<ClassRegisterationFile edit={true} />}/>
        <Route path='/teacher/edit/:id' element={<TeacherRegisteration edit={true} />}/>
        <Route path='/class/:id' element={<ClassDetailsPage/>}/>
        <Route path='/*' index element={<LandingPage/>}/>
    </Routes>
  )
}

export default DashboardFile