
import Axios from "@/app/Common/Axios"
import { ItransactionReadFilters } from "@/app/Types/ItransactionsRead"
const ReadTransactions =async (filters:ItransactionReadFilters) => {

    let response = await Axios.post("/transactions/read",filters)
    return response.data
}

export default ReadTransactions
