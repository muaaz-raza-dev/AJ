import { useAppSelector } from "@/app/ReduxHooks"
import StdInformationCard from "./StdInformationCard.his"

const HistoryFileHeaderSection = () => {
    let {totalPaid:Paid,totalDues: Dues} =useAppSelector(s=>s.studentHistory.payload.stats)
  return (
    <div className="flex gap-4 ">
    <div className="flex justify-between bg-gradient-to-bl to-[#fd535388]  from-dark overflow-hidden relative w-[33%]  rounded-xl shadow  gap-2  h-32">
    <div className="flex flex-col gap-2 w-full p-4 py-8">
        <div className="flex gap-2 hFont  items-center font-bold">
        <p className="hFont text-[0.9rem] font-bold">Total Dues
             </p>
            <div className="bg-danger text-white rounded-full text-xs px-3 py-0.5">All</div>
        </div>
        <h1 className="text-4xl font-bold">{Dues.toLocaleString()} Pkr</h1>
    </div>
</div>
<div className="flex justify-between bg-gradient-to-bl to-[#1eba629d]   from-dark overflow-hidden relative w-[33%]  rounded-xl shadow-md   gap-2  h-32">
    <div className="flex flex-col gap-2 w-full p-4 py-8">
        <div className="flex gap-2 hFont text-sm items-center font-bold">
        <p className="hFont text-[0.9rem] font-bold">Total Paid amount
             </p>
            <div className="bg-black text-white rounded-full text-xs px-3 py-0.5">All</div>
        </div>
        <div className="flex gap-2 items-center">
        <h1 className="text-4xl font-bold">{Paid.toLocaleString()} Pkr</h1>
        </div>
        
    </div>
</div>
<StdInformationCard/>
    </div>
  )
}

export default HistoryFileHeaderSection