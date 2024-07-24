import { IoSearch } from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shdcn/components/ui/select"
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import { InsertStudentsDir, SearchStudent } from '@/app/Slices/StudentDirSlice'
import { useState } from 'react'
import useSearchStudents from '@/Hooks/Students Dir/useSearchStudents'
import { useDebouncedCallback } from 'use-debounce'

const SearchBarFilter = () => {
  let dispatch =useAppDispatch()
  const [Search, setSearch] = useState<string>("");
  let {StudentsData,count,SearchMode,isNotExists,Filters} =useAppSelector(state=>state.StudentsDir)
  let {mutate} = useSearchStudents()
  const debounced = useDebouncedCallback(
    // function
    (_) => {
      if (isNotExists==true) {
        mutate({q:Search,SearchMode,Filters})
      }
    },
    // delay in ms
    1000
  );
  function SearchHandler(e:React.ChangeEvent<HTMLInputElement>){ 
    setSearch(e.target.value)
    debounced(e.target.value)
    dispatch(SearchStudent({StudentsRawData:StudentsData,count,q:e.target.value,SearchMode}))
  }
  return (
    <div  className='flex  rounded-xl  gap-x-1   items-center justify-center'>
      <div className="  bg-light dark:bg-dark dark:text-white  border-2 border-[var(--dark)]   flex gap-x-1 px-2 rounded-md items-center">
      <IoSearch className='text-[var(--dark)] dark:text-light' size={21}/>

      <input className='px-2  py-3 bg-transparent placeholder-[var(--dark)] placeholder:dark:text-gray-300 outline-none rounded-xl h-full ' placeholder='Search' value={Search} onChange={SearchHandler} />
      </div>
      <Select onValueChange={(e)=>dispatch(InsertStudentsDir({SearchMode:e}))} value={SearchMode} >
  <SelectTrigger className="w-[100px] dark:bg-dark dark:text-white  h-full bg-[var(--bg)]  focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-transparent ring-offset-0 ring-0 outline-none border-l-0 border-2 border-[var(--dark)] rounded-md relative">
    <SelectValue placeholder="Name" className=''/>
  <p className="absolute top-0 text-[0.7rem] dark:text-white text-[var(--dark)]  font-bold">Search Mode</p>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Name">Name</SelectItem>
    <SelectItem value="GRNO">GR no</SelectItem>
  </SelectContent>
</Select>

    </div>
  )
}

export default SearchBarFilter
