import GetStdFeeReport from "@/Api/Std Fee Report/GetStdFeeReport";
import {  useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedSFRPayload } from "@/app/Slices/StdFeeReportSlice";
import { useMutation } from "react-query";
const useGetStdFeeReport = () => {
  const dispatch =useAppDispatch()
  let payload =useAppSelector(s=>s.stdFeeReport.filters.selected)
    return useMutation({
      mutationKey: ["Student","Fee","Records"],
      mutationFn: () => GetStdFeeReport(payload),
      onMutate(){
        dispatch(RedSFRPayload({isLoading: true}))
      },
      onSuccess({payload}) {
        dispatch(RedSFRPayload({payload,isLoading:false}))
      },
    });
};

export default useGetStdFeeReport;
