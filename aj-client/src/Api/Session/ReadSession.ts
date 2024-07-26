import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
const ReadSessions= async() => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get("/session",{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}


export const ReadSession= async(id:string) => {
let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
let response = await Axios.get(`/session/${id}`,{headers:{token:Cookies.get(Secretkey)}})
return response.data
}

export default ReadSessions
