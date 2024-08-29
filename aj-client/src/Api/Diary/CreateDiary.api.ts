
import Axios from "@/app/Common/Axios"
import { IdiaryCreate } from "@/app/Types/IdiaryCreate"
import Cookies from "js-cookie"

const CreateDiary = async (payload: IdiaryCreate) => {
    const Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    const response = await Axios.post("/diary/upload", {payload}, { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}

export default CreateDiary