import resetStdAccPassword from "@/Api/Student exclusive/resetStdPasswordAccount";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function useResetStdAccountPassword(setOpen:(open:boolean)=>void,setPassword:(password:string)=>void) {
 return useMutation({
    mutationKey:"Account",
    mutationFn:({password,Account_id}:{password:string,Account_id:string})=>resetStdAccPassword(Account_id,password),
    onSuccess({message}){
        toast.success(message)
        setPassword("")
        setOpen(false)
    },
    onError({response:{data:{message}}}){
        toast.error(message)
    }
 })
}
