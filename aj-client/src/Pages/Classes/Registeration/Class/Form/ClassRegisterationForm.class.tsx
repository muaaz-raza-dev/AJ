import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import ClassRegFormSubmit from './ClassRegFormSubmit.class'
import { defaultClass, Iclass } from '@/app/Types/Iclass'
import Class_Basic_Details from '../Sections/Class_Basic_Details.reg.class'
import ClassSection_Details from '../Sections/ClassSection_Details.reg.class'
import useRegisterClass from '@/Hooks/Teacher&Class/useRegisterClass'

const ClassRegisterationForm = () => {
  let form  = useForm<Iclass>({defaultValues:defaultClass})
  let {mutate,isLoading} =useRegisterClass(form.reset)
  let formSubmit  :SubmitHandler<Iclass> = (data) =>{
  mutate(data);
  }
  return (
    <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(formSubmit)} className="flex flex-col gap-y-4">
<Class_Basic_Details/>
<ClassSection_Details/>
<ClassRegFormSubmit loading={isLoading}/>
    </form>
    </FormProvider>
  )
}

export default ClassRegisterationForm