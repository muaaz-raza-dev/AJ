import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const toggleStdAccountRestriction = async(id:string) => {
        const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        const response = await Axios.put(`/students/account/block/${id}`,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default toggleStdAccountRestriction