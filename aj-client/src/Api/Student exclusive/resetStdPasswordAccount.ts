

import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const resetStdAccPassword = async(Account_id:string,password:string) => {
        const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        const response = await Axios.put("/students/account/reset/password",{id:Account_id,password},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default resetStdAccPassword