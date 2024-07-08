import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import ClassRegFormSubmit from './ClassRegFormSubmit.class'
import { defaultClass, Iclass } from '@/app/Types/Iclass'
import Class_Basic_Details from '../Sections/Class_Basic_Details.reg.class'
import ClassSection_Details from '../Sections/ClassSection_Details.reg.class'
import useRegisterClass, { useEditClass } from '@/Hooks/Teacher&Class/useRegisterClass'
import { FC } from 'react'
import {  useFetchClassRawDetails, useFetchRequiredInfo } from '@/Hooks/Teacher&Class/useReadTeachers'
import { Fetching_Request } from '@/Global/Loaders/AppLoader'

const ClassRegisterationForm:FC<{edit?:boolean}> = ({edit}) => {
  let form  = useForm<Iclass>({defaultValues:defaultClass})
  useFetchRequiredInfo()
  let {isLoading:isFetching} = useFetchClassRawDetails(form.reset)
  let {mutate,isLoading} =useRegisterClass(form.reset)
  let {mutate:editMutatate,isLoading:loading} = useEditClass()
  let formSubmit  :SubmitHandler<Iclass> = (data) =>{
    if (edit) editMutatate(data)
    else mutate(data);
    form.reset()
 } 
 
  return (
    <FormProvider {...form}>
      {edit&&isFetching&&<Fetching_Request/>}
    <form onSubmit={form.handleSubmit(formSubmit)} className="flex flex-col gap-y-4">
<Class_Basic_Details />
<ClassSection_Details/>
<ClassRegFormSubmit loading={edit ? loading: isLoading}/>
    </form>
    </FormProvider>
  )
}

export default ClassRegisterationForm