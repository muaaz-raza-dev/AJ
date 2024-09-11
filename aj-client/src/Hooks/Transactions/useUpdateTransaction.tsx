import { useMutation } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import UpdateTransaction from '../../Api/Transaction/Transaction Compose/EditTransaction.api'
import { ItransactionForm } from '@/app/Types/ItransactionForm'
import toast from "react-hot-toast"

export default function useUpdateTransaction() {
      const invoice =useParams().invoice ||""
      const navigate = useNavigate();
      return useMutation({
        mutationKey:["Transaction",invoice,"update"],
        mutationFn:(payload:ItransactionForm)=>UpdateTransaction(invoice,payload),
        onSuccess(){
            toast.success("Transaction updated successfully!");
            navigate("/transactions")
        },
        onError(){
            toast.error("An error occurred while updating transaction. Please try again.");
        },
       })
}
