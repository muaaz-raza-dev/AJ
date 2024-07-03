import FilterTeachers_EH from '@/Api/Teacher&Classes/FilterTeachers.api'
import { useAppDispatch } from '@/app/ReduxHooks'
import {  RedDashInsertPayload } from '@/app/Slices/DashboardSlice'
import { useMutation } from 'react-query'

const useFilterTeachers = () => {
    let dispatch =useAppDispatch()
  return  useMutation({mutationKey:["filter ","teachers","Employement history"],mutationFn:(type:string)=>FilterTeachers_EH(type) ,onSuccess(data,) {
        // dispatch(RedDashFilters({fields_name:"EmployementStatus",selected:""}))
        dispatch(RedDashInsertPayload({type:"Teachers",Original:data.payload , Filtered:data.payload,isLoading:false}))
    },})
}

export default useFilterTeachers