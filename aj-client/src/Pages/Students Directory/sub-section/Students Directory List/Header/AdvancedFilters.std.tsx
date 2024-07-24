import StudentCheckboxFilters from "./CheckboxFilters.std"
import StudentClassSelect from "./ClassSelect.std"
import NewStudentLink from "./NewStudentLink.std"

const StudentAdvancedFilters = () => {
  return (
    <div className='justify-self-end gap-x-2 items-center  flex'>
      <StudentClassSelect/>
      <StudentCheckboxFilters/>
<     NewStudentLink/>

      

    </div>
  )
}

export default StudentAdvancedFilters
