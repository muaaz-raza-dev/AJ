import RegisterSession, { UpdateSession } from "@/Api/Session/registerSession";
import { Isessions } from "@/app/Types/Isessions";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import useFetchSessions from "./useFetchSession";

const useRegisterSession = (Reset?:()=>void) => {
  let {refetch} = useFetchSessions()
  return useMutation({
    mutationKey: ["register", "session"],
    mutationFn: (payload: Isessions) => RegisterSession(payload),
    onSuccess(data) {
      if(data.success) toast.success("Session Created Successfully 🎊");
      else toast.error("An error occured Try again later!");
      refetch() // refetch the session list after successful registration or update.
      Reset && Reset()
    },
    onError() {
      toast.error("An error occured Try again later!");
    }
  });
};

export const useUpdateSession = () => {
  let id =useParams().id || ""
  let {refetch} = useFetchSessions()
return useMutation({
    mutationKey: ["register", "session"],
    mutationFn: (payload: Isessions) => UpdateSession(id,payload),
    onSuccess(data) {
      if(data.success) toast.success("Session updated Successfully 🎊");
      else toast.error("An error occured Try again later!");
      refetch() // refetch the session list after successful registration or update.
    },
    onError() {
      toast.error("An error occured Try again later!");
    }
  });
};

export default useRegisterSession;
