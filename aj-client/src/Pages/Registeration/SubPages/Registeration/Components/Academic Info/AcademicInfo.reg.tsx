import RegFormWrapper from "../FormWrapper.reg"
import RegAcademicDetailsForm from "./AcademicDetailsForm.reg"

const RegAcademicInfoForm = () => {
  return (
    <RegFormWrapper title="Academic Information" >
    <div className="flex gap-x-6 py-4 px-4">
        <RegAcademicDetailsForm/>
        </div>
        </RegFormWrapper>
  )
}

export default RegAcademicInfoForm
