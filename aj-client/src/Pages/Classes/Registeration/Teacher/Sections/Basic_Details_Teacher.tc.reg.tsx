import ProfilePicture_Upload from "../Components/ProfilePicture_Upload.ts.reg";
import CustomInputs_Reg, { CustomTextArea_Reg } from "../Helpers/CustomInputs_Reg.dash";
import LabelWrapper from "../Helpers/LabelWrapper.dash";
import RegSectionHeader from "../Helpers/RegSectionHeader.dash";
const Basic_Details_Teacher = () => {
  return (
    <RegSectionHeader label={"Personal Details"}>
    <LabelWrapper required label="First Name">
      <CustomInputs_Reg placeholder="James" id="First Name" />
    </LabelWrapper>
    <LabelWrapper label="Last Name">
      <CustomInputs_Reg placeholder="Wadck" id="LastName" />
    </LabelWrapper>
    <LabelWrapper required label="CNIC">
      <CustomInputs_Reg placeholder="xxxxx-xxxxxxx-x" id="CNIC" type="number" maxLength={16} max={16}/>
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
    <LabelWrapper required label="Residential Address">
      <CustomTextArea_Reg  placeholder="Your Address ..." id="Residential Address" min={4} max={4}  className="resize-none" />
    </LabelWrapper>
    <ProfilePicture_Upload/> {/*//! Profile Picture */}
    </RegSectionHeader>
  )
}

export default Basic_Details_Teacher