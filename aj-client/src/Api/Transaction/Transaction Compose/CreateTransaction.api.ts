import Axios from "@/app/Common/Axios"
const CreateTransaction = async <T>(payload:T) => {
        let response = await Axios.post("/transactions/",{payload})
        return response.data
}

export const CancelTransaction = async (id:string) => {
        let response = await Axios.put(`/transactions/cancel/${id}`,{})
        return response.data
}

export default CreateTransaction