import { useEffect, useState } from "react";
import TransactionFilterSearch from "./TransactionFilterSearch.tr"
import TransactionSelectType from "./TransactionSelectType.tr"
import useReadPageTransactions from "@/Hooks/Transactions/useReadPageTransactions";
import { useAppSelector } from "@/app/ReduxHooks";
import { Link } from "react-router-dom";
import TransactionDateRangeFilter from "./TransactionDateRangeFilter.tr";
import { FaFilter } from "react-icons/fa";

const TransactionFilterBar = () => {
  let {Filters ,TransactionTypes} = useAppSelector(s=>s.transactions)
  const [AdvancedFilters,setAdvancedFilters] =useState(false)
  let {mutate} = useReadPageTransactions()
 useEffect(() => {
  let {transactionType}= Filters
  if(transactionType!=""){
    mutate(Filters)
  }
}, [Filters.transactionType,TransactionTypes]);
  return (
    <div className="flex w-full gap-2 flex-col dark:text-white">
    <div className="w-full flex max-md:flex-col gap-x-4 gap-2">
      <TransactionFilterSearch/>
      <div className="w-full flex gap-x-3 max-md:justify-start justify-end ">
      <TransactionSelectType/>

      <button className={` center    rounded-md transition-opacity hover:opacity-95 aspect-square h-12  ${AdvancedFilters?"bg-dark  text-white":"bg-box border-2 border-dark text-dark"}`}
       onClick={()=>setAdvancedFilters(!AdvancedFilters)}>
      <FaFilter size={20}/>
      </button>

      <Link to={"create"} className=" bg-dark whitespace-nowrap  text-white center px-3 transition-colors
       hover:bg-dark dark:bg-light dark:text-dark hover:dark:bg-box font-bold    rounded-md">New Transaction</Link>
      </div>
       </div>
       {/* //Advanced Filters  */}
       {AdvancedFilters&&
       <div className={`w-full flex max-md:flex-col gap-x-4 gap-2 justify-between p-3 items-end bg-box shadow-inner rounded  `}>
        <TransactionDateRangeFilter/>
       </div>}
    </div>
  )
}

export default TransactionFilterBar
