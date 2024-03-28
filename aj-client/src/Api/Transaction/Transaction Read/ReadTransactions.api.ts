
import Axios from "@/app/Common/Axios"
const ReadTransactions =async (filters:any) => {
    let response = await Axios.post("/transactions/",filters)
    return response.data
}

export default ReadTransactions
