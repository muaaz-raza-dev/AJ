import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"

const AdvancedFilters = async(Filters:{Class:string,Polio:boolean,Covid:boolean},count:number) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.post("/students/filters",{Filters,count},{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default AdvancedFilters