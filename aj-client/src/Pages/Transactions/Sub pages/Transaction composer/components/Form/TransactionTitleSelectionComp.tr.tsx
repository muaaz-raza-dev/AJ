import { useAppSelector } from '@/app/ReduxHooks';
import CustomSelect_Reg from '@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash'
import  { FC } from 'react'
import { useFormContext } from 'react-hook-form';

const TransactionTitleSelectionComp:FC<{fieldName:string}> = ({fieldName}) => {
    let {Purposes ,Amounts} =useAppSelector(s=>s.trComposeFilters.FeeInfo)  
    let {watch,setValue} = useFormContext()
    let paymentType = watch(`${fieldName}.paymentType`)
    let paymentConfigId = watch(`${fieldName}.paymentConfigId`)
    let paymentTitle = watch(`${fieldName}.paymentTitle`)
    let handlePurposeSelection = (val:string)=>{
        let isRegistered = Purposes.some(({value})=>value==val)
        let paymentType ="Registered"
        if(!isRegistered){
           paymentType = "Custom" 
           setValue(`${fieldName}.paymentTitle`,val)
          }
          else{
          setValue(`${fieldName}.amount.realAmount`,Amounts[val])
          setValue(`${fieldName}.amount.totalAmount`,Amounts[val])
          setValue(`${fieldName}.paymentConfigId`,val)
          setValue(`${fieldName}.paymentTitle`,Purposes.find(e=>e.value==val)?.label)
        }
        setValue(`${fieldName}.paymentType`,paymentType)
      }
if(paymentType=="Custom"){
    return (
        <input type="text" placeholder="Enter custom payment title" className='
         border rounded-md  w-full p-2  border-[#8080806b] focus:border-dark  transition-all outline-none 
         ' value={paymentTitle} onChange={(e)=> {
            setValue(`${fieldName}.paymentTitle`,e.target.value)
            setValue(`${fieldName}.paymentConfigId`,"")
        }
        } />
    )
}
else{

    return (
        <CustomSelect_Reg className=''
        setState={handlePurposeSelection} state={paymentType=="Registered"?paymentConfigId:paymentTitle} optimumData={Purposes} />)
    }
}

export default TransactionTitleSelectionComp