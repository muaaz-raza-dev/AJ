import RegisterSession, { UpdateSession } from "@/Api/Session/registerSession";
import { Isessions } from "@/app/Types/Isessions";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

const useRegisterSession = (Reset?:()=>void) => {
  return useMutation({
    mutationKey: ["register", "session"],
    mutationFn: (payload: Isessions) => RegisterSession(payload),
    onSuccess(data) {
      if(data.success) toast.success("Session Created Successfully 🎊");
      else toast.error("An error occured Try again later!");
      Reset && Reset()
    },
    onError() {
      toast.error("An error occured Try again later!");
    }
  });
};

export const useUpdateSession = () => {
  let id =useParams().id || ""
  return useMutation({
    mutationKey: ["register", "session"],
    mutationFn: (payload: Isessions) => UpdateSession(id,payload),
    onSuccess(data) {
      if(data.success) toast.success("Session updated Successfully 🎊");
      else toast.error("An error occured Try again later!");
    },
    onError() {
      toast.error("An error occured Try again later!");
    }
  });
};

export default useRegisterSession;
