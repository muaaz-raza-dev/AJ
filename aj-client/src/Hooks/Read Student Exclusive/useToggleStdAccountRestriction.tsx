import toggleStdAccountRestriction from "@/Api/Student exclusive/StudentAccountToggleRestriction.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useFetchStudentAccountInfo from "./useFetchStudentAccountInfo";
const useToggleStdAccountRestriction = () => {
  const{refetch}=useFetchStudentAccountInfo()
    return useMutation({
      mutationKey: "Student Account Restriction",
      mutationFn: (id:string) =>toggleStdAccountRestriction(id),
      onSuccess(data) {
        toast.success("Operation done Successfully ")
        console.log(data);
        refetch(); // refetch the student account info after successful restriction toggle.
      },
      onError(error) {
        toast.error("An error occurred. Please try again later.")
        console.error(error);
      }
    });
};

export default useToggleStdAccountRestriction;
