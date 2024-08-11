import { IaccountRegister } from '@/app/Types/IAccountRegister'
import { useFetchRequiredInfo } from '@/Hooks/Teacher&Class/useReadTeachers'
import CustomSelect_Reg from '@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash'
import LabelWrapper from '@/Pages/Classes/Registeration/Teacher/Helpers/LabelWrapper.dash'
import { useFormContext } from 'react-hook-form'

const NewAccountStaffIdField = () => {
const {data,isLoading} = useFetchRequiredInfo("teachers")
const {watch,setValue} =useFormContext<IaccountRegister>()
const  staffId =  watch("StaffId")
const q =  data as {payload:{Teachers:{[key:string]:string}}}
  return (
    <LabelWrapper label="Attach Staff Id" labelClassName="">
    <CustomSelect_Reg disabled={isLoading} optimumData={Object?.entries(q?.payload?.Teachers||{})?.map(e=>(
        {value:e[1],label:e[0]}
        ))} state={staffId} setState={(val)=>setValue("StaffId",val)}/>
  </LabelWrapper>
  )
}

export default NewAccountStaffIdField