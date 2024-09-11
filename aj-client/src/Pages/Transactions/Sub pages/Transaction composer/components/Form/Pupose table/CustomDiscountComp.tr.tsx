import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { GetPercentage } from "react-simpler"

const CustomDiscountComp:FC<{fieldName:string}> = ({fieldName}) => {
    const {watch,setValue} =useFormContext();
    const [discounts,setDiscounts] = useState<{type:"%"|"amount",value:number}>({type:"amount",value:0})
    const discountedValue = watch(`${fieldName}.amount.discount`)
    const realAmount = watch(`${fieldName}.amount.realAmount`)

    useEffect(() => {
    if(discountedValue){
        setDiscounts({type:"amount",value:discountedValue}) //?explicit amount
    }
    }, [discountedValue])

    const handleTypeChange = (val:string)=>{
        if(val=="%"||val=="amount"){
            setDiscounts(e=>({...e,type:val}))
            handleAmountChange({discountType:val})
          }
    }
    function handleAmountChange( {val,discountType}:{val ?: ChangeEvent<HTMLInputElement>,discountType?:string}): void {
      if(val!=undefined) setDiscounts(e=>({...e,value:+val?.target.value||0}))

        const value = val?.target.value ?? discounts.value
        let result = 0
        const Type = discountType|| discounts.type
        if(Type=="%") {
        result = GetPercentage({mode:"amount",total:realAmount,percent:+value}) as number          
        }
        else {
        result = +value 
        }
        setValue(`${fieldName}.amount.discount`,result)
    }

  return (
    <>
         <input type="number" placeholder={`${discounts.type}`} 
         value={discounts.value||""}
         className=' 
         border min-w-28  rounded-md dark:bg-dark dark:text-white dark:border-dark dark:placeholder:text-gray-500  px-2 h-full py-2  border-[#8080806b]  transition-all outline-none '
         onChange={(value)=>handleAmountChange({val:value})}
         />
<CustomSelect_Reg  state={discounts.type} className="!w-3/4 antd-selectBarDark" setState={handleTypeChange} data={["amount","%"]} />
    </>
  )
}

export default CustomDiscountComp