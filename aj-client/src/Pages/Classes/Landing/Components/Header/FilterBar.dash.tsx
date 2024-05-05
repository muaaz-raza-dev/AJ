import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shdcn/components/ui/select"
import { Button } from "@/shdcn/components/ui/button"
import { Input } from "@/shdcn/components/ui/input"
import { MdFormatListBulletedAdd } from "react-icons/md"
const FilterBar = () => {
  return (
    <div className='flex  gap-4'>
            <Input className="rounded-lg border-2 bg-transparent border-[var(--dark)]  focus:ring-0 focus-visible:ring-0 outline-0" placeholder="Search for Class & Teacher"/>
            <FilterBarYearSelect/>
            <Button className="flex gap-2 bg-dark rounded-lg text-white hover:bg-darker transition-colors">
            <MdFormatListBulletedAdd color="white" />
                <p>Initialize new</p>
            </Button>

    </div>
  )
}

const FilterBarYearSelect=()=>{
return  (  <Select value="2024" >
      <SelectTrigger className="w-[180px] focus:ring-0 border-2 bg-transparent border-[var(--dark)]" >
        <SelectValue defaultValue={"2024"} className="border-0 focus:ring-0"  />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
)
}

export default FilterBar