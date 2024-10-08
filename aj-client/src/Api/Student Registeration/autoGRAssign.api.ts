import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const AutoGRAssignment = async() => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get("/studentRegisteration/autoGR",{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default AutoGRAssignment