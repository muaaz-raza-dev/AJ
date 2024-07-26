import ReadSessions, { ReadSession } from '@/Api/Session/ReadSession';
import { useAppDispatch } from '@/app/ReduxHooks';
import { RedSesInsertPayload } from '@/app/Slices/SessionSlice';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

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

export const useFetchSession = (Set:(a:any)=>void) => {
    let id =useParams().id ||''
        return useQuery({
            queryKey: [ "session",id],
            queryFn:  ()=>id&&ReadSession(id),
            refetchOnMount:true,
            refetchOnWindowFocus: false,
            onSuccess(data) {
                Set(data.payload)
            },
        });
}


export default useFetchSessions