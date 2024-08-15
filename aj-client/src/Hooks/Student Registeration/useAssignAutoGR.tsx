import AutoGRAssignment from "@/Api/Student Registeration/autoGRAssign.api";
import {  useAppSelector } from "@/app/ReduxHooks";
import { useEffect } from "react";
import { useQuery } from "react-query";

const useAssignAutoGR = (edit:boolean,setValue:(val1:string,val:string)=>void) => {
    const {autoGR} = useAppSelector(s=>s.global.AdvancedSettings)
    console.log(autoGR,edit)
    const query = useQuery({
        queryKey: ["Student GRNO","auto"],
        queryFn: () => autoGR&&!edit&&  AutoGRAssignment(),
        staleTime:1000*30, //30 seconds,
        refetchOnWindowFocus:false,
        refetchOnMount:true,
        onSuccess({payload}) {
            setValue("GRNO",payload)
        },
    });
    useEffect(() => {
       if(!query.data) query.refetch()
    }, [edit,autoGR])
    return query
};

export default useAssignAutoGR;
