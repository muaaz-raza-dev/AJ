import { ReadClasses_detailed } from '@/Api/Teacher&Classes/ReadClasses.api';
import { useAppDispatch } from '@/app/ReduxHooks';
import { RedCDInsertPayload } from '@/app/Slices/ClassDetailedSlice';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const useFetchClassDetaills = () => {
    let dispatch = useAppDispatch();
    let params =useParams().id
    return useQuery({
      queryKey: [ "Class", ,params],
      refetchOnWindowFocus:false,
      staleTime:1000*10,
      queryFn:()=>ReadClasses_detailed(params||""),
      onSuccess({payload}) {
          dispatch(RedCDInsertPayload({payload}));
        },
    
    });
}

export default useFetchClassDetaills