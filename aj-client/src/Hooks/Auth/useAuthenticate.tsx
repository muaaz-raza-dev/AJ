import { useAppDispatch } from "@/app/ReduxHooks";
import {  useQuery } from "react-query";
import Authenticate from "@/Api/Auth/Authenticate.api";
import { CreditsInsertion } from "@/app/Slices/CredentialSlice";
import SetThemeToStorage from "../Theme/SetThemeToStorage";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import useLogout from "./useLogout";
const useAuthenticate = () => {
let dispatch = useAppDispatch();
let {logOut} =useLogout()
let token = Cookies.get(import.meta.env?.VITE_APP_SECRET_COOKIE_KEY||"") ||false
let LoginRequest = useQuery({
queryKey: "Authenticate",
queryFn:Authenticate,
staleTime:Infinity,
refetchOnWindowFocus:false,
onSuccess(data) {
dispatch(CreditsInsertion({isLoading:false,isLogined:true,Info:data.payload}))
SetThemeToStorage()
},
  onError({response:{data:{status,message,success}}}) {
    if(status==403 &&!success ){
      logOut()
      toast.error(message)
    }
    else {toast.error(message)}
  },
  onSettled(){
    dispatch(CreditsInsertion({isLoading:false}))
  }
  });
  return token ? LoginRequest : null
};

export default useAuthenticate;