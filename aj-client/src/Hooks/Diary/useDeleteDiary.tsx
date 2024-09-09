import deleteDiary from "@/Api/Diary/deleteDiary.api";
import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
const useDeleteDiary = (setOpen?:React.Dispatch<React.SetStateAction<boolean>>) => {
  const id = useParams()?.id || ""
  const navigate = useNavigate()
    return useMutation({
      mutationKey: ["delete diary", id],
      mutationFn: () => deleteDiary(id),
      onSuccess() {
        setOpen?.(false);
        navigate("/diary")
        toast.success("Diary deleted successfully");
      },
      onError(error) {
        toast.error("An error occurred while deleting diary. Please try again.");
        console.error(error);
      },
    });
};

export default useDeleteDiary;
