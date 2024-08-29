import RegisterStudent from "@/Api/Student Registeration/RegsiterStudent.api"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import useAssignAutoGR from "./useAssignAutoGR"
import { UseFormSetValue } from "react-hook-form"
const useRegisterStudent = (GRno:string|number,reset:()=>void,setValue:UseFormSetValue<IRegisterFormState>) => {
  const {refetch } = useAssignAutoGR(false,setValue);
  const Registeration = useMutation({mutationKey:["Register",GRno],
    mutationFn:(payload:IRegisterFormState)=> RegisterStudent(payload) ,
     onSuccess(data){
       reset()
       toast.success(data.message)
       setTimeout(() => {
         refetch()
       }, 500);
  } ,onError(){
    toast("An error occured. Try again later...")
  }
})
  return Registeration
}

export default useRegisterStudent
