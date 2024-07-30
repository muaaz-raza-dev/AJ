import useFilterStdByClass from "@/Hooks/Students Dir/useAdvancedFilter"
import useLoadStudents from "@/Hooks/Students Dir/useLoadStudents"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { InsertStudentsDir, StudentsDirDefault } from "@/app/Slices/StudentDirSlice"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shdcn/components/ui/select"
const StudentClassSelect = () => {
  let {Classes} =useAppSelector(state=>state.global)
  let dispatch = useAppDispatch()
  let {Filters} =useAppSelector(state=>state.StudentsDir)
  let {mutate:MutateForClass}  =useFilterStdByClass()
  let {mutate}  =useLoadStudents()()
  function ClassHandler(value:string){
    if (value!=="All") {
      MutateForClass({Filters:{...Filters,Class:value},count:1})
    }
    else {
      mutate(1)
    }
    dispatch(StudentsDirDefault())
    dispatch(InsertStudentsDir({count:1,Filters:{Class:value}}))
  }
  return (
    <Select onValueChange={ClassHandler} value={Filters.Class}>
    <SelectTrigger className="w-[120px] max-md:w-[49%] h-12   bg-light dark:bg-dark dark:text-white border-2 border-[var(--dark)] focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-transparent ring-offset-0 ring-0 outline-none rounded-md relative">
      <p className="absolute -top-0.5 text-[0.6rem] dark:text-white text-gray-400  font-bold">Classes</p>
      <SelectValue placeholder="All" />
    </SelectTrigger>
    <SelectContent>
    <SelectItem value="All">All </SelectItem>
      {
        Object.entries(Classes).map(elm=><SelectItem value={elm[0]}>{elm[1]}</SelectItem>)
      }

    </SelectContent>
  </Select>
  )
}

export default StudentClassSelect
