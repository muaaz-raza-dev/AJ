import { FC } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shdcn/components/ui/select"
  

const CustomSelectFilterComp:FC<{label:string;rawData?:string[];disabled?:boolean,data?:{value:string;label:string}[],onChange:(val:string)=>void,value:string}> = ({label,onChange,data,rawData,value,disabled}) => {
  return  <div className="mr-4 mb-2">
    <label className="block text-xs px-1 hFont ">{label}</label>
    <Select  value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="min-w-[180px] ring-offset-0 rounded-md ring-0 dark:bg-darker dark:border-darker focus:ring-0 focus:border-darker focus:border-2  outline-none border-gray-300 border">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {data && data.map(e=><SelectItem value={e.value} key={e.label+e.value}>{e.label}</SelectItem>)}
        {rawData && rawData.map(e=><SelectItem value={e} key={e}>{e}</SelectItem>)}
      </SelectContent>
    </Select>    
  </div>
}

export default CustomSelectFilterComp