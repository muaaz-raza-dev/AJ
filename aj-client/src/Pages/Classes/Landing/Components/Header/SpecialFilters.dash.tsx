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
import { MdFormatListBulletedAdd } from "react-icons/md"
import { Link } from "react-router-dom"
import useFilterTeachers from "@/Hooks/Teacher&Class/useFilterTeachers"
import { RedDashFilters } from "@/app/Slices/DashboardSlice"
const SpecialFilters = () => {
    let {selected} =useAppSelector(s=>s.dashboard.Filters.Sections)
  return (
 <>
 {
    selected == "Classes" ? <FilterBarClasses/> : <FilterBarTeachers/>
 }

  <Link to={selected!="Classes"?"teacher/register":"class/register"}>
            <Button  className="flex gap-2 bg-dark rounded-lg text-white hover:bg-darker transition-colors">
            <MdFormatListBulletedAdd color="white" />
                <p>Initialize new</p>
            </Button>
            </Link>
 </>
  )
}

const FilterBarClasses=()=>{
    let {Year} =useAppSelector(s=>s.dashboard.Filters)

    return  (  
        <Select value={Year.selected}>
          <SelectTrigger className="w-[180px] focus:ring-0 border-2 bg-[var(--box)] border-[var(--dark)] relative" >
            <p className="absolute -top-1  text-[0.67rem] font-medium text-dark text-center "> Year </p>
            <SelectValue defaultValue={Year.selected} className="border-0 focus:ring-0"  />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
                {
                    Year.available.map(year=>{
                        return <SelectItem value={year}>{year}</SelectItem>
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
          <SelectTrigger className="w-[180px] focus:ring-0 border-2 bg-[var(--box)] border-[var(--dark)] relative" >
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