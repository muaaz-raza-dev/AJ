import { FC } from "react"
import RegFormWrapper from "../FormWrapper.reg"
import RegAcademicDetailsForm from "./AcademicDetailsForm.reg"

const RegAcademicInfoForm:FC<{edit?:boolean}> = ({edit}) => {
  return (
    <RegFormWrapper title="Academic Information" >
    <div className="flex gap-x-6 py-4 px-4">
        <RegAcademicDetailsForm edit={edit}/>
        </div>
        </RegFormWrapper>
  )
}

export default RegAcademicInfoForm
