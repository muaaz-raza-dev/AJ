import Axios from "@/app/Common/Axios"
import { Iteacher } from "@/app/Types/ITeacherRegisteration"
import Cookies from "js-cookie"

const RegisterTeacher = async(payload:Iteacher) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/dashboard/teacher_registeration",{payload},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default RegisterTeacher