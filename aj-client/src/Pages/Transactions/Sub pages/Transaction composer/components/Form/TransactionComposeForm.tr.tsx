import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { defaultTransactionForm, ItransactionForm } from "@/app/Types/ItransactionForm"
import TransactionFeeDetailsForm from "./TransactionFeeDetailsForm.tr"
import useCreateTransaction from "@/Hooks/Transactions/useCreateTransaction"
import useFetchTransactionDetailsTobeUpdated from "@/Hooks/Transactions/useGetTransactoionDetailsTobeUpdated";
import TransactionCreateHeader from "../../TransactionCreateHeader.tr";
import useUpdateTransaction from "@/Hooks/Transactions/useUpdateTransaction";

const TransactionComposeForm = ({edit=false}:{edit?:boolean}) => {
    const form = useForm<ItransactionForm>({defaultValues:defaultTransactionForm})
    const {mutate,isLoading}= useCreateTransaction(form.reset)
    const {mutate:letsEdit,isLoading:isEditing} = useUpdateTransaction()
    const {isLoading:isFetching} = useFetchTransactionDetailsTobeUpdated(edit,form.reset)
    const handleTransaction: SubmitHandler<ItransactionForm> = (payload)=>{
      if(edit){letsEdit(payload)}
      else { mutate(payload)}
    }
    if(edit&&isFetching) return <>loadng..</>
  return (
    <FormProvider {...form}>
    <form className="flex flex-wrap w-full" onSubmit={form.handleSubmit(handleTransaction)}>
    <div className="bg-[var(--box)] dark:bg-darker dark:text-white rounded w-full p-2 max-sm:p-0 gap-y-3 flex flex-col">
      <TransactionCreateHeader/>
      <TransactionFeeDetailsForm edit={edit} isLoading={isLoading||isEditing} />
      </div>
    </form>
    </FormProvider>
  )
}

export default TransactionComposeForm
