import getDetailedDiary from "@/Api/Diary/getDetailedDiary.api"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

const useFetchDetailedDiary = ()=>{
    const id =useParams().id ||""
    return useQuery({queryKey:["Diary",id],queryFn:()=>getDetailedDiary(id),
        refetchOnWindowFocus:false,staleTime:1000*60*5 ,
     })
}
export default useFetchDetailedDiary

