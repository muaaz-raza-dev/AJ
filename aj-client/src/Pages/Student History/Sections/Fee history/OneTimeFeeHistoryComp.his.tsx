import { useAppSelector } from "@/app/ReduxHooks"
import { IfeeHistory } from "@/app/Types/IstudentHistroy"
import { FC } from "react"
import { PaymentStatusComp } from "./MonthlyFeeHistoryComp.his"
import { useNavigate } from "react-router-dom"

const OneTimeFeeHistoryCom = () => {
  let {FeeHistory} = useAppSelector(s=>s.studentHistory.payload)
  return (
    <div className="flex gap-2 w-full  items-start  bg-[var(--box)]">
      {FeeHistory.map(e=><EachOneTimeFeeComp data={e}/>)}
              </div>
  )
}
const EachOneTimeFeeComp:FC<{data:IfeeHistory}> = ({data})  =>{
  let {Sessions} =useAppSelector(s=>s.global)
  let navigate = useNavigate()
  let handleClick = ()=>{
    if(data.transactionId && data.status =="Paid") {navigate(`/transactions/transaction/${data.transactionId}`)}
  }
  return <div onClick={handleClick} className="w-[50%] min-h-24 max-sm:w-full  p-2 bg-[var(--primary)]  shadow text-dark  rounded-md flex flex-col gap-1">
    <div className="flex gap-2 justify-between py-1 px-2">
  <h1 className="text-xl hFont font-semibold">{Sessions[data.session]}</h1>
    <PaymentStatusComp status={data.status}/>
  </div>
  <div className="flex w-full flex-wrap gap-1">
  <div className="flex gap-2 px-2 min-w-[30%]">
              <p className="text-base text-gray-600 font-semibold">Fee Title : </p>
              <p className="text-base font-semibold text-black"> {data.feeTitle}</p>
              </div>
              <div className="flex gap-2 px-2 min-w-[30%]">
              <p className="text-base text-gray-600 font-semibold">Session of admission : </p>
              <p className="text-base font-semibold text-black "> {Sessions[data.session]}</p>
              </div>
              <div className="flex gap-2 px-2 min-w-[30%]">
              <p className="text-base text-gray-600 font-semibold">Amount : </p>
              <p className="text-base font-semibold text-green-500 "> {data.amount} PKR</p>
              </div>
  </div>

              </div> 

}

export default OneTimeFeeHistoryCom