import SortStudentsGRNO from "@/Api/Settings/SortStudentsGRNO.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useLoadStudents from "../Students Dir/useLoadStudents";
import { useAppSelector } from "@/app/ReduxHooks";

const useSortStudentsGRNO = (setopen?:(val:boolean)=>void) => {
    const {mutate}=useLoadStudents()
    let {count} =useAppSelector(state=>state.StudentsDir)

      return useMutation({
        mutationKey: ["Sort Students"],
        mutationFn: SortStudentsGRNO,
        onSuccess({message}) {
            toast.success(message)
            mutate(count) // refetch the students after sorting
            setopen?.(false) // close the modal after sorting
        },
        onError({response:{data:{message}}}){
            toast.error(message)
        }
      });
  
  
}

export default useSortStudentsGRNO