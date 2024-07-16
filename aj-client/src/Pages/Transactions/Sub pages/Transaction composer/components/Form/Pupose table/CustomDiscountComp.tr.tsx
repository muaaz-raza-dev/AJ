import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash"
import { ChangeEvent, FC, useState } from "react"
import { useFormContext } from "react-hook-form"
import { GetPercentage } from "react-simpler"

const CustomDiscountComp:FC<{fieldName:string}> = ({fieldName}) => {
    let {watch,setValue} =useFormContext()
    const [discounts,setDiscounts] = useState<{type:"%"|"amount",value:number}>({type:"amount",value:0})
    let totalAmount = watch(`${fieldName}.amount.realAmount`)
    let handleTypeChange = (val:string)=>{
        if(val=="%"||val=="amount"){
            setDiscounts(e=>({...e,type:val}))
            handleAmountChange({discountType:val})
          }
    }
    function handleAmountChange( {val,discountType}:{val ?: ChangeEvent<HTMLInputElement>,discountType?:string}): void {
      if(val) setDiscounts(e=>({...e,value:+val?.target.value}))
      let value = val?.target.value || discounts.value
        let result = 0
        let Type = discountType|| discounts.type
        if(Type=="%") {
        result = GetPercentage({mode:"amount",total:totalAmount,percent:+value}) as number          
        }
        else {
        result = +value 
        }
        setValue(`${fieldName}.amount.discount`,result)
    }

  return (
    <>
         <input type="number" placeholder={`${discounts.type} of amount`} 
         maxLength={3}
         max={100}
         value={discounts.value||""}
         className=' 
         border rounded-md  w-full p-2  border-[#8080806b] focus:border-dark  transition-all outline-none '
         onChange={(value)=>handleAmountChange({val:value})}
         />
<CustomSelect_Reg state={discounts.type} setState={handleTypeChange} data={["amount","%"]} />
    </>
  )
}

export default CustomDiscountComp