
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const FetchPaymentHistory = async(feeType:string,paymentConfig:string,studentId:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/history/get",{feeType,paymentConfig,studentId},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export const FetchDuesHistory = async(studentId:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/history/dues",{studentId},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default FetchPaymentHistory