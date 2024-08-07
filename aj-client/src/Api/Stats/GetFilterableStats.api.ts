
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const GetFilterableStats = async(Filters:{PaymentConfig:string,
        month:string,
        feeFrequency:"Monthly"|"Yearly"|"Custom"|"One Time",
        year:string,
        Class:string,
        Session:string}) => {
let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
let response = await Axios.post("/stats/advanced",Filters,{headers:{token:Cookies.get(Secretkey)}})
return response.data
}

export default GetFilterableStats