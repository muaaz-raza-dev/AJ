import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess"
import SortStudentGRNO from "../SortStudentGRNO.std.action"
import StudentClassSelect from "./ClassSelect.std"
import NewStudentLink from "./NewStudentLink.std"

const StudentAdvancedFilters = () => {
  return (
    <div className='justify-self-end max-md:flex-wrap gap-2  gap-x-1 items-center flex '>

      <StudentClassSelect/>
      {/* <StudentCheckboxFilters/> */}

      <RoleBasedAccess roleToGiveAccess={"chief admin"}>
      <SortStudentGRNO/>
      </RoleBasedAccess>

      <NewStudentLink/>

      

    </div>
  )
}

export default StudentAdvancedFilters
