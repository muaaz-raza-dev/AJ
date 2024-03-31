import { useEffect } from "react";
import TransactionDateSelection from "./TransactionDateSelection.tr"
import TransactionFilterSearch from "./TransactionFilterSearch.tr"
import TransactionSelectType from "./TransactionSelectType.tr"
import useReadPageTransactions from "@/Hooks/Transactions/useReadPageTransactions";
import { useAppSelector } from "@/app/ReduxHooks";

const TransactionFilterBar = () => {
  let {Filters} = useAppSelector(s=>s.transactions)
  let {mutate} = useReadPageTransactions(Filters.count)
 useEffect(() => {
  let {month,year,transactionType}= Filters
  if(transactionType!=""&&month!=""&&year!=""){
    
    mutate(Filters)
  }
}, [Filters.transactionType,Filters.month,Filters.year]);
  return (
    <div className="w-full flex gap-x-4">
      <TransactionFilterSearch/>
      <div className="w-full flex gap-x-4 justify-end">
      <TransactionSelectType/>
      <TransactionDateSelection/>
      </div>
    </div>
  )
}

export default TransactionFilterBar
