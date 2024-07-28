import { useAppDispatch } from "@/app/ReduxHooks";
import { useMutation } from "react-query";
import { RedstInsertFilters, RedstInsertPayload } from '@/app/Slices/StatsSlice';
import toast from 'react-hot-toast';
import MonthlyRevenueReport from '@/Api/Stats/MonthlyRevenueReport.api';



const useGetMonthlyRevenueReport = () => {
  let dispatch = useAppDispatch();
    return useMutation({
      mutationKey: ["Stats","Monthly"],
      mutationFn: (duration:string) => MonthlyRevenueReport(duration),
      onSuccess(data) {
        dispatch(RedstInsertPayload({monthly:data.payload}))
      },
      onError(){
        toast.error("Error while fetching . Try again later.")
      },
      onSettled(){
        dispatch(RedstInsertFilters({InsertType:"available",type:"monthly",isLoading:false}))
      }
    });
};

export default useGetMonthlyRevenueReport;
