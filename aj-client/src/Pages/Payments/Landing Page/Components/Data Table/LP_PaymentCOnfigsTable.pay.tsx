import { Table, TableBody } from "@/shdcn/components/ui/table"
import LP_configHeaderTable from "./LP_configHeaderTable.pay"
import LP_EachConfigRowTable from "./LP_EachConfigRowTable.pay"
import { useAppSelector } from "@/app/ReduxHooks"
import RequestLoading from "@/Global/Loaders/RequestLoding"

const LP_PaymentConfigsTable = () => {
  let payload  = useAppSelector(s=>s.paymentConfigsL.payload)
  let isLoading= useAppSelector(s=>s.paymentConfigsL.isLoading)
  return (
    <>
<Table className="bg-[var(--box)] rounded-lg shadow text-nowrap overflow-auto customscrollbarTable "  >
    <LP_configHeaderTable/>
    <TableBody>
      {payload?.map(data=>< LP_EachConfigRowTable data={data}/>)}
    </TableBody>
  </Table>
      {isLoading? 
      <div className="center">
      <RequestLoading size="32" stroke="4" dark />      
      </div>
      :payload.length==0&& <h1 className="text-2xl font-black text-gray-600 center">No payment config exists</h1> }
    </>
  )
}

export default LP_PaymentConfigsTable