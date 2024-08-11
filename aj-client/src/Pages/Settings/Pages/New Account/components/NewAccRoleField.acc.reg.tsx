import { IaccountRegister } from '@/app/Types/IAccountRegister'
import CustomSelect_Reg from '@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash'
import LabelWrapper from '@/Pages/Classes/Registeration/Teacher/Helpers/LabelWrapper.dash'
import { useFormContext } from 'react-hook-form'

const NewAccRoleField = () => {
    const {setValue,watch} =useFormContext<IaccountRegister>()

  return (
    <LabelWrapper required label="Account Role" labelClassName=" ">
    <CustomSelect_Reg data={["admin","user"]} state={watch("Role")} setState={(val)=>{
        let Value = val as ("admin"|"user")
        setValue("Role",Value)}}/>
  </LabelWrapper>
  )
}

export default NewAccRoleField