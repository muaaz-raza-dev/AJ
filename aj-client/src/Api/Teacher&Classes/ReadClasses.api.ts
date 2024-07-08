import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

export const ReadClasses_short = async () => {
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.get("/dashboard/classes", { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}


export const ReadClasses_short_filtered = async (SessionId:string) => {
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.post("/dashboard/classes/filtered",{SessionId} ,{ headers: { token: Cookies.get(Secretkey) } })
    return response.data
}

export const ReadClasses_detailed = async (classId: string) => {
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.get(`/dashboard/class/${classId}`, { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}