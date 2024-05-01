import StudentsInformation, {
  EditStudentInformation,
} from "@/Api/Student exclusive/StudentsInformationExclusive";
import { useAppDispatch } from "@/app/ReduxHooks";
import { RedInsertStdInformation } from "@/app/Slices/StdExclusiveSlice";
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
const useFetchStudentInformationExclusive = () => {
  let GRNO = useParams()?.student;
  let dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["Student's Information", GRNO],
    queryFn: () => StudentsInformation(GRNO ?? 0),
    staleTime: 1e3 * 60 * 10,
    refetchOnWindowFocus: false,
    onSuccess({ payload }) {
      dispatch(
        RedInsertStdInformation({
          Information: { isLoading: false, Details: payload },
        })
      );
    },
  });
};
export const useEditStudentInformationExclusive = () => {
  let GRNO = useParams().student;
  return useMutation({
    mutationKey: ["Edit Student"],
    mutationFn: (data: IRegisterFormState) =>
      EditStudentInformation({ ...data, GRNO }),
    onSuccess() {
      toast.success("Updated Successfully");
    },
  });
};

export default useFetchStudentInformationExclusive;
