import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const ValidateUsername = async(username:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/dashboard/validate/username",{username},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default ValidateUsername