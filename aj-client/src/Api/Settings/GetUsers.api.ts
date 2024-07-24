import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
export interface Iuser{
    _id:string,
    Name:string,
    username:string,
    photo:string;
    Role:string,
    StaffId:{acedmic_role:string};
    LastLogin:string;
    isBlocked:boolean
}
const GetUsers = async() => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get<{payload:{Users:Iuser[],isTemporaryBlocked:boolean}}>("/users",{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default GetUsers