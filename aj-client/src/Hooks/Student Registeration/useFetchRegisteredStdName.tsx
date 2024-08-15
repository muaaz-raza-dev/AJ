import GetRelevantRegisteredStd from "@/Api/Student Registeration/GetRelevantRegisteredStd.api";
import { useMutation } from "react-query";
const useFetchRegisteredStdName = () => {
    return useMutation({
      mutationKey: ["Student", "search"],
      mutationFn: (q:string) =>GetRelevantRegisteredStd(q),
    });
};

export default useFetchRegisteredStdName;
