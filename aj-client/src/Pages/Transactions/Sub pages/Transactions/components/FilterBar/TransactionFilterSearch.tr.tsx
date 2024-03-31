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
         <div  className='flex  rounded-xl gap-x-1   items-center justify-center'>
      <div className="  bg-[var(--bg)] border-2 border-[var(--dark)]   flex gap-x-1 px-2 rounded-l-xl items-center">
      <IoSearch className='text-[var(--dark)]' size={21}/>
<TranscationInputFilter/>
      </div>
      <Select  value={searchMode} onValueChange={(e)=>dispatch(RedTransactionsFilters({searchMode:e}))}>
  <SelectTrigger className="w-[100px] h-full bg-transparent rounded-none focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-transparent ring-offset-0 ring-0 outline-none border-l-0 border-2 border-[var(--dark)] rounded-r-xl relative">
    <SelectValue placeholder="Invoice" defaultValue={"Invoice"} />
  <p className="absolute top-0 text-[0.6rem] text-[var(--dark)]  font-bold">Search Mode</p>
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

  return <input className='px-2  py-3 bg-transparent placeholder-[var(--dark)] outline-none rounded-xl h-full ' placeholder='Search' onChange={({target:{value}})=>debounced(value)} />
}
export default TransactionFilterSearch
