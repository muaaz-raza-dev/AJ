import CreateTransaction from "@/Api/Transaction/Transaction Compose/CreateTransaction.api"
import { useAppSelector } from "@/app/ReduxHooks"
import { ItransactionForm } from "@/app/Types/ItransactionForm"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"


const useCreateTransaction = (reset:any) => {
    let navigate= useNavigate()
    let Student = useAppSelector(s=>s.trComposeFilters.StudentInfo)
return useMutation({mutationKey:"Transaction",
mutationFn:(payload:ItransactionForm)=>CreateTransaction({...payload,Student :Student?._id}),
onSuccess() {
    reset()
    navigate("/transactions")
    toast.success("Transaction created !")
},
onError(){
    toast.error("An error occured while creating transaction. Please try again .")
}
})
}

export default useCreateTransaction



