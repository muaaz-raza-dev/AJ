import { useFormContext } from "react-hook-form";
import Certification_Select from "../Components/Certification_Select.ts.reg";
import CustomInputs_Reg from "../Helpers/CustomInputs_Reg.dash";
import LabelWrapper from "../Helpers/LabelWrapper.dash";
import RegSectionHeader from "../Helpers/RegSectionHeader.dash";
const Education_Details_Teacher = () => {
  let form = useFormContext()
  return (
    <RegSectionHeader label={"Education Details"}>
    <LabelWrapper required label="University / College" >
      <CustomInputs_Reg field_name="qualification[0]" formContext={form} placeholder="Oxford university"  id="University / College" />
    </LabelWrapper>
    <LabelWrapper required label="Degree" >
      <CustomInputs_Reg placeholder="B.Tech" formContext={form} id="Degree" field_name="qualification.Degree" />
    </LabelWrapper>
    <LabelWrapper required label="Experience">
      <CustomInputs_Reg field_name="qualification.Experience" placeholder="1.5 year" formContext={form} id="Experience" />
    </LabelWrapper>
  <Certification_Select/>
    </RegSectionHeader>
  )
}

export default Education_Details_Teacher