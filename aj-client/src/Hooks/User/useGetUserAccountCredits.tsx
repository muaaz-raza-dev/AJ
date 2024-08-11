import GetUserCredits from "@/Api/Users/GetUserCredentials.api"

import toast from "react-hot-toast"
import {  useQuery } from "react-query"
import { useParams } from "react-router-dom"


const useGetUserAccountCredits= (edit?:boolean,Reset?:(val:any)=>void)=>{
const id = useParams()?.id || ""
return useQuery({queryKey:["user",id],
queryFn:()=>edit&&GetUserCredits(id),
refetchOnWindowFocus:false,
staleTime:1000,
refetchOnMount:true,
onSuccess({payload:data}){
Reset&&Reset(data)
}
,onError({response:{data:{message}}}) {
toast.error(message)
},})
}

export default useGetUserAccountCredits
