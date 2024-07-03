import { FC } from "react";
import RegSectionHeader from "../../Teacher/Helpers/RegSectionHeader.dash";
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash";
import CustomInputs_Reg from "../../Teacher/Helpers/CustomInputs_Reg.dash";
import { useFormContext } from "react-hook-form";
import Class_Teacher_Selections from "../Components/Class_Teacher_Selections.reg.class";
import Schedule_details_Reg from "./Schedule_details.reg.class";

const ClassSections_Block: FC<{ index: number }> = ({ index }) => {
  let form = useFormContext();
  let sections = form.getValues("sections")
  let DeleteSection=()=>{
    form.setValue(`sections`,sections.filter((_:any,i:number)=>index!=i))
  }
  
  return (
    <RegSectionHeader dark label={`Section ${index+1} details`} deleteBtn={sections.length!=1} onDelete={DeleteSection}>
      <LabelWrapper required label="Section name">
        <CustomInputs_Reg
          formContext={form}
          placeholder="e.g A, Olive etc"
          required
          id="Section Name"
          field_name={`sections[${index}].name`}
        />
      </LabelWrapper>
      <LabelWrapper required label="Capacity of students">
        <CustomInputs_Reg
          formContext={form}
          placeholder="e.g A, Olive etc"
          required
          id="Capacity of students"
          field_name={`sections[${index}].capacity`}
        />
      </LabelWrapper>
      <Class_Teacher_Selections index={index}/> 
      <Schedule_details_Reg index={index}/>

    </RegSectionHeader>
  );
};

export default ClassSections_Block;
