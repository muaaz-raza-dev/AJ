import { useAppSelector } from "@/app/ReduxHooks"
import { format } from "date-fns"
import { useMemo } from "react"

const RevenueLabelFormRD = () => {
    const {payload,filters:{Dates:{start,end}}} =useAppSelector(s=>s.detailedRevenue)
    const totalRevenue = useMemo(() =>  payload.reduce((acc, curr) => acc + curr.total, 0), [payload])
  return (

    <div  className="bg-white w-[70%] border  p-4 rounded-lg flex flex-col gap-4">
        <div className="d">
        <h1 className="font-bold text-2xl">Labeled Overview</h1>
        <p className="text-gray-600 text-sm">{format(start, "PPP")} - {format(end,"PPP")}</p>
        </div>

        <div className="flex gap-1  flex-wrap h-[90%]">'
          {payload.length==0&&
          <div className="w-full font-bold hFont text-gray-500 text-xl text-center">No data found</div>}
            {payload.map(pay=>{
      return <div className="flex flex-col w-[32%] h-20 p-4 text-white rounded justify-center bg-gradient-to-bl to-dark from-darker">
    <div className="text-sm font-semibold text-gray-300">{pay.Name}</div>
    <div className="text-3xl font-bold ">{pay.total.toLocaleString()} PKR</div>
  </div>

            })}
  
  
        </div>
        <div className="flex justify-between border-dashed  border-2 p-2 px-4 rounded-md border-dark  font-bold text-2xl">
           <h1 className="">Grand Total</h1>
            <p>{totalRevenue.toLocaleString()} PKR</p>
        </div>
    </div>
  )
}

export default RevenueLabelFormRD