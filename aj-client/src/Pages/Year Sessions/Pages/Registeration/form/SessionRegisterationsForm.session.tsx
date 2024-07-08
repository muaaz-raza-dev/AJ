import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SessionDetails from "../components/SessionDetails.session.reg";
import { defaultSession, Isessions } from "@/app/Types/Isessions";
import useRegisterSession from "@/Hooks/Yearly_Session/useRegisterSession";
import SessionRegFormSubmit from "./SessionRegFormSubmit.session";

const SessionRegisterations = () => {
  let form  =useForm<Isessions>({defaultValues:defaultSession})
  let  {mutate,isLoading} =useRegisterSession()
  let formSubmit  :SubmitHandler<Isessions> = (data) =>{
    mutate(data)
    form.reset()
  }

  return (
    <div className="w-full flex flex-col gap-y-4">
    <FormProvider {...form}>
    <form 
    onSubmit={form.handleSubmit(formSubmit)}
     className="flex flex-col gap-y-4">
      <SessionDetails/>
<SessionRegFormSubmit loading={isLoading}/>
    </form>
</FormProvider>
    </div>
  )
}

export default SessionRegisterations