import { Route, Routes } from "react-router-dom"
import StudentRegisterationPage from "./SubPages/Registeration/RegisterationPage.reg"
// import ImportStudentsPage from "./SubPages/Import Students/ImportStudentsPage.reg"



const RegisterationFile = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentRegisterationPage/>}/>
      {/* <Route path="/import" element={<ImportStudentsPage/>}/> */}
    </Routes>
  )
}

export default RegisterationFile
