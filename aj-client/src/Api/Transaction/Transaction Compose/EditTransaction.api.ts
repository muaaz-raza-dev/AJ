import Axios from "@/app/Common/Axios"
import { ItransactionForm } from "@/app/Types/ItransactionForm";
import Cookies from "js-cookie"

export default async function UpdateTransaction(invoice:string,payload:ItransactionForm) {
  const Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY;
  const response = await Axios.put("/transactions/update",{invoice,payload},{headers:{token:Cookies.get(Secretkey)}})
  return response.data
}
