import ReadSessions from '@/Api/Session/ReadSession';
import { useAppDispatch } from '@/app/ReduxHooks';
import { RedSesInsertPayload } from '@/app/Slices/SessionSlice';
import { useQuery } from 'react-query';

const useFetchSessions = () => {
    let dispatch = useAppDispatch()
    return useQuery({
        queryKey: [ "sessions"],
        queryFn:  ReadSessions,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        onSuccess(data) {
            dispatch(RedSesInsertPayload({type:"Sessions",Original:data.payload,Filtered:data.payload}))
        },
      });
}

export default useFetchSessions