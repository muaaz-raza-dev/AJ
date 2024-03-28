import {Table,TableBody,} from "@/shdcn/components/ui/table"
import {  useAppSelector } from "@/app/ReduxHooks"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import TransactionHead from "./TransactionHead.tr"
import TransactionRow from "./TransactionRow.tr"

  





const TransactionTable = () => {
  return (
    <Table className="bg-[var(--box)] rounded-lg shadow">
    <TransactionHead/>
    <TableBody>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
        <TransactionRow/>
    </TableBody>
  </Table>
  )
}

export default TransactionTable
