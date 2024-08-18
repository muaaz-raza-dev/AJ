import { FC } from "react"
import { IShortTransactions } from "@/app/Types/ItransactionsRead"
import { useAppSelector } from "@/app/ReduxHooks"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const StdProfileTransactions = () => {
  const {Transactions}=useAppSelector(s=>s.stdExclusive.overview)
  return (
    <div className="bg-[var(--box)] dark:bg-darker dark:text-white rounded-lg py-4 flex flex-col gap-y-3">
    <h1 className="text-xl text-[var(--darker)] font-bold hFont px-4 dark:text-white">Recent Transactions</h1>
        <div className="flex flex-wrap gap-1 px-4">
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
    <div className=" flex gap-x-4 justify-between hover:shadow-sm transition-shadow  w-[48%] max-md:w-full bg-light dark:bg-dark  items-center hFont  h-12  rounded-md text-[0.8rem]   px-4">
          <div className="flex gap-x-4 h-full items-center ">
            <span className="hFont text-black dark:text-white"># <b className=" ">000{data.Invoice}</b></span>
            {data?.Transactions?.map(e=><b className="bg-dark px-3 rounded-md text-white">{e.paymentTitle}</b>)}
          </div>
          <div className="flex items-center ">
            <div className="flex gap-x-4 items-center">
            <b className="hFont text-sm  ">{data?.amount?.totalAmount} pkr</b>
            <Link to={`/transactions/transaction/${data._id}`} className=" text-sm   rounded-md bg-dark text-white"><ChevronRight size={18}/></Link>
            </div>
          </div>
        </div>
        
  )
}

export default StdProfileTransactions
