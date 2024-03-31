import { useEffect } from "react";
import StudentsFilterHeader from "./sub-section/Students Directory List/Header/StudentsFIlterHeader.std"
import StudentsTable from "./sub-section/Students Directory List/StudentsTable.std"
import useLoadStudents from "@/Hooks/Students Dir/useLoadStudents";
import { useAppSelector } from "@/app/ReduxHooks";

const StudentsDirListPage = () => {
  let {count} =useAppSelector(state=>state.StudentsDir)
  let {mutate} = useLoadStudents()(count)
  useEffect(() => {
    mutate(count)
  }, []);
  return (
    <div className="w-full flex flex-col gap-y-4">
      <StudentsFilterHeader/>
      <StudentsTable/>
    </div>
  )
}

export default StudentsDirListPage
