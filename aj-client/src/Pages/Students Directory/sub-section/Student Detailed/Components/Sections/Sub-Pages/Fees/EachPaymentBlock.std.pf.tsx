import { IfeeDoc } from "@/app/Types/IStudentExclusive"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shdcn/components/ui/hover-card"
import moment from "moment"
import { FC, useEffect, useState } from "react"
const EachPaymentBlock:FC<{data:IfeeDoc}> = ({data}) => {
const [Label, setLabel] = useState("Upcoming")
  useEffect(()=>{
    if(!data.isAdmitted) {setLabel("Not Admitted")} 
    else {
if(!data.hasPassedMonth) {setLabel("Upcoming")}
      else{
         if(!data.isSubmited) {setLabel("Pending")}
          else {setLabel("Sumbitted")}
      }
    }
  },[data])
  return (
    <div className={`border-2 ${data.isSubmited?'border-green-600':data.hasPassedMonth?'border-red-400':'border-orange-400'} bg-gradient-to-br f rounded-md min-w-28 min-h-18  py-3 px-2 flex flex-col items-stretch ${!data.isAdmitted&& "bg-gray-800 text-white border-gray-500"}`}>
        <div className="hFont font-extrabold text-base">{data.month}</div>
        <HoverCard>
  <HoverCardTrigger>
        <div className=" cursor-pointer flex items-center gap-x-1">
          {data.isAdmitted&&
        <div className={`w-2 h-2 rounded-full ${data.isSubmited?'bg-green-600':data.hasPassedMonth?'bg-red-400':'bg-orange-400'}  `}></div>
      }
            <div className=" text-xs tracking-wide hFont">{Label}</div>
        </div>
  </HoverCardTrigger>
  {
    data.isAdmitted&&data.hasPassedMonth&&data.isSubmited&&
  
  <HoverCardContent className="z-30 bg-[var(--box)] text-black">
<div className="flex flex-col gap-2 !z-30">
  <h1 className="text-center hFont text-lg font-black">Invoice Details</h1>
  <div className="flex justify-between p-1 rounded-md border-[var(--dark)] border-2 px-4">
    <b>Invoice </b> <b >{data.FeeDetail?.Invoice}</b>
  </div>
  <div className="flex justify-between p-1 items-center rounded-md border-[var(--dark)] border-2 px-4">
    <b>Date </b> <b className="text-xs" >
      {moment(data.FeeDetail?.Time).get("DDD")}
    </b>
  </div>
  <div className="flex justify-between p-1 rounded-md border-[var(--dark)] border-2 px-4">
    <b>Total Amount </b> <b >{data.FeeDetail?.totalAmount}</b>
  </div>
  <button className="flex justify-center p-1 rounded-md bg-[var(--dark)] text-white text-center border-none ">
    Transaction Detail
  </button>
</div>
  </HoverCardContent>}
</HoverCard>
    </div>
  )
}
export default EachPaymentBlock