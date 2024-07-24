import  { useEffect, useState } from 'react'
import LabelWrapper from '../Helpers/LabelWrapper.dash'
import CustomSelect_Reg from '../Helpers/CustomSelect_Reg.dash'
import { schoolRoles } from '../Data/Roles'
import { useFormContext } from 'react-hook-form'

const Role_Select = () => {
    const [state,setState] =useState("Teacher")
    let {setValue,watch} =useFormContext()
  let value = watch("acedmic_role")
    useEffect(() => {
    setValue("acedmic_role",state)
    }, [state])
  return (
    <LabelWrapper required label="Acedmic Role">
    <CustomSelect_Reg   data={schoolRoles} state={value} setState={setState} placeholder={"Teacher"}/>
  </LabelWrapper>
  )
}

export default Role_Select