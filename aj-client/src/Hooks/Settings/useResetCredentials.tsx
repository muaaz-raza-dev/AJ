
import ResetCredentials from '@/Api/Auth/ResetCredentials.api'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const useResetCredentials = (Reset:(val:any)=>void) => {
  return useMutation({
    mutationKey: ['Reset Credentials'],
    mutationFn:(payload:
      {username:string;Name:string;email?:string;isUpdatePassword:boolean,newPassword:string,currentPassword:string})=> {return ResetCredentials(payload)},
    onSuccess({message}) {
      toast.success(message)
      Reset({
        isUpdatePassword: false,
        Passwords: {
            currentPassword: '',
            newPassword: ''
        }})
    },
    onError({response:{data:{message}}}){
      toast.error(message)
     }
  },
  
)
}


export default useResetCredentials