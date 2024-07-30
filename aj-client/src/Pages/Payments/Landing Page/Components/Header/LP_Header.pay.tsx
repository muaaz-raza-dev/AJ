import LPH_SearchFilter from './LPH_SearchFilter.pay'
import { Link } from 'react-router-dom'
import { Button } from '@/shdcn/components/ui/button'
import Custom_SelectFilter from './CustomSelectFilter.pay'
import { useAppDispatch, useAppSelector } from '@/app/ReduxHooks'
import { RedLPFilters } from '@/app/Slices/LPaymentConfigSlice'
import useFetchConfigs from '@/Hooks/School Payment/useFetchConfigs'

const LP_Header = () => {
  let sessions = useAppSelector(s=>s.paymentConfigsL.filters.sessions)
  let feeTypes = useAppSelector(s=>s.paymentConfigsL.filters.feeTypes)
  let dispatch =useAppDispatch()
  let {mutate} =useFetchConfigs()
    let HandleSessionFiter = (value:string) =>{
          dispatch(RedLPFilters({label:"sessions",selected:value,isLoading:true}))
          mutate({session:value,feeTypes:feeTypes.selected})
    }
    let HandleScopeFiter = (value:string) =>{
      dispatch(RedLPFilters({label:"feeTypes",selected:value,isLoading:true}))
      mutate({feeTypes:value,session:sessions.selected})
    }
  return (
    <header className="w-full  flex justify-between max-md:flex-col gap-2">
<LPH_SearchFilter/>
    <div className="w-[45%] max-md:w-full flex justify-end max-md:justify-start gap-4">
    <Custom_SelectFilter label='Sessions' options={sessions.available} value={sessions.selected} queryFn={HandleSessionFiter} />
    <Custom_SelectFilter label='Type' options={feeTypes.available.map(e=>({label:e,value:e}))} value={feeTypes.selected}
     queryFn={HandleScopeFiter} />
<Link to={"setup"} className="w-[20%] max-md:w-[30%]  h-full">
<Button className="bg-dark text-white py-2.5 hover:bg-dark rounded-md hover:opacity-95 w-full h-full">Intialize new</Button>
</Link>
    </div>
  </header>
  )
}

export default LP_Header