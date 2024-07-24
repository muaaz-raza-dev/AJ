import { CancelTransaction } from '@/Api/Transaction/Transaction Compose/CreateTransaction.api'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import useFetchTransactionDetailed from './useFetchTransactionDetailed'

const useCancelTransaction = () => {
    let id = useParams().id ||""
  let {refetch} = useFetchTransactionDetailed()

  return (
 useMutation({mutationKey:"Transaction",
        mutationFn:()=>CancelTransaction(id),
        onSuccess({message}) {
            toast.success(message)
            refetch() // refetch the transaction details after cancellation
        },
        onError({response:{data:{message}}}){
            toast.error(message)
        }
        })
  )
}

export default useCancelTransaction