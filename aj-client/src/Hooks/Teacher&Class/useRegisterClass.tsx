import RegisterClass from '@/Api/Teacher&Classes/RegisterClass.api'
import { Iclass } from '@/app/Types/Iclass'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const useRegisterClass = (reset:()=>void) => {
    let Registeration = useMutation({mutationKey:["Register","Class"],mutationFn:(FormState:Iclass)=>RegisterClass(FormState) ,
        onSuccess(){
            reset()
   toast.success("Class and corresponding sections are registerd 🎊")   
}})
     return Registeration
}

export default useRegisterClass