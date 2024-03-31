import useAdvancedFilter from '@/Hooks/Students Dir/useAdvancedFilter';
import useLoadStudents from '@/Hooks/Students Dir/useLoadStudents';
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks';
import { InsertStudentsDir, StudentsDirDefault } from '@/app/Slices/StudentDirSlice';
import {  Badge, Checkbox } from 'antd';
import { useState } from 'react';
import { IoFilter } from 'react-icons/io5';


const StudentCheckBoxFilters = () => {
    let dispatch = useAppDispatch()
    const [ToggleSelect, setToggleSelect] = useState(false)
   let {mutate} = useAdvancedFilter()
   let {mutate:MutateNormal} = useLoadStudents()()
    let {Filters,count} = useAppSelector(state=>state.StudentsDir)
     function HandleFilters(key:"Polio"|"Covid",value:boolean){
        dispatch(StudentsDirDefault())
            mutate({Filters:{...Filters,[key]:value},count})
    }
    function Reset(){
        if (Filters.Covid||Filters.Polio) {
            dispatch(StudentsDirDefault())
            dispatch(InsertStudentsDir({Filters:{Class:"All",Polio:false,Covid:false}}))
            MutateNormal(1)
        }
    }
  return (
    <div className="relative " >
<Badge color="#4D44B5"  dot={Filters.Polio||Filters.Covid} >
    <button onClick={()=>setToggleSelect(!ToggleSelect)}  className='cursor-pointer text-sm   gap-x-2 justify-center  relative bg-[var(--dark)] text-white flex    p-2 rounded-full aspect-square  items-center'>
        <IoFilter size={22}/>

    </button>
    </Badge>
    {
        ToggleSelect&&
        <div  className="min-w-max rounded-xl text-sm InAnimation flex flex-col gap-y-2 px-4 -right-[50%]  z-20 absolute rouded shadow-lg bg-[var(--box)]  py-2 ">
                <div className="flex gap-x-2">
                    <Checkbox id='polio' onChange={(e)=>{
                        dispatch(InsertStudentsDir({Filters:{Polio:e.target.checked}}))
                        HandleFilters("Polio",e.target.checked)
                    }
                    }
                        /> 
                    <label htmlFor='polio'>
                         Polio Vaccination
                        </label>
                </div>
                <div className="flex gap-x-2">
                    <Checkbox id='covid' onChange={(e)=>{
                        dispatch(InsertStudentsDir({Filters:{Covid:e.target.checked}}))
                        HandleFilters("Covid",e.target.checked)
                    }
                        }/> 
                    <label htmlFor='covid'>
                         Covid-19 Vaccination
                        </label>
                </div>
                <div className="w-full justify-between flex text-xs">
                    <button onClick={()=>setToggleSelect(false)} className='px-4 py-0.5 rounded-md text-sm border border-[var(--dark)] text-black '>Close</button>
                    <button  onClick={()=>{
                        Reset();setToggleSelect(false)
                    }} className='px-4 py-0.5 rounded-md text-sm text-white  bg-[var(--dark)]' 
                    >Reset</button>
                </div>
        </div>
    }
    </div>
  )
}

export default StudentCheckBoxFilters
