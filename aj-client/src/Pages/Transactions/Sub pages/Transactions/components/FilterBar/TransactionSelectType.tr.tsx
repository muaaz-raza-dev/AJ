
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shdcn/components/ui/select"
 


const TransactionSelectType = () => {
  return (
    <Select>
    <SelectTrigger className="w-[120px]  outline-none border-2 text-white bg-[var(--dark)] border-[var(--dark)] focus:ring-0 outline-0 relative rounded-lg">
   
      <SelectValue placeholder="Monthly Fee" defaultValue={"Monthly"} />
    </SelectTrigger>
    <SelectContent >
      <SelectGroup className="flex flex-col justify-center">
        <SelectLabel>Transaction Type</SelectLabel>
        <SelectItem value="Admission">Admission Fee</SelectItem>
        <SelectItem value="Monthly">Monthly Fee</SelectItem>
        <SelectItem value="Annual">Annual Fee</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}

export default TransactionSelectType
