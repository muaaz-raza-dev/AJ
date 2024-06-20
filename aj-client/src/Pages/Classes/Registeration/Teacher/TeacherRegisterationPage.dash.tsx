import Academic_Details_Teacher from "./Sections/Academic_Details_Teacher.tc.reg";
import Basic_Details_Teacher from "./Sections/Basic_Details_Teacher.tc.reg";
import Education_Details_Teacher from "./Sections/Education_Details_Teacher.tc.reg";

const TeacherRegisteration = () => {
  return (
    <div className="w-full flex flex-col gap-y-4">
<Basic_Details_Teacher/> 
<Education_Details_Teacher/>
<Academic_Details_Teacher/>
    </div>
  );
};

export default TeacherRegisteration;
