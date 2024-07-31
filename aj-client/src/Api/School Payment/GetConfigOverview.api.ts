
import Axios from "@/app/Common/Axios"
import Cookies from "js-cookie"
interface IpaymentResponse{
        feeTitle: string;
        session?: {session_name:string;acedmic_year:string;}; // Reference to YearlySession
        feeDescription?: string; // Optional
        feeFrequency: 'Monthly' | 'Yearly' | 'One Time' | "Custom"; // Required
        feeStatus: 'Same amount for every Class' | 'Different amount for every Class'; // Required
        classes: Array<{
            classId: {name:string;_id:string}; // Reference to Classes
            amount: number;
        }>; // Required
        paymentMonths?: Array<{
            year: string;
            month: string;
        isPayment: boolean;
            dueDate: string; // Required
            paymentDate: string; // Required
        }>; // Optional
        paymentDate?:string,
        dueDate?:string ;
        feeAmount?:string;
        isDeprecated:boolean;
        deprecateDate:string
}
interface Istats{
    totalStudents:number,AveragePerStudent:number,TotalPerMonth:number,TotalPerYear:number
}
const GetConfigOverview = async(id:string) => {
        let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
        let response = await Axios.get<{payload:IpaymentResponse,stats:Istats}>(`/payments/config/${id}`,{headers:{token:Cookies.get(Secretkey)}})
        return response.data
}

export default GetConfigOverview