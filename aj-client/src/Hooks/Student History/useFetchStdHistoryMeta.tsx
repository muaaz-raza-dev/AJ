import FetchHistoryMeta from "@/Api/History/FetchHistoryMeta"
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedHisFilters, RedHisPayload } from "@/app/Slices/StudentHistorySlice"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

const useFetchStdHistoryMeta = () => {
  let dispatch = useAppDispatch()
  let {selected} =useAppSelector(s=>s.studentHistory.filters.PaymentConfigs)
  let id = useParams().id ||""
  return useQuery({
    queryKey: ["StdHistoryMeta"],
    queryFn: ()=>FetchHistoryMeta(id),
    staleTime: 1000*60*5,
    refetchOnWindowFocus: false,
    onSuccess({payload}) {
      let {PaymentConfigs,feeTypes,Sessions} = payload.filters
      let selectedPaymentConfig = PaymentConfigs[Sessions?.[0].value][feeTypes?.[0]][0].value
      dispatch(RedHisFilters({type:"available",PaymentConfigs,feeTypes,Sessions}))
      if(!selected) {
        dispatch(RedHisFilters({type:"selected",feeTypes:feeTypes[0],Sessions:Sessions[0].value,PaymentConfigs:selectedPaymentConfig}))
      }
      dispatch(RedHisPayload({stats:{totalDues:payload.Dues,totalPaid:payload.Paid},ClassHistory:payload.ClassHistory,studentInformation:payload.studentInformation}))
    }
  })
}

export default useFetchStdHistoryMeta