import RegFormWrapper from "./FormWrapper.reg"
import RegPersonalDetailsForm from "./Personal Info/PersonalDetailsForm.reg"
import RegStdImage from "./Personal Info/StdImage.reg"
const StudentsDetailsForm = () => {
  return (
   <RegFormWrapper title="Personal Information" >
    <div className="flex gap-x-4 py-4  px-4 ">
<RegStdImage/>
<RegPersonalDetailsForm/>
    </div>
   </RegFormWrapper>
  )
}

export default StudentsDetailsForm
