import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedTransactionsFilters } from "@/app/Slices/TransactionReadSlice"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/shdcn/components/ui/select"
  import Skeleton from "react-loading-skeleton"
import moment from "moment"
import { FC, useEffect, useMemo } from "react"
   import L from "lodash"
const TransactionDateSelection = () => {
  let {Dates,Filters,TransactionStats:{isLoading}} = useAppSelector(state=>state.transactions)
  let dispatch = useAppDispatch()
  let CurrentYear = useMemo(()=>moment().year().toString(),[]) 
  useEffect(() => {
    if (L(Dates).size()!=0&&Filters.month=="") {
      dispatch(RedTransactionsFilters({month:Dates[CurrentYear][Dates[CurrentYear].length-1]}))
    }
  }, [Dates]);
      return (
    <div className="flex gap-x-2">
      {
        isLoading?
        <div className="w-[120px]">
        <Skeleton count={1} baseColor="#4D44B5" className="w-full py-3"/>
        </div>:
    <Select value={Filters.year} onValueChange={(e)=>dispatch(RedTransactionsFilters({year:e}))}>
    <SelectTrigger className="w-[80px] outline-none bg-transparent rounded-lg border-2 border-[var(--dark)] focus:ring-0 outline-0 relative">
      <p className="absolute -top-1 text-[0.6rem] text-[var(--dark)]  font-bold">Year</p>
      <SelectValue placeholder={moment().year().toString()} defaultValue={moment().year().toString()}  />
    </SelectTrigger>
    <SelectContent >
      <SelectGroup className="flex flex-col justify-center">
        <SelectLabel>Year</SelectLabel>
        {
          Object.keys(Dates)?.map(year=>{
      return <SelectItem value={year}>{year}</SelectItem>
          })
        }
      </SelectGroup>
    </SelectContent>
  </Select>}
  {
    isLoading?
    <div className="w-[120px]">
    <Skeleton count={1} baseColor="#4D44B5" className="w-full py-3"/>
    </div>:
  <Select value={Filters.month} onValueChange={(e)=>dispatch(RedTransactionsFilters({month:e}))}>
  <TransactionMonthSelection months={Dates[Filters.year]||[]}/>
  </Select>
}
    </div>
  )
}

const TransactionMonthSelection:FC<{months:string[]}>=({months})=>{
return (<>
    <SelectTrigger className="w-[110px] outline-none bg-transparent rounded-lg border-2 border-[var(--dark)] focus:ring-0 outline-0 relative">
      <p className="absolute -top-1 text-[0.6rem] text-[var(--dark)]  font-bold">Month</p>
      <SelectValue placeholder={months[months.length-1]}   />
    </SelectTrigger>
    <SelectContent >
      <SelectGroup className="flex flex-col justify-center">
        <SelectLabel>Month</SelectLabel>
        {
            months.map(m=>{
                return <SelectItem value={m} key={m}>{m}</SelectItem>
            })
        }
      </SelectGroup>
    </SelectContent>
  </>
)
}
export default TransactionDateSelection
