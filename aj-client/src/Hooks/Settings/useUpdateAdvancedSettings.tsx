import  { UpdateAdvancedActions } from "@/Api/Settings/AdvancedActions.api";
import { useAppDispatch } from "@/app/ReduxHooks";
import { InsertGlobalValues } from "@/app/Slices/globalSlice";
import { IadvancedActions } from "@/app/Types/Iglobal";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useGetUsers from "./useGetUsers";

const useUpdateAdvancedSettings = () => {
  const dispatch = useAppDispatch()
  const {refetch} =useGetUsers()
    return useMutation({
      mutationKey: ["Advanced Settings"],
      mutationFn: (adv:IadvancedActions) => UpdateAdvancedActions(adv),
      onSuccess({payload}) {
        dispatch(InsertGlobalValues({AdvancedActions:payload}))
        refetch()
      },
      onError({response:{data:{message}}}) {
        toast.error(message)
      },
    });
};

export default useUpdateAdvancedSettings;
