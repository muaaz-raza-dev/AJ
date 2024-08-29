import CreateDiary from "@/Api/Diary/CreateDiary.api";
import { defaultIdiaryCreate, IdiaryCreate } from "@/app/Types/IdiaryCreate";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function useCreateDiary(Reset?:(val:IdiaryCreate)=>void) {
  return useMutation({
    mutationKey: "Create diary",
    mutationFn: (payload:IdiaryCreate) =>CreateDiary(payload),
    onSuccess() {
      Reset?.(defaultIdiaryCreate)
      toast.success("Diary created successfully!");
    },
    onError() {
      toast.error("An error occurred while creating the diary. Please try again.");
    },
  });
}



