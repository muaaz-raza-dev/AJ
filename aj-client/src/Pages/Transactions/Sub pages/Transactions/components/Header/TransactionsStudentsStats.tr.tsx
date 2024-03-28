import { useAppSelector } from "@/app/ReduxHooks";
import { GoDotFill } from "react-icons/go";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
function TransactionStudentsStats() {
  let {TransactionStats:{totalTransactions,PendingTransactions,isLoading}} = useAppSelector(state=>state.transactions)

    return (
      <div className="border py-4 rounded-lg border-[var(--primary)] bg-[var(--box)] shadow-sm px-4 min-w-[25%] ">
        <h1 className="hFont font-bold text-sm">Monthly Fee (students)</h1>
        <div className="flex justify-between pt-2 items-end ">
          <div className="flex flex-col   ">
            {isLoading&&
              <Skeleton count={1} baseColor="#4D44B5" className="w-full py-3"/>
            }
            <div className="flex items-center gap-x-1 ">
{     !isLoading&&
    <h2 className="hFont font-bold text-3xl tracking-wider">{totalTransactions}</h2>}
            </div>
            <div className="text-green-600 flex text-sm hFont items-center">
              <GoDotFill /> Submitted
            </div>
          </div>
          <div className="flex flex-col   ">
          {isLoading&&
              <Skeleton count={1} baseColor="#4D44B5" className="w-full py-3"/>
            }
            <div className="flex items-center gap-x-1">
            {!isLoading&&
    <h2 className="hFont font-bold text-3xl tracking-wider">{PendingTransactions}</h2>
    }         
            </div>
            <div className="text-red-600 flex text-sm hFont items-center">
              <GoDotFill /> Pending
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default TransactionStudentsStats