import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import Academic_Details_Teacher from "../Sections/Academic_Details_Teacher.tc.reg"
import Basic_Details_Teacher from "../Sections/Basic_Details_Teacher.tc.reg"
import Education_Details_Teacher from "../Sections/Education_Details_Teacher.tc.reg"
import Account_Details_Teacher from "../Sections/Account_Details_Teacher.ts.reg"
import Teacher_Reg_Submit from "./Teacher_Reg_Submit.ts.reg"
import { default_teacherReg, Iteacher } from "@/app/Types/ITeacherRegisteration"
import useTeacherRegsiter, { useEditTeacher } from "@/Hooks/Teacher&Class/useTeacherRegsiter"
import { FC } from "react"
import { useReadTeacherRawDetails } from "@/Hooks/Teacher&Class/useReadTeachers"
import { Fetching_Request } from "@/Global/Loaders/AppLoader"

const TeacherRegistrationForm:FC<{edit?:boolean}> = ({edit}) => {
  let form  = useForm<Iteacher>({defaultValues:default_teacherReg})
  let {mutate,isLoading} =useTeacherRegsiter(form.reset)
  let {isLoading:isFetching}=useReadTeacherRawDetails(form.reset) //to fill the editable data
  let {mutate:editMutatate, isLoading:loading} = useEditTeacher()
  let formSubmit  :SubmitHandler<Iteacher> = (data) =>{
    if(edit) editMutatate(data)
    else mutate(data)
  }
  return (
<FormProvider {...form}>
{edit&&isFetching&&<Fetching_Request/>}
<form onSubmit={form.handleSubmit(formSubmit)} className="flex flex-col gap-y-4">
<Basic_Details_Teacher/> 
<Education_Details_Teacher/>
<Academic_Details_Teacher/>
<Account_Details_Teacher edit={edit}/>
<Teacher_Reg_Submit loading={edit?loading:isLoading}/>
    </form>
    </FormProvider>
  )
}

export default TeacherRegistrationForm