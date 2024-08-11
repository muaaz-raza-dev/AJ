import CreateUserAccount, { UpdateUserAccount } from "@/Api/Users/CreateUserAccount.api";
import DeleteUserAccount from "@/Api/Users/DeleteUserAccount.api";
import { IaccountRegister } from "@/app/Types/IAccountRegister";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import useGetUsers from "../Settings/useGetUsers";
const useCreateUserAccount = (Reset:()=>void) => {
  const {refetch} =useGetUsers()
    return useMutation({
      mutationKey: ["User Account",],
      mutationFn: (payload:IaccountRegister) => CreateUserAccount(payload),
      onSuccess(data) {
        toast.success(data.message)
        refetch()
        Reset()
      },
      onError({response:{data:{message}}}){
        toast.error(message)
      }
    });
};

export const useUpdateUserAccount = () => {
  const id = useParams()?.id|| ""
  return useMutation({
    mutationKey: ["User Account",id],
    mutationFn: (payload:IaccountRegister) => UpdateUserAccount(payload,id),
    onSuccess({message}) {
      toast.success(message)
    },
    onError({response:{data:{message}}}){
      toast.error(message)
    }
  });
};

export const useDeleteUserAccount = (cb:(val:boolean)=>void) => {
  const {refetch} =useGetUsers()
  return useMutation({
    mutationKey: ["Delete","User Account"],
    mutationFn: (id:string) => DeleteUserAccount(id),
    onSuccess({message}) {
      cb(false)
      toast.success(message)
      refetch()
    },
    onError({response:{data:{message}}}){
      toast.error(message)
    }
  });
};



export default useCreateUserAccount;
