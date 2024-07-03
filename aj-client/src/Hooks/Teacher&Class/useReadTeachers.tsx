import ReadTeachers_short, {
  Fetch_Teachers_Names,
  ReadTeachers_detailed,
} from "@/Api/Teacher&Classes/ReadTeachers.api";
import { useAppDispatch } from "@/app/ReduxHooks";
import { RedDashInsertBulk, RedDashInsertPayload } from "@/app/Slices/DashboardSlice";
import { useQuery } from "react-query";

const useReadTeachers = () => {
  let dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["Read", "Teacher"],
    queryFn: ReadTeachers_short,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      dispatch(
        RedDashInsertPayload({ type:"Teachers", Filtered: data.payload, Original: data.payload })
      );
    },
  });
};

export const useInspectTeachers = (teacherId:string) => {
  let dispatch = useAppDispatch();
return useQuery({
  queryKey: ["Read", "Teacher", "Specifc"],
  queryFn:()=>ReadTeachers_detailed(teacherId),
  onSuccess(data) {
      dispatch(RedDashInsertPayload({type:"Teachers", Detailed_Teacher: data.payload }));
    },

});
};

export const useFetchTeacherNames = () => {
  let dispatch = useAppDispatch();
return useQuery({
  queryKey: ["Read", "Teacher", "Specifc"],
  queryFn:Fetch_Teachers_Names,
  refetchOnWindowFocus:false,
  staleTime: 1000 * 60 * 10,
  onSuccess(data) {
    dispatch(RedDashInsertBulk({Teachers_value_pairs:data.payload}))
    },

});
};
export default useReadTeachers;
