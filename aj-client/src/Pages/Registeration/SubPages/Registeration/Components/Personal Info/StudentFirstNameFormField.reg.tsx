import { useFormContext ,Controller } from "react-hook-form";
import RegLabelWrapper from "../LabelWrapper.reg";
import { Input } from "antd";
import { FaUsersRays } from "react-icons/fa6";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shdcn/components/ui/hover-card"
import { useDebouncedCallback } from "use-debounce";
import useFetchRegisteredStdName from "@/Hooks/Student Registeration/useFetchRegisteredStdName";
import { FC } from "react";
import { UseMutationResult } from "react-query";
import RequestLoading from "@/Global/Loaders/RequestLoding";
  
const StudentFirstNameFormField = () => {
    let { control } = useFormContext();
    const query = useFetchRegisteredStdName() 
    const debounced = useDebouncedCallback(
        // function
        (value) => {
            query.mutate(value)
        },
        // delay in ms
        1000
      );
  return (
    <RegLabelWrapper className="w-[48%] self-end" title="First Name">
    <Controller
      rules={{required:"First Name is required"}}
      name="FirstName"
      control={control}
      render={({ field ,fieldState:{error} }) => (
        <>
        <div className="flex justify-between gap-2 bg-box border rounded-md items-center">
        <Input {...{...field,onChange:(e)=>{field.onChange(e);debounced(e.target.value)}}}  placeholder="Osman" className="active:border-[var(--dark)] border-none  dark:bg-dark dark:border-darker
         dark:text-white  dark:placeholder:text-gray-600" />
       <RegisteredStdInfo query={query}/>
        </div>
        {
            error && <p className="text-red-500 text-xs">{error.message}</p>
        }
        </>
      )}
    />
  </RegLabelWrapper>
  )
}

const RegisteredStdInfo:FC<{query: UseMutationResult<{
    payload: {
        FirstName: string;
        LastName: string;
        GRNO: string;
    }[];
}, unknown, string, unknown>}> = ({query})=>{

return <HoverCard>
<HoverCardTrigger>
       <div className="px-4 ">
        {query.isLoading ?
        <RequestLoading size="16" stroke="2" dark/>:
      <FaUsersRays size={20} className="text-gray-700 hover:text-dark transition-colors cursor-pointer"/>
        }
       </div>
</HoverCardTrigger>
<HoverCardContent>
    <section className="flex flex-col gap-2">

    {
        query.isLoading? 
        <div className=""></div>
        :(
            (!query?.data?.payload || query.data?.payload?.length==0)?
            <p className="text-gray-600 text-xs">No registered students found</p>:
            query?.data?.payload?.map((std:{FirstName:string;LastName:string;GRNO:string},index:number)=>(
                <div key={index} className="flex antialiased border p-2 gap-1 rounded-md">
                <div className="bg-dark text-white px-2 center rounded text-xs">{std.GRNO}</div>
                <div className=" font-medium pl-2">{std.FirstName}</div>
                <div className=" font-medium">{std.LastName}</div>
            </div>
        )))
        
    }
    </section>
</HoverCardContent>
</HoverCard>
}
export default StudentFirstNameFormField