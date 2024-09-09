
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
export interface IstdAccount {
    _id:string;
    Name:string;
    email?:string;
    LastLogin:string;
    isBlocked:boolean;
}
const getStdAccountInfo = async(grno:string) => {
    const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    const response = await Axios.get<{payload:IstdAccount}>(`/students/account/${grno}`,{headers:{token:Cookies.get(Secretkey)}})
    return response.data
}

export default getStdAccountInfo