
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const MonthlyRevenueReport = async(duration:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/stats/monthly/revenue/report",{duration},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default MonthlyRevenueReport