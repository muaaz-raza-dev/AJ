import FetchPaymentHistory, { FetchDuesHistory } from "@/Api/History/FetchPaymentHistory";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedHisPayload } from "@/app/Slices/StudentHistorySlice";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
const useGetStdFeeHistory = () => {
  let dispatch = useAppDispatch();
  let {PaymentConfigs,feeTypes} =useAppSelector(s=>s.studentHistory.filters)
  let id = useParams()?.id || ""
    return useMutation({
      mutationKey: ["Student History", id],
      mutationFn: () => FetchPaymentHistory(feeTypes.selected,PaymentConfigs.selected,id),
      onSuccess(data) {
        dispatch(RedHisPayload({FeeHistory:data.payload}))       
      },
    });
};

export const useGetStdDueHistory = () => {
  let dispatch = useAppDispatch();
  let id = useParams()?.id || ""
    return useMutation({
      mutationKey: ["Student History", id],
      mutationFn: () => FetchDuesHistory(id),
      onSuccess({payload}) {
        dispatch(RedHisPayload({Dues:payload}))       
      },
    });
};
export default useGetStdFeeHistory;
