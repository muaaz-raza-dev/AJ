import Axios from "@/app/Common/Axios"
import { IclassPaymentConfig } from "@/app/Types/IclassPaymentConfig"
import Cookies from "js-cookie"

const UpdateClassPaymentConfig = async(payload:IclassPaymentConfig) => {
    let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.put(`/dashboard/class/paymentConfigs`,{...payload},{headers:{token:Cookies.get(Secretkey)}})
    return response.data
}

export default UpdateClassPaymentConfig