import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { ItransactionForm } from "@/app/Types/ItransactionForm"
import TransactionFeeDetailsForm from "./TransactionFeeDetailsForm.tr"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedInsertTransactionCompose } from "@/app/Slices/TransactionComposeSlice"

const TransactionComposeForm = () => {
    let form = useForm<ItransactionForm>()
    let  {Transactions,student,} = useAppSelector(state=>state.trCompose)
    let dispatch = useAppDispatch()
    let FormHandler:SubmitHandler<ItransactionForm> = ({PaidAmount,PayorsName,Note})=>{
      if(Object.keys(Transactions).length!=0&&student){
        dispatch(RedInsertTransactionCompose({Errors:false,PaidAmount,PayorsName,Note}))
      }
    }
  return (
    <FormProvider {...form}>
    <form className="flex flex-wrap w-full" onSubmit={form.handleSubmit(FormHandler)}>
        <TransactionFeeDetailsForm/>
    </form>
    </FormProvider>
  )
}

export default TransactionComposeForm
