
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { defaultAccountRegisterState, IaccountRegister } from "@/app/Types/IAccountRegister";
import NewAccountFormFields from "./components/NewAccounFormFields.acc.reg";
import useCreateUserAccount, { useUpdateUserAccount } from "@/Hooks/User/useCreateUserAccount";
import { FC, useEffect } from "react";
import useGetUserAccountCredits from "@/Hooks/User/useGetUserAccountCredits";
import StudentDetailedSkeletonLoader from "@/Pages/Students Directory/sub-section/Student Detailed/StudentDetailedSkeletonLoader";
import NotFoundValidator from "@/Api/404Validator";
import ErrorPage from "@/Global/Loaders/ErrorPage";


 
const NewAccountPageForm:FC<{edit?:boolean}> = ({edit}) => {
  let form  =useForm<IaccountRegister>({defaultValues:defaultAccountRegisterState})
  const {mutate,isLoading} = useCreateUserAccount(form.reset)
  useEffect(() => {!edit&&form.reset(defaultAccountRegisterState)}, [edit])
  let {isFetching,isError,error} =useGetUserAccountCredits(edit,form.reset)
  let {mutate:update,isLoading:isUpdating} = useUpdateUserAccount()
  let formSubmit:SubmitHandler<IaccountRegister> = (data) =>{
  if(!edit) mutate(data)
  else update(data);
  }

  if(edit){
    if(isFetching) return <StudentDetailedSkeletonLoader />;
    if (isError && NotFoundValidator(error))
      return (
    <ErrorPage
    title={"User not found"}
    message={"There may be typo in the id.Try again with valid id."}
    navigate={"/settings/users"}
    />
  );
}
  return (
    <FormProvider {...form}>
    <form 
    onSubmit={form.handleSubmit(formSubmit)}
    className="flex flex-col gap-y-4">
      <NewAccountFormFields edit={edit} loading={isLoading||isUpdating}/>
      </form>
      </FormProvider>
  )
}

export default NewAccountPageForm