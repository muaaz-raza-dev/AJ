import { useAppSelector } from "@/app/ReduxHooks"
import MonthlyFeeHistoryComp from "./MonthlyFeeHistoryComp.his"
import YearlyFeeHistoryCom from "./YearlyFeeHistoryCom.his"
import OneTimeFeeHistoryCom from "./OneTimeFeeHistoryComp.his"
import DuesDetails from "./DuesDetails.his"

const FeeHistorySection = () => {
  let {selected:feeType} = useAppSelector(s=>s.studentHistory.filters.feeTypes)
  let {selected:dataType} = useAppSelector(s=>s.studentHistory.filters.DataTypes)

  const FeeHistoryComponents = ()=>{
    if(feeType =="Yearly"){
      return  <YearlyFeeHistoryCom/> 
    }
    if(feeType =="One Time"){
      return  <OneTimeFeeHistoryCom/> 
    }
    if(feeType =="Monthly"){
      return  <MonthlyFeeHistoryComp/> 
    }
  }

  return (
    <section className="w-full bg-[var(--box)] dark:bg-dark  flex flex-col rounded-md shadow gap-3 p-3 ">
        <div className="flex justify-between">
    <h1 className="hFont dark:text-white text-3xl font-bold ">{dataType=="Dues"?  "All Dues details" : `${feeType} Fee History `} </h1> 
        </div>
        {dataType=="All" ? 
        <FeeHistoryComponents/> :
        <DuesDetails/>
      }

    </section>
  )
}



export default FeeHistorySection