import ReadGlobal from "@/Api/global/Global.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { InsertGlobalValues } from "@/app/Slices/globalSlice"
import { useQuery } from "react-query"
const useLoadGlobalState = () => {
    let dispatch =useAppDispatch()
const global = useQuery({
    queryKey:"Global State", queryFn:ReadGlobal , refetchOnWindowFocus:false, staleTime:1000*60*10 ,
    onSuccess(data) {
dispatch(InsertGlobalValues({Classes:data.Classes,Sections:data.Sections,Sessions:data.Sessions,GlobalFees:data.GlobalFees,AdvancedActions:{autoGR:data.autoGR,sortGR:data.sortGR}}))

    },}) 
    return global
}

export default useLoadGlobalState
