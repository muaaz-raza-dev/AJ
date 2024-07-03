import { useFormContext } from "react-hook-form"
import CustomInputs_Reg from "../../Teacher/Helpers/CustomInputs_Reg.dash"
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash"
import RegSectionHeader from "../../Teacher/Helpers/RegSectionHeader.dash"
import Subjects_Selection from "../Components/Subjects_Selection.reg.class"

const Class_Basic_Details = () => {
    let form = useFormContext()
  return (
    <RegSectionHeader dark label={"Basic Details"}>
    <LabelWrapper required label="Class Name">
      <CustomInputs_Reg placeholder="e.g 1st, nursery" required formContext={form} id="Class Name"  field_name="name"/>
    </LabelWrapper>
    <Subjects_Selection/>
    </RegSectionHeader>
  )
}

export default Class_Basic_Details