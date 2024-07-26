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
    <div className="w-full flex gap-x-4">
      <TransactionFilterSearch/>
      <div className="w-full flex gap-x-4 justify-end">
      <TransactionSelectType/>
      <Link to={"create"} className=" bg-dark h-full text-white center px-3 transition-colors
       hover:bg-dark  rounded-lg">New Transaction</Link>
      </div>
    </div>
  )
}

export default TransactionFilterBar
