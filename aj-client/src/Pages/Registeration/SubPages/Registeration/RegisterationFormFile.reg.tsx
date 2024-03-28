import { IRegisterFormState, defaultRegisterFormState } from "@/app/Types/IStdregisterForm.t"

import { FormProvider,    SubmitHandler,  useForm } from "react-hook-form"
import StudentsDetailsForm from "./Components/StudentsDetailsForm.reg"
import RegAcademicInfoForm from "./Components/Academic Info/AcademicInfo.reg"
import RegisterationFormSumbit from "./Components/RegisterationFormSumbit.reg"
import useRegisterStudent from "@/Hooks/Registeration/useRegisterStudent"
import FinancialInfo from "./Components/Financial Info/FinancialInfo.reg"


const RegisterationFormFile = () => {
  let form  = useForm<IRegisterFormState>({defaultValues:defaultRegisterFormState})
  let {mutate,isLoading} =useRegisterStudent(form.getValues("GRNO"),form.reset)
  let FormHandler:SubmitHandler<IRegisterFormState> = (data)=>{
      mutate(data)
  }
  return (
    <section className="flex flex-col gap-y-8 ">
        <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(FormHandler)} className="flex flex-col gap-y-8 ">
     <RegAcademicInfoForm/>
     <StudentsDetailsForm/>
     <FinancialInfo/>
     <RegisterationFormSumbit isLoading={isLoading}/>
      </form>
        </FormProvider>
    </section>
  )
}

export default RegisterationFormFile
