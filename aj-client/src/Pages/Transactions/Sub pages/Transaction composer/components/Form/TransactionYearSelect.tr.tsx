import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/shdcn/components/ui/select"
import moment from "moment"
import { FC } from "react"
  
const TransactionMonthSelect:FC<{onValueChange:(e:string)=>void,months?:string[]}> = ({onValueChange,months}) => {
  return (
    <Select onValueChange={onValueChange}>
    <SelectTrigger className="w-[100%]">
      <SelectValue placeholder={moment().format("MMMM")} defaultValue={moment().format("MMMM")} />
    </SelectTrigger>
    <SelectContent>
        {(months?months:moment.months()).map(m=><SelectItem key={m} value={m}>{m}</SelectItem>)}
    </SelectContent>
  </Select>)}
  
export const TransactionYearSelect:FC<{onValueChange:(e:string)=>void,years:string[]}> = ({onValueChange,years}) => {
  return (
    <Select onValueChange={onValueChange}>
    <SelectTrigger className="w-[100%]">
      <SelectValue defaultValue={moment().year().toString()} placeholder={moment().year().toString()} />
    </SelectTrigger>
    <SelectContent>
        {years.map(m=><SelectItem key={m} value={m}>{m}</SelectItem>)}
    </SelectContent>
  </Select>
  
  )
}

export default TransactionMonthSelect
