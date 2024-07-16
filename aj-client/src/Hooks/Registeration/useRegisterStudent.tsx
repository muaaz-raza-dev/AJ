import RegisterStudent from "@/Api/Student Registeration/RegsiterStudent.api"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import useLoadGlobalState from "../Global/useLoadGlobalState"
const useRegisterStudent = (GRno:string|number,reset:()=>void) => {
  let {refetch} =useLoadGlobalState()
  let Registeration = useMutation({mutationKey:["Register",GRno],
    mutationFn:
    (payload:IRegisterFormState)=>{
      return RegisterStudent(payload) },
     onSuccess(data){
            reset()
            refetch()
          toast(data.message)
  }})
  return Registeration
}

export default useRegisterStudent
