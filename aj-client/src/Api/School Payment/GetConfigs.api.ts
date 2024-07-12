import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
const FetchConfigs =async (session:string,feeScope:string) => {
    let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.post("/payments/config/configs",{session ,feeScope},{headers:{token:Cookies.get(Secretkey)}})
    return response.data
}
export const FetchConfigDetailed =async (id:string) => {
    let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.get(`/payments/config/get/${id}`,{headers:{token:Cookies.get(Secretkey)}})
    return response.data
}


export default FetchConfigs