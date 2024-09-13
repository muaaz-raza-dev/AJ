
import Axios from "@/app/Common/Axios"
import { IadvancedActions } from "@/app/Types/Iglobal"
import Cookies from "js-cookie"

const GetAdvancedActions = async() => {
        const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        const response = await Axios.get("/settings/advanced/",{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}
export const UpdateAdvancedActions = async (adv:IadvancedActions)=>{
    const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    const response = await Axios.put("/settings/advanced/",adv,{headers:{token:Cookies.get(Secretkey)}})
    return response.data
}
export default GetAdvancedActions