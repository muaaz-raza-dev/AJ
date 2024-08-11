import AccountBasicInfoSection from "./AccountBasicInfoSection.set"
import AccountPasswordInfoSection from "./AccountPasswordInfoSection.set"
import AccountInfoFormSubmit from "./AccountInfoFormSubmit.set"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { defaultAccountInfo, IaccountInfo } from "@/app/Types/IAccountInfo"
import useGetAccountInfo from "@/Hooks/Settings/useGetAccountInfo"
import { Fetching_Request } from "@/Global/Loaders/AppLoader"
import useResetCredentials from "@/Hooks/Settings/useResetCredentials"

const AccountsSectionForm = () => {
    const form  = useForm<IaccountInfo>({defaultValues:defaultAccountInfo})
    const {isLoading} =useGetAccountInfo(form.reset)
    const {mutate,isLoading:loading,isSuccess} = useResetCredentials(form.reset)
    const formSubmit  :SubmitHandler<IaccountInfo> = (data) =>{
    mutate({currentPassword:data?.Passwords?.currentPassword,newPassword:data?.Passwords?.newPassword,isUpdatePassword:data.isUpdatePassword,...data.Info})
      }
      
  return (
    <FormProvider {...form}>
{isLoading&&<Fetching_Request/>}
<form className="flex flex-col gap-3 w-full px-2" onSubmit={form.handleSubmit(formSubmit)}>
<AccountBasicInfoSection/>
<AccountPasswordInfoSection/>
<AccountInfoFormSubmit isLoading={loading} isSuccess={isSuccess}/>
</form>
</FormProvider>
  )
}

export default AccountsSectionForm