import SearchStudentsForTransaction from '@/Api/Transaction/Transaction Compose/SearchStudentsforTransacton.api'
import { useAppDispatch } from '@/app/ReduxHooks'
import { RedInsertTransactionCompose } from '@/app/Slices/TransactionComposeSlice'
import { useMutation } from 'react-query'

const useSearchStudentswithGRNO = () => {
    let dispatch = useAppDispatch()
return useMutation({mutationKey:"Search",mutationFn:(GRNO:string)=>SearchStudentsForTransaction(GRNO),onSuccess(data) {dispatch(RedInsertTransactionCompose({student:data.payload.std,Dates:data.payload.Dates,Invoice:data.payload.Invoice} ))

},onError() {
    let defaultf:any ={}
    dispatch(RedInsertTransactionCompose({student:defaultf,}))
},})
}

export default useSearchStudentswithGRNO
