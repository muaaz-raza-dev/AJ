import Axios from "@/app/Common/Axios"
export interface ItransactionConfig{
    month?:string,Monthly:string,Annual:string,dueDate:string,
}
const SetTransactionsConfig = async(payload:ItransactionConfig) => {
    let response = await Axios.post("/transactions/config",payload)
    return response.data
}
export default SetTransactionsConfig