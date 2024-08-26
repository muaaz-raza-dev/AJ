import { useEffect } from "react";
import StudentsFilterHeader from "./sub-section/Students Directory List/Header/StudentsFIlterHeader.std"
import StudentsTable from "./sub-section/Students Directory List/StudentsTable.std"
import useLoadStudents from "@/Hooks/Students Dir/useLoadStudents";

const StudentsDirListPage = () => {
  const {mutate} = useLoadStudents()
useEffect(() => {
  mutate(1); // by default
}, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <StudentsFilterHeader/>
      <StudentsTable/>
    </div>
  )
}

export default StudentsDirListPage
