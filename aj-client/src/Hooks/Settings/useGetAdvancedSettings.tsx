import GetAdvancedActions from '@/Api/Settings/AdvancedActions.api'
import { useAppDispatch } from '@/app/ReduxHooks'
import { InsertGlobalValues } from '@/app/Slices/globalSlice'
import { useQuery } from 'react-query'

const useGetAdvancedSettings = () => {
    const dispatch  =useAppDispatch()
    return useQuery({
        queryKey: ['account-info'],
        queryFn: GetAdvancedActions,
        refetchOnMount:true,
        refetchOnWindowFocus:false,
        onSuccess({payload}) {
            dispatch(InsertGlobalValues({AdvancedActions:payload}))
        },
      },
      
    )
}

export default useGetAdvancedSettings