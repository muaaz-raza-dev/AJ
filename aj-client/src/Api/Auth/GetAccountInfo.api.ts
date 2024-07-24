
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const GetAccountDetails = async() => {
let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
let response = await Axios.get("/auth/info",{headers:{token:Cookies.get(Secretkey)}})
return response.data
}

export default GetAccountDetails