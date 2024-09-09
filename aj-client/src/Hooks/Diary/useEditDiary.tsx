import EditDiary from "@/Api/Diary/updateDiary.api";
import { IdiaryCreate } from "@/app/Types/IdiaryCreate";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function useEditDiary() {
    const id = useParams()?.id || ""
    const navigate = useNavigate()
  return useMutation({
    mutationKey: "Edit diary",
    mutationFn: (payload:IdiaryCreate) =>EditDiary(id,payload),
    onSuccess() {
      toast.success("Diary updated successfully!");
      navigate("/diary")
    },
    onError() {
      toast.error("An error occurred while creating the diary. Please try again.");
    },
  });
}



