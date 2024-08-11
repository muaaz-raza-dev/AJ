
import ResetCredentials from '@/Api/Auth/ResetCredentials.api'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const useResetCredentials = (Reset:(val:any)=>void) => {
  return useMutation({
    mutationKey: ['Reset Credentials'],
    mutationFn:({username,isUpdatePassword,newPassword,currentPassword}:{username:string,isUpdatePassword:boolean,newPassword:string,currentPassword:string})=> {return ResetCredentials(currentPassword,newPassword,username,isUpdatePassword)},
    onSuccess({message,payload}) {
      toast.success(message)
      Reset({
        Info:{
          ...payload
        },
        isLoaded:false,
        isVerified: false,
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