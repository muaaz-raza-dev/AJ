import AdvancedFilters from "@/Api/Students/FilterbyClass.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { InsertStudentsDir } from "@/app/Slices/StudentDirSlice"
import { useMutation } from "react-query"
const useAdvancedFilter = () => {
    let dispatch = useAppDispatch()
return useMutation({mutationKey:["Advanced Filters"],mutationFn:({Filters,count}:{Filters:{Class:string,Polio:boolean,Covid:boolean},count:number})=>AdvancedFilters(Filters,count),onSuccess(data) {
            dispatch(InsertStudentsDir({isLoading:false,MutableData:data["payload"],count:data.count,StudentsData:data.payload,totalStudents:data.totalStudents}))
        },})
    
}

export default useAdvancedFilter
