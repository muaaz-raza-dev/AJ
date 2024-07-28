
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
interface IstatRate {
    Percentage:number;
    rate:"negative"|"positive"|"zero"
}
interface IgeneralStats  {
    totalStudents:{total:number,rate:IstatRate};
    newAdmissions:{total:number,rate:IstatRate};
    MonthlyRevenue:{total:number,rate:IstatRate};
    PendingPayments:{total:number,rate:IstatRate};
    Dates :{[key:string]:string[]}
}
const GeneralStats = async() => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get<{payload:IgeneralStats}>("/stats/",{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default GeneralStats