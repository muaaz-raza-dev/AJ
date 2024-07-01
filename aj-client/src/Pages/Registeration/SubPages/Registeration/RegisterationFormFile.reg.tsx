import { IRegisterFormState, defaultRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import { FormProvider,    SubmitHandler,  useForm } from "react-hook-form"
import StudentsDetailsForm from "./Components/StudentsDetailsForm.reg"
import RegAcademicInfoForm from "./Components/Academic Info/AcademicInfo.reg"
import RegisterationFormSumbit from "./Components/RegisterationFormSumbit.reg"
import useRegisterStudent from "@/Hooks/Registeration/useRegisterStudent"
import FinancialInfo from "./Components/Financial Info/FinancialInfo.reg"
import { FC, useEffect, useState } from "react"
import { useAppSelector } from "@/app/ReduxHooks"
import { useEditStudentInformationExclusive } from "@/Hooks/Read Student Exclusive/useFetchStudentsInformationExclusive"
import ImageUpload from "./util/ImageUpload.middleware"

const RegisterationFormFile:FC<{edit?:boolean}> = ({edit}) => {
  let state = useAppSelector(s=>s.stdExclusive.Information.Details)
  const [Loading, setLoading] = useState(false)
  let form  = useForm<IRegisterFormState>({defaultValues:!edit?defaultRegisterFormState:state})
  let {mutate,isLoading} =useRegisterStudent(form.getValues("GRNO"),form.reset)
  let {mutate:Edit,isLoading:loading}=  useEditStudentInformationExclusive()
  useEffect(() => {edit&&form.reset(state)}, [state])
  let FormHandler:SubmitHandler<IRegisterFormState> = ()=>{
    if (!edit) {ImageUpload(mutate,form,setLoading)}
    else {ImageUpload(Edit,form,setLoading)}
  }
  return (
    <section className="flex flex-col gap-y-8 ">
    <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(FormHandler)} className="flex flex-col gap-y-8 ">
    <RegAcademicInfoForm edit={edit}/>
    <StudentsDetailsForm/>
    <FinancialInfo />
    <RegisterationFormSumbit isLoading={edit?Loading||loading:Loading||isLoading} edit={edit}/>
     </form>
        </FormProvider>
    </section>
  )
}

export default RegisterationFormFile
