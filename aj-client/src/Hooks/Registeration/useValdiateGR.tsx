import ValidateGR from "@/Api/Student Registeration/GRvalidation.api"
import { useMutation } from "react-query"
const useValidateGRno = (GR?:number) => {
  let Validation = useMutation({mutationKey:["GR validation",GR],mutationFn:(GR:number|string)=>ValidateGR(GR),onError(error:any, ) {
      Validation.data = error.response.data
  }, },
  )
  return Validation
}

export default useValidateGRno
