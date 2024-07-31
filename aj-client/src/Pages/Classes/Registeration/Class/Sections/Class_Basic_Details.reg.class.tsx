import { useFormContext } from "react-hook-form"
import CustomInputs_Reg from "../../Teacher/Helpers/CustomInputs_Reg.dash"
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash"
import RegSectionHeader from "../../Teacher/Helpers/RegSectionHeader.dash"
import CustomDateSelector_Reg from "../../Teacher/Helpers/CustomDateSelector_Reg.dash"
import Session_Selection from "../Components/Session_Selection.reg.class"
import lod from "lodash"
export function isFormReset <T>(f1:T,f2:T){
 return !lod.isEqual(f1,f2)
}
const Class_Basic_Details = () => {
    let form = useFormContext()
    let start_date = useFormContext().watch("start_date")
    let handleStartDate = (val:string)=>{
      form.setValue("start_date",val)
    }
    return (
    <RegSectionHeader dark label={`Class Details`}>
    <LabelWrapper required label="Class Name" className="max-sm:w-full">
      <CustomInputs_Reg placeholder="e.g 1st, nursery" required formContext={form} id="Class Name"  field_name="name"/>
    </LabelWrapper>
    <LabelWrapper required label="Date of class start"  className="max-sm:w-full">
    <CustomDateSelector_Reg formValue={start_date} onChange={handleStartDate} label="Pick date of start class this year" className="w-full"/>
    </LabelWrapper>
<Session_Selection />
    </RegSectionHeader>
  )
}

export default Class_Basic_Details