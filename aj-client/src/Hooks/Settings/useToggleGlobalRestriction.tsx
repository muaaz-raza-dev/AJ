import ToggleGlobalRestriction from "@/Api/Settings/ToggleGlobalRestriction.api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useGetUsers from "./useGetUsers";
import ToggleBlockIndividualUser from "@/Api/Settings/ToggleBlockIndividualUser.api";
const useToggleGlobalRestriction = () => {
    let {refetch} = useGetUsers()
    return useMutation({
      mutationKey: ["Toggle Global Restriction",],
      mutationFn: ToggleGlobalRestriction,
      onSuccess({message}) {
        toast.success(message)
        refetch()
      },
    });
};
export const useToggleIndividualBlockUser = () => {
  let {refetch} = useGetUsers()
  return useMutation({
    mutationKey: ["Toggle Individual Restriction",],
    mutationFn: (userId:string)=>ToggleBlockIndividualUser(userId),
    onSuccess({message}) {
      toast.success(message)
      refetch()
    },
    onError({response:{data:{message}}}){
      toast.error(message)
    }
  });
};

export default useToggleGlobalRestriction;
