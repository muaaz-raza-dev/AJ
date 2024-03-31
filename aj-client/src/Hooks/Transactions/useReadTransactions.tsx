import ReadTransactionsMeta from "@/Api/Transaction/Transaction Read/ReadTransactionsMeta.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { RedTransactionsReadInsert } from "@/app/Slices/TransactionReadSlice"
import {  useQuery } from "react-query"

// const useReadTransactions = () => {
//     return useMutation({mutationKey:["Read","Transactions",count],mutationFn:(filters:ItransactionReadFilters)=>ReadTransactions(filters),onSuccess(data) {
//         dispatch(RedTransactionsReadInsert({Transactions:data.transactions}))
//     },})
// }
export const useReadTransactionsMeta = ()=>{
    let dispatch =useAppDispatch()
return useQuery({queryKey:"Transactions MetaData",queryFn:ReadTransactionsMeta,refetchOnWindowFocus:false,staleTime:1000*60*5 ,onSuccess({payload:data}){
dispatch(RedTransactionsReadInsert({TransactionStats:data.Stats,Dates:data.Dates}))
},onSettled({payload:data}) {
    dispatch(RedTransactionsReadInsert({TransactionStats:{...data.Stats,isLoading:false},TransactionTypes:data.TransactionTypes}))
},})
}

// export default useReadTransactions
