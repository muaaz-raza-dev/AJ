import 'react-loading-skeleton/dist/skeleton.css'
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedTransactionsFilters} from "@/app/Slices/TransactionReadSlice"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shdcn/components/ui/select"
import { useEffect } from "react"
import Skeleton from "react-loading-skeleton"


const TransactionSelectType = () => {
  let {Filters:{transactionType},TransactionTypes :tr,TransactionStats:{isLoading}}=useAppSelector(state=>state.transactions)
  let dispatch =useAppDispatch()
  useEffect(() => {
    if(tr.length!=0&&transactionType==""){
      dispatch (RedTransactionsFilters({transactionType:tr[1]?.value}))
  }
  }, [tr]);
  
  return (
    <>
    {isLoading?
    <div className="w-[150px] h-full ">
    <Skeleton count={1}  className="w-full py-3"/>
    </div>:
    <Select value={transactionType} onValueChange={(val)=>dispatch(RedTransactionsFilters({transactionType:val}))}>
      <SelectTrigger className="w-[180px] rounded-lg dark:bg-darker dark:text-white border-2 border-dark relative h-full focus:ring-0">
    <p className='text-xs text-dark dark:text-gray-500 font-bold absolute top-0'>Fee Types</p>
        <SelectValue  />
      </SelectTrigger>
      <SelectContent>
          {
          tr.map(elm=>{
            return <SelectItem value={elm.value}>{elm.label}</SelectItem>
          })
          }          
      </SelectContent>
    </Select>
}
</>
  )
}

export default TransactionSelectType
