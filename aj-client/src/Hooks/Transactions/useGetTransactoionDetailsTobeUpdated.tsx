import getRawTransactionDetails from "@/Api/Transaction/Transaction Compose/getRawTransactionDetails.api"
import { useAppDispatch } from "@/app/ReduxHooks"
import { RedTrcInsertFilters } from "@/app/Slices/TransactionComposeSlice";
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

export default function useFetchTransactionDetailsTobeUpdated(edit?:boolean,reset?:(val:any)=>void) {
        const dispatch =useAppDispatch();
        const invoice =useParams().invoice ||""
        return useQuery({queryKey:["Transaction",invoice],queryFn:()=>edit&&getRawTransactionDetails(invoice),
            refetchOnWindowFocus:false,
            onSuccess({payload}) {
                dispatch(RedTrcInsertFilters({FeeInfo:payload.FeeInfo}))               
                reset?.(payload.Transaction)
            },
         })
    }

