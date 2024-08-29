import AutoGRAssignment from "@/Api/Student Registeration/autoGRAssign.api";
import {  useAppSelector } from "@/app/ReduxHooks";
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

const useAssignAutoGR = (edit:boolean,setValue:UseFormSetValue<IRegisterFormState>) => {
    const {autoGR} = useAppSelector(s=>s.global.AdvancedSettings)
    const query = useQuery({
        queryKey: ["Student GRNO","auto"],
        queryFn: () => autoGR&&!edit&&  AutoGRAssignment(),
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
