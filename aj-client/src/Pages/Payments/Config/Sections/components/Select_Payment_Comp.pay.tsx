import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/shdcn/components/ui/select"
import { FC } from "react"
import { useFormContext } from "react-hook-form";

const Select_Payment_Comp:FC<{fieldName:string;placeholder?:string;onChange?:(value:string)=>void;options:{value:string,label:string}[]}> = ({fieldName,options,placeholder,onChange}) => {
    let form= useFormContext()
  return (
    <Select value={form.watch(fieldName)} onValueChange={(val)=>{form.setValue(fieldName,val) ; onChange&&onChange(val) }}>
      <SelectTrigger className="w-full ring-offset-0 rounded-md ring-0 focus:ring-0 focus:border-dark outline-none border-gray-300 border">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(e=> <SelectItem value={e.value}>{e.label}</SelectItem> )}
      </SelectContent>
    </Select>

  )
}

export default Select_Payment_Comp