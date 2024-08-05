import RegFormWrapper from "./FormWrapper.reg"
import RegPersonalDetailsForm from "./Personal Info/PersonalDetailsForm.reg"
import RegStdImage from "./Personal Info/Student Photo/StdImage.reg"
const StudentsDetailsForm = () => {
  return (
   <RegFormWrapper title="Personal Information" >
   <div className="flex max-md:flex-col ga-2">
<RegStdImage/>
<RegPersonalDetailsForm/>
   </div>
   </RegFormWrapper>
  )
}

export default StudentsDetailsForm
