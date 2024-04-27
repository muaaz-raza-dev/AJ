import { FC } from "react"
import { IShortTransactions } from "@/app/Types/ItransactionsRead"
import { useAppSelector } from "@/app/ReduxHooks"
import { ChevronRight } from "lucide-react"

const StdProfileTransactions = () => {
  let {Transactions}=useAppSelector(s=>s.stdExclusive.overview)
  return (
    <div className="bg-[var(--box)] rounded-lg py-4 flex flex-col gap-y-3">
    <h1 className="text-xl text-[var(--darker)] font-bold hFont px-4">Payment History</h1>
        <div className="flex flex-col gap-4 px-4">
          {
            Transactions.length==0?
            <p className="text-center bg-transparent">No transactions yet</p>
            :
            Transactions.map(tr=><StdProfileEachTransaction data={tr}/>)
          }
        </div>
    </div>
  )
}

const StdProfileEachTransaction:FC<{data:IShortTransactions&{Transaction?:{[key:string]:any}[]}}>= ({data})=>{
  return(
    <div className=" flex gap-x-4 justify-between hover:scale-105 transition-transform  items-center hFont shadow-inner h-12  rounded-md text-[0.8rem]   pr-4">
          <div className="flex gap-x-4 h-full items-center">
            <div className="bg-[var(--dark)] w-2 h-12 rounded-l-md"></div>
            {/* <div className="rounded-full center w-8 h-8 text-white items-center aspect-square bg-orange-600 ">
            </div> */}
            <span className="hFont text-black "># <b className=" ">000{data.Invoice}</b></span>
            {data?.Transaction?.map(e=><b>{e?.purpose}</b>)}
          </div>
          <div className="flex items-center ">
            <div className="flex gap-x-4">
            <b className="hFont   text-green-600 ">{data.totalAmount} pkr</b>
            </div>
            <button className=" text-sm  text-black rounded-md "><ChevronRight/></button>
          </div>
        </div>
        
  )
}

export default StdProfileTransactions
