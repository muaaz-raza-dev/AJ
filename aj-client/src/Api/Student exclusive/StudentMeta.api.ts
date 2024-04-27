import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
const StudentMeta = async(GRNO:string|number) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get(`/student/${GRNO}`,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}
export default StudentMeta
