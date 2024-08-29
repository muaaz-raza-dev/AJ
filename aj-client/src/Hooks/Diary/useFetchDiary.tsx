import getDiaries from "@/Api/Diary/getDiaries.api";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { ReddlInsertPayload } from "@/app/Slices/DiarySlice";
import { useMutation } from "react-query";
const useGetDiaries = () => {
  const dispatch = useAppDispatch();
  const{selected } =useAppSelector(s=>s.diarySlice.filters)
    return useMutation({
      mutationKey: "Fetch DIaries",
      mutationFn: () =>getDiaries(selected),
      onSuccess({payload}) {
dispatch(ReddlInsertPayload({payload}))        
      },
    });
};

export default useGetDiaries;
