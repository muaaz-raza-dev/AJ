import SettingsLabelWrapper from "../Components/SettingsLabelWrapper.set"
import {  useFormContext } from "react-hook-form"
import CustomInputs_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomInputs_Reg.dash"
import { IStaffInformationEditForm } from "@/app/Types/IStaffInformation_Settings"

const NonMutableInfoForm = () => {
  let form  =useFormContext<IStaffInformationEditForm>()
  let role = form.watch("acedmic_role")
  let subjects= form.watch("teaching_subjects")
  return (
    <>
    <SettingsLabelWrapper label="Acedmic Role" >
    <div className="min-w-[40%] flex  gap-4">
    <CustomInputs_Reg disabled field_name="acedmic_role" formContext={form} placeholder="Teacher"   />
    </div>
    </SettingsLabelWrapper>

    <SettingsLabelWrapper label="Subjects" description="The Subjects you are supposed to teach in the acedmy ">
        <div className="min-w-[40%] flex  gap-4">
       <input value={subjects.join(", ")} disabled className=" border rounded-md  w-full p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
        />
    </div>
</SettingsLabelWrapper>
    </>
  )
}

export default NonMutableInfoForm