import SetTransactionsConfig from "@/Api/Transaction/Transaction Read/TransactionConfig"
import { useAppDispatch } from "@/app/ReduxHooks"
import { InsertGlobalValues } from "@/app/Slices/globalSlice"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
const useTransactionConfig = () => {
    let dispatch =useAppDispatch()
    return useMutation({mutationKey:["Config","Transactions"],mutationFn:(filters:any)=>SetTransactionsConfig(filters),onSuccess() {
        toast.success("Transaction configuration is updated for this month")
        dispatch(InsertGlobalValues({Transaction_Config_update:false}))
    },})
}

export default useTransactionConfig
