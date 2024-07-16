import { FetchTransactionDetails } from "@/Api/Transaction/Transaction Read/ReadTransactions.api"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

const useFetchTransactionDetailed = ()=>{
    let id =useParams().id ||""
    return useQuery({queryKey:["Transaction",id],queryFn:()=>FetchTransactionDetails(id),
        refetchOnWindowFocus:false,staleTime:1000*60*5 ,
     })
}
export default useFetchTransactionDetailed