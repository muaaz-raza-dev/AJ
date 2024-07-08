import Axios from "@/app/Common/Axios"
import { Isessions } from "@/app/Types/Isessions"
import Cookies from "js-cookie"
const RegisterSession = async(RegisterForm:Isessions) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/session/register",{payload:RegisterForm},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default RegisterSession
