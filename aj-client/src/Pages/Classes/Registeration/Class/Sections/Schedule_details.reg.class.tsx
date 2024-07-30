import { FC, useEffect, useState } from "react";
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash";
import { useFormContext } from "react-hook-form";
import { SubjectsTeacher } from "@/app/Types/Iclass";
import CustomSelect_Reg from "../../Teacher/Helpers/CustomSelect_Reg.dash";
import { useDebouncedCallback } from "use-debounce";
import { useAppSelector } from "@/app/ReduxHooks";
const Schedule_details_Reg: FC<{ index: number }> = ({ index:index_section }) => {
  const [subjectTeachers, setSubjectTeachers] = useState<SubjectsTeacher>({});
  let subjects = useFormContext().watch(`sections[${index_section}].subjects`);
  console.log(subjects,)
  let form = useFormContext()
  let teachers =useAppSelector(s=>s.dashboard.RequiredInfo.Teachers)
  let debounced  =useDebouncedCallback((_)=>{
    form.setValue(`sections[${index_section}].Subjects_teachers`,subjectTeachers)
  },1000)
  useEffect(() => {
  debounced(false) //* just to trigger
  }, [subjectTeachers])
  useEffect(() => {
    subjects.map((e: string) => {
      setSubjectTeachers((prev_value) => ({
        ...prev_value,
        [e]: { subject: e, Teachers: Array(1).fill(Object.values(teachers)[0]) }, //two places for teacher of a single subject
      }));
    });
  }, [subjects]);
  
  return (
    <LabelWrapper label="Subject Teaching Details" className="w-full" labelClassName="text-darker  rounded p-2 !text-xl !font-bold dark:bg-darker">
      {subjects?.map((subject: string, index: number) => (
        <EachSubjectTeacher_Comp
          key={index}
          setState={setSubjectTeachers}
          index_section={index_section}
          State={subjectTeachers}
          subject={subject}
        />
      ))}
    </LabelWrapper>
  );
};

const EachSubjectTeacher_Comp: FC<{
  subject: string;
  State: SubjectsTeacher;
  setState: any;
  index_section:number;
}> = ({ subject, State: state, setState ,index_section }) => {
    
  return (
    <LabelWrapper label={subject} className="w-full">
        <div className="flex gap-3 w-full">
        
      <EachSubjectTeacherSelect 
          setState={setState}
          index_Teacher_number={0}
          subject={subject}
          state = {state}
          index_section={index_section}
          />
    <EachSubjectTeacherSelect 
          setState={setState}
          index_Teacher_number={1}
          subject={subject}
          state = {state}
          index_section={index_section}
          />          
             <EachSubjectTeacherSelect 
          setState={setState}
          index_Teacher_number={2}
          subject={subject}
          state = {state}
          index_section={index_section}
          />  
        </div>
    </LabelWrapper>
  );
};

const EachSubjectTeacherSelect: FC<{
  setState: any; // to start the state
  subject: string; //the subject's name i.e Science
  index_Teacher_number: number; //the index of the teacher number
  state: SubjectsTeacher; //the state of the subject teachers
  index_section:number; //the index of the section 
}> = ({ subject,  setState, index_Teacher_number: i ,state  }) => {
  let teachers =useAppSelector(s=>s.dashboard.RequiredInfo.Teachers)
  const [TeacherName, setTeachersName] = useState(i==0 ?Object.keys(teachers)[0]  ||"":"none")
  function handleSelection(value: string) {
    setTeachersName(value)
    let updatedValue = state[subject].Teachers.map((val,index)=>{
      if(value !== "none") {
        if(index==i) return  teachers[value]
        else{ return val||" "}
      }
      else{ return " "}
    }) 
    
    setState((pre:SubjectsTeacher) => ({ ...pre,[subject]:{...pre[subject],Teachers: updatedValue } }));

  }
  return (
    <CustomSelect_Reg
      data={[...Object.keys(teachers),"none"]}
      className="!w-[45%]"
      setState={handleSelection}
      placeholder={`Teacher ${i + 1}`}
      nosearch
      state={TeacherName}
      />
  );
};
export default Schedule_details_Reg;






