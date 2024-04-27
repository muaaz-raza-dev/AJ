import 'react-loading-skeleton/dist/skeleton.css'
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedTransactionsFilters} from "@/app/Slices/TransactionReadSlice"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shdcn/components/ui/select"
import { useEffect } from "react"
import Skeleton from "react-loading-skeleton"
 


const TransactionSelectType = () => {
  let {Filters,TransactionTypes,TransactionStats:{isLoading}}=useAppSelector(state=>state.transactions)
  let dispatch =useAppDispatch()
  useEffect(() => {
    if(TransactionTypes.length!=0&&Filters.transactionType==""){
      dispatch (RedTransactionsFilters({transactionType:TransactionTypes[0].type}))
  }
  }, [Filters.transactionType,TransactionTypes]);
  console.log(TransactionTypes);
  
  return (
    <>
    {isLoading?
    <div className="w-[150px]">
    <Skeleton count={1} baseColor="#4D44B5" className="w-full py-3"/>
    </div>:
    
    <Select value={Filters.transactionType } 
    onValueChange={(e)=>dispatch(RedTransactionsFilters({transactionType:e}))}>
    <SelectTrigger className="w-[150px]  outline-none border-2 text-white bg-[var(--dark)] border-[var(--dark)] focus:ring-0 outline-0 relative rounded-lg">

{isLoading&&<Skeleton/>}
      <SelectValue />
    </SelectTrigger>
    <SelectContent >
      <SelectGroup className="flex flex-col justify-center">
        <SelectLabel>Transaction Type</SelectLabel>
        {
          TransactionTypes.map(elm=><SelectItem className="cursor-pointer" key={elm.type} value={elm.type}>
          <div className="flex w-full justify-between gap-x-2 items-center">
            <b>
  {elm.type} 
            </b>
        <span className="p-1 aspect-square h-max rounded-full text-base font-bold text-[var(--dark)] ">
  {elm.numberOfTransactions}
          </span>
          </div>
  
</SelectItem>)
        }

      </SelectGroup>
    </SelectContent>
  </Select>}
        </>
  )
}

export default TransactionSelectType
