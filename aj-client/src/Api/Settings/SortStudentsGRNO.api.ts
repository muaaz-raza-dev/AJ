
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const SortStudentsGRNO = async() => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.put("settings/advanced/sort/grno",{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default SortStudentsGRNO