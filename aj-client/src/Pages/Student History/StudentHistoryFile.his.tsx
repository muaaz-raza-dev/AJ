import { Button } from "@/shdcn/components/ui/button"
import HistoryFileHeaderSection from "./Sections/Header/HistoryFileHeaderSection.his"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shdcn/components/ui/select"
const StudentHistoryFile = () => {
  return (
    <main className="flex flex-col gap-6 w-full">
      <HistoryFileHeaderSection/> 
      <div className="filterbar items-center flex justify-between">
      <div className="flex gap-2 ">
      <Selected/>
      <Selected/> 
      <Selected/>            
                <Selected/>
            <Button className="rounded-lg bg-dark  px-8  text-white hover:bg-dark  ">Export</Button>
        </div>
      </div>
    </main>
  )
} 

const Selected  = ()=>{
    return  (<>
    <Select value="1">
    <SelectTrigger className="min-w-[120px] rounded-lg text-dark border-dark border-2 bg-transparent font-bold  relative h-full focus:ring-0">
      <SelectValue  />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="1">Fee Type 1</SelectItem>
        <SelectItem value="2">Fee Type 2</SelectItem>
        <SelectItem value="3">Fee Type 3</SelectItem>
    </SelectContent>
  </Select>
    </>)
}
export default StudentHistoryFile