import CreateTransaction from "@/Api/Transaction/Transaction Compose/CreateTransaction.api"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { ItransactionForm } from "@/app/Types/ItransactionForm"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import usePrintTransaction from "./usePrintTransaction"
import { ItransactionDetail } from "@/app/Types/ItransactionDetail"
import { RedTrcClearData } from "@/app/Slices/TransactionComposeSlice"


const useCreateTransaction = (reset:any) => {
const navigate= useNavigate()
const Student = useAppSelector(s=>s.trComposeFilters.StudentInfo)
const {isPrint} =useAppSelector(s=>s.trComposeFilters)
const {Print} = usePrintTransaction()
const dispatch= useAppDispatch()
return useMutation({mutationKey:"Transaction",
mutationFn:(payload:ItransactionForm)=>CreateTransaction({...payload,Student :Student?._id}),
onSuccess({payload}:{payload:ItransactionDetail}) {
reset()
toast.success("Transaction created !")
if(isPrint) {Print(payload)}

dispatch(RedTrcClearData())
navigate("/transactions")
},
onError(){
    toast.error("An error occured while creating transaction. Please try again .")
}
})
}

export default useCreateTransaction



