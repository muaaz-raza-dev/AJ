import StudentCheckboxFilters from "./CheckboxFilters.std"
import StudentClassSelect from "./ClassSelect.std"
import NewStudentLink from "./NewStudentLink.std"

const StudentAdvancedFilters = () => {
  return (
    <div className='justify-self-end max-md:flex-wrap gap-2  gap-x-1 items-center flex '>

      <StudentClassSelect/>
      <StudentCheckboxFilters/>
      <NewStudentLink/>

      

    </div>
  )
}

export default StudentAdvancedFilters
