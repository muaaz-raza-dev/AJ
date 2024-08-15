import { useAppSelector } from "@/app/ReduxHooks"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import { FC } from "react"

const AmountInfoBoxes = () => {
    const {payload:{Info:{totalPaidAmount,totalPendingAmount,totalStudents}},isLoading} =useAppSelector(s=>s.stdFeeReport)
  return (
    <section className="flex gap-2">
        <AmountInfoBox value={`${totalStudents} `}      isLoading={isLoading}  label="Total students in this category" color="bg-[var(--info)]"/>
        <AmountInfoBox value={`${totalPaidAmount} PKR`}    isLoading={isLoading}  label="Total paid amount in this category" color="bg-[var(--success)]"/>
        <AmountInfoBox value={`${totalPendingAmount} PKR`} isLoading={isLoading}  label="Total pending amount in this category" color="bg-danger"/>
    </section>
  )
}

const AmountInfoBox:FC<{value:string;color:string;label:string;isLoading:boolean}> = ({value,color,label,isLoading})=>{
    return  <div className={`flex justify-between  dark:text-white overflow-hidden relative
        min-w-[24%] max-lg:w-[48%]  rounded-xl shadow  gap-2  h-24 transition-all max-md:h-28  ${color}`}>
       <div className="flex flex-col gap-1 w-full px-4 py-4">
        <div className="flex gap-3 items-center">
           <p className="hFont text-sm max-md:text-sm font-normal">{label}</p>
            {isLoading&&
            <RequestLoading size="16" stroke="2" dark/>
            }
        </div>
           <h1 className="text-3xl max-md:text-2xl font-bold">{value} </h1>
       </div>
   </div>
}

export default AmountInfoBoxes