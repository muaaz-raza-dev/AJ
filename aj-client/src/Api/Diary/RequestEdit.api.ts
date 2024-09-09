
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const requestEditDiary = async(id:string) => {
        const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        const response = await Axios.get(`/diary/edit/${id}`,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default requestEditDiary