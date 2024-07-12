import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
const ReadSessions_Payment_Mod= async() => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get("/payments/config/sessions",{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}
export default ReadSessions_Payment_Mod
