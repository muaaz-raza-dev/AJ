import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import { RedDashPayloadReset, RedDashSearch } from '@/app/Slices/DashboardSlice'
import RequestLoading from '@/Global/Loaders/RequestLoding'
import { Input } from '@/shdcn/components/ui/input'
import { ChangeEventHandler, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const SearchBar = () => {
  let dispatch = useAppDispatch()
  const [loading,setLoading]=useState(false)
  let defaultState =useAppSelector(s=>s.dashboard.payload.Teachers.Original)
  let debounced = useDebouncedCallback((value)=>{
    if(!value){dispatch(RedDashPayloadReset({type:"Teachers",defaultState}))}
    else { dispatch(RedDashSearch({value})) }
    setLoading(false)    
  },1000)
  const handleSearch:ChangeEventHandler<HTMLInputElement> = ({target:{value}})=>{
    setLoading(true)
    debounced(value)
  }
  return (
    <>
    <div className="relative w-full flex justify-between items-center rounded-lg border-2 bg-[var(--box)] border-dark overflow-hidden">
    <Input onChange={handleSearch} className="bg-transparent h-full focus:ring-0 focus-visible:ring-0 outline-0" placeholder="Search for Class & Teacher"/>
    <div className="flex items-center justify-center w-[10%]">
      {loading&&<RequestLoading dark size='18' stroke='2'/>}
    </div>
    </div>
    </>
  )
}

export default SearchBar