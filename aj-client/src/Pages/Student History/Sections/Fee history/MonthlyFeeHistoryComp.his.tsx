import { useAppSelector } from "@/app/ReduxHooks"
import { FC, useEffect, useState } from "react"
import lod from "lodash"
import { IfeeHistory } from "@/app/Types/IstudentHistroy"
import { Tooltip } from "antd"
import {  useNavigate } from "react-router-dom"
const MonthlyFeeHistoryComp = () => {
  const [state, setstate] = useState<{[key:string]:IfeeHistory[]}>({})
  let {FeeHistory} = useAppSelector(s=>s.studentHistory.payload)
  let Classes = useAppSelector(s=>s.global.Classes)
  useEffect(() => { setstate(lod.groupBy(FeeHistory,(({year})=>year)))}, [FeeHistory])
  return (
    <div className="flex gap-2 w-full  items-start flex-col bg-box
     dark:bg-dark">
      {
        Object.entries(state).map(([year,doc])=>{
          return( <>
          <div className="flex w-full bg-darker text-white  text-xl rounded-md justify-between font-semibold hFont p-2 px-4">
<h1>
{year}
</h1>
<h1>
  Class {Classes[doc[0].class]}
</h1>

 </div>
    <div className="flex flex-wrap gap-2 w-full ">
   {doc.map(elm=> <EachMonthlyFeeHistoryComp data={elm} />   )}
</div></>)
        })
      }
</div>
  )
}
export const PaymentStatusComp:FC<{status:"Not applicable" | "Not paid" | "Not required" | "Upcoming" | "Paid" | "Advanced paid"}> = ({status})=>{
const [assets, setAssets] = useState({title:"",className:""} )
useEffect(() => {
  if(status == "Paid") setAssets({title:"Paid the fees", className:"bg-[#17B169] text-white"})
  if(status == "Not paid") setAssets({title:"Not Paid the fees yet. Dues to be clear", className:"bg-[#9e1b32] text-white"})
  if(status == "Not applicable") setAssets({title:"The student was not the student when.", className:"bg-gray-400 text-black grayscale cursor-none"})
  if(status == "Not required") setAssets({title:"There is no fees .", className:"bg-black text-white  cursor-none"})
  if(status == "Upcoming") setAssets({title:"Upcoming this session", className:"bg-[var(--warning)] text-black"})
  if(status == "Advanced paid") setAssets({title:"Paid in advanced . ", className:"bg-[var(--info)] text-black"})
}, [status])

return <Tooltip title={assets.title}>
<div className={` px-3 ${assets.className} cursor-pointer center text-sm font-semibold  rounded-full `}>
    <p>{status}</p>
    </div>
</Tooltip>
}
const EachMonthlyFeeHistoryComp:FC<{data:IfeeHistory}> = ({data}) =>{
      let navigate = useNavigate()
      let handleClick = ()=>{
        if(data.transactionId && data.status =="Paid") {navigate(`/transactions/transaction/${data.transactionId}`)}
      }
    return <div onClick={handleClick} className="w-[24%] max-lg:w-[32%] max-md:w-[49%] max-sm:w-full h-28 p-2 bg-[var(--primary)]  shadow text-dark dark:text-light dark:bg-darker  rounded-md flex flex-col gap-1">
      <div className="flex gap-2 justify-between py-1">
    <h1 className="text-xl hFont font-semibold">{data.month}</h1>
    <PaymentStatusComp status={data.status}/>
    </div>
    <div className="flex gap-2">
                <p className="text-base text-gray-500 font-semibold">Fee Title : </p>
                <p className="text-base font-semibold text-black dark:text-white"> {data.feeTitle}</p>
                </div>
                <div className="flex gap-2">
                <p className="text-base text-gray-500 font-semibold">Amount : </p>
                <p className="text-base font-semibold text-black dark:text-white "> {data.amount} PKR</p>
                </div>
    </div>
}

export default MonthlyFeeHistoryComp