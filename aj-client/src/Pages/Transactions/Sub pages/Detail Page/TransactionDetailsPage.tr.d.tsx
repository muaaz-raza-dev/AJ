import useFetchTransactionDetailed from "@/Hooks/Transactions/useFetchTransactionDetailed"
import HeaderTransactionDetail from "./components/HeaderTransactionDetail.tr.d"
import SummaryDetailsTrDetails from "./components/SummaryDetailsTrDetails.tr.d"
import TransactionDetails from "./components/TransactionDetails.tr.d"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import ErrorPage from "@/Global/Loaders/ErrorPage"
import StudentDetailedSkeletonLoader from "@/Pages/Students Directory/sub-section/Student Detailed/StudentDetailedSkeletonLoader"
import NotFoundValidator from "@/Api/404Validator"

const TransactionDetailsPage = () => {
  let {isLoading ,error,isError} = useFetchTransactionDetailed()
  if(isError&&NotFoundValidator(error))return <ErrorPage title="Transaction not found" 
  message="The transaction you're looking for is not exist" navigate="/transactions"/>
  if(isLoading) return <StudentDetailedSkeletonLoader/>
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