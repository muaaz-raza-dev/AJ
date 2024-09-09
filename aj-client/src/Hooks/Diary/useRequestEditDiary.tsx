import requestEditDiary from "@/Api/Diary/RequestEdit.api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function useRequestEditDiary(
  edit: boolean,
  reset?: (a: any) => void,
) {
  const id = useParams()?.id || "";
  return useQuery({
    queryKey: "Diary Meta Data",
    queryFn: () => edit && requestEditDiary(id),
    refetchOnWindowFocus: false,
    refetchOnMount:true,
    onSuccess({ payload }) {
      reset?.(payload);
    },
  });
}
