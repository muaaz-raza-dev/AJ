import { ReadClasses_short, ReadClasses_short_filtered } from "@/Api/Teacher&Classes/ReadClasses.api";
import { useAppDispatch } from "@/app/ReduxHooks";
import { RedDashFilters, RedDashInsertPayload } from "@/app/Slices/DashboardSlice";
import { useMutation, useQuery } from "react-query";

const useReadClasses = () => {
    let dispatch = useAppDispatch();
    return useQuery({
      queryKey: ["Read", "Teacher"],
      queryFn: ReadClasses_short,
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      onSuccess({payload}) {
        dispatch(
          RedDashInsertPayload({ type:"Classes", Filtered: payload.payload, Original: payload.payload })
          
        );
        let selected:string = Object.values(payload.Filters[0])[0] as string
        dispatch(
          RedDashFilters({ fields_name:"Session", available:payload.Filters ,selected })
        );
      },
    }); 
}

export const useReadFilteredClasses = () => {
  let dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["Read", "Teacher","Filtered"],
    mutationFn: (SessionId:string)=>ReadClasses_short_filtered(SessionId),
    onSuccess({payload}) {
      dispatch(
        RedDashInsertPayload({ type:"Classes", Filtered: payload, Original: payload ,isLoading:false})
      );
    },
  }); 
}
export default useReadClasses