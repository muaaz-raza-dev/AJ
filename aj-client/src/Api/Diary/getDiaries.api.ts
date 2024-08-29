
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
interface Ipayload {
    session: string; Class: string; section: string;date:string
}
const getDiaries = async(payload:Ipayload) => {
        const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        const response = await Axios.post("/diary/",payload,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default getDiaries