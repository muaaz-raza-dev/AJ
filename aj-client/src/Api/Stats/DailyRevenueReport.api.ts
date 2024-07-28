
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const DailyRevenueReport = async(date:{year:string,month:string}) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/stats/daily/revenue/report",{date},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default DailyRevenueReport