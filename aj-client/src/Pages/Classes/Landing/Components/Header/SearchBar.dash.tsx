import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import { RedDashPayloadReset, RedDashSearch, RedDashSearchClassFilter } from '@/app/Slices/DashboardSlice'
import RequestLoading from '@/Global/Loaders/RequestLoding'
import { Input } from '@/shdcn/components/ui/input'
import { ChangeEventHandler, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const SearchBar = () => {
  let dispatch = useAppDispatch()
  const [loading,setLoading]=useState(false)
  let defaultState_teacher =useAppSelector(s=>s.dashboard.payload.Teachers.Original)
  let defaultState_class =useAppSelector(s=>s.dashboard.payload.Classes.Original)
  let mode =useAppSelector(s=>s.dashboard.Filters.Sections.selected)
  let debounced = useDebouncedCallback((value)=>{
    if(!value){
      if(mode =="Staffs"){ dispatch(RedDashPayloadReset({type:"Teachers",defaultState:defaultState_teacher})) } 
      else { dispatch(RedDashPayloadReset({type:"Classes",defaultState: defaultState_class})) } 
        }

    else { 
      if(mode == "Classes") {
dispatch (RedDashSearchClassFilter({input:value}))
      }
      else{
        dispatch(RedDashSearch({value}))
      }
     }
    setLoading(false)    
  },250)
  
  const handleSearch:ChangeEventHandler<HTMLInputElement> = ({target:{value}})=>{
    setLoading(true)
    debounced(value)
  }
  return (
    <>
    <div className="relative w-full flex justify-between items-center rounded-lg border-2  bg-[var(--box)] dark:bg-dark focus-visible:ring-offset-transparent focus:ring-offset-transparent ring-offset-transparent dark:text-white border-dark overflow-hidden">
    <Input onChange={handleSearch} className="bg-transparent focus:ring-0 border-none outline-none focus-visible:ring-0 h-full " placeholder="Search for Class & Teacher"/>
    <div className="flex items-center justify-center w-[10%]">
      {loading&&<RequestLoading dark size='18' stroke='2'/>}
    </div>
    </div>
    </>
  )
}

export default SearchBar