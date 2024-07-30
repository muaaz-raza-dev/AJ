import LabelWrapper from '../Helpers/LabelWrapper.dash'
import CustomSelect_Reg from '../Helpers/CustomSelect_Reg.dash'
import { Account_Roles } from '../Data/Roles'
import { useFormContext } from 'react-hook-form'
import { Iteacher } from '@/app/Types/ITeacherRegisteration'

const Account_Role = () => {
    let form = useFormContext<Iteacher>()
  let value = form.watch("account_Details.Role")
    const updateValue= (val:string)=>{
        form.setValue("account_Details.Role",val)
    }
  return (
    <LabelWrapper required label="Acedmic Role" >
    <CustomSelect_Reg   data={Account_Roles} state={value} setState={updateValue} placeholder={"teacher"} />
    </LabelWrapper>
  )
}

export default Account_Role