
import Axios from "@/app/Common/Axios"
import { Idiary } from "@/app/Types/Idiary"
import Cookies from "js-cookie"
interface IdiaryDetailed extends Idiary{
sections:{[key:string]:{_id:string;name:string;Class:string}[]}
}
const getDetailedDiary = async(id:string) => {
        const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        const response = await Axios.get<{payload:IdiaryDetailed}>(`/diary/${id}`,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default getDetailedDiary
