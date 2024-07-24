
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const ResetCredentials = async(currentPassword:string,newPassword:string,username:string,isUpdatePassword:boolean) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.put("/auth/update",{currentPassword,newPassword,username,isUpdatePassword},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default ResetCredentials