import RegFormWrapper from "./FormWrapper.reg"
import RegPersonalDetailsForm from "./Personal Info/PersonalDetailsForm.reg"
import RegStdImage from "./Personal Info/StdImage.reg"
const StudentsDetailsForm = () => {
  return (
   <RegFormWrapper title="Personal Information" >
    <div className="flex max-lg:flex-col gap-x-4 max-md:gap-x-1 py-4  px-4 max-lg:px-1">
<RegStdImage/>
<RegPersonalDetailsForm/>
    </div>
   </RegFormWrapper>
  )
}

export default StudentsDetailsForm
