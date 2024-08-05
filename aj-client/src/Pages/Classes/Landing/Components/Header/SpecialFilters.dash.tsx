import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shdcn/components/ui/select"
import {Button} from "@/shdcn/components/ui/button"
import { Link } from "react-router-dom"
import useFilterTeachers from "@/Hooks/Teacher&Class/useFilterTeachers"
import { RedDashFilters } from "@/app/Slices/DashboardSlice"
import { useReadFilteredClasses } from "@/Hooks/Teacher&Class/useReadClasses"
import { FaAddressCard } from "react-icons/fa"
const SpecialFilters = () => {
    let {selected} =useAppSelector(s=>s.dashboard.Filters.Sections)
  return (
 <div className="flex justify-between gap-2">
 {
    selected == "Classes" ? <FilterBarClasses/> : <FilterBarTeachers/>
 }

  <Link to={selected!="Classes"?"teacher/register":"class/register"}>
            <Button  className="flex gap-2 bg-dark  rounded-lg text-white hover:bg-darker transition-colors">
                <p>Initialize new</p>
            <FaAddressCard />
            </Button>
            </Link>
 </div>
  )
}

const FilterBarClasses=()=>{
  let {mutate } =useReadFilteredClasses()
    let {Session} =useAppSelector(s=>s.dashboard.Filters)
    let dispatch =useAppDispatch()
  let handleFilter = (value:string)=>{
    dispatch(RedDashFilters({fields_name:"Session",selected:value,isLoading:true}))
    mutate(value)
  }
    return  (  
        <Select value={Session.selected} onValueChange={handleFilter}>
          <SelectTrigger className="w-[180px] max-md:w-full dark:bg-dark  dark:text-white focus:ring-0 border-2  bg-[var(--box)] border-[var(--dark)] relative" >
            <p className="absolute -top-1  text-[0.67rem] font-medium text-dark text-center "> Session </p>
            <SelectValue defaultValue={Session.selected} className="border-0 focus:ring-0"  />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
                {
                    Session.available.map(year=>{
                        return <SelectItem value={Object.values(year)[0]}>{Object.keys(year)[0]}</SelectItem>
                    })
                }
            </SelectGroup>
          </SelectContent>
        </Select>
    )
    }

const FilterBarTeachers = () =>{
    let {EmployementStatus} =useAppSelector(s=>s.dashboard.Filters)
  let {mutate} = useFilterTeachers()
  let dispatch =useAppDispatch()
  let handleChange = (val:string)=>{
        dispatch(RedDashFilters({fields_name:"EmployementStatus",selected:val,isLoading:true}))
        mutate(val)
  }
    return  (  
        <Select value={EmployementStatus.selected} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px] max-md:w-full dark:bg-dark dark:text-white focus:ring-0 border-2  bg-[var(--box)] border-[var(--dark)] relative" >
            <p className="absolute -top-1  text-[0.67rem] font-medium text-dark"> Employement Status </p>
            <SelectValue defaultValue={EmployementStatus.selected} className="border-0 focus:ring-0"  />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
                {
                    EmployementStatus.available.map(e=>{
                        return <SelectItem value={e} key={e}>{e}</SelectItem>
                    })
                }
            </SelectGroup>
          </SelectContent>
        </Select>
    )
}
export default SpecialFilters