import Axios from "@/app/Common/Axios"
const CreateTransaction = async <T>(payload:T) => {
        let response = await Axios.post("/transactions/",payload)
        return response.data
}

export default CreateTransaction