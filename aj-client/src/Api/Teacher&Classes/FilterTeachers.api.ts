import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const FilterTeachers_EH = async (type:string) => {
    let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    let response = await Axios.post(`/dashboard/teachers/filtered`, {type},{ headers: { token: Cookies.get(Secretkey) } })
    return response.data
}

export default FilterTeachers_EH