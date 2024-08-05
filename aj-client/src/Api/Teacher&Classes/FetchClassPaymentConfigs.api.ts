
import Axios from "@/app/Common/Axios"
import { IclassPaymentConfig } from "@/app/Types/IclassPaymentConfig"
import Cookies from "js-cookie"

interface IclassPaymentConfigRes{
        payload : {
                Configs:IclassPaymentConfig;
        ClassDetails:{name:string;_id:string;SessionId:{session_name:string;acedmic_year:string}} }
}

const FetchClassPaymentConfig = async(id:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get<IclassPaymentConfigRes>(`/dashboard/paymentConfigs/${id}`,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default FetchClassPaymentConfig