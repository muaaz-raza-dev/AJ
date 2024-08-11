import RegisterTeacher, { EditTeacher } from "@/Api/Teacher&Classes/RegisterTeacher.api"
import { Iteacher } from "@/app/Types/ITeacherRegisteration"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import {  useNavigate, useParams } from "react-router-dom"

const useTeacherRegsiter = (reset:()=>any) => {
  let Registeration = useMutation({mutationKey:["Register","Teacher"],mutationFn:(FormState:Iteacher)=>RegisterTeacher(FormState) ,
     onSuccess(){
    reset()
      toast.success("Staff Member is registered successfully.Now you can create account for him/her.")
  }
,onError() {
  toast("Somthing went wrong , try again later")
}
}

)
  return Registeration
}

export const useEditTeacher = () =>{
  let navigate = useNavigate()
  let id =useParams().id
  let Registeration = useMutation({mutationKey:["Edited",id,"Teacher",],mutationFn:(FormState:Iteacher)=>EditTeacher(FormState,id||"") ,
      onSuccess(){
      navigate("/dashboard")
 toast.success("Teacher and corresponding sections are edited 🎊")   
}})
   return Registeration
}

export default useTeacherRegsiter