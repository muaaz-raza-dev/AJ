import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { defaultTransactionForm, ItransactionForm } from "@/app/Types/ItransactionForm"
import TransactionFeeDetailsForm from "./TransactionFeeDetailsForm.tr"
import useCreateTransaction from "@/Hooks/Transactions/useCreateTransaction"

const TransactionComposeForm = () => {
    let form = useForm<ItransactionForm>({defaultValues:defaultTransactionForm})
    let {mutate,isLoading}= useCreateTransaction(form.reset)
    let handleTransaction: SubmitHandler<ItransactionForm> = (payload)=>{
      mutate(payload)
    }
    let PrintAndConfirmTransaction = ()=>{

    }
  return (
    <FormProvider {...form}>
    <form className="flex flex-wrap w-full" onSubmit={form.handleSubmit(handleTransaction)}>
        <TransactionFeeDetailsForm isLoading={isLoading} PrintFn={PrintAndConfirmTransaction}/>
    </form>
    </FormProvider>
  )
}

export default TransactionComposeForm
