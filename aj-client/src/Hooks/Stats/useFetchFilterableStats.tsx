import GetFilterableStats from "@/Api/Stats/GetFilterableStats.api";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedFsFilters, RedFsPayload } from "@/app/Slices/FilterableStatsSlice";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useFetchFilterableStats = () => {
  const Filters =  useAppSelector(s => s.fStats.filters.selected) ;
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationKey: ["Stats", "Filterable"],
    mutationFn: () =>  GetFilterableStats(Filters),
    onMutate(){
        dispatch(RedFsFilters({ isLoading: true }));

      },
    onSuccess({ payload }) {
      
        dispatch(RedFsPayload({ payload, }));
    },
    onError({ response: { data: { message } } }) {
      toast.error(message);
    },
    onSettled() {
    dispatch(RedFsFilters({ isLoading: false }));
    },
  });

  return mutation;
};

export default useFetchFilterableStats;