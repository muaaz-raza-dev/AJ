import FetchClassPaymentConfig from "@/Api/Teacher&Classes/FetchClassPaymentConfigs.api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
const useFetchClassPaymentInfo = (Reset?:(e:any)=>void) => {
  let id = useParams()?.id ||""
    return useQuery({
      queryKey: ["Payment History", id],
      queryFn: () => FetchClassPaymentConfig(id),
      refetchOnWindowFocus: false,
      refetchOnMount:true,
      onSuccess({payload}) {
        Reset && Reset({Configs:payload.Configs})
      },
    });
};

export default useFetchClassPaymentInfo;
