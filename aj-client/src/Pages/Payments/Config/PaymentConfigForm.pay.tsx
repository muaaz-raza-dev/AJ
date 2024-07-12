import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import Payment_Core_Details from "./Sections/Payment_Core_Details.pay"
import DynamicSections_Reg from "./Sections/components/Sections/DynamicSections_Reg.pay"
import { defaultPaymentRegisterationConfig, IpaymentRegisterationState } from "@/app/Types/IPaymentConfig"
import useFetchSessions_pay_mod from "@/Hooks/School Payment/useFetchSessions_Payment_Mod"
import useRegisterPaymentsConfigs, { useEditPaymentsConfigs } from "@/Hooks/School Payment/useRegisterPaymentsConfigs"
import { FC } from "react"
import { useFetchConfigDetailed } from "@/Hooks/School Payment/useFetchConfigs"
import { Fetching_Request } from "@/Global/Loaders/AppLoader"

const ConfigForm:FC<{edit?:boolean}> = ({edit}) => {
    let form  = useForm<IpaymentRegisterationState>({defaultValues:defaultPaymentRegisterationConfig})
    useFetchSessions_pay_mod(setValues)
    let fetching = useFetchConfigDetailed(form.reset)
    let {mutate ,isLoading}  = useRegisterPaymentsConfigs(form.reset)
    let {mutate:Emutate,isLoading:eLoading} = useEditPaymentsConfigs(form.reset)
    function setValues (payload:any){
      if(!edit &&!eLoading && !form.watch("payload.session")) {
        form.setValue("filters.sessions.SelectedSession",payload.Sessions[0])
        form.setValue("payload.session",payload.Sessions[0].value) 
      }
      form.setValue("filters.sessions.Classes",payload.Classes)
      form.setValue("filters.sessions.available",payload.Sessions)
      form.setValue("filters.paymentMonths",payload.paymentMonths)
    }
    
    let formSubmit  :SubmitHandler<IpaymentRegisterationState> = (data) =>{
      if(!edit) mutate(data.payload)
      else Emutate(data.payload)
    }
  return (
    <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(formSubmit)} className="flex w-full gap-2">
    {edit&&fetching?.isLoading&&<Fetching_Request/>}
<DynamicSections_Reg/>
<Payment_Core_Details loading={!edit ? isLoading : eLoading} edit={edit}/>
  </form>
    </FormProvider>
  )
}

export default ConfigForm