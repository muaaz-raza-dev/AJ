import GetDetailedRevenueReport from "@/Api/Stats/GetDetailedRevnueReport.api";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedDRPayload } from "@/app/Slices/RevenueDetailedSlice";
import { useMutation } from "react-query";

const useFetchDetailedRevenueReport = () => {
  let dispatch = useAppDispatch();
  let {Dates} =useAppSelector(s=>s.detailedRevenue.filters)
    return useMutation({
      mutationKey: ["detailed Revenue",Dates.start],
      mutationFn: () =>GetDetailedRevenueReport(Dates),
      onSuccess({payload}) {
        dispatch(RedDRPayload({payload}));
      },
      onError({response:{data:{message}}}) {
        console.log(message);
      },
    });
  
}



export default useFetchDetailedRevenueReport