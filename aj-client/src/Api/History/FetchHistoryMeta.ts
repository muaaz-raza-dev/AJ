
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const FetchHistoryMeta = async(id:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get(`/history/meta/${id}`,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default FetchHistoryMeta