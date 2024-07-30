import UpdatePhoto from "@/Api/Settings/UpdatePhoto.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useResetPhoto = () => {
    return useMutation({
      mutationKey: ["Photo update"],
      mutationFn: (photo:string) => UpdatePhoto(photo),
      onSuccess() {
        toast.success("Profile photo is uploaded successfully 🙌")
      },
      onError() {
        toast.error("Error while uploading . Try again")
      },
    });
};

export default useResetPhoto;
