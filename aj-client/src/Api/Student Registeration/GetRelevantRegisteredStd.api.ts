
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const GetRelevantRegisteredStd = async(q:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post<{payload:{FirstName:string;LastName:string;GRNO:string}[]}>(`/students/name/search/`,{q},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default GetRelevantRegisteredStd