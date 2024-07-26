
import useFetchSessions_pay_mod from "@/Hooks/School Payment/useFetchSessions_Payment_Mod"
import LP_PaymentConfigsTable from "./Components/Data Table/LP_PaymentCOnfigsTable.pay"
import LP_Header from "./Components/Header/LP_Header.pay"
import { useAppDispatch } from "@/app/ReduxHooks"
import { RedLPFilters } from "@/app/Slices/LPaymentConfigSlice"
import useFetchConfigs from "@/Hooks/School Payment/useFetchConfigs"

const Landing_Payment_SettingsPage = () => {
  useFetchSessions_pay_mod(handleFilters)
  let dispatch = useAppDispatch() 
  let {mutate} =useFetchConfigs()

  function handleFilters (payload:any){
    dispatch(RedLPFilters({label:"sessions",selected:payload.Sessions[payload.Sessions.length-1].value,
    available:payload.Sessions.map((e:any)=>({label:e.label,value:e.value})),isLoading:true}))
    mutate({session:payload.Sessions[payload.Sessions.length-1].value,feeTypes:"Other"})
  }
  return (
    <section className="w-full flex flex-col gap-4">
    <LP_Header/>
    <LP_PaymentConfigsTable/>
    </section>
  )
}

export default Landing_Payment_SettingsPage