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
export const Fetch_Required_Info = async (type?:string) => { //fetching names with its ids as value pairs
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.get(`/dashboard/class/required/${type}`, { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}

export const Fetch_Class_Raw= async (id?:string) => {      //!fetching class pre written details for edit feature
    if(id){
        let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get(`/dashboard/class/raw/${id}`, { headers: { token: Cookies.get(Secretkey) } })
        return response.data
    }
}
export const Fetch_Teacher_Raw= async (id?:string) => {      //!fetching class pre written details for edit feature
    if(id){
        let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get(`/dashboard/teacher/raw/${id}`, { headers: { token: Cookies.get(Secretkey) } })
        return response.data
    }
}

export const Fetch_PersonalInfo= async (id?:string) => {       
        let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get(`/dashboard/staff/raw/${id}`, { headers: { token: Cookies.get(Secretkey) } })
        return response.data
}


export default ReadTeachers_short