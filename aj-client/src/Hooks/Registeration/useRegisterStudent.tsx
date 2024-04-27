import RegisterStudent from "@/Api/Student Registeration/RegsiterStudent.api"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import useLoadGlobalState from "../Global/useLoadGlobalState"
import { Button } from "antd"
import { Link } from "react-router-dom"
const useRegisterStudent = (GRno:string|number,reset:()=>void) => {
  let {refetch} =useLoadGlobalState()
  let Registeration = useMutation({mutationKey:["Register",GRno],mutationFn:(FormState:IRegisterFormState)=>RegisterStudent(FormState) , onSuccess(data){
            reset()
            refetch()
            toast((t)=>{
              return <div className="hFont flex justify-between p-2">
                <b className="whitespace-nowrap">
                # {data.payload.GRNO} {data.payload.FirstName} is registered successfully 
                </b>
<div className="flex gap-4">
<Button  >
                  <Link to={`/Students/${data.payload.GRNO}`}  onClick={()=>toast.dismiss(t.id)}>Dismiss</Link>
</Button>
                  <Button   onClick={()=>toast.dismiss(t.id)}>Dismiss</Button>
</div>
               
               </div>
              
            },{position:"bottom-left"})
  }})
  return Registeration
}

export default useRegisterStudent
