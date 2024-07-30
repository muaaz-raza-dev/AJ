import Cookies from "js-cookie";
import Axios from "@/app/Common/Axios"
const ReadTransactionsMeta = async() => {
  let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY;

    let response = await Axios.get("/transactions/meta",{ headers: { token: Cookies.get(Secretkey) } })
    return response.data
}
export default ReadTransactionsMeta
