import FetchStdFeeReportMeta from "@/Api/Std Fee Report/FetchStdFeeReportMeta"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedSFRFilters } from "@/app/Slices/StdFeeReportSlice"
import { useQuery } from "react-query"

const useFetchStdFeeReportMeta = ()=>{
    const dispatch = useAppDispatch()
    let {Sessions} = useAppSelector(s=>s.global)
    return useQuery({queryKey:["Std Fee Report","meta"],queryFn:FetchStdFeeReportMeta,
        refetchOnWindowFocus:false
        ,staleTime:1000*60*5 ,
        onSuccess({payload}){
            let {Classes,PaymentConfigs,Dates} = payload
            let session = Object.keys(Sessions)[0] //default Session
            let Year = Object.keys(Dates[session]||{})?.[0] || ""
            let paymentConfig = PaymentConfigs?.[session]?.[0]?.value ||""
            const Month = Dates?.[session]?.[Year]?.[0]
            const Class = Classes?.[session]?.[0]?.value
            
            dispatch(RedSFRFilters({
                available:payload,
                selected:{
                Session:session,
                Class,
                PaymentConfig:paymentConfig,
                Year,
                Month,
                FeeFrequency:PaymentConfigs[session]?.find((pay:any)=>pay.value ==paymentConfig)?.feeFrequency || "Monthly"
                }
                }))
        }

     })
}
export default useFetchStdFeeReportMeta