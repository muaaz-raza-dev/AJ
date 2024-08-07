import ReadTransactions from "@/Api/Transaction/Transaction Read/ReadTransactions.api"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedTransactionsFilters, RedTransactionsReadInsert } from "@/app/Slices/TransactionReadSlice"
import { ItransactionReadFilters } from "@/app/Types/ItransactionsRead"
import { useMutation } from "react-query"


const useReadPageTransactions = () => {
let dispatch =useAppDispatch()
let {count}=useAppSelector(s=>s.transactions.Filters)
return useMutation({mutationKey:["Read","Transactions",count],
    mutationFn:(filters:ItransactionReadFilters)=>{
    dispatch(RedTransactionsReadInsert({isLoadingTransactions:true}))
    return ReadTransactions(filters)
},
    onSuccess({payload:data,DataLength,count}) {
            dispatch(RedTransactionsReadInsert({Transactions:data,DataLength}))
            dispatch(RedTransactionsFilters({count:count}))
},onSettled(){
    dispatch(RedTransactionsReadInsert({isLoadingTransactions:false}))
},})
}

export default useReadPageTransactions
