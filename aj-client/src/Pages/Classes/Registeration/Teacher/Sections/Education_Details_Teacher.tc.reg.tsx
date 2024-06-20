import CustomInputs_Reg from "../Helpers/CustomInputs_Reg.dash";
import LabelWrapper from "../Helpers/LabelWrapper.dash";
import RegSectionHeader from "../Helpers/RegSectionHeader.dash";
const Education_Details_Teacher = () => {
  return (
    <RegSectionHeader label={"Education Details"}>
    <LabelWrapper required label="University / College" >
      <CustomInputs_Reg placeholder="Oxford university" id="University / College" />
    </LabelWrapper>
    <LabelWrapper required label="Degree" >
      <CustomInputs_Reg placeholder="B.Tech" id="Degree" />
    </LabelWrapper>
    <LabelWrapper required label="End Date" >
      <CustomInputs_Reg placeholder="B.Tech" id="Degree" />
    </LabelWrapper>
    <LabelWrapper required label="City">
      <CustomInputs_Reg placeholder="New York" id="City" />
    </LabelWrapper>
    <LabelWrapper required label="Certifications">
      <CustomInputs_Reg placeholder="New York" id="City" />
    </LabelWrapper>
    </RegSectionHeader>
  )
}

export default Education_Details_Teacher