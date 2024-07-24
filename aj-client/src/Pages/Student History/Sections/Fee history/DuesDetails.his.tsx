import { useAppSelector } from "@/app/ReduxHooks";
import { useEffect, useState } from "react";
import lod from "lodash"
import { IDuesTrCompose } from "@/app/Types/IcomposeTransactionFilters";
import { Tooltip } from "antd";
const DuesDetails = () => {
    const [data,setData] =useState<{[key:string]:IDuesTrCompose[]}>({})
    let {Dues} = useAppSelector(s=>s.studentHistory.payload)
    let {Sessions} = useAppSelector(s=>s.global)
    useEffect(() => {
        let grouped = lod.groupBy(Dues,(({_id})=>_id))
        setData(grouped)
    }, [Dues])
  return (
      <div className="flex flex-wrap  gap-4">
        {
            data &&
            Object.entries(data).map(([id,docs])=> (
              <div key={id}  className="w-[32%] shadow  flex flex-col min-h-28 p-2 rounded-lg   gap-1 bg-[var(--primary)]">
                <div className="font-bold text-base flex justify-between rounded-md  h-[30%]">
                    <h1>
                    {docs[0].feeTitle} {docs[0].feeFrequency!="One Time"&&`(${Sessions[docs[0].session]})`}
                    </h1>
                    <p className="text-green-800 font-extrabold">
                        {docs[0].amount}
                    </p>
                    </div>
                <div className=" flex flex-wrap w-full gap-1 h-[65%]">
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
                <p className="text-gray-600 font-extrabold">
                      Total
                    </p>
                    <p className="text-red-800 font-extrabold">
                        {lod.sumBy(docs,"amount").toString()} PKR
                    </p>
                </div>
              </div>
            ))

  
        }
  
             </div>

  )
}


export default DuesDetails