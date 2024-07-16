
import Axios from "@/app/Common/Axios"
import { ItransactionDetail } from "@/app/Types/ItransactionDetail"
import { ItransactionReadFilters } from "@/app/Types/ItransactionsRead"
const ReadTransactions =async (filters:ItransactionReadFilters) => {

    let response = await Axios.post("/transactions/read",filters)
    return response.data
}

export const FetchTransactionDetails =async (id:string) => {
    let response = await Axios.get <{success:false,payload:ItransactionDetail}>(`/transactions/${id}`)
    return response.data
}
export default ReadTransactions
