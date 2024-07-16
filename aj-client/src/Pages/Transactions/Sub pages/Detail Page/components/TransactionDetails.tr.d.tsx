import TransactionTableTrDetails from "./Transaction Table/TransactionTableTrDetails.ts.d"
import TransactionPaymentListing from "./TransactionPaymentListing.tr.d"

const TransactionDetails = () => {
  return (
    <>
    <section className="flex flex-col bg-[var(--box)] rounded-md p-2 py-4 gap-3  w-full">
    <h1 className="text-3xl hFont font-bold text-darker">Transactions</h1>
  <TransactionTableTrDetails/>
</section>
  <TransactionPaymentListing/>
    </>
  )
}

export default TransactionDetails