
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const GetStdFeeReport = async(payload:{
    PaymentConfig:string,
    Type:"Pending"|"Paid",
    Month:string,
    FeeFrequency:"Monthly"|"Yearly"|"Custom"|"One Time",
    Year:string,
    Class:string,
    Session:string
}) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/stats/report/std",payload,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default GetStdFeeReport
