import Axios from "@/app/Common/Axios"
import { CookieKey } from "@/app/Common/DefaultCredits"
import Cookies from "js-cookie"
export interface LoginPayload  {usernameOrEmail:string, password:string}
const Authenticate =async() => {
 let response = await Axios.get("/auth/authenticate",{
    headers:{"auth-token":Cookies.get(CookieKey)}})
 return response.data
}

export default Authenticate