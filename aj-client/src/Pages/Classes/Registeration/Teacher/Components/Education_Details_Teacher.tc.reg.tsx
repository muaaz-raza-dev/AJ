import CustomInputs_Reg from "../Helpers/CustomInputs_Reg.dash";
import LabelWrapper from "../Helpers/LabelWrapper.dash";
import RegSectionHeader from "../Helpers/RegSectionHeader.dash";
const Education_Details_Teacher = () => {
  return (
    <RegSectionHeader label={"Education Details"}>
    <LabelWrapper required label="First Name">
      <CustomInputs_Reg placeholder="James" id="First Name" />
    </LabelWrapper>
    <LabelWrapper label="Last Name">
      <CustomInputs_Reg placeholder="Wadck" id="LastName" />
    </LabelWrapper>
    <LabelWrapper required label="CNIC">
      <CustomInputs_Reg placeholder="xxxxx-xxxxxxx-x" id="CNIC" type="number" />
    </LabelWrapper>
    <LabelWrapper required label="Email">
      <CustomInputs_Reg placeholder="James@gmail.com" id="Email" type="email" />
    </LabelWrapper>
    <LabelWrapper label="Phone Number">
      <CustomInputs_Reg placeholder="+923xxxxxxxx" id="Phone Number" type="number"/>
    </LabelWrapper>
    <LabelWrapper required label="WhatsApp Number">
      <CustomInputs_Reg  placeholder="+923xxxxxxxx" id="WhatsApp Number" type="number" />
    </LabelWrapper>
    </RegSectionHeader>
  )
}

export default Education_Details_Teacher