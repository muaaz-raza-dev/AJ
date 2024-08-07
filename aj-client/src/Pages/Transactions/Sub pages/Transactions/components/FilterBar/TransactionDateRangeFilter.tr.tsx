import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedTransactionsFilters } from "@/app/Slices/TransactionReadSlice"
import useReadPageTransactions from "@/Hooks/Transactions/useReadPageTransactions"
import { Button } from "@/shdcn/components/ui/button"
import { Calendar } from "@/shdcn/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  
} from "@/shdcn/components/ui/popover"
import { cn } from "@/shdcn/lib/utils"
import { format, parseISO } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { FC } from "react"
const TransactionDateRangeFilter = () => {
  let dispatch =useAppDispatch()
  let {mutate} = useReadPageTransactions()
const {Filters} =useAppSelector(s=>s.transactions)
let {start,end} =Filters.DateRange
  const HandleStart = (val:any)=>dispatch(RedTransactionsFilters({DateRange:{start:new Date(val).toISOString()}}))
  const HandleEnd = (val:any)=>dispatch(RedTransactionsFilters({DateRange:{end:new Date(val).toISOString()}}))

  const ApplyRangeFilter = ()=>{
    mutate(Filters)
  }
  return (
    <section className="flex flex-col w-full">
      <h1 className="hFont  font-bold ">Transaction Date Range</h1>
    <div className="flex gap-3 w-full max-md:flex-col">
      <div className="flex gap-3 max-md:w-full ">
      <CalendarComp label={"Start"} placeholder="Pick the start date" onChange={HandleStart} value={start} />
      <CalendarComp label={"End"} placeholder="Pick the end date" onChange={HandleEnd} value={end}/>
      </div>
      <Button type="button"
      onClick={ApplyRangeFilter}
      className="h-12 text-left bg-box hover:bg-box hover:text-dark border-2  font-bold active:scale-95 text-dark "
    >
      
      Apply 
    </Button>
    </div>
    </section>
 
  )
}

const CalendarComp:FC<{value:string;onChange:(val:any)=>void;label:string;placeholder:string;}> = ({value,onChange,placeholder,label})=>{
  const {DateRange:{start,end}} =useAppSelector(s=>s.transactions.Filters)
  const ValidateDates = (date:Date)=>{
    if(label == "Start"){
      return date > new Date(end)
}
else {
  return date < new Date(start)
}
  }

  
  const parsedValue = value ? parseISO(value) : undefined;
  return    <Popover >
  <PopoverTrigger className="relative max-md:w-1/2">
    <p className="absolute text-xs left-3 text-gray-400  hFont top-1">{label} Date</p>
      <Button
        className={cn(
          "w-[240px] max-md:w-full  h-12 pl-3 text-left font-normal bg-box border border-gray-200 hover:bg-box",
        )}
        >
        {value ? (
          format(value, "PPP")
        ) : (
          <span>{placeholder}</span>
        )}
        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={parsedValue}
      onSelect={onChange}
      disabled={(date) =>
        date > new Date() || date < new Date("1900-01-01") || ValidateDates(date)
      }
    />
    </PopoverContent>
 </Popover>
}
export default TransactionDateRangeFilter