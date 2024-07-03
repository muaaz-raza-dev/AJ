import  { useEffect, useState } from 'react'
import LabelWrapper from '../Helpers/LabelWrapper.dash'
import CustomSelect_Reg from '../Helpers/CustomSelect_Reg.dash'
import { Account_Roles } from '../Data/Roles'
import { useFormContext } from 'react-hook-form'

const Account_Role = () => {
    const [state, setState] = useState("teacher")
    let form = useFormContext()
    useEffect(() => {
    form.setValue("acedmic_role",state)
    }, [state])
  return (
    <LabelWrapper required label="Acedmic Role" >
    <CustomSelect_Reg   data={Account_Roles} state={state} setState={setState} placeholder={"teacher"}/>
    </LabelWrapper>
  )
}

export default Account_Role