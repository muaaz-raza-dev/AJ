
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const UpdatePhoto = async(photo:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.put("/dashboard/reset/photo",{photo},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default UpdatePhoto