
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const ResetCredentials = async(payload:{username:string;Name:string;email?:string;isUpdatePassword:boolean,newPassword:string,currentPassword:string}) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.put("/auth/update",{...payload},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default ResetCredentials