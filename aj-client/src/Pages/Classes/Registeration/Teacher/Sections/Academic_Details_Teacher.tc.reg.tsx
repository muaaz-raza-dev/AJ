import { useFormContext } from "react-hook-form";
import Teacher_Schedule from "../Components/Teacher_Schedule.ts.reg";
import Teaching_Subjects from "../Components/Teaching_Subjects.ts.reg";
import CustomInputs_Reg from "../Helpers/CustomInputs_Reg.dash";
import LabelWrapper from "../Helpers/LabelWrapper.dash";
import RegSectionHeader from "../Helpers/RegSectionHeader.dash";
import Role_Select from "../Components/Role_Select.ts.reg";
const Academic_Details_Teacher = () => {
  let form = useFormContext()
  return (
    <RegSectionHeader label={"Academic Details"}>
  <Role_Select/>
    <Teacher_Schedule/>
    <LabelWrapper required label="Salary">
      <CustomInputs_Reg  formContext={form} field_name="salary" placeholder={"Salary"} type="number"/>
    </LabelWrapper>
     <Teaching_Subjects/>
    </RegSectionHeader>
  )
}

export default Academic_Details_Teacher