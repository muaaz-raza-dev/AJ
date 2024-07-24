import { Route, Routes } from "react-router-dom"
import EditStdDetailsPage from "./Components/Sections/Edit_Student/EditStddetailsPage.std.pf"
import StudentProfileOverviewPage from "./Components/Sections/Profile Overview/StudentProfileOverviewPage.std.pf"

const StudentDetailedPage = () => {

  return (
    <Routes>
      <Route index path="/" element={<StudentProfileOverviewPage/>}/>
    <Route path="/edit" element={<EditStdDetailsPage/>} />
    </Routes>
  )
}

export default StudentDetailedPage
