import ReadGlobal from "@/Api/global/Global.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { InsertGlobalValues } from "@/app/Slices/globalSlice"
import { useQuery } from "react-query"
const useLoadGlobalState = () => {
    let dispatch =useAppDispatch()
const global = useQuery({
    queryKey:"Global State", queryFn:ReadGlobal , refetchOnWindowFocus:false, staleTime:1000*60*60 ,onSuccess(data) {
dispatch(InsertGlobalValues({totalStudents:data.totalStudents,classes:data.classes,Transaction_Config_update:data.Fee_Pref_Update_Req}))
    },}) 
    return global
}

export default useLoadGlobalState
