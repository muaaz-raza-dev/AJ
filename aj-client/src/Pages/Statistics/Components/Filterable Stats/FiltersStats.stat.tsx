import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import CustomSelectFilterComp from "./CustomSelectFilterComp.stat"
import { RedFsFilters } from "@/app/Slices/FilterableStatsSlice"
import { useCallback, useEffect } from "react"
import useFetchFilterableStats from "@/Hooks/Stats/useFetchFilterableStats"
import RequestLoading from "@/Global/Loaders/RequestLoding"



const FiltersStats = () => {
  const {available:{Classes,Dates,PaymentConfigs},selected:{Session,feeFrequency,Class,PaymentConfig,month,year}} =useAppSelector(s=>s.fStats.filters)
  const {isLoading} =useAppSelector(s=>s.fStats)
  const {Sessions} =useAppSelector(s=>s.global)
  const {mutate} = useFetchFilterableStats()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (PaymentConfig ) {
      mutate();
    }
  }, [PaymentConfig, month, Class, mutate]);
  


  const HandleSessionChange = useCallback((session:string)=>{
      let year = Object.keys(Dates[session]||{})?.[0] || ""
      let paymentConfig = PaymentConfigs?.[session]?.[0]?.value ||""
      //Apply all the default options on cahnge of it's root parent which is Session
      dispatch(RedFsFilters({
        selected:{Session:session,Class:Classes?.[session]?.[0]?.value,PaymentConfig:paymentConfig,
          year:Object.keys(Dates?.[session]||{})?.[0],
          month:Dates?.[session]?.[year]?.[0],
    feeFrequency:PaymentConfigs[session]?.find(pay=>pay.value ==paymentConfig)?.feeFrequency||"Monthly"
  
        },
      }))
    },[])

  const HandleClassChange =useCallback((Class:string)=>{ dispatch(RedFsFilters({selected:{Class},}))},[])
  
  const HandlePaymentConfigChange = (paymentConfig:string)=>{
  dispatch(RedFsFilters({selected:{PaymentConfig:paymentConfig,
  feeFrequency:PaymentConfigs[Session].find(pay=>pay.value ==paymentConfig)?.feeFrequency||"Monthly"
  }}))
}
  const HandlePaymentYearChange = useCallback((year:string)=>{ dispatch(RedFsFilters({selected:{year,month:Dates[Session][year][0]}}))},[])

  const HandlePaymentMonthChange = useCallback((month:string)=>{ dispatch(RedFsFilters({selected:{month}}))},[])

 



return (
<>
<CustomSelectFilterComp label="Session" data={Object.entries(Sessions)?.map(e=>({label:e[1],value:e[0]}))} 
value={Session} onChange={HandleSessionChange}  />

<CustomSelectFilterComp label="Class" data={Classes[Session]} 
value={Class}
onChange={HandleClassChange}  />

<CustomSelectFilterComp label="Payment Config" data={PaymentConfigs?.[Session]||[]} value={PaymentConfig} 
onChange={HandlePaymentConfigChange}  />

<CustomSelectFilterComp disabled={feeFrequency=="Yearly"||feeFrequency=="One Time"} label="Year" rawData={Object.keys(Dates?.[Session]||{})} value={year} onChange={HandlePaymentYearChange}  />

<CustomSelectFilterComp disabled={feeFrequency=="Yearly"||feeFrequency=="One Time"} label="Month" rawData={Dates?.[Session]?.[year]||[]} value={month} onChange={HandlePaymentMonthChange}  />

{
  isLoading&& <RequestLoading size="22" stroke="2" dark/>
}
</>
  )
}

export default FiltersStats