import { ItransactionField } from '@/app/Types/ItransactionForm'
import  { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const CustomAmountSelection:FC<{fieldName:string}> = ({fieldName}) => {
    let {watch,setValue} = useFormContext()
    let paymentType = watch(`${fieldName}.paymentType`)
    let amount = watch(`${fieldName}.amount.realAmount`)
  return (
    <>
    <input type="number" placeholder="Amount" className='
    min-w-28
    border rounded-md  w-full px-2 py-1.5  border-[#8080806b] dark:border-dark focus:border-dark  transition-all outline-none dark:bg-dark dark:text-white dark:placeholder:text-gray-500 
    ' value={amount||""} disabled={paymentType!="Custom"} onChange={(e)=> {
        if(paymentType=="Custom") {
          setValue(`${fieldName}.amount.realAmount`,+e.target.value) 
          setValue(`${fieldName}.amount.totalAmount`,+e.target.value) 
        }
        }
} />
</>
  )
}

export const TotalAmountSelection:FC<{fieldName:string}> = ({fieldName}) => {
  let {watch,setValue} = useFormContext()
  let amounts = watch(`${fieldName}.amount`)
  let Transactions = watch("Transactions")
  useEffect(() => {
    setValue(`${fieldName}.amount.totalAmount`,amounts?.realAmount-amounts?.discount)
  }, [amounts.discount ,amounts.realAmount])
  useEffect(() => {
    let totalAmount = 0
    let discount = 0 
    let grandTotal = 0
    Transactions.forEach((t:ItransactionField)=>totalAmount+=t.amount.realAmount)
    Transactions.forEach((t:ItransactionField)=>discount+=t.amount?.discount||0)
    Transactions.forEach((t:ItransactionField)=>grandTotal+=t.amount.totalAmount)
    setValue(`amount.realAmount`,totalAmount)
    setValue(`amount.discount`,discount)
    setValue(`amount.totalAmount`,grandTotal)
  }, [amounts.totalAmount])
return (
  <>
 <h1 className=' 
   border rounded-md  w-full px-2 py-1.5  dark:border-dark border-[#8080806b] focus:border-dark  transition-all outline-none dark:bg-dark dark:text-white dark:placeholder:text-gray-500 '
   >{amounts.totalAmount}
   </h1>
</>
)
}

export default CustomAmountSelection