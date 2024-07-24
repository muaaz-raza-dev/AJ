import Login, { LoginPayload } from "@/Api/Auth/Login.api";
import { useAppDispatch } from "@/app/ReduxHooks";
import { CreditsInsertion } from "@/app/Slices/CredentialSlice";
import { useMutation } from "react-query";
import Cookie from 'js-cookie'
import { CookieKey } from "@/app/Common/DefaultCredits";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  let dispatch = useAppDispatch();
  let naviagte =useNavigate()
  let LoginRequest = useMutation({
    mutationKey: "Login",
    mutationFn: ({ usernameOrEmail, password }: LoginPayload) =>
      Login({ usernameOrEmail, password }),
  onSuccess(data) {
    Cookie.set(CookieKey,data.token,{expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)})
      dispatch(CreditsInsertion({isLogined:true,Info:data.payload}))
    toast.success(data.message)
naviagte("/")
  },
  onError(error:any) {
    toast.error(error.response.data.message)
  },
    });
  return LoginRequest
};

export default useLogin;
