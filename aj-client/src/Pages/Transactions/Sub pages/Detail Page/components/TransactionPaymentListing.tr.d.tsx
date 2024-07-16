import useFetchTransactionDetailed from "@/Hooks/Transactions/useFetchTransactionDetailed"
import { Separator } from "@/shdcn/components/ui/separator"

const TransactionPaymentListing = () => {
  let {data} = useFetchTransactionDetailed()
  let q = data?.payload.amount
  return (
    <div className="w-full    flex  gap-2 text-base font-bold flex-col">
        <div className="flex-col rounded-md bg-[var(--box)] py-4 px-4 flex gap-2 w-[30%] ">
    <h1 className="text-xl hFont font-semibold text-darker">Total Payment details</h1>
        <div className="flex justify-between font-bold ">
            <h2>Sub Total</h2>
            <h2>{q?.realAmount} Pkr</h2>
        </div>
        <div className="flex justify-between font-bold text-red-500">
            <h2>Discount</h2>
            <h2>{q?.discount} Pkr</h2>
        </div>
        <Separator/>
        <div className="flex justify-between font-bold ">
            <h2>Grand Total</h2>
            <h2>{q?.totalAmount} Pkr</h2>
        </div>
        </div>
    </div>
  )
}

export default TransactionPaymentListing