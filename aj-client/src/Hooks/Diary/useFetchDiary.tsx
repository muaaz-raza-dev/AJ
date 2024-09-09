import getDiaries from "@/Api/Diary/getDiaries.api";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { ReddlInsertFilters, ReddlInsertPayload } from "@/app/Slices/DiarySlice";
import { useMutation } from "react-query";
const useGetDiaries = () => {
  const dispatch = useAppDispatch();
  const{selected } =useAppSelector(s=>s.diarySlice.filters)
    return useMutation({
      mutationKey: "Fetch DIaries",
      mutationFn: () =>getDiaries(selected),
      onMutate(){
        dispatch(ReddlInsertFilters({ type:"selected",isLoading: true }));

      },
      onSuccess({payload}) {
  dispatch(ReddlInsertPayload({payload,isLoading:false}))        

      },
    });
};

export default useGetDiaries;
