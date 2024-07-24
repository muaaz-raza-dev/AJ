import RegisterSession from "@/Api/Session/registerSession";
import { Isessions } from "@/app/Types/Isessions";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useRegisterSession = () => {
  return useMutation({
    mutationKey: ["register", "session"],
    mutationFn: (payload: Isessions) => RegisterSession(payload),
    onSuccess(data) {
      if(data.success) toast.success("Session Created Successfully 🎊");
      else toast.error("An error occured Try again later!");
    },
    onError() {
      toast.error("An error occured Try again later!");
    }
  });
};

export default useRegisterSession;
