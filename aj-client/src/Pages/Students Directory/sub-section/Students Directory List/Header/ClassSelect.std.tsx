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
  let {classes} =useAppSelector(state=>state.global)
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
    <SelectTrigger className="w-[100px] h-full bg-[var(--bg)] border-2 border-[var(--dark)] focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-transparent ring-offset-0 ring-0 outline-none rounded-xl relative">
      <p className="absolute top-0 text-[0.7rem] text-[var(--dark)]  font-bold">Classes</p>
      <SelectValue placeholder="All" />
    </SelectTrigger>
    <SelectContent>
    <SelectItem value="All">All </SelectItem>
      {
        classes.map(elm=><SelectItem value={elm}>{elm}</SelectItem>)
      }

    </SelectContent>
  </Select>
  )
}

export default StudentClassSelect
