import UpdatePersonalInfo from '@/Api/Settings/UpdatePersonalInfo.api';
import { IStaffInformationEditForm } from '@/app/Types/IStaffInformation_Settings';
import toast from 'react-hot-toast';
import { useMutation } from "react-query";

const useUpdatePersonalInformation = () => {
      return useMutation({
        mutationKey: ["Personla profile Info"],
        mutationFn: (payload:IStaffInformationEditForm) => UpdatePersonalInfo(payload), 
        onSuccess() {
            toast.success("Personal Profile Updated Successfully🎉");
        },
        onError() {
            toast.error("An error occurred while updating personal profile. Please try again.");
        }
    }
        
    )
  
  
}

export default useUpdatePersonalInformation