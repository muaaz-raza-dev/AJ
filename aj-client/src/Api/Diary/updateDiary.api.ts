
import Axios from "@/app/Common/Axios"
import { IdiaryCreate } from "@/app/Types/IdiaryCreate"
import Cookies from "js-cookie"

const EditDiary = async (id:string,payload: IdiaryCreate) => {
    const Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY
    const response = await Axios.put(`/diary/edit/${id}`, {payload}, { headers: { token: Cookies.get(Secretkey) } })
    return response.data
}

export default EditDiary