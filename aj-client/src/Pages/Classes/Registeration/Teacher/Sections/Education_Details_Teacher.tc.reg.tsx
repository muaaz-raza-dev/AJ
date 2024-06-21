import Certification_Select from "../Components/Certification_Select.ts.reg";
import CustomDateSelector_Reg from "../Helpers/CustomDateSelector_Reg.dash";
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
  <CustomDateSelector_Reg className="w-full" label="Pick date of hire"/>
    </LabelWrapper>
    <LabelWrapper required label="Experience">
      <CustomInputs_Reg placeholder="1.5 year" id="Experience" />
    </LabelWrapper>
  <Certification_Select/>
  
    </RegSectionHeader>
  )
}

export default Education_Details_Teacher