import useFetchTransactionDetailed from "@/Hooks/Transactions/useFetchTransactionDetailed"
import HeaderTransactionDetail from "./components/HeaderTransactionDetail.tr.d"
import SummaryDetailsTrDetails from "./components/SummaryDetailsTrDetails.tr.d"
import TransactionDetails from "./components/TransactionDetails.tr.d"
import RequestLoading from "@/Global/Loaders/RequestLoding"

const TransactionDetailsPage = () => {
  let {isLoading } = useFetchTransactionDetailed()
  return (
    <>
    {isLoading ? <div className="center"> <RequestLoading dark /> </div> : 
    <main className="flex flex-col gap-2 py-4 w-full">
<HeaderTransactionDetail />
<SummaryDetailsTrDetails />
<TransactionDetails />
</main>
      }
      </>
  )
}

export default TransactionDetailsPage