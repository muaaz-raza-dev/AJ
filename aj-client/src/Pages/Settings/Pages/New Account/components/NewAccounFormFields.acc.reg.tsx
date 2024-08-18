import { IaccountRegister } from "@/app/Types/IAccountRegister"
import LabelWrapper from "@/Pages/Classes/Registeration/Teacher/Helpers/LabelWrapper.dash"
import { useFormContext } from "react-hook-form"
import NewAccountFormSubmit from "./NewAccountFormSubmit.acc.reg"
import NewAccPasswordField from "./NewAccPasswordField.acc.reg"
import Account_Username from "@/Pages/Classes/Registeration/Teacher/Components/Account_Username.ts.reg"
import NewAccRoleField from "./NewAccRoleField.acc.reg"
import NewAccountStaffIdField from "./NewAccountStaffIdField.acc.reg"
import { FC } from "react"

const NewAccountFormFields:FC<{loading:boolean;edit?:boolean}> = ({loading,edit}) => {
  let {register} =useFormContext<IaccountRegister>()
  return (
    <main className="w-full dark:text-light  dark:bg-darker rounded-md shadow pb-8 ">
    <header className="bg-dark w-full dark:rounded-none rounded-t-md ">
      <h1 className=" text-light   hFont text-xl px-3 py-3 font-bold">
    Account Details
      </h1>
    </header>
    <main className={`px-4 pt-4 flex  gap-4 flex-wrap`}>
      <LabelWrapper required label="Username" labelClassName=" ">

      <Account_Username fieldName="username" edit={edit}/>
      </LabelWrapper>
      
      <LabelWrapper required label="Full Name" >
        <input type="text" id="Full Name"  placeholder="Muaaz Raza" 
        {...register("Name")}
    className=" dark:bg-dark dark:border-darker dark:text-white border rounded-md  w-full p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
        />

      </LabelWrapper>
      <LabelWrapper label="Email Address" labelClassName=" ">
        <input type="email" id="Email Address"
        {...register("email")}
        placeholder="muaaz@dior.com"
    className="  dark:border-darker dark:bg-dark dark:text-white border rounded-md  w-full p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
        />

      </LabelWrapper>

    <NewAccRoleField/>

    <NewAccountStaffIdField/>

    <NewAccPasswordField edit={edit}/>

      <div className="w-[98%] pt-3 flex justify-end">
     <NewAccountFormSubmit loading={loading}/>
        </div>
    </main>
  </main>
  )
}

export default NewAccountFormFields