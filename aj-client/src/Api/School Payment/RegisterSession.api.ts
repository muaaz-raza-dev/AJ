import Axios from "@/app/Common/Axios"
import IpaymentConfig from "@/app/Types/IPaymentConfig"
import Cookies from "js-cookie"
const RegisterPaymentConfigBlock =async (payload:IpaymentConfig) => {
    let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.post("/payments/config/register",{payload},{headers:{token:Cookies.get(Secretkey)}})
    return response.data
}
export const UpdatePaymentConfigBlock =async (payload:IpaymentConfig,id:string) => {
    let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.put("/payments/config/update",{id,payload},{headers:{token:Cookies.get(Secretkey)}})
    return response.data
}
export default RegisterPaymentConfigBlock