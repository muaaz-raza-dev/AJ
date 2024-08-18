import { Route, Routes } from "react-router-dom"
import EditStdDetailsPage from "./Components/Sections/Edit_Student/EditStddetailsPage.std.pf"
import StudentProfileOverviewPage from "./Components/Sections/Profile Overview/StudentProfileOverviewPage.std.pf"
import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess"

const StudentDetailedPage = () => {

  return (
    <Routes>
      <Route index path="/" element={<StudentProfileOverviewPage/>}/>
      <Route path="/edit" element={
        <RoleBasedAccess roleToGiveAccess={["admin","chief admin"]}>
          <EditStdDetailsPage/>
        </RoleBasedAccess>
        } />
    </Routes>
  )
}

export default StudentDetailedPage
