
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
interface IfiltersPayload {
        sessions: { [key: string]: string }; classes: { [key: string]: { [key: string]: string } }; sections: { [key: string]: { [key: string]: string } } 
}
interface IdefaultState {
        session: string; classId: string; sectionId: string;
}
const getDiaryFiltersMeta = async() => {
        const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY

        const response = await Axios.get<{payload:{filters:IfiltersPayload,defaultState:IdefaultState}}>("/diary/meta",{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default getDiaryFiltersMeta