import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import Academic_Details_Teacher from "../Sections/Academic_Details_Teacher.tc.reg"
import Basic_Details_Teacher from "../Sections/Basic_Details_Teacher.tc.reg"
import Education_Details_Teacher from "../Sections/Education_Details_Teacher.tc.reg"
import Account_Details_Teacher from "../Sections/Account_Details_Teacher.ts.reg"
import Teacher_Reg_Submit from "./Teacher_Reg_Submit.ts.reg"
import { default_teacherReg, Iteacher } from "@/app/Types/ITeacherRegisteration"
import useTeacherRegsiter from "@/Hooks/Teacher&Class/useTeacherRegsiter"

const TeacherRegistrationForm = () => {
  let form  = useForm<Iteacher>({defaultValues:default_teacherReg})
  let {mutate,isLoading} =useTeacherRegsiter(form.reset)
  let formSubmit  :SubmitHandler<Iteacher> = (data) =>{
    mutate(data)
  }
  return (
    <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(formSubmit)} className="flex flex-col gap-y-4">
<Basic_Details_Teacher/> 
<Education_Details_Teacher/>
<Academic_Details_Teacher/>
<Account_Details_Teacher/>
<Teacher_Reg_Submit loading={isLoading}/>
    </form>
    </FormProvider>
  )
}

export default TeacherRegistrationForm