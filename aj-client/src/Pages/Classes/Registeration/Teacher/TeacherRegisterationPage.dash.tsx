import { FC } from "react";
import TeacherRegistrationForm from "./form/TeacherRegistrationForm.ts.reg";

const TeacherRegisteration:FC<{edit?:boolean}> = ({edit}) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
<TeacherRegistrationForm edit={edit}/>
    </div>
  );
};

export default TeacherRegisteration;
