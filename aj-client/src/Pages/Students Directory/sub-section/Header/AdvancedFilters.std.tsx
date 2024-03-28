import StudentCheckboxFilters from "./CheckboxFilters.std"
import NewStudentLink from "./NewStudentLink.std"

const StudentAdvancedFilters = () => {
  return (
    <div className='justify-self-end gap-x-2 items-center  flex'>
      <StudentCheckboxFilters/>
{/* <StudentClassSelect/> */}
<NewStudentLink/>

      

    </div>
  )
}

export default StudentAdvancedFilters
