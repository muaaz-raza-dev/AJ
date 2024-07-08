import Axios from "@/app/Common/Axios"
import { Iclass } from "@/app/Types/Iclass"
import Cookies from "js-cookie"

const RegisterClass = async (payload: Iclass) => {
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.post("/dashboard/class/register", { payload }, { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}
export const EditClass =async (payload:Iclass ,id:string)=> {
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.post("/dashboard/class/edit", { payload ,id }, { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}

export default RegisterClass