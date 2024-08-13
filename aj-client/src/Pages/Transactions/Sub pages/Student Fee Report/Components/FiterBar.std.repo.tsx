import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import { RedSFRFilters } from '@/app/Slices/StdFeeReportSlice'
import useGetStdFeeReport from '@/Hooks/Student Fee Report/useGetStdFeeReport'
import CustomSelectFilterComp from '@/Pages/Statistics/Components/Filterable Stats/CustomSelectFilterComp.stat'
import { useCallback, useEffect } from 'react'

const FiterBar = () => {
  const dispatch = useAppDispatch()
    const {available:{Classes,Dates,PaymentConfigs,Types},selected:{Session,FeeFrequency,Class,PaymentConfig,Month,Year,Type}}
     = useAppSelector(s=>s.stdFeeReport.filters)
    const {Sessions} =useAppSelector(s=>s.global)

    const {mutate} = useGetStdFeeReport()

    useEffect(() => {
      if (PaymentConfig ) {
        mutate();
      }
    }, [PaymentConfig, Month, Class, Type]);
    
  
  
    const HandleSessionChange = useCallback((session:string)=>{
        const Year = Object.keys(Dates[session]||{})?.[0] || ""
        const paymentConfig = PaymentConfigs?.[session]?.[0]?.value ||""
        //Apply all the default options on cahnge of it's root parent which is Session
        dispatch(RedSFRFilters({
          selected:{Session:session,Class:Classes?.[session]?.[0]?.value,PaymentConfig:paymentConfig,
            Year:Object.keys(Dates?.[session]||{})?.[0],
            Month:Dates?.[session]?.[Year]?.[0],
      FeeFrequency:PaymentConfigs[session]?.find(pay=>pay.value ==paymentConfig)?.feeFrequency||"Monthly"
    
          },
        }))
      },[])
  
    const HandleClassChange =useCallback((Class:string)=>{ dispatch(RedSFRFilters({selected:{Class},}))},[])
    
    const HandlePaymentConfigChange = (paymentConfig:string)=>{
    dispatch(RedSFRFilters({selected:{PaymentConfig:paymentConfig,
    FeeFrequency:PaymentConfigs[Session].find(pay=>pay.value ==paymentConfig)?.feeFrequency||"Monthly"
    }}))
  }
    const HandlePaymentYearChange = useCallback((Year:string)=>{ dispatch(RedSFRFilters({selected:{Year,Month:Dates[Session][Year][0]}}))},[])
  
    const HandlePaymentMonthChange = useCallback((Month:string)=>{ dispatch(RedSFRFilters({selected:{Month}}))},[])

    const HandleTypeChange = useCallback((Type:string)=>{ dispatch(RedSFRFilters({selected:{Type}}))},[])

  return (
    <>
<CustomSelectFilterComp labelStyle='!text-white' label="Session" data={Object.entries(Sessions)?.map(e=>({label:e[1],value:e[0]}))} 
value={Session} onChange={HandleSessionChange}  />

<CustomSelectFilterComp labelStyle='!text-white' label="Class" data={Classes[Session]} 
value={Class}
onChange={HandleClassChange}  />

<CustomSelectFilterComp labelStyle='!text-white' label="Payment Config" data={PaymentConfigs?.[Session]||[]} value={PaymentConfig} 
onChange={HandlePaymentConfigChange}  />

<CustomSelectFilterComp labelStyle='!text-white' label="Type" rawData={Types} value={Type} onChange={HandleTypeChange}  />

<CustomSelectFilterComp labelStyle='!text-white' disabled={FeeFrequency=="Yearly"||FeeFrequency=="One Time"} label="Year" rawData={Object.keys(Dates?.[Session]||{})} value={Year} onChange={HandlePaymentYearChange}  />

<CustomSelectFilterComp labelStyle='!text-white' disabled={FeeFrequency=="Yearly"||FeeFrequency=="One Time"} label="Month" rawData={Dates?.[Session]?.[Year]||[]} value={Month} onChange={HandlePaymentMonthChange}  />

</>
  )
}

export default FiterBar