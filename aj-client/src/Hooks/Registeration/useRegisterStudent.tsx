import RegisterStudent from "@/Api/Student Registeration/RegsiterStudent.api"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
const useRegisterStudent = (GRno:string|number,reset:()=>void) => {
  let Registeration = useMutation({mutationKey:["Register",GRno],
    mutationFn:(payload:IRegisterFormState)=> RegisterStudent(payload) ,
     onSuccess(data){
            reset()
          toast.success(data.message)
  } ,onError(){
    toast("An error occured. Try again later...")
  }
})
  return Registeration
}

export default useRegisterStudent
