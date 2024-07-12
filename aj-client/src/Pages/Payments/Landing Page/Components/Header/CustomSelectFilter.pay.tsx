import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shdcn/components/ui/select"
import { FC } from "react"
interface IcustomSelectFilter {
className?:string ,
  options: {value: string, label: string}[],
  value:string
  queryFn ?: (value: string) => void,
  label:string
}
const Custom_SelectFilter:FC<IcustomSelectFilter> = ({className,options,value,queryFn,label}) => {
  return (
    <Select value={value} onValueChange={queryFn}>
    <SelectTrigger className={`w-[35%] border-2 h-full border-dark ring-0 focus:ring-offset-0 focus:ring-0 relative ${className}`}>
    <p className="absolute -top-1  text-[0.7rem] font-medium text-dark text-center "> {label}  </p>
      <SelectValue placeholder="Select Session " />
    </SelectTrigger>
    <SelectContent>
      {options.map(option=> <SelectItem value={option.value}>{option.label}</SelectItem>)}
    </SelectContent>
  </Select>
  )
}

export default Custom_SelectFilter