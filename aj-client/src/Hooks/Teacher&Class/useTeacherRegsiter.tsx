import RegisterTeacher, { EditTeacher } from "@/Api/Teacher&Classes/RegisterTeacher.api"
import { Iteacher } from "@/app/Types/ITeacherRegisteration"
import { Button } from "antd"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { Link, useNavigate, useParams } from "react-router-dom"

const useTeacherRegsiter = (reset:()=>any) => {
  let Registeration = useMutation({mutationKey:["Register","Teacher"],mutationFn:(FormState:Iteacher)=>RegisterTeacher(FormState) ,
     onSuccess(data){
    reset()
            toast((t)=>{
              return <div className="hFont flex justify-between p-2 w-max">
                <b className="whitespace-nowrap">
                 {data.payload.FirstName}'s can access his/him account
                </b>
<div className="flex gap-4">
<Button  >
                  <Link to={`/Students/${data.payload.GRNO}`}  onClick={()=>toast.dismiss(t.id)}>Dismiss</Link>
</Button>
                  <Button   onClick={()=>toast.dismiss(t.id)}>Dismiss</Button>
</div>
               
               </div>
              
            },{position:"bottom-left"})
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