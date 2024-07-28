import GeneralStats from "@/Api/Stats/GeneralStats.api";
import { useAppDispatch } from "@/app/ReduxHooks";
import { RedstInsertFilters } from "@/app/Slices/StatsSlice";
import moment from "moment";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
const useFetchGeneralStats = () => {
  let dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["Admin Stats"],
    queryFn: GeneralStats,
    staleTime: 1000 * 10 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess({ payload }) {
      let Default = moment();
      let months = moment.months();
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
    },
    onError() {
      toast.error("An error occured . While fetching try again later");
    },
  });
};

export default useFetchGeneralStats;
