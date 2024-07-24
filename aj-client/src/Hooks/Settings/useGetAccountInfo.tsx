import GetAccountDetails from '@/Api/Auth/GetAccountInfo.api'
import { useQuery } from 'react-query'

const useGetAccountInfo = (Reset?:(val:any)=>void) => {
  return useQuery({
    queryKey: ['account-info'],
    queryFn: GetAccountDetails,
    refetchOnMount:true,
    refetchOnWindowFocus:false,
    onSuccess({payload}) {
        Reset&&Reset({Info:{username:payload.username,Role:payload.Role,photo:payload.photo},isLoaded:true})
    },
  },
  
)
}

export default useGetAccountInfo