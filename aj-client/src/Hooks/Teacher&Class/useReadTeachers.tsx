import ReadTeachers_short, {
  Fetch_Class_Raw,
  Fetch_Required_Info,
  Fetch_Teacher_Raw,
  ReadTeachers_detailed,
} from "@/Api/Teacher&Classes/ReadTeachers.api";
import { useAppDispatch } from "@/app/ReduxHooks";
import { RedDashInsertBulk, RedDashInsertPayload } from "@/app/Slices/DashboardSlice";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

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

export const useFetchRequiredInfo = (type?:string) => {
  let dispatch = useAppDispatch();
  let query = useQuery({
    queryKey: ["Read" , "Reqquired" , "Info"],
    queryFn:()=>Fetch_Required_Info(type),
    refetchOnWindowFocus:false,
    staleTime: 1000 * 60 * 10,
    onSuccess(data) {
      dispatch(RedDashInsertBulk({RequiredPayload:data.payload})) },
  });
    return query
};

export const useFetchClassRawDetails = (reset:(arg:any)=>void) => {
  let id = useParams().id
return useQuery(
  {
  queryKey: ["Read",id , "Edit"],
  queryFn:()=>Fetch_Class_Raw(id),
  refetchOnWindowFocus:false,
  staleTime: 1000 * 60 * 100,
  onSuccess(data) {
  data&&  reset(data.payload);
    }
});
};


export const useReadTeacherRawDetails = (reset:(arg:any)=>void)=>{
let id = useParams().id
return useQuery({
  queryKey: ["Teacher" , id , "Edit"],
  queryFn:()=>Fetch_Teacher_Raw(id),
  refetchOnWindowFocus:false,
  staleTime: 1000 ,
  refetchOnMount:true,
  onSuccess(data) {
  data&&  reset(data.payload);
    }
});
}
export default useReadTeachers;
