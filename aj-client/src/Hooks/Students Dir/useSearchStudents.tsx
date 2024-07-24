import SearchStudents from "@/Api/Students/SearchStudents.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { SearchGlobal } from "@/app/Slices/StudentDirSlice"
import { useMutation } from "react-query"

const useSearchStudents = () => {
    let dispatch =useAppDispatch()
 const SearchState = useMutation({
    mutationKey:["Searched"],mutationFn:({q,SearchMode,Filters}:{q:string,SearchMode:string,Filters:any})=>SearchStudents(q,SearchMode,Filters),
    onSuccess(data) {
        dispatch(SearchGlobal({searchedData:data.payload,hasData:data.hasData}))
    },
 })
 return SearchState
}

export default useSearchStudents
