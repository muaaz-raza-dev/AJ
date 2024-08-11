import GetAccountDetails from '@/Api/Auth/GetAccountInfo.api'
import { defaultAccountInfo } from '@/app/Types/IAccountInfo'
import { useQuery } from 'react-query'

const useGetAccountInfo = (Reset?:(val:any)=>void) => {
  return useQuery({
    queryKey: ['account-info'],
    queryFn: GetAccountDetails,
    refetchOnMount:true,
    refetchOnWindowFocus:false,
    onSuccess({payload}) {
        Reset&&Reset({...defaultAccountInfo,Info:{username:payload.username,Role:payload.Role,photo:payload.photo},isLoaded:true})
    },
  },
  
)
}

export default useGetAccountInfo