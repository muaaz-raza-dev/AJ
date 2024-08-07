import GeneralStats from "@/Api/Stats/GeneralStats.api";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedFsFilters } from "@/app/Slices/FilterableStatsSlice";
import { RedstInsertFilters } from "@/app/Slices/StatsSlice";
import moment from "moment";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
const useFetchGeneralStats = () => {
  let dispatch = useAppDispatch();
  let {Sessions} = useAppSelector(s=>s.global)
  return useQuery({
    queryKey: ["Admin Stats"],
    queryFn: GeneralStats,
    staleTime: 1000 * 10 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess({ payload }) {
     let Default = moment();
     let {Classes,PaymentConfigs,Dates} = payload.FstatsFilters
      let months = moment.months();
      //! Insert Chat payload 
      dispatch(
        RedstInsertFilters({
          type: "daily",
          InsertType: "available",
          available: payload.Dates,
        })
      );
      
      dispatch(
        RedstInsertFilters({
          type: "daily",
          InsertType: "selected",
          selected: {
            month: months[Default.month()],
            year: Default.year().toString(),
          },
        })
      );

      //! set default state for filters
       let session = Object.keys(Sessions)[0] //default Session
      let year = Object.keys(Dates[session]||{})?.[0] || ""
      let paymentConfig = PaymentConfigs?.[session]?.[0]?.value ||""
      dispatch(RedFsFilters({
        available:payload.FstatsFilters, //insert available filters
        selected:{
        Session:session,Class:Classes?.[session]?.[0]?.value,PaymentConfig:paymentConfig,
        year:Object.keys(Dates?.[session]||{})?.[0],
        month:Dates?.[session]?.[year]?.[0],
        feeFrequency:PaymentConfigs[session]?.find(pay=>pay.value ==paymentConfig)?.feeFrequency||"Monthly"
        },
      }))

    },
    onError() {
      toast.error("An error occured . While fetching try again later");
    },
  });
};

export default useFetchGeneralStats;
