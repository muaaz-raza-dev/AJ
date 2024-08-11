import ReadSessions_Payment_Mod from "@/Api/School Payment/GetSessions.api";
import { useQuery } from "react-query";


const useFetchSessions_pay_mod = (cb:(payload:any)=>void) => {
    return useQuery({
      queryKey: [ "Payment","payload","Session Dates" ],
      refetchOnWindowFocus:false,
      refetchOnMount:true,
      queryFn: ReadSessions_Payment_Mod ,
      onSuccess({payload}) {
   cb(payload)
        },
    
    });
}

export default useFetchSessions_pay_mod