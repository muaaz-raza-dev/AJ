import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const ReadTeachers_short = async () => {
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.get("/dashboard/teachers", { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}

export const ReadTeachers_detailed = async (teacherId: string) => {
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.get(`/dashboard/teacher/${teacherId}`, { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}
export const Fetch_Teachers_Names = async () => { //fetching names with its ids as value pairs
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.get(`/dashboard/teachers/all`, { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}
export default ReadTeachers_short