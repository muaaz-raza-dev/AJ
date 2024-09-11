import { useAppSelector } from "@/app/ReduxHooks";
import { useEffect, useState } from "react";
import lod from "lodash"
import { IDuesTrCompose } from "@/app/Types/IcomposeTransactionFilters";
import { Tooltip } from "antd";
const TransactionDuesDetailsSection = () => {
    const [data,setData] =useState<{[key:string]:IDuesTrCompose[]}>({})
    const {Dues} = useAppSelector(s=>s.trComposeFilters)
    const {Sessions} = useAppSelector(s=>s.global)
    const {StudentInfo} =useAppSelector(s=>s.trComposeFilters)
    useEffect(() => {
        const grouped = lod.groupBy(Dues,(({_id})=>_id))
        setData(grouped)
    }, [Dues])
    if(StudentInfo?.FirstName) {

  return (
    <div className="bg-light dark:bg-transparent  shadow-inner border-2 dark:border-dark rounded-md w-full p-2 pb-4 px-4">
      <h1 className="text-center text-xl py-1 font-bold hFont">Dues Details</h1>
      <div className="flex flex-wrap  gap-4">
        {
            data &&
            Object.entries(data).map(([id,docs])=> (
              <div key={id}  className="w-[32%] max-lg:w-[48%] max-sm:w-full shadow dark:bg-dark  flex flex-col min-h-36 p-2 px-4 rounded-lg   gap-1 bg-[var(--box)]">
                <div className="font-bold text-base flex justify-between rounded-md  min-h-[20%] ">
                    <h1>
                    {docs[0].feeTitle} {docs[0].feeFrequency!="One Time"&&`(${Sessions[docs[0].session]})`}
                    </h1>
                    <p className="text-green-800 font-extrabold dark:text-green-200">
                        {docs[0].amount}
                    </p>
                    </div>
                <div className=" flex flex-wrap w-full gap-1 h-[75%]">
                  {docs.map((e) => (
                    <Tooltip title={e.amount+" " + "PKR"}>
                      <div className=" bg-danger h-max cursor-pointer min-w-[30%] text-sm text-white px-4 rounded-md ">
                      {e.feeFrequency=="One Time" ? 
                       e.amount +" "+"PKR" :
                       e.month? e?.month + " " + e?.year :
                       Sessions[e.session]
                    } 
                  </div>
                    </Tooltip>
                  ))}
                </div>
                <div className="flex w-full justify-between ">
                <p className="text-gray-600 font-extrabold dark:text-gray-200">
                      Total
                    </p>
                    <p className="text-red-800 font-extrabold dark:text-red-300">
                        {lod.sumBy(docs,"amount").toString()} PKR
                    </p>
                </div>
              </div>
            ))

  
        }
  
             </div>
    </div>
  ) 
}
}

export default TransactionDuesDetailsSection