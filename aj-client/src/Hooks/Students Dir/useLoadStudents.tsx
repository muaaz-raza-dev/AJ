import ReadStudents from "@/Api/Students/ReadStudents.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { InsertStudentsDir } from "@/app/Slices/StudentDirSlice"
import { useMutation } from "react-query"
const useLoadStudents = () => {
    let dispatch = useAppDispatch()
return function MutationState (count?:number){
        return useMutation({mutationKey:["stdDir",count],mutationFn:(count:number)=>ReadStudents(count),onSuccess(data,) {
            
            dispatch(InsertStudentsDir({isLoading:false,MutableData:data["payload"],count:data.count,StudentsData:data.payload,totalStudents:data.totalStudents}))
        },})
    }
}

export default useLoadStudents
