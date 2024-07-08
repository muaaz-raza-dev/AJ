import RegisterClass, { EditClass } from '@/Api/Teacher&Classes/RegisterClass.api'
import { Iclass } from '@/app/Types/Iclass'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

const useRegisterClass = (reset:()=>void) => {
    let Registeration = useMutation({mutationKey:["Register","Class"],mutationFn:(FormState:Iclass)=>RegisterClass(FormState) ,
        onSuccess(){
            reset()
   toast.success("Class and corresponding sections are registerd 🎊")   
}})
     return Registeration
}



export const useEditClass = () => {
    let navigate = useNavigate()
    let id =useParams().id
    let Registeration = useMutation({mutationKey:["Edit","Class"],mutationFn:(FormState:Iclass)=>EditClass(FormState,id||"") ,
        onSuccess(){
        navigate("/dashboard")
   toast.success("Class and corresponding sections are edited 🎊")   
}})
     return Registeration
}


export default useRegisterClass