import { IoSearch } from "react-icons/io5"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/shdcn/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedTransactionsFilters } from "@/app/Slices/TransactionReadSlice"
import { useDebouncedCallback } from "use-debounce"
import useReadPageTransactions from "@/Hooks/Transactions/useReadPageTransactions"
const TransactionFilterSearch = () => {
  let {SearchModes,Filters:{searchMode}} = useAppSelector(state=>state.transactions)
  let dispatch = useAppDispatch()
  return (
         <div  className='flex  rounded-xl gap-x-1 w-full   items-center justify-center'>
      <div className="  bg-[var(--box)] border-2 w-[80%] border-[var(--dark)]   flex gap-x-1 px-2 rounded-md items-center">
      <IoSearch className='text-[var(--dark)]' size={21}/>
<TranscationInputFilter/>
      </div>
      <Select  value={searchMode}  onValueChange={(e)=>dispatch(RedTransactionsFilters({searchMode:e}))}>
  <SelectTrigger className="w-[150px]    focus:ring-0 focus:ring-offset-0 focus-visible:ring-transparent ring-offset-0 ring-0 outline-none border-l-0 border-2 border-[var(--dark)] rounded-md bg-[var(--box)] h-full relative">
  <p className="absolute -top-0.5 text-sm text-[var(--dark)]  font-bold">Search Mode</p>
    <SelectValue placeholder="Invoice" defaultValue={"Invoice"} />
  </SelectTrigger>
  <SelectContent>
    {
      SearchModes.map(e=><SelectItem value={e} key={e}>{e}</SelectItem>)
    }
  </SelectContent>
</Select>
      </div>
  )
}

function TranscationInputFilter(){
  let {Filters} =useAppSelector(s=>s.transactions)
  let {mutate} = useReadPageTransactions(Filters.count)
  let debounced  =useDebouncedCallback((value)=>
  mutate({...Filters,Input:value})
  ,1000)

  return <input className='px-2  py-3  w-full placeholder-[var(--dark)] outline-none rounded-xl h-full ' placeholder='Search' onChange={({target:{value}})=>debounced(value)} />
}
export default TransactionFilterSearch
