import StudentMeta from "@/Api/Student exclusive/StudentMeta.api";
import { useAppDispatch } from "@/app/ReduxHooks";
import {
  RedInsertStudentOverview,
} from "@/app/Slices/StdExclusiveSlice";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useFetchStudentMeta = () => {
  const GRNO = useParams().student;
  const dispatch = useAppDispatch();
  return useQuery({
    queryFn: () => StudentMeta(GRNO ?? 1),
    queryKey: ["student exclusive", GRNO],
    staleTime: 1e3 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount:true,
    onSuccess({ payload }) {
      dispatch(
        RedInsertStudentOverview({
          overview: payload,
          isLoading: false,
          isFetched: true,
        })
      );
    },
    onError({
      response: {
        data: { message },
      },
    }) {
      dispatch(
        RedInsertStudentOverview({
          isLoading: false,
          isFetched: false,
          isError: message,
        })
      );
    },
  });
};

export default useFetchStudentMeta;
