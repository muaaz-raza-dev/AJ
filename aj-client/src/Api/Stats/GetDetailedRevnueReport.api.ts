
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const GetDetailedRevenueReport = async(Dates : {start:string,end:string}) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/stats/detailed/revenue",{Dates},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default GetDetailedRevenueReport