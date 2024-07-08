import ValidateUsername from "@/Api/Teacher&Classes/ValidateUsername.api"
import { useMutation } from "react-query"

const useValidateUsername = () => {

  return useMutation({mutationKey:["search","usename" ,],mutationFn:(username:string)=>ValidateUsername(username)})
}

export default useValidateUsername