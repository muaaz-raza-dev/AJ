import Axios from "@/app/Common/Axios"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import Cookies from "js-cookie"

const RegisterStudent = async(RegisterForm:IRegisterFormState) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/studentRegisteration/register",{...RegisterForm,},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default RegisterStudent
