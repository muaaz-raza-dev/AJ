import RegisterStudent from "@/Api/Student Registeration/RegsiterStudent.api"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import useLoadGlobalState from "../Global/useLoadGlobalState"
const useRegisterStudent = (GRno:string|number,reset:()=>void) => {
  let {refetch} =useLoadGlobalState()
  let Registeration = useMutation({mutationKey:["Register",GRno],mutationFn:(FormState:IRegisterFormState)=>RegisterStudent(FormState) , onSuccess(data){
            reset()
            refetch()
            toast((t)=>{
              return <div className="hFont flex justify-between p-2">
                <p>
                # {data.payload.GRNO} {data.payload.FirstName} is registered successfully 
                </p>
                  <button onClick={()=>toast.dismiss(t.id)}></button>
               </div>
              
            },{position:"bottom-left"})
  }})
  return Registeration
}

export default useRegisterStudent
