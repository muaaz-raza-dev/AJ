import { useAppDispatch } from "@/app/ReduxHooks";
import { useMutation } from "react-query";
import { RedstInsertFilters, RedstInsertPayload } from '@/app/Slices/StatsSlice';
import toast from 'react-hot-toast';
import DailyRevenueReport from "@/Api/Stats/DailyRevenueReport.api";

const useGetDailyRevenueReport = () => {
    let dispatch = useAppDispatch();
    return useMutation({
      mutationKey: ["Stats","Daily"],
      mutationFn: (date:{year:string,month:string}) => DailyRevenueReport(date),
      onSuccess(data) {
        dispatch(RedstInsertPayload({daily:data.payload}))
      },
      onError(){
        toast.error("Error while fetching . Try again later.")
      },
      onSettled(){
        dispatch(RedstInsertFilters({InsertType:"available",type:"daily",isLoading:false}))
      }
    });
}

export default useGetDailyRevenueReport