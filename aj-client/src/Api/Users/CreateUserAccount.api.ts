
import Axios from "@/app/Common/Axios"
import { IaccountRegister } from "@/app/Types/IAccountRegister"
import Cookies from "js-cookie"

const CreateUserAccount = async(payload:IaccountRegister) => {
        let Secretkey  = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/users/create",{payload},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}
export const UpdateUserAccount = async(payload:IaccountRegister,id:string) => {
        let Secretkey  = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.put(`/users/${id}`,{payload},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}
export default CreateUserAccount