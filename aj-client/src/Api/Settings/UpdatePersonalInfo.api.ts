
import Axios from "@/app/Common/Axios"
import { IStaffInformationEditForm } from "@/app/Types/IStaffInformation_Settings"
import Cookies from "js-cookie"

const UpdatePersonalInfo = async(payload:IStaffInformationEditForm) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.put("/dashboard/update/mutableInfo/personal",{payload},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default UpdatePersonalInfo