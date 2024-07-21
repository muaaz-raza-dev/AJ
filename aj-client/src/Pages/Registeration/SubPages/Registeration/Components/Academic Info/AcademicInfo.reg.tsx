import { FC } from "react"
import RegFormWrapper from "../FormWrapper.reg"
import RegAcademicDetailsForm from "./AcademicDetailsForm.reg"

const RegAcademicInfoForm:FC<{edit?:boolean}> = ({edit}) => {
  return (
    <RegFormWrapper title="Academic Information" >
        <RegAcademicDetailsForm edit={edit}/>
        </RegFormWrapper>
  )
}

export default RegAcademicInfoForm
