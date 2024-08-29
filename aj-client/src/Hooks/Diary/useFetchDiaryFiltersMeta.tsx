
import getDiaryFiltersMeta from "@/Api/Diary/getDiaryFiltersMeta.api"
import { useAppDispatch } from "@/app/ReduxHooks";
import { ReddlInsertFilters } from "@/app/Slices/DiarySlice";
import { useQuery } from "react-query"

const useFetchDiaryMeta = ()=>{
    const dispatch = useAppDispatch();
    return useQuery({queryKey:"Diary Meta Data",queryFn:getDiaryFiltersMeta,refetchOnWindowFocus:false,staleTime:1000*60*5 ,
        onSuccess({payload}) {
        dispatch(ReddlInsertFilters({type:"available",...payload.filters}))    
        dispatch(ReddlInsertFilters({type:"selected",...payload.defaultState}))    
        },

    })
}
export default useFetchDiaryMeta