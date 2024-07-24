import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const ReadStudents = async(count:number) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/students/",{count},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default ReadStudents