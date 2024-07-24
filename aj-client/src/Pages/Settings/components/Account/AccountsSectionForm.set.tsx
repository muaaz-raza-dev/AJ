import AccountBasicInfoSection from "./AccountBasicInfoSection.set"
import AccountPasswordInfoSection from "./AccountPasswordInfoSection.set"
import AccountInfoFormSubmit from "./AccountInfoFormSubmit.set"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { defaultAccountInfo, IaccountInfo } from "@/app/Types/IAccountInfo"
import useGetAccountInfo from "@/Hooks/Settings/useGetAccountInfo"
import { Fetching_Request } from "@/Global/Loaders/AppLoader"
import useResetCredentials from "@/Hooks/Settings/useResetCredentials"

const AccountsSectionForm = () => {
    let form  = useForm<IaccountInfo>({defaultValues:defaultAccountInfo})
    let {isLoading} =useGetAccountInfo(form.reset)
    let {mutate} = useResetCredentials(form.reset)
    let formSubmit  :SubmitHandler<IaccountInfo> = (data) =>{
        mutate({currentPassword:data?.Passwords?.currentPassword,newPassword:data?.Passwords?.newPassword,isUpdatePassword:data.isUpdatePassword,username:data.Info.username})
      }
  return (
    <FormProvider {...form}>
        {isLoading&&<Fetching_Request/>}
    <form className="flex flex-col gap-3 w-full" onSubmit={form.handleSubmit(formSubmit)}>
<AccountBasicInfoSection/>
<AccountPasswordInfoSection/>
<AccountInfoFormSubmit/>
    </form>
    </FormProvider>
  )
}

export default AccountsSectionForm