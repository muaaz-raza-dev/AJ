import { useAppSelector } from "@/app/ReduxHooks";
import useReadPageTransactions from "@/Hooks/Transactions/useReadPageTransactions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { usePagination } from "react-simpler";
const TransactionPagination = () => {
  let { Filters, DataLength } = useAppSelector((s) => s.transactions);
  let TrPerPage = import.meta.env.VITE_APP_TransactionPerRequest;
  let { mutate } = useReadPageTransactions(Filters.count);
  let { hasNextPage,hasPreviousPage } =
    usePagination({ itemsPerPage: TrPerPage, totalItems: DataLength });
  let HandlePagination = useCallback(
    (direction: number) => {
      let count = Filters.count + direction;
      mutate({ ...Filters, count });
    },
    [Filters]
  );
  return (
    <div className="flex gap-x-5 items-center">
        <button
        disabled={!hasNextPage}
          className={`   rounded-md  center w-8 aspect-square ${
             "text-darker dark:bg-dark dark:text-white bg-gray-200 scale-95 font-bold "
          } `}
          onClick={() => HandlePagination(1)}
        >
        <ChevronLeft/>
        </button>
        <button
        disabled={!hasPreviousPage}
          className={` rounded-md  center w-8 aspect-square ${
            "text-darker dark:bg-dark dark:text-white bg-gray-300 scale-95 font-bold "
            } `}
            onClick={() => HandlePagination(-1)}
            >
          <ChevronRight/>
        </button>
    </div>
  );
};

export default TransactionPagination;
