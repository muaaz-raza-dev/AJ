import { Fetch_PersonalInfo } from '@/Api/Teacher&Classes/ReadTeachers.api'
import { useAppSelector } from '@/app/ReduxHooks'
import { useQuery } from 'react-query'

const useGetPersonalInformation = (Reset?:(b:any)=>void) => {
    let {_id:id} =useAppSelector(s=>s.credits.Info)
    return useQuery({
        queryKey: ['Personal-info',id],
        queryFn:()=> Fetch_PersonalInfo(id),
        staleTime: 1000*60*5,  // 5 minutes
        refetchOnWindowFocus:false,
        onSuccess({payload}) {
            Reset&&Reset(payload)
        },
      })
}

export default useGetPersonalInformation