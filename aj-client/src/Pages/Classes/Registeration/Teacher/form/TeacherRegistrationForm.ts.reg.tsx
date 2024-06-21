import Academic_Details_Teacher from "../Sections/Academic_Details_Teacher.tc.reg"
import Basic_Details_Teacher from "../Sections/Basic_Details_Teacher.tc.reg"
import Education_Details_Teacher from "../Sections/Education_Details_Teacher.tc.reg"
import Teacher_Reg_Submit from "./Teacher_Reg_Submit.ts.reg"

const TeacherRegistrationForm = () => {
  return (
    <>
    <form className="flex flex-col gap-y-4">
    <Basic_Details_Teacher/> 
<Education_Details_Teacher/>
<Academic_Details_Teacher/>
<Teacher_Reg_Submit/>
    </form>
    </>
  )
}

export default TeacherRegistrationForm