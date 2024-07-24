import { useAppSelector } from '@/app/ReduxHooks'
import moment from 'moment'
import { GoDotFill } from 'react-icons/go'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const TransactionEstimateStats = () => {
    let {TransactionStats:{RecievedAmount,PendingAmount,isLoading}} = useAppSelector(state=>state.transactions)
  return (
    <div className="border py-4 rounded-lg border-[var(--primary)] bg-[var(--box)] shadow-sm px-4 min-w-[40%] ">
    <h1 className="hFont font-bold text-sm">Total Estimate</h1>
    <div className="flex justify-between pt-4 items-end">
    <div className="flex flex-col  min-w-[20%] ">
    {isLoading&&
              <Skeleton count={1} baseColor="#4D44B5" className="w-full py-3"/>
            }
        <div className="flex items-center gap-x-1">
{!isLoading&&<><h2 className="hFont font-bold text-2xl">{RecievedAmount} </h2><p>Pkr</p></>
    }
        </div>
    <div className="text-green-600 flex text-sm hFont items-center">
    <GoDotFill /> Recieved
    </div>
    </div>
    <div className="flex flex-col self-end  min-w-[20%] ">
    {isLoading&&
              <Skeleton count={1} baseColor="#4D44B5" className="w-full py-3"/>
            }
        <div className="flex items-center gap-x-1">
        {!isLoading&&
        <>
    <h2 className="hFont font-bold text-2xl">{PendingAmount} </h2><p>Pkr</p>
        </>}
        </div>
    <div className="text-orange-600 flex items-center text-sm hFont">
    <GoDotFill /> Pending
    </div>
    </div>
    <div className="flex flex-col items-end">
        <h1 className="font-bold text-base hFont ">{moment().format("h:mm ")}</h1>
         <p className="text-gray-500 hFont text-sm">{moment().day()} {moment.months()[moment().month()]} { moment().year()}</p>   
    </div>
    </div>
      </div>
  )
}

export default TransactionEstimateStats
