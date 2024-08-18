import { Route, Routes } from 'react-router-dom'
import LandingPage from './Landing/LandingPage.dash'
import ClassDetailsPage from './Detail Pages/Class/ClassDetailsPage.class'
import TeacherRegisteration from './Registeration/Teacher/TeacherRegisterationPage.dash'
import ClassRegisterationFile from './Registeration/Class/ClassRegisterationFile.class'
import ClassPaymentConfigForm from './Registeration/ClassBasedPaymentConfig/ClassPaymentConfigForm.class.pay'
import RoleBasedAccess from '@/Global/Middleware Hooks/RoleBasedAccess'
const DashboardFile = () => {
  return (
    <Routes>
        <Route path='/teacher/register' element={
          <RoleBasedAccess roleToGiveAccess={"chief admin"} redirect='/dashboard'>
          <TeacherRegisteration/>
          </RoleBasedAccess>
      }/>
        <Route path='/class/register' element={
          <RoleBasedAccess roleToGiveAccess={["chief admin","admin"]} redirect='/dashboard'>
          <ClassRegisterationFile/>
          </RoleBasedAccess>
          }/>
        <Route path='/class/edit/:id' element={
          <RoleBasedAccess roleToGiveAccess={"chief admin"} redirect='/dashboard'>
          <ClassRegisterationFile edit={true} />
          </RoleBasedAccess>
      }/>
        <Route path='/teacher/edit/:id' element={
          <RoleBasedAccess roleToGiveAccess={"chief admin"} redirect='/dashboard'>
          <TeacherRegisteration edit={true} />
          </RoleBasedAccess>
      }/>
        <Route path='/class/:id' element={
          <ClassDetailsPage/>
      }/>
        <Route path='/class/payment/:id' element={
          <RoleBasedAccess roleToGiveAccess={"chief admin"} redirect='/dashboard'>
          <ClassPaymentConfigForm/>
          </RoleBasedAccess>
          
          }/>
        <Route path='/*' index element={<LandingPage/>}/>
    </Routes>
  )
}

export default DashboardFile