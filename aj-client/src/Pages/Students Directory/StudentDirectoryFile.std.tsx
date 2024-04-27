import { Route, Routes } from 'react-router-dom'
import StudentsDirListPage from './StudentsDirListPage.std'
import StudentDetailedPage from './sub-section/Student Detailed/StudentDetailedPage.std.pf'
const StudentsDirectoryFile = () => {
  return (
   <Routes>
        <Route index path='/' element={<StudentsDirListPage/>} />
        <Route path='/:student/*' element={<StudentDetailedPage/>}/>
   </Routes>
  )
}

export default StudentsDirectoryFile
