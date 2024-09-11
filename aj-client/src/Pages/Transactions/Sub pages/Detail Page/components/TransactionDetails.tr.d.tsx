import { Button } from "@/shdcn/components/ui/button"
import ToggleTransactionStatus from "./ToggleTransactionStatus.tr.d"
import TransactionTableTrDetails from "./Transaction Table/TransactionTableTrDetails.ts.d"
import TransactionPaymentListing from "./TransactionPaymentListing.tr.d"
import { FaEdit } from "react-icons/fa"

const TransactionDetails = () => {
  return (
    <>
    <section className="flex flex-col bg-[var(--box)] dark:bg-darker dark:text-white rounded-md p-2 py-4 gap-3  w-full">
    <h1 className="text-3xl hFont font-bold text-darker dark:text-white">Transactions</h1>
  <TransactionTableTrDetails/>
</section>
  <TransactionPaymentListing/>
  <div className="flex gap-4 justify-end">
  <Button className="bg-dark text-white hover:bg-darker flex gap-2">
    <FaEdit/> Edit
  </Button>
  <ToggleTransactionStatus/>
  </div>
    </>
  )
}

export default TransactionDetails