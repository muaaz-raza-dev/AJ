import { IRegisterFormState, defaultRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import { FormProvider,    SubmitHandler,  useForm } from "react-hook-form"
import StudentsDetailsForm from "./Components/StudentsDetailsForm.reg"
import RegAcademicInfoForm from "./Components/Academic Info/AcademicInfo.reg"
import RegisterationFormSumbit from "./Components/RegisterationFormSumbit.reg"
import useRegisterStudent from "@/Hooks/Registeration/useRegisterStudent"
import FinancialInfo from "./Components/Financial Info/FinancialInfo.reg"
import { FC, useEffect } from "react"
import { useAppSelector } from "@/app/ReduxHooks"
import { useEditStudentInformationExclusive } from "@/Hooks/Read Student Exclusive/useFetchStudentsInformationExclusive"


const RegisterationFormFile:FC<{edit?:boolean}> = ({edit}) => {
  let state = useAppSelector(s=>s.stdExclusive.Information.Details)
  let form  = useForm<IRegisterFormState>({defaultValues:!edit?defaultRegisterFormState:state})
  let {mutate,isLoading} =useRegisterStudent(form.getValues("GRNO"),form.reset)
  let {mutate:Edit,isLoading:loading}=  useEditStudentInformationExclusive()
  useEffect(() => {
  edit&&form.reset(state)
  }, [state])
  let FormHandler:SubmitHandler<IRegisterFormState> = (data)=>{
    if (!edit) {mutate(data)}
    else {Edit(data)}
  }
  return (
    <section className="flex flex-col gap-y-8 ">
       
        <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(FormHandler)} className="flex flex-col gap-y-8 ">
     <RegAcademicInfoForm edit={edit}/>
     <StudentsDetailsForm/>
     <FinancialInfo />
     <RegisterationFormSumbit isLoading={edit?loading:isLoading} edit={edit}/>
      </form>
        </FormProvider>
    </section>
  )
}

export default RegisterationFormFile
