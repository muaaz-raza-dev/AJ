import CustomDateSelector_Reg from '@/Pages/Classes/Registeration/Teacher/Helpers/CustomDateSelector_Reg.dash'
import CustomInputs_Reg, { CustomTextArea_Reg } from '@/Pages/Classes/Registeration/Teacher/Helpers/CustomInputs_Reg.dash'
import LabelWrapper from '@/Pages/Classes/Registeration/Teacher/Helpers/LabelWrapper.dash'
import RegSectionHeader from '@/Pages/Classes/Registeration/Teacher/Helpers/RegSectionHeader.dash'
import { useFormContext } from 'react-hook-form'

const SessionDetails = () => {
    let form = useFormContext()
    let handleStartDate = (value:string)=>{
      form.setValue("start_date",value)
    }
    let handleEndDate = (value:string)=>{
      form.setValue("end_date",value)
    }
  return (
    <RegSectionHeader  label={"Session details"}>
    <LabelWrapper required label="Session's Name">
      <CustomInputs_Reg placeholder="Fallsome" required formContext={form} id="Session's Name"  field_name="session_name"/>
    </LabelWrapper>
    <LabelWrapper required label="Acedmic Year">
      <CustomInputs_Reg placeholder="2024-2025" required formContext={form} id="Acedmic Year"  field_name="acedmic_year"/>
    </LabelWrapper>
    <LabelWrapper required label="Start Date">
      <CustomDateSelector_Reg formValue={form.watch("start_date")} label="pick session start date" onChange={handleStartDate} className="w-full" />
    </LabelWrapper>
    <LabelWrapper required label="End Date">
      <CustomDateSelector_Reg formValue={form.watch("end_date")} label="pick session end date" onChange={handleEndDate} className="w-full" />
    </LabelWrapper>
    <LabelWrapper required label="Description session">
        <CustomTextArea_Reg placeholder="write the goals of the whole sessions..." required formContext={form} id="Session Description"  field_name="session_description"/>
    </LabelWrapper>
    </RegSectionHeader>
  )
}

export default SessionDetails