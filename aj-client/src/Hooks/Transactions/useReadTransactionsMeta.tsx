import ReadTransactionsMeta from "@/Api/Transaction/Transaction Read/ReadTransactionsMeta.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { RedTransactionsReadInsert } from "@/app/Slices/TransactionReadSlice"
import {  useQuery } from "react-query"


export const useReadTransactionsMeta = ()=>{
    let dispatch =useAppDispatch()
return useQuery({queryKey:"Transactions MetaData",queryFn:ReadTransactionsMeta,refetchOnWindowFocus:false,staleTime:1000*60*5 ,
    onSuccess({payload:data}){
dispatch(RedTransactionsReadInsert({TransactionTypes:data?.paymentConfigs,isLoadingTransactions:false}))
}
,onSettled({payload:data}) {
    dispatch(RedTransactionsReadInsert({TransactionStats:{...data.Stats,isLoading:false}}))
},})
}

// export default useReadTransactions
