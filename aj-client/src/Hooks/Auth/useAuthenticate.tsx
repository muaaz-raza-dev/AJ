import { useAppDispatch } from "@/app/ReduxHooks";
import {  useQuery } from "react-query";
import Authenticate from "@/Api/Auth/Authenticate.api";
import { CreditsInsertion } from "@/app/Slices/CredentialSlice";
const useAuthenticate = () => {
  let dispatch = useAppDispatch();
  let LoginRequest = useQuery({
    queryKey: "Authenticate",
    queryFn:Authenticate,
    staleTime:Infinity,
    refetchOnWindowFocus:false,
  onSuccess(data) {
dispatch(CreditsInsertion({isLoading:false,isLogined:true,Info:data.payload}))
  },
  onError() {
dispatch(CreditsInsertion({isLoading:false}))
  },
    });
  return LoginRequest
};

export default useAuthenticate;