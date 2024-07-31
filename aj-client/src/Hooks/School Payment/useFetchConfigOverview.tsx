import GetConfigOverview from '@/Api/School Payment/GetConfigOverview.api';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const useFetchConfigOverview = () => {
    let id =useParams().id || ""
    return useQuery({
        queryKey: [ "Payment","Config",id],
        refetchOnWindowFocus:false,
        staleTime:1000,
        queryFn:()=> GetConfigOverview(id),
        onError({response:{data:{message}}}) {
        toast.error(message)
        },
      });
}

export default useFetchConfigOverview