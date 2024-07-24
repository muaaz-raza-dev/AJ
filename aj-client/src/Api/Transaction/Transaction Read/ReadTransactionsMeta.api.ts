
import Axios from "@/app/Common/Axios"
const ReadTransactionsMeta = async() => {
    let response = await Axios.get("/transactions/meta")
    return response.data
}
export default ReadTransactionsMeta
