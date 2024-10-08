import { Route, Routes } from 'react-router-dom';
import StudentsDirListPage from './StudentsDirListPage.std';
import StudentDetailedPage from './sub-section/Student Detailed/StudentDetailedPage.std.pf';
import StudentRegisterationPage from '../Registeration/SubPages/Registeration/RegisterationPage.reg';
import StudentHistoryFile from '../Student History/StudentHistoryFile.his';
import RoleBasedAccess from '@/Global/Middleware Hooks/RoleBasedAccess';
const StudentsDirectoryFile = () => {
  return (
   <Routes>
        <Route index path='/' element={<StudentsDirListPage/>} />
        <Route path='/registeration' element={<StudentRegisterationPage/>} />
        <Route path='/:student/*' element={<StudentDetailedPage/>}/>
        <Route path='/history/:id' element={
          <RoleBasedAccess redirect='/students' roleToGiveAccess={["admin","chief admin"]}>
          <StudentHistoryFile/>
          </RoleBasedAccess>
          }/>
   </Routes>
  )
}

export default StudentsDirectoryFile;
