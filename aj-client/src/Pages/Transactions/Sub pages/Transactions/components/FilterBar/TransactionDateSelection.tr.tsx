import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/shdcn/components/ui/select"
import moment from "moment"
   
const TransactionDateSelection = () => {
    
      return (
    <div className="flex gap-x-2">
    <Select>
    <SelectTrigger className="w-[80px] outline-none bg-transparent rounded-lg border-2 border-[var(--dark)] focus:ring-0 outline-0 relative">
      <p className="absolute -top-1 text-[0.6rem] text-[var(--dark)]  font-bold">Year</p>

      <SelectValue placeholder={moment().year().toString()} defaultValue={moment().year().toString()}  />
    </SelectTrigger>
    <SelectContent >
      <SelectGroup className="flex flex-col justify-center">
        <SelectLabel>Year</SelectLabel>
        <SelectItem value="2024">2024</SelectItem>
        <SelectItem value="2025">2025</SelectItem>
        <SelectItem value="2026">2026</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  <TransactionMonthSelection/>
    </div>
  )
}

const TransactionMonthSelection=()=>{
return (
    <Select>
    <SelectTrigger className="w-[110px] outline-none bg-transparent rounded-lg border-2 border-[var(--dark)] focus:ring-0 outline-0 relative">
      <p className="absolute -top-1 text-[0.6rem] text-[var(--dark)]  font-bold">Month</p>
      <SelectValue placeholder={moment().format("MMMM")} defaultValue={moment().format("MMMM")}  />
    </SelectTrigger>
    <SelectContent >
      <SelectGroup className="flex flex-col justify-center">
        <SelectLabel>Month</SelectLabel>
        {
            moment.months().map(m=>{
                return <SelectItem value={m} key={m}>{m}</SelectItem>
            })
        }
      </SelectGroup>
    </SelectContent>
  </Select>
)
}
export default TransactionDateSelection
