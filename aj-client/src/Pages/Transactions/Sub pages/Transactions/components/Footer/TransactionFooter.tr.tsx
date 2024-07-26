import { useAppSelector } from "@/app/ReduxHooks"
import TransactionPagination from "./TransactionPagination.tr"
import { usePagination } from "react-simpler"

const TransactionFooter = () => {
  let {DataLength} = useAppSelector(s=>s.transactions)
  let TrPerPage = import.meta.env.VITE_APP_TransactionPerRequest
  let {pageNumbers,currentPage} = usePagination({totalItems:DataLength,itemsPerPage:TrPerPage})
  return (
    <div className="flex items-center justify-between gap-x-2 ">
      <p className="gap-x-1 flex font-bold text-gray-700 dark:text-white">
        Showing 
        <b className="text-[var(--darker)] dark:text-white ">
           {pageNumbers.length==currentPage?
            `${((currentPage-1)*TrPerPage+1)} - ${DataLength-((currentPage-1)*TrPerPage)}`:
            `${((currentPage-1)*TrPerPage+1)} - ${currentPage*TrPerPage} `
          }
       
        </b>
         out of 
         <b className="text-[var(--dark)] dark:text-white">
         {DataLength}
         </b>
         transactions
      </p>
      <TransactionPagination/>
    </div>
  )
}

export default TransactionFooter
