import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedDRInsertFilters } from "@/app/Slices/RevenueDetailedSlice"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import useFetchDetailedRevenueReport from "@/Hooks/Stats/useFetchDetailedRevenueReport"
import { Button } from "@/shdcn/components/ui/button"
import { Calendar } from "@/shdcn/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  
} from "@/shdcn/components/ui/popover"
import { cn } from "@/shdcn/lib/utils"
import { format, parseISO } from "date-fns"
import {  CalendarIcon } from "lucide-react"
import { FC, useEffect } from "react"

const FilterBarRD = () => {
    const {mutate,isLoading} =useFetchDetailedRevenueReport()
    const {Dates} =useAppSelector(s=>s.detailedRevenue.filters)
    const dispatch = useAppDispatch()
    const HandleStart = (val:any)=>dispatch(RedDRInsertFilters({Dates:{start:new Date(val).toISOString()}}))
    const HandleEnd = (val:any)=>dispatch(RedDRInsertFilters({Dates:{end:new Date(val).toISOString()}}))

    useEffect(() => {
    mutate()
    }, [Dates.start,Dates.end])

  return (
    <section className="flex  w-full dark:text-white">
  <div className="flex gap-3 w-full max-md:flex-col">
    <div className="flex gap-3 max-md:w-full items-center">
    <CalendarComp label={"Start"} placeholder="Pick the start date" onChange={HandleStart} value={Dates.start}  Dates={Dates} />
    <CalendarComp label={"End"} placeholder="Pick the end date" onChange={HandleEnd} value={Dates.end} Dates={Dates}/>
    {isLoading&&<RequestLoading size="24" stroke="2" dark/>}
    </div>
    </div>
    </section>
  )
}


const CalendarComp:FC<{value:string;onChange:(val:any)=>void;label:string;placeholder:string;Dates:{start:string;end:string}}> = ({value,onChange,placeholder,label,Dates})=>{
    const {start,end} =Dates
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
      <p className="absolute text-xs left-3 text-gray-400 dark:text-gray-600  hFont top-0.5">{label} Date</p>
        <Button
          className={cn(
            "w-[240px] max-md:w-full dark:bg-dark dark:border-darker  h-12 pl-3 text-left font-normal bg-box border border-gray-200 hover:bg-box",
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
export default FilterBarRD