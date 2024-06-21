import Teacher_Schedule from "../Components/Teacher_Schedule.ts.reg";
import Teaching_Subjects from "../Components/Teaching_Subjects.ts.reg";
import { schoolRoles } from "../Data/Roles";
import CustomInputs_Reg from "../Helpers/CustomInputs_Reg.dash";
import CustomSelect_Reg from "../Helpers/CustomSelect_Reg.dash";
import LabelWrapper from "../Helpers/LabelWrapper.dash";
import RegSectionHeader from "../Helpers/RegSectionHeader.dash";
const Academic_Details_Teacher = () => {
  return (
    <RegSectionHeader label={"Academic Details"}>
    <LabelWrapper required label="Role">
      <CustomSelect_Reg data={schoolRoles} placeholder={"Teacher"}/>
    </LabelWrapper>
    <Teacher_Schedule/>
  
     <Teaching_Subjects/>
    <LabelWrapper required label="Salary">
      <CustomInputs_Reg  placeholder={"Salary"} type="number"/>
    </LabelWrapper>
    </RegSectionHeader>
  )
}

export default Academic_Details_Teacher