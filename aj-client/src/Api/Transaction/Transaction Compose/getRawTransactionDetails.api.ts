

import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const getRawTransactionDetails = async(Invoice:string) => {
        const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY;
        const response = await Axios.get(`/transactions/raw/${Invoice}`,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default getRawTransactionDetails