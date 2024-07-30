import { useFormContext } from "react-hook-form";
import ProfilePicture_Upload from "../Components/ProfilePicture_Upload.ts.reg";
import CustomInputs_Reg, { CustomTextArea_Reg } from "../Helpers/CustomInputs_Reg.dash";
import LabelWrapper from "../Helpers/LabelWrapper.dash";
import RegSectionHeader from "../Helpers/RegSectionHeader.dash";
const Basic_Details_Teacher = () => {
  let formContext = useFormContext();
  return (
    <RegSectionHeader label={"Personal Details"}>
    <LabelWrapper required label="First Name"  className="max-sm:w-full">
      <CustomInputs_Reg placeholder="James" required formContext={formContext} id="First Name"  field_name="firstName"/>
    </LabelWrapper>
    <LabelWrapper label="Last Name"  className="max-sm:w-full">
      <CustomInputs_Reg placeholder="Wadck" formContext={formContext} id="LastName" field_name="lastName" />
    </LabelWrapper>
    <LabelWrapper  label="CNIC"  className="max-sm:w-full">
      <CustomInputs_Reg placeholder="xxxxx-xxxxxxx-x" formContext={formContext} id="CNIC"   max={16} field_name="CNIC"/>
    </LabelWrapper>
    <LabelWrapper  label="Email"  className="max-sm:w-full">
      <CustomInputs_Reg placeholder="James@gmail.com" formContext={formContext} id="Email" type="email" field_name="email" />
    </LabelWrapper>
    <LabelWrapper label="Phone Number"  className="max-sm:w-full">
      <CustomInputs_Reg placeholder="+923xxxxxxxx"  formContext={formContext} id="Phone Number" type="number" field_name="phone"/>
    </LabelWrapper>
    <LabelWrapper required label="WhatsApp Number"  className="max-sm:w-full">
      <CustomInputs_Reg  placeholder="+923xxxxxxxx" required formContext={formContext} id="WhatsApp Number" type="number" field_name="wa"/>
    </LabelWrapper>
    <LabelWrapper  label="Residential Address"  className="max-sm:w-full">
      <CustomTextArea_Reg  placeholder="Your Address ..." formContext={formContext} id="Residential Address" min={4} max={4}  className="resize-none" field_name="address"/>
    </LabelWrapper>
    <ProfilePicture_Upload/> {/*//! Profile Picture */}
    </RegSectionHeader>
  )
}

export default Basic_Details_Teacher