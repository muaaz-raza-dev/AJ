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
  let {Filters:{transactionType},TransactionTypes :tr,TransactionStats:{isLoading}}=useAppSelector(s=>s.transactions)
  let dispatch =useAppDispatch()
  useEffect(() => {
    if(tr.length!=0&&transactionType==""){
      dispatch (RedTransactionsFilters({transactionType:tr[1]?.value}))
  }
  }, [tr]);
  
  return (
    <>
    {isLoading?
    <div className="w-[150px] max-md:w-full h-full ">
    <Skeleton count={1}  className="w-full py-3"/>
    </div>:
    <Select value={transactionType} onValueChange={(val)=>dispatch(RedTransactionsFilters({transactionType:val}))}>
      <SelectTrigger className="w-[180px] max-md:w-full h-12 rounded-md dark:bg-darker dark:text-white border-2 border-dark relative  focus:ring-0">
    <p className='text-xs text-gray-400 dark:text-gray-500 font-bold absolute top-0'>Fee Types</p>
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
