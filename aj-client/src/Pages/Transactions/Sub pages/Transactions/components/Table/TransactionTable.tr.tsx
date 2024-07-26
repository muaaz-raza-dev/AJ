import {Table,TableBody} from "@/shdcn/components/ui/table"
import TransactionHead from "./TransactionHead.tr"
import TransactionRow from "./TransactionRow.tr"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import { useAppSelector } from "@/app/ReduxHooks"

const TransactionTable = () => {
  let {Transactions}= useAppSelector(s=>s.transactions)
  return (
    <>
    <Table className="bg-[var(--box)] dark:bg-dark rounded-md">
    <TransactionHead/>
    <TableBody>
      {Transactions.map(tr=><TransactionRow data={tr}/>)}
    </TableBody>
  </Table>
  <TransactionLoading/>
    </>
  )
}
function TransactionLoading(){
  let {  isLoadingTransactions,DataLength}= useAppSelector(s=>s.transactions)
  if (isLoadingTransactions) {
    return <div className="w-full center">
<RequestLoading dark />      
    </div>
  } 
  else{
    if (DataLength==0) {
      return <div className="w-full center hFont flex p-3">
        No transaction found
      </div>
    }
  }
}

export default TransactionTable
