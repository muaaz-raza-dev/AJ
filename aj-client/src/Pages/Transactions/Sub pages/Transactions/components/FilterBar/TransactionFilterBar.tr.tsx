import { useEffect } from "react";
import TransactionFilterSearch from "./TransactionFilterSearch.tr"
import TransactionSelectType from "./TransactionSelectType.tr"
import useReadPageTransactions from "@/Hooks/Transactions/useReadPageTransactions";
import { useAppSelector } from "@/app/ReduxHooks";
import { Link } from "react-router-dom";

const TransactionFilterBar = () => {
  let {Filters ,TransactionTypes} = useAppSelector(s=>s.transactions)
  let {mutate} = useReadPageTransactions(Filters.count)
 useEffect(() => {
  let {transactionType}= Filters
  if(transactionType!=""){
    mutate(Filters)
  }
}, [Filters.transactionType,TransactionTypes]);
  return (
    <div className="w-full flex max-md:flex-col gap-x-4 gap-2">
      <TransactionFilterSearch/>
      <div className="w-full flex gap-x-1 max-md:justify-start justify-end ">
      <TransactionSelectType/>
      <Link to={"create"} className=" bg-dark whitespace-nowrap  text-white center px-3 transition-colors
       hover:bg-dark   rounded-md">New Transaction</Link>
      </div>
    </div>
  )
}

export default TransactionFilterBar
