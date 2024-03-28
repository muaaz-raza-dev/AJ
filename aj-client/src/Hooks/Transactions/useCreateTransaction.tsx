import CreateTransaction from "@/Api/Transaction/Transaction Compose/CreateTransaction.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { RedResetTransactionCompose } from "@/app/Slices/TransactionComposeSlice"
import { ItransactionComposeState } from "@/app/Types/IcomposeTransaction"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"


const useCreateTransaction = (reset:any) => {
    let dispatch = useAppDispatch()
    let navigate= useNavigate()
return useMutation({mutationKey:"Transaction",
mutationFn:(payload:ItransactionComposeState)=>CreateTransaction(payload),
onSuccess(state) {
    reset()
    dispatch(RedResetTransactionCompose()) 
    navigate("/transactions")
    toast.success("Transaction created !")
},
})
}

export default useCreateTransaction



