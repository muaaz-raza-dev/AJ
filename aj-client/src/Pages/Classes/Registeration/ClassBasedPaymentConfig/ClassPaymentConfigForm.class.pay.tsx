import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import NotFoundHandler from '@/Global/Middleware Hooks/NotFoundHandler'
import { DefaultClassPaymentConfig, IclassPaymentConfig } from '@/app/Types/IclassPaymentConfig'
import useFetchClassPaymentInfo from '@/Hooks/Teacher&Class/useFetchClassPaymentInfo'
import CPCFormFields from './CPCFormFields.class.pay'
import CPCFormSubmit from './CPCFormSubmit.class.pay'
import useUpdateClassPaymentConfig from '@/Hooks/Teacher&Class/useUpdateClassPaymentConfig'
import ClassDetailsComp from './ClassDetailsComp.class.pay'

const ClassPaymentConfigForm = () => {
  let form  = useForm<IclassPaymentConfig>({defaultValues:DefaultClassPaymentConfig})
  let {isLoading ,isError,error} = useFetchClassPaymentInfo(form.reset)
  let {mutate ,isLoading:isMutating} =  useUpdateClassPaymentConfig()
  let formSubmit: SubmitHandler<IclassPaymentConfig> = (data) =>{
     mutate(data);
 } 

return (
<NotFoundHandler isError={isError} isLoading={isLoading} error={error}>
<FormProvider {...form}>
<form onSubmit={form.handleSubmit(formSubmit)} className="flex flex-col gap-y-4">
<ClassDetailsComp/>
<CPCFormFields/>
<CPCFormSubmit loading={isMutating}/>
</form>
</FormProvider>
</NotFoundHandler>
  )
}

export default ClassPaymentConfigForm