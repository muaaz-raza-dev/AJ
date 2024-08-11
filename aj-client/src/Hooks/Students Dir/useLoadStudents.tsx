import ReadStudents from "@/Api/Students/ReadStudents.api";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { InsertStudentsDir } from "@/app/Slices/StudentDirSlice";
import { useMutation } from "react-query";
const useLoadStudents = () => {
    
  let {count} =useAppSelector(state=>state.StudentsDir)

  let dispatch = useAppDispatch();
  
    return useMutation({
      mutationKey: ["stdDir", count],
      mutationFn: (Count?:number) => ReadStudents(Count||count),
      onSuccess(data) {
        dispatch(
          InsertStudentsDir({
            isLoading: false,
            MutableData: data["payload"],
            count: data.count,
            StudentsData: data.payload,
            totalStudents: data.totalStudents,
          })
        );
      },
    });
  ;
};

export default useLoadStudents;
