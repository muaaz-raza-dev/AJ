import {Table,TableBody} from "@/shdcn/components/ui/table"
import TableHeaderTrDetails from "./TableHeaderTrDetails.tr.d"
import TableRowTrDetails from "./TableRowTrDetails.tr.d"
import useFetchTransactionDetailed from "@/Hooks/Transactions/useFetchTransactionDetailed"

const TransactionTableTrDetails = () => {
  let {data  } = useFetchTransactionDetailed()
  let q =data?.payload
  return (
    <Table className="w-full ">
  <TableHeaderTrDetails/>
    <TableBody>
 {q?.Transactions.map(tr=> <TableRowTrDetails data={tr}/>)}
    </TableBody>
    </Table> 
  )
}

export default TransactionTableTrDetails