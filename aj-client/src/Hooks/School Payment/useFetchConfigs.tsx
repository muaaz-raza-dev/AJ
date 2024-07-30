import FetchConfigs, { FetchConfigDetailed } from '@/Api/School Payment/GetConfigs.api';
import { useAppDispatch } from '@/app/ReduxHooks';
import { RedLPFilters, RedLPpayload } from '@/app/Slices/LPaymentConfigSlice';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const useFetchConfigs = () => {
  let dispatch = useAppDispatch()
    let Registeration = useMutation({
        mutationKey: ["Fetch", "Configs" ],
        mutationFn: ({session,feeTypes}: {session:string,feeTypes:string}) => FetchConfigs(session,feeTypes),
        onSuccess({payload}) {
          dispatch(RedLPpayload({payload,isLoading:false}))
        },
      });
      return Registeration;
}
export const useFetchConfigDetailed = (reset:(payload:any)=>void) => {
  let id = useParams().id
  let dispatch  =useAppDispatch()
  if(id){
    let Registeration = useQuery({
      queryKey: ["Fetch", "Config" , id],
      queryFn: () =>{
        dispatch (RedLPFilters({label:"feeTypes",register:{isLoading:true}}))
        return FetchConfigDetailed(id||"")
      },
      refetchOnWindowFocus:false,
      staleTime: 1000 ,
      onSuccess({payload}) {
        setTimeout(() => {
          reset((e:any)=>({...e,payload}))
          dispatch (RedLPFilters({label:"feeTypes",register:{isLoading:false}}))
        }, 100);
        
      },
    });
    return Registeration;
  }
}

export default useFetchConfigs