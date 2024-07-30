import { useAppSelector } from "@/app/ReduxHooks";
import usePagination from "@/Hooks/Common/usePagination";
import useReadPageTransactions from "@/Hooks/Transactions/useReadPageTransactions";
import { ChevronLeft, ChevronRight } from "lucide-react";
const TransactionPagination = () => {
  let { Filters, DataLength } = useAppSelector((s) => s.transactions);
  let TrPerPage = import.meta.env.VITE_APP_TransactionPerRequest;
  let { mutate } = useReadPageTransactions(Filters.count);
  let { hasNextPage,hasPreviousPage,currentPage,pageNumbers,nextPage,previousPage } =usePagination({ itemsPerPage: TrPerPage, totalItems: DataLength });
  
  let HandlePagination = (direction: number) => {
    let count = Filters.count + direction;
    mutate({ ...Filters, count });
      if(direction==-1)previousPage()
      else nextPage()
    }
    
  
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
    <div className="flex gap-x-5 items-center">
        <button
        disabled={!hasPreviousPage}
          className={` rounded-md  center w-8 aspect-square text-darker dark:bg-dark dark:text-white bg-gray-200  font-bold 
            ${
            hasPreviousPage?" ":"scale-95 grayscale bg-gray-600 "
          } `}
          onClick={() => HandlePagination(-1)}
        >
        <ChevronLeft/>
        </button>
        <button
        disabled={!hasNextPage}
          className={` rounded-md  center w-8 aspect-square ${
            "text-darker dark:bg-dark dark:text-white bg-gray-300 scale-95 font-bold "
            }   ${
            hasNextPage?" ":"scale-95 grayscale bg-gray-600 "
          }`}
            onClick={() => HandlePagination(1)}
            >
          <ChevronRight/>
        </button>
    </div>
    </div>
  );
};

export default TransactionPagination;
