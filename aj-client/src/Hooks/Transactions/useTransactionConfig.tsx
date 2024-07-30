import SetTransactionsConfig from "@/Api/Transaction/Transaction Read/TransactionConfig"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
const useTransactionConfig = () => {
    return useMutation({mutationKey:["Config","Transactions"],mutationFn:(filters:any)=>SetTransactionsConfig(filters),onSuccess() {
        toast.success("Transaction configuration is updated for this month")
    },})
}

export default useTransactionConfig
