import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SessionDetails from "../components/SessionDetails.session.reg";
import { defaultSession, Isessions } from "@/app/Types/Isessions";
import useRegisterSession, { useUpdateSession } from "@/Hooks/Yearly_Session/useRegisterSession";
import SessionRegFormSubmit from "./SessionRegFormSubmit.session";
import { FC } from "react";
import { useFetchSession } from "@/Hooks/Yearly_Session/useFetchSession";
import ErrorPage from "@/Global/Loaders/ErrorPage";
import NotFoundValidator from "@/Api/404Validator";
import  { SkeletonLoader } from "@/Pages/Students Directory/sub-section/Student Detailed/StudentDetailedSkeletonLoader";

const SessionRegisterations:FC<{edit?:boolean}> = ({edit}) => {
  const form  =useForm<Isessions>({defaultValues:defaultSession})
  const {mutate:Edit,isLoading:isUpdating} = useUpdateSession()
  const  {mutate,isLoading} =useRegisterSession(form.reset)
  const {isLoading:loading,isError,error}=useFetchSession(form.reset)
  const formSubmit  :SubmitHandler<Isessions> = (data) =>{
    if(edit) Edit(data)
    else mutate(data)
  }




if(edit){
if (loading) return <SkeletonLoader/>;
if (isError && NotFoundValidator(error))
    return (
  <ErrorPage
  title={"Invalid Session Id"}
  message={"The session you are looking for might not exist. Try with valid Id"}
  navigate={"/sessions"}
  />
);

}

  return (
    <div className="w-full flex flex-col gap-y-4">
    <FormProvider {...form}>
    <form 
    onSubmit={form.handleSubmit(formSubmit)}
    className="flex flex-col gap-y-4">
<SessionDetails/>
<SessionRegFormSubmit loading={edit ? isUpdating:isLoading}/>
</form>
</FormProvider>
    </div>

  )
}

export default SessionRegisterations