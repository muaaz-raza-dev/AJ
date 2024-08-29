import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import MutableInfoForm from './MutableInfoForm.set'
import NonMutableInfoForm from './NonMutableInfoForm.set'
import ProfileFormSubmit from './ProfileFormSubmit.set'
import { defaultStaffInformationEditForm, IStaffInformationEditForm } from '@/app/Types/IStaffInformation_Settings'
import NotFoundHandler from '@/Global/Middleware Hooks/NotFoundHandler'
import useGetPersonalInformation from '@/Hooks/Settings/useGetPersonalInformation'
import useUpdatePersonalInformation from '@/Hooks/Settings/useUpdatePersonalInformation'

const ProfileSettingForm = () => {
    const form  = useForm<IStaffInformationEditForm>({defaultValues:defaultStaffInformationEditForm})
    const {isLoading,isError,error} =useGetPersonalInformation(form.reset)
    const {mutate,isLoading:loading,isSuccess:success} =useUpdatePersonalInformation()
    const formSubmit  :SubmitHandler<IStaffInformationEditForm> = (data) =>{
        mutate(data)
      }
  return (
    <NotFoundHandler isError={isError} isLoading={isLoading} error={error} 
     ErrorPageProps={{title:"Something went wrong",message:"The page you are looking for is not available right now !",navigate:"/"}}  >
    <FormProvider {...form}>
        <form className="flex flex-col gap-3 w-full" onSubmit={form.handleSubmit(formSubmit)}>
        <MutableInfoForm/>
        <NonMutableInfoForm/>
  <ProfileFormSubmit loading={loading} success={success}/>
    </form>
    </FormProvider>
    </NotFoundHandler>
  )
}

export default ProfileSettingForm